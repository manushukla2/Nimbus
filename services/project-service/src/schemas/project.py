from pydantic import BaseModel, Field
from typing import Optional, List
from uuid import UUID
from datetime import datetime
from src.models.project import ProjectStatus, ProjectHealth

# ---------------------------------------------------------------------------
# Member schemas
# ---------------------------------------------------------------------------

class ProjectMemberOut(BaseModel):
    user_id:   UUID
    role_name: str

    class Config:
        from_attributes = True

# ---------------------------------------------------------------------------
# Project schemas
# ---------------------------------------------------------------------------

class ProjectCreate(BaseModel):
    name:        str        = Field(..., min_length=1, max_length=255)
    key:         str        = Field(..., min_length=1, max_length=10)
    description: Optional[str] = None
    cover_color: Optional[str] = Field(None, pattern=r"^#[0-9A-Fa-f]{6}$")
    status:      ProjectStatus = ProjectStatus.PLANNING
    health:      ProjectHealth = ProjectHealth.UNKNOWN
    start_date:  Optional[str] = None
    target_date: Optional[str] = None

class ProjectUpdate(BaseModel):
    name:        Optional[str]           = Field(None, min_length=1, max_length=255)
    description: Optional[str]           = None
    cover_color: Optional[str]           = Field(None, pattern=r"^#[0-9A-Fa-f]{6}$")
    status:      Optional[ProjectStatus] = None
    health:      Optional[ProjectHealth] = None
    start_date:  Optional[str]           = None
    target_date: Optional[str]           = None

class ProjectOut(BaseModel):
    id:           UUID
    workspace_id: UUID
    owner_id:     UUID
    name:         str
    key:          str
    description:  Optional[str]
    cover_color:  Optional[str]
    status:       ProjectStatus
    health:       ProjectHealth
    start_date:   Optional[str]
    target_date:  Optional[str]
    created_at:   datetime
    updated_at:   datetime
    members:      List[ProjectMemberOut] = []

    class Config:
        from_attributes = True

class ProjectWithStats(ProjectOut):
    total_tasks:     int = 0
    completed_tasks: int = 0
    overdue_tasks:   int = 0
    blocked_tasks:   int = 0
    progress:        int = 0

# ---------------------------------------------------------------------------
# API response wrappers
# ---------------------------------------------------------------------------

class ProjectListResponse(BaseModel):
    projects: List[ProjectWithStats]
    total:    int

class ProjectResponse(BaseModel):
    project: ProjectOut
