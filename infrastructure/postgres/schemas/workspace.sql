-- =============================================================================
-- WORKSPACE SCHEMA — Organizations, Workspaces, Teams, Members
-- =============================================================================

-- ---------------------------------------------------------------------------
-- ORGANIZATIONS TABLE
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS workspace.organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    logo_url TEXT,
    owner_id UUID NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_organizations_slug ON workspace.organizations(slug);
CREATE INDEX IF NOT EXISTS idx_organizations_owner_id ON workspace.organizations(owner_id);

-- ---------------------------------------------------------------------------
-- WORKSPACES TABLE
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS workspace.workspaces (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES workspace.organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    description TEXT,
    logo_url TEXT,
    owner_id UUID NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    settings JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(organization_id, slug)
);

CREATE INDEX IF NOT EXISTS idx_workspaces_organization_id ON workspace.workspaces(organization_id);
CREATE INDEX IF NOT EXISTS idx_workspaces_owner_id ON workspace.workspaces(owner_id);
CREATE INDEX IF NOT EXISTS idx_workspaces_slug ON workspace.workspaces(slug);

-- ---------------------------------------------------------------------------
-- TEAMS TABLE
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS workspace.teams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES workspace.workspaces(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    lead_id UUID,
    color VARCHAR(20),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_teams_workspace_id ON workspace.teams(workspace_id);

-- ---------------------------------------------------------------------------
-- WORKSPACE MEMBERS TABLE
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS workspace.workspace_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES workspace.workspaces(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    role_name VARCHAR(50) NOT NULL DEFAULT 'MEMBER',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(workspace_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_workspace_members_workspace_id ON workspace.workspace_members(workspace_id);
CREATE INDEX IF NOT EXISTS idx_workspace_members_user_id ON workspace.workspace_members(user_id);

-- ---------------------------------------------------------------------------
-- TEAM MEMBERS TABLE
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS workspace.team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    team_id UUID NOT NULL REFERENCES workspace.teams(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    role_name VARCHAR(50) NOT NULL DEFAULT 'MEMBER',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(team_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_team_members_team_id ON workspace.team_members(team_id);
CREATE INDEX IF NOT EXISTS idx_team_members_user_id ON workspace.team_members(user_id);

-- ---------------------------------------------------------------------------
-- INVITATIONS TABLE
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS workspace.invitations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES workspace.workspaces(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    role_name VARCHAR(50) NOT NULL DEFAULT 'MEMBER',
    invited_by UUID NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    expires_at TIMESTAMPTZ NOT NULL,
    accepted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_invitations_workspace_id ON workspace.invitations(workspace_id);
CREATE INDEX IF NOT EXISTS idx_invitations_email ON workspace.invitations(email);
CREATE INDEX IF NOT EXISTS idx_invitations_token ON workspace.invitations(token);

-- Triggers
CREATE TRIGGER update_organizations_updated_at
    BEFORE UPDATE ON workspace.organizations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workspaces_updated_at
    BEFORE UPDATE ON workspace.workspaces
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teams_updated_at
    BEFORE UPDATE ON workspace.teams
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
