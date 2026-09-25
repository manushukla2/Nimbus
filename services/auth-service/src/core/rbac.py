from enum import Enum
from typing import List


class Role(str, Enum):
    OWNER = "OWNER"
    ADMIN = "ADMIN"
    PROJECT_MANAGER = "PROJECT_MANAGER"
    PRODUCT_MANAGER = "PRODUCT_MANAGER"
    TEAM_LEAD = "TEAM_LEAD"
    MEMBER = "MEMBER"
    VIEWER = "VIEWER"


class Permission(str, Enum):
    PROJECT_CREATE = "PROJECT_CREATE"
    PROJECT_UPDATE = "PROJECT_UPDATE"
    PROJECT_DELETE = "PROJECT_DELETE"
    PROJECT_VIEW = "PROJECT_VIEW"
    TASK_CREATE = "TASK_CREATE"
    TASK_UPDATE = "TASK_UPDATE"
    TASK_DELETE = "TASK_DELETE"
    TASK_ASSIGN = "TASK_ASSIGN"
    SPRINT_CREATE = "SPRINT_CREATE"
    SPRINT_MANAGE = "SPRINT_MANAGE"
    ROADMAP_VIEW = "ROADMAP_VIEW"
    ROADMAP_MANAGE = "ROADMAP_MANAGE"
    DOCUMENT_CREATE = "DOCUMENT_CREATE"
    DOCUMENT_DELETE = "DOCUMENT_DELETE"
    ANALYTICS_VIEW = "ANALYTICS_VIEW"
    WORKSPACE_MANAGE = "WORKSPACE_MANAGE"
    MEMBER_INVITE = "MEMBER_INVITE"
    MEMBER_REMOVE = "MEMBER_REMOVE"
    AI_USE = "AI_USE"
    AI_EXECUTE = "AI_EXECUTE"


ROLE_PERMISSIONS: dict[Role, List[Permission]] = {
    Role.OWNER: list(Permission),

    Role.ADMIN: [
        Permission.PROJECT_CREATE,
        Permission.PROJECT_UPDATE,
        Permission.PROJECT_DELETE,
        Permission.PROJECT_VIEW,
        Permission.TASK_CREATE,
        Permission.TASK_UPDATE,
        Permission.TASK_DELETE,
        Permission.TASK_ASSIGN,
        Permission.SPRINT_CREATE,
        Permission.SPRINT_MANAGE,
        Permission.ROADMAP_VIEW,
        Permission.ROADMAP_MANAGE,
        Permission.DOCUMENT_CREATE,
        Permission.DOCUMENT_DELETE,
        Permission.ANALYTICS_VIEW,
        Permission.WORKSPACE_MANAGE,
        Permission.MEMBER_INVITE,
        Permission.MEMBER_REMOVE,
        Permission.AI_USE,
        Permission.AI_EXECUTE,
    ],

    Role.PROJECT_MANAGER: [
        Permission.PROJECT_CREATE,
        Permission.PROJECT_UPDATE,
        Permission.PROJECT_VIEW,
        Permission.TASK_CREATE,
        Permission.TASK_UPDATE,
        Permission.TASK_DELETE,
        Permission.TASK_ASSIGN,
        Permission.SPRINT_CREATE,
        Permission.SPRINT_MANAGE,
        Permission.ROADMAP_VIEW,
        Permission.DOCUMENT_CREATE,
        Permission.ANALYTICS_VIEW,
        Permission.MEMBER_INVITE,
        Permission.AI_USE,
        Permission.AI_EXECUTE,
    ],

    Role.PRODUCT_MANAGER: [
        Permission.PROJECT_VIEW,
        Permission.TASK_CREATE,
        Permission.TASK_UPDATE,
        Permission.ROADMAP_VIEW,
        Permission.ROADMAP_MANAGE,
        Permission.DOCUMENT_CREATE,
        Permission.ANALYTICS_VIEW,
        Permission.AI_USE,
        Permission.AI_EXECUTE,
    ],

    Role.TEAM_LEAD: [
        Permission.PROJECT_VIEW,
        Permission.TASK_CREATE,
        Permission.TASK_UPDATE,
        Permission.TASK_ASSIGN,
        Permission.SPRINT_MANAGE,
        Permission.ROADMAP_VIEW,
        Permission.DOCUMENT_CREATE,
        Permission.ANALYTICS_VIEW,
        Permission.AI_USE,
    ],

    Role.MEMBER: [
        Permission.PROJECT_VIEW,
        Permission.TASK_CREATE,
        Permission.TASK_UPDATE,
        Permission.ROADMAP_VIEW,
        Permission.DOCUMENT_CREATE,
        Permission.AI_USE,
    ],

    Role.VIEWER: [
        Permission.PROJECT_VIEW,
        Permission.ROADMAP_VIEW,
        Permission.ANALYTICS_VIEW,
    ],
}


def has_permission(role: Role, permission: Permission) -> bool:
    return permission in ROLE_PERMISSIONS.get(role, [])


def get_permissions(role: Role) -> List[Permission]:
    return ROLE_PERMISSIONS.get(role, [])
