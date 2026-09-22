-- =============================================================================
-- NOTIFICATION SCHEMA
-- =============================================================================

CREATE TYPE notification.notification_type AS ENUM (
    'TASK_ASSIGNED',
    'TASK_MENTIONED',
    'TASK_COMMENTED',
    'TASK_STATUS_CHANGED',
    'TASK_DUE_SOON',
    'TASK_OVERDUE',
    'SPRINT_STARTED',
    'SPRINT_COMPLETED',
    'PROJECT_RISK',
    'AI_ACTION',
    'AI_APPROVAL_REQUEST',
    'MEMBER_INVITED',
    'GENERAL'
);

CREATE TABLE IF NOT EXISTS notification.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL,
    user_id UUID NOT NULL,
    type notification.notification_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    actor_id UUID,
    resource_type VARCHAR(50),
    resource_id UUID,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notification.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_workspace_id ON notification.notifications(workspace_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notification.notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notification.notifications(created_at);
