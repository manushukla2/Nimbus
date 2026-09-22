-- =============================================================================
-- SPRINT SCHEMA
-- =============================================================================

CREATE TYPE sprint.sprint_status AS ENUM (
    'PLANNED',
    'ACTIVE',
    'COMPLETED',
    'CANCELLED'
);

-- ---------------------------------------------------------------------------
-- SPRINTS TABLE
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sprint.sprints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL,
    workspace_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    goal TEXT,
    status sprint.sprint_status NOT NULL DEFAULT 'PLANNED',
    start_date DATE,
    end_date DATE,
    completed_at TIMESTAMPTZ,
    velocity INTEGER DEFAULT 0,
    planned_points INTEGER DEFAULT 0,
    completed_points INTEGER DEFAULT 0,
    created_by UUID,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sprints_project_id ON sprint.sprints(project_id);
CREATE INDEX IF NOT EXISTS idx_sprints_workspace_id ON sprint.sprints(workspace_id);
CREATE INDEX IF NOT EXISTS idx_sprints_status ON sprint.sprints(status);

-- ---------------------------------------------------------------------------
-- SPRINT TASKS (which tasks are in this sprint)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sprint.sprint_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sprint_id UUID NOT NULL REFERENCES sprint.sprints(id) ON DELETE CASCADE,
    task_id UUID NOT NULL,
    added_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    added_by UUID,
    UNIQUE(sprint_id, task_id)
);

CREATE INDEX IF NOT EXISTS idx_sprint_tasks_sprint_id ON sprint.sprint_tasks(sprint_id);
CREATE INDEX IF NOT EXISTS idx_sprint_tasks_task_id ON sprint.sprint_tasks(task_id);

-- ---------------------------------------------------------------------------
-- SPRINT METRICS SNAPSHOTS
-- Daily snapshots for burndown chart
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sprint.sprint_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sprint_id UUID NOT NULL REFERENCES sprint.sprints(id) ON DELETE CASCADE,
    recorded_date DATE NOT NULL,
    total_tasks INTEGER DEFAULT 0,
    completed_tasks INTEGER DEFAULT 0,
    remaining_tasks INTEGER DEFAULT 0,
    blocked_tasks INTEGER DEFAULT 0,
    added_tasks INTEGER DEFAULT 0,
    removed_tasks INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(sprint_id, recorded_date)
);

CREATE INDEX IF NOT EXISTS idx_sprint_metrics_sprint_id ON sprint.sprint_metrics(sprint_id);
CREATE INDEX IF NOT EXISTS idx_sprint_metrics_recorded_date ON sprint.sprint_metrics(recorded_date);

-- Triggers
CREATE TRIGGER update_sprints_updated_at
    BEFORE UPDATE ON sprint.sprints
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
