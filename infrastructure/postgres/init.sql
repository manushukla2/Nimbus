-- =============================================================================
-- NIMBUS — POSTGRESQL INITIALIZATION
-- This file runs automatically when the postgres container starts for the first time
-- =============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "vector";

-- =============================================================================
-- CREATE SCHEMAS (one per domain/service)
-- =============================================================================

CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS workspace;
CREATE SCHEMA IF NOT EXISTS project;
CREATE SCHEMA IF NOT EXISTS task;
CREATE SCHEMA IF NOT EXISTS sprint;
CREATE SCHEMA IF NOT EXISTS roadmap;
CREATE SCHEMA IF NOT EXISTS document;
CREATE SCHEMA IF NOT EXISTS analytics;
CREATE SCHEMA IF NOT EXISTS notification;
CREATE SCHEMA IF NOT EXISTS ai;
CREATE SCHEMA IF NOT EXISTS audit;

-- =============================================================================
-- GRANT PERMISSIONS
-- =============================================================================

GRANT ALL PRIVILEGES ON SCHEMA auth TO nimbus;
GRANT ALL PRIVILEGES ON SCHEMA workspace TO nimbus;
GRANT ALL PRIVILEGES ON SCHEMA project TO nimbus;
GRANT ALL PRIVILEGES ON SCHEMA task TO nimbus;
GRANT ALL PRIVILEGES ON SCHEMA sprint TO nimbus;
GRANT ALL PRIVILEGES ON SCHEMA roadmap TO nimbus;
GRANT ALL PRIVILEGES ON SCHEMA document TO nimbus;
GRANT ALL PRIVILEGES ON SCHEMA analytics TO nimbus;
GRANT ALL PRIVILEGES ON SCHEMA notification TO nimbus;
GRANT ALL PRIVILEGES ON SCHEMA ai TO nimbus;
GRANT ALL PRIVILEGES ON SCHEMA audit TO nimbus;

-- =============================================================================
-- SET DEFAULT SEARCH PATH
-- =============================================================================

ALTER USER nimbus SET search_path TO public, auth, workspace, project, task, sprint, roadmap, document, analytics, notification, ai, audit;
