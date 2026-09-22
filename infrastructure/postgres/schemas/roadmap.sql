-- =============================================================================
-- ROADMAP SCHEMA — Goals, Initiatives, Features, Milestones
-- =============================================================================

CREATE TYPE roadmap.item_status AS ENUM (
    'PLANNED',
    'IN_PROGRESS',
    'COMPLETED',
    'CANCELLED',
    'ON_HOLD'
);

CREATE TYPE roadmap.item_priority AS ENUM (
    'LOW',
    'MEDIUM',
    'HIGH',
    'CRITICAL'
);

-- ---------------------------------------------------------------------------
-- GOALS TABLE
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS roadmap.goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL,
    project_id UUID,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status roadmap.item_status NOT NULL DEFAULT 'PLANNED',
    priority roadmap.item_priority NOT NULL DEFAULT 'MEDIUM',
    owner_id UUID,
    start_date DATE,
    target_date DATE,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_goals_workspace_id ON roadmap.goals(workspace_id);
CREATE INDEX IF NOT EXISTS idx_goals_project_id ON roadmap.goals(project_id);

-- ---------------------------------------------------------------------------
-- INITIATIVES TABLE
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS roadmap.initiatives (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    goal_id UUID REFERENCES roadmap.goals(id) ON DELETE SET NULL,
    workspace_id UUID NOT NULL,
    project_id UUID,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status roadmap.item_status NOT NULL DEFAULT 'PLANNED',
    priority roadmap.item_priority NOT NULL DEFAULT 'MEDIUM',
    owner_id UUID,
    start_date DATE,
    target_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_initiatives_goal_id ON roadmap.initiatives(goal_id);
CREATE INDEX IF NOT EXISTS idx_initiatives_workspace_id ON roadmap.initiatives(workspace_id);

-- ---------------------------------------------------------------------------
-- FEATURES TABLE
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS roadmap.features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    initiative_id UUID REFERENCES roadmap.initiatives(id) ON DELETE SET NULL,
    workspace_id UUID NOT NULL,
    project_id UUID,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status roadmap.item_status NOT NULL DEFAULT 'PLANNED',
    priority roadmap.item_priority NOT NULL DEFAULT 'MEDIUM',
    owner_id UUID,
    start_date DATE,
    target_date DATE,
    release_version VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_features_initiative_id ON roadmap.features(initiative_id);
CREATE INDEX IF NOT EXISTS idx_features_workspace_id ON roadmap.features(workspace_id);
CREATE INDEX IF NOT EXISTS idx_features_project_id ON roadmap.features(project_id);

-- ---------------------------------------------------------------------------
-- MILESTONES TABLE
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS roadmap.milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL,
    workspace_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status roadmap.item_status NOT NULL DEFAULT 'PLANNED',
    target_date DATE NOT NULL,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_milestones_project_id ON roadmap.milestones(project_id);
CREATE INDEX IF NOT EXISTS idx_milestones_target_date ON roadmap.milestones(target_date);

-- Triggers
CREATE TRIGGER update_goals_updated_at
    BEFORE UPDATE ON roadmap.goals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_initiatives_updated_at
    BEFORE UPDATE ON roadmap.initiatives
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_features_updated_at
    BEFORE UPDATE ON roadmap.features
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
