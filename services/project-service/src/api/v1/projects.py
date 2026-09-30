from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID
from src.db.session import get_db
from src.core.security import get_current_user
from src.repositories.project import ProjectRepository
from src.schemas.project import (
    ProjectCreate, ProjectUpdate,
    ProjectResponse, ProjectListResponse, ProjectWithStats
)

router = APIRouter(prefix="/projects", tags=["projects"])

def get_workspace_id() -> UUID:
    # TODO: read from JWT payload or header once workspace-service is ready
    # For now returns the seeded workspace id from dev_seed.sql
    import os
    wid = os.getenv("DEV_WORKSPACE_ID", "")
    if not wid:
        raise HTTPException(status_code=500, detail="DEV_WORKSPACE_ID not set in .env")
    return UUID(wid)

@router.get("/", response_model=ProjectListResponse)
async def list_projects(
    db:           AsyncSession = Depends(get_db),
    user_id:      UUID         = Depends(get_current_user),
    workspace_id: UUID         = Depends(get_workspace_id),
):
    repo     = ProjectRepository(db)
    projects = await repo.get_all_by_workspace(workspace_id)
    return ProjectListResponse(projects=projects, total=len(projects))

@router.post("/", response_model=ProjectWithStats, status_code=status.HTTP_201_CREATED)
async def create_project(
    data:         ProjectCreate,
    db:           AsyncSession = Depends(get_db),
    user_id:      UUID         = Depends(get_current_user),
    workspace_id: UUID         = Depends(get_workspace_id),
):
    repo    = ProjectRepository(db)
    project = await repo.create(workspace_id, user_id, data)
    stats   = await repo._get_stats(project.id)
    return ProjectWithStats(
        id=project.id, workspace_id=project.workspace_id,
        owner_id=project.owner_id, name=project.name,
        key=project.key, description=project.description,
        cover_color=project.cover_color, status=project.status,
        health=project.health, start_date=project.start_date,
        target_date=project.target_date, created_at=project.created_at,
        updated_at=project.updated_at, members=[],
        total_tasks=stats["total"], completed_tasks=stats["completed"],
        overdue_tasks=stats["overdue"], blocked_tasks=stats["blocked"],
        progress=0
    )

@router.get("/{project_id}", response_model=ProjectWithStats)
async def get_project(
    project_id:   UUID,
    db:           AsyncSession = Depends(get_db),
    user_id:      UUID         = Depends(get_current_user),
    workspace_id: UUID         = Depends(get_workspace_id),
):
    repo    = ProjectRepository(db)
    project = await repo.get_by_id(project_id, workspace_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    stats   = await repo._get_stats(project.id)
    total   = stats["total"]
    completed = stats["completed"]
    return ProjectWithStats(
        id=project.id, workspace_id=project.workspace_id,
        owner_id=project.owner_id, name=project.name,
        key=project.key, description=project.description,
        cover_color=project.cover_color, status=project.status,
        health=project.health, start_date=project.start_date,
        target_date=project.target_date, created_at=project.created_at,
        updated_at=project.updated_at, members=[m for m in project.members],
        total_tasks=total, completed_tasks=completed,
        overdue_tasks=stats["overdue"], blocked_tasks=stats["blocked"],
        progress=int((completed/total)*100) if total > 0 else 0
    )

@router.patch("/{project_id}", response_model=ProjectWithStats)
async def update_project(
    project_id:   UUID,
    data:         ProjectUpdate,
    db:           AsyncSession = Depends(get_db),
    user_id:      UUID         = Depends(get_current_user),
    workspace_id: UUID         = Depends(get_workspace_id),
):
    repo    = ProjectRepository(db)
    project = await repo.get_by_id(project_id, workspace_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    project = await repo.update(project, data)
    stats   = await repo._get_stats(project.id)
    total   = stats["total"]
    completed = stats["completed"]
    return ProjectWithStats(
        id=project.id, workspace_id=project.workspace_id,
        owner_id=project.owner_id, name=project.name,
        key=project.key, description=project.description,
        cover_color=project.cover_color, status=project.status,
        health=project.health, start_date=project.start_date,
        target_date=project.target_date, created_at=project.created_at,
        updated_at=project.updated_at, members=[m for m in project.members],
        total_tasks=total, completed_tasks=completed,
        overdue_tasks=stats["overdue"], blocked_tasks=stats["blocked"],
        progress=int((completed/total)*100) if total > 0 else 0
    )

@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(
    project_id:   UUID,
    db:           AsyncSession = Depends(get_db),
    user_id:      UUID         = Depends(get_current_user),
    workspace_id: UUID         = Depends(get_workspace_id),
):
    repo    = ProjectRepository(db)
    project = await repo.get_by_id(project_id, workspace_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    await repo.delete(project)
