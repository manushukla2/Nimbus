-- =============================================================================
-- ANALYTICS SCHEMA — Metrics, Snapshots, Reports
-- =============================================================================

-- ---------------------------------------------------------------------------
-- PROJECT METRICS SNAPSHOTS
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS analytics.project_snapshots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL,
    workspace_id UUID NOT NULL,
    total_tasks INTEGER DEFAULT 0,
    completed_tasks INTEGER DEFAULT 0,
    in_progress_tasks INTEGER DEFAULT 0,
    blocked_tasks INTEGER DEFAULT 0,
    overdue_tasks INTEGER DEFAULT 0,
    unassigned_tasks INTEGER DEFAULT 0,
    completion_percentage NUMERIC(5,2) DEFAULT 0,
    health_score INTEGER DEFAULT 0,
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_project_snapshots_project_id ON analytics.project_snapshots(project_id);
CREATE INDEX IF NOT EXISTS idx_project_snapshots_recorded_at ON analytics.project_snapshots(recorded_at);

-- ---------------------------------------------------------------------------
-- TEAM WORKLOAD TABLE
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS analytics.team_workload (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL,
    user_id UUID NOT NULL,
    assigned_tasks INTEGER DEFAULT 0,
    overdue_tasks INTEGER DEFAULT 0,
    in_progress_tasks INTEGER DEFAULT 0,
    completed_this_week INTEGER DEFAULT 0,
    workload_score NUMERIC(5,2) DEFAULT 0,
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_team_workload_workspace_id ON analytics.team_workload(workspace_id);
CREATE INDEX IF NOT EXISTS idx_team_workload_user_id ON analytics.team_workload(user_id);
CREATE INDEX IF NOT EXISTS idx_team_workload_recorded_at ON analytics.team_workload(recorded_at);

-- ---------------------------------------------------------------------------
-- VELOCITY HISTORY TABLE
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS analytics.velocity_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL,
    sprint_id UUID NOT NULL,
    planned_points INTEGER DEFAULT 0,
    completed_points INTEGER DEFAULT 0,
    spillover_points INTEGER DEFAULT 0,
    velocity NUMERIC(8,2) DEFAULT 0,
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_velocity_history_project_id ON analytics.velocity_history(project_id);
CREATE INDEX IF NOT EXISTS idx_velocity_history_sprint_id ON analytics.velocity_history(sprint_id);
