-- =============================================================================
-- AUTH SCHEMA — Users, Roles, Tokens
-- =============================================================================

-- ---------------------------------------------------------------------------
-- USERS TABLE
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS auth.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON auth.users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON auth.users(username);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON auth.users(is_active);

-- ---------------------------------------------------------------------------
-- ROLES TABLE
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS auth.roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert default roles
INSERT INTO auth.roles (name, description) VALUES
    ('OWNER',           'Full control over organization'),
    ('ADMIN',           'Full control over workspace'),
    ('PROJECT_MANAGER', 'Manage projects, tasks, sprints'),
    ('PRODUCT_MANAGER', 'Manage roadmap, PRDs, features'),
    ('TEAM_LEAD',       'Lead a team, manage assignments'),
    ('MEMBER',          'Regular team member'),
    ('VIEWER',          'Read-only access')
ON CONFLICT (name) DO NOTHING;

-- ---------------------------------------------------------------------------
-- PERMISSIONS TABLE
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS auth.permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO auth.permissions (name, description) VALUES
    ('PROJECT_CREATE',      'Create new projects'),
    ('PROJECT_UPDATE',      'Update project details'),
    ('PROJECT_DELETE',      'Delete projects'),
    ('PROJECT_VIEW',        'View project details'),
    ('TASK_CREATE',         'Create tasks'),
    ('TASK_UPDATE',         'Update tasks'),
    ('TASK_DELETE',         'Delete tasks'),
    ('TASK_ASSIGN',         'Assign tasks to users'),
    ('SPRINT_CREATE',       'Create sprints'),
    ('SPRINT_MANAGE',       'Manage sprint lifecycle'),
    ('ROADMAP_VIEW',        'View roadmap'),
    ('ROADMAP_MANAGE',      'Manage roadmap items'),
    ('DOCUMENT_CREATE',     'Create documents'),
    ('DOCUMENT_DELETE',     'Delete documents'),
    ('ANALYTICS_VIEW',      'View analytics'),
    ('WORKSPACE_MANAGE',    'Manage workspace settings'),
    ('MEMBER_INVITE',       'Invite members'),
    ('MEMBER_REMOVE',       'Remove members'),
    ('AI_USE',              'Use AI features'),
    ('AI_EXECUTE',          'AI can execute actions on behalf of user')
ON CONFLICT (name) DO NOTHING;

-- ---------------------------------------------------------------------------
-- ROLE PERMISSIONS (junction table)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS auth.role_permissions (
    role_id UUID NOT NULL REFERENCES auth.roles(id) ON DELETE CASCADE,
    permission_id UUID NOT NULL REFERENCES auth.permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- ---------------------------------------------------------------------------
-- REFRESH TOKENS TABLE
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS auth.refresh_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMPTZ NOT NULL,
    is_revoked BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    revoked_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON auth.refresh_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_token_hash ON auth.refresh_tokens(token_hash);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_expires_at ON auth.refresh_tokens(expires_at);

-- ---------------------------------------------------------------------------
-- UPDATED_AT TRIGGER FUNCTION
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON auth.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
