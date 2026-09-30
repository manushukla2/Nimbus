-- =============================================================================
-- NIMBUS — DEV SEED
-- Creates one organization, one workspace and one membership for the dev user.
-- Safe to run more than once (every insert uses ON CONFLICT DO NOTHING).
-- =============================================================================

-- 1) Organization owned by the dev user
INSERT INTO workspace.organizations (name, slug, owner_id)
SELECT 'Acme Technologies', 'acme-technologies', u.id
FROM auth.users u
WHERE u.email = 'manushukla0210@gmail.com'
ON CONFLICT (slug) DO NOTHING;

-- 2) Workspace inside that organization
INSERT INTO workspace.workspaces (organization_id, name, slug, owner_id)
SELECT o.id, 'Acme Technologies', 'main', o.owner_id
FROM workspace.organizations o
WHERE o.slug = 'acme-technologies'
ON CONFLICT (organization_id, slug) DO NOTHING;

-- 3) Make the owner a member of the workspace
INSERT INTO workspace.workspace_members (workspace_id, user_id, role_name)
SELECT w.id, w.owner_id, 'OWNER'
FROM workspace.workspaces w
JOIN workspace.organizations o ON o.id = w.organization_id
WHERE o.slug = 'acme-technologies' AND w.slug = 'main'
ON CONFLICT (workspace_id, user_id) DO NOTHING;