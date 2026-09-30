from uuid import UUID
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, case, and_
from src.models.project import Project, ProjectMember
from src.schemas.project import ProjectCreate, ProjectUpdate, ProjectWithStats

class ProjectRepository:

    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_all_by_workspace(self, workspace_id: UUID) -> List[ProjectWithStats]:
        result = await self.db.execute(
            select(Project).where(Project.workspace_id == workspace_id)
        )
        projects = result.scalars().all()

        out = []
        for p in projects:
            stats = await self._get_stats(p.id)
            total     = stats["total"]
            completed = stats["completed"]
            progress  = int((completed / total) * 100) if total > 0 else 0

            out.append(ProjectWithStats(
                id=p.id, workspace_id=p.workspace_id, owner_id=p.owner_id,
                name=p.name, key=p.key, description=p.description,
                cover_color=p.cover_color, status=p.status, health=p.health,
                start_date=p.start_date, target_date=p.target_date,
                created_at=p.created_at, updated_at=p.updated_at,
                members=[m for m in p.members],
                total_tasks=total, completed_tasks=completed,
                overdue_tasks=stats["overdue"], blocked_tasks=stats["blocked"],
                progress=progress
            ))
        return out

    async def get_by_id(self, project_id: UUID, workspace_id: UUID) -> Optional[Project]:
        result = await self.db.execute(
            select(Project).where(
                and_(Project.id == project_id,
                     Project.workspace_id == workspace_id)
            )
        )
        return result.scalar_one_or_none()

    async def create(self, workspace_id: UUID, owner_id: UUID,
                     data: ProjectCreate) -> Project:
        project = Project(
            workspace_id=workspace_id,
            owner_id=owner_id,
            name=data.name,
            key=data.key.upper(),
            description=data.description,
            cover_color=data.cover_color or "#6C63FF",
            status=data.status,
            health=data.health,
            start_date=data.start_date,
            target_date=data.target_date,
        )
        self.db.add(project)
        await self.db.flush()

        member = ProjectMember(
            project_id=project.id,
            user_id=owner_id,
            role_name="OWNER"
        )
        self.db.add(member)
        await self.db.flush()
        return project

    async def update(self, project: Project, data: ProjectUpdate) -> Project:
        for field, value in data.model_dump(exclude_none=True).items():
            setattr(project, field, value)
        await self.db.flush()
        return project

    async def delete(self, project: Project) -> None:
        await self.db.delete(project)
        await self.db.flush()

    async def _get_stats(self, project_id: UUID) -> dict:
        from sqlalchemy import text
        row = await self.db.execute(text("""
            SELECT
                COUNT(*)                                                      AS total,
                COUNT(*) FILTER (WHERE status = 'DONE')                      AS completed,
                COUNT(*) FILTER (WHERE due_date < NOW() AND status != 'DONE') AS overdue,
                COUNT(*) FILTER (WHERE status = 'BLOCKED')                   AS blocked
            FROM task.tasks
            WHERE project_id = :pid
        """), {"pid": project_id})
        r = row.mappings().one()
        return {
            "total":     int(r["total"]),
            "completed": int(r["completed"]),
            "overdue":   int(r["overdue"]),
            "blocked":   int(r["blocked"]),
        }
