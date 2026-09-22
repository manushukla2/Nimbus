-- =============================================================================
-- PROJECT SCHEMA — Projects, Members, Health
-- =============================================================================

CREATE TYPE project.project_status AS ENUM (
    'PLANNING',
    'ACTIVE',
    'AT_RISK',
    'BLOCKED',
    'COMPLETED',
    'ARCHIVED'
);

CREATE TYPE project.project_health AS ENUM (
    'HEALTHY',
    'AT_RISK',
    'BLOCKED',
    'UNKNOWN'
);

-- ---------------------------------------------------------------------------
-- PROJECTS TABLE
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS project.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    key VARCHAR(10) NOT NULL,
    description TEXT,
    owner_id UUID NOT NULL,
    status project.project_status NOT NULL DEFAULT 'PLANNING',
    health project.project_health NOT NULL DEFAULT 'UNKNOWN',
    health_score INTEGER,
    start_date DATE,
    target_date DATE,
    completed_at TIMESTAMPTZ,
    cover_color VARCHAR(20) DEFAULT '#6366f1',
    settings JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(workspace_id, key)
);

CREATE INDEX IF NOT EXISTS idx_projects_workspace_id ON project.projects(workspace_id);
CREATE INDEX IF NOT EXISTS idx_projects_owner_id ON project.projects(owner_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON project.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_health ON project.projects(health);

-- ---------------------------------------------------------------------------
-- PROJECT MEMBERS TABLE
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS project.project_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES project.projects(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    role_name VARCHAR(50) NOT NULL DEFAULT 'MEMBER',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(project_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_project_members_project_id ON project.project_members(project_id);
CREATE INDEX IF NOT EXISTS idx_project_members_user_id ON project.project_members(user_id);

-- ---------------------------------------------------------------------------
-- PROJECT RISKS TABLE
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS project.project_risks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES project.projects(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    severity VARCHAR(20) NOT NULL DEFAULT 'MEDIUM',
    status VARCHAR(20) NOT NULL DEFAULT 'OPEN',
    identified_by UUID,
    identified_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_project_risks_project_id ON project.project_risks(project_id);
CREATE INDEX IF NOT EXISTS idx_project_risks_severity ON project.project_risks(severity);
CREATE INDEX IF NOT EXISTS idx_project_risks_status ON project.project_risks(status);

-- ---------------------------------------------------------------------------
-- PROJECT HEALTH HISTORY TABLE
-- Stores historical health snapshots for trend analysis
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS project.project_health_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES project.projects(id) ON DELETE CASCADE,
    health project.project_health NOT NULL,
    health_score INTEGER,
    overdue_count INTEGER DEFAULT 0,
    blocked_count INTEGER DEFAULT 0,
    completion_percentage NUMERIC(5,2) DEFAULT 0,
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_health_history_project_id ON project.project_health_history(project_id);
CREATE INDEX IF NOT EXISTS idx_health_history_recorded_at ON project.project_health_history(recorded_at);

-- Triggers
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON project.projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
