-- =============================================================================
-- TASK SCHEMA — Tasks, Comments, Dependencies, Activity
-- =============================================================================

CREATE TYPE task.task_type AS ENUM (
    'TASK',
    'EPIC',
    'STORY',
    'BUG',
    'SUBTASK'
);

CREATE TYPE task.task_status AS ENUM (
    'BACKLOG',
    'TODO',
    'IN_PROGRESS',
    'IN_REVIEW',
    'BLOCKED',
    'DONE',
    'CANCELLED'
);

CREATE TYPE task.task_priority AS ENUM (
    'LOW',
    'MEDIUM',
    'HIGH',
    'URGENT'
);

CREATE TYPE task.dependency_type AS ENUM (
    'BLOCKS',
    'BLOCKED_BY',
    'RELATES_TO',
    'DUPLICATES'
);

-- ---------------------------------------------------------------------------
-- TASKS TABLE
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS task.tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL,
    workspace_id UUID NOT NULL,
    parent_id UUID REFERENCES task.tasks(id) ON DELETE SET NULL,
    sprint_id UUID,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    task_type task.task_type NOT NULL DEFAULT 'TASK',
    status task.task_status NOT NULL DEFAULT 'BACKLOG',
    priority task.task_priority NOT NULL DEFAULT 'MEDIUM',
    assignee_id UUID,
    reporter_id UUID,
    due_date DATE,
    start_date DATE,
    completed_at TIMESTAMPTZ,
    estimate INTEGER,
    time_spent INTEGER DEFAULT 0,
    labels TEXT[] DEFAULT '{}',
    position NUMERIC DEFAULT 0,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON task.tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_workspace_id ON task.tasks(workspace_id);
CREATE INDEX IF NOT EXISTS idx_tasks_assignee_id ON task.tasks(assignee_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON task.tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON task.tasks(priority);
CREATE INDEX IF NOT EXISTS idx_tasks_sprint_id ON task.tasks(sprint_id);
CREATE INDEX IF NOT EXISTS idx_tasks_parent_id ON task.tasks(parent_id);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON task.tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_task_type ON task.tasks(task_type);

-- ---------------------------------------------------------------------------
-- TASK COMMENTS TABLE
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS task.comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id UUID NOT NULL REFERENCES task.tasks(id) ON DELETE CASCADE,
    author_id UUID NOT NULL,
    content TEXT NOT NULL,
    is_edited BOOLEAN DEFAULT FALSE,
    edited_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_comments_task_id ON task.comments(task_id);
CREATE INDEX IF NOT EXISTS idx_comments_author_id ON task.comments(author_id);

-- ---------------------------------------------------------------------------
-- TASK DEPENDENCIES TABLE
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS task.dependencies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id UUID NOT NULL REFERENCES task.tasks(id) ON DELETE CASCADE,
    depends_on_id UUID NOT NULL REFERENCES task.tasks(id) ON DELETE CASCADE,
    dependency_type task.dependency_type NOT NULL,
    created_by UUID,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(task_id, depends_on_id, dependency_type)
);

CREATE INDEX IF NOT EXISTS idx_dependencies_task_id ON task.dependencies(task_id);
CREATE INDEX IF NOT EXISTS idx_dependencies_depends_on_id ON task.dependencies(depends_on_id);

-- ---------------------------------------------------------------------------
-- TASK ACTIVITY TABLE
-- Immutable log of all changes to a task
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS task.activity (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id UUID NOT NULL REFERENCES task.tasks(id) ON DELETE CASCADE,
    actor_id UUID NOT NULL,
    action VARCHAR(100) NOT NULL,
    field VARCHAR(100),
    old_value TEXT,
    new_value TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activity_task_id ON task.activity(task_id);
CREATE INDEX IF NOT EXISTS idx_activity_actor_id ON task.activity(actor_id);
CREATE INDEX IF NOT EXISTS idx_activity_created_at ON task.activity(created_at);

-- Triggers
CREATE TRIGGER update_tasks_updated_at
    BEFORE UPDATE ON task.tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at
    BEFORE UPDATE ON task.comments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
