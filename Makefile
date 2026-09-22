# =============================================================================
# NIMBUS — MAKEFILE
# Shortcuts to manage the entire platform
# Usage: make <command>
# =============================================================================

.PHONY: help up down restart logs ps clean seed migrate test lint format

# Default target
help:
    @echo ""
    @echo "Nimbus — Available Commands"
    @echo "=============================="
    @echo ""
    @echo "  PLATFORM"
    @echo "  make up          Start entire platform"
    @echo "  make down        Stop entire platform"
    @echo "  make restart     Restart entire platform"
    @echo "  make build       Rebuild all Docker images"
    @echo "  make ps          Show running containers"
    @echo "  make logs        Stream all logs"
    @echo ""
    @echo "  DATABASE"
    @echo "  make migrate     Run all migrations"
    @echo "  make seed        Seed demo data"
    @echo "  make db-reset    Reset database (WARNING: destroys data)"
    @echo "  make db-shell    Open PostgreSQL shell"
    @echo ""
    @echo "  DEVELOPMENT"
    @echo "  make dev         Start in development mode"
    @echo "  make web         Start only frontend"
    @echo "  make services    Start only backend services"
    @echo ""
    @echo "  INDIVIDUAL SERVICES"
    @echo "  make auth        Start auth service only"
    @echo "  make gateway     Start api gateway only"
    @echo "  make agent       Start agent service only"
    @echo "  make ai          Start ai gateway only"
    @echo ""
    @echo "  LOGS"
    @echo "  make logs-auth   Logs for auth service"
    @echo "  make logs-agent  Logs for agent service"
    @echo "  make logs-ai     Logs for ai gateway"
    @echo "  make logs-db     Logs for postgres"
    @echo ""
    @echo "  TESTING"
    @echo "  make test        Run all tests"
    @echo "  make test-auth   Run auth service tests"
    @echo "  make test-agent  Run agent service tests"
    @echo "  make test-e2e    Run end-to-end tests"
    @echo ""
    @echo "  CLEANUP"
    @echo "  make clean       Remove containers and images"
    @echo "  make clean-all   Remove everything including volumes"
    @echo ""

# =============================================================================
# PLATFORM
# =============================================================================

up:
    @echo "Starting Nimbus platform..."
    docker compose up -d
    @echo ""
    @echo "Nimbus is running"
    @echo "  Frontend:    http://localhost:3000"
    @echo "  API Gateway: http://localhost:8000"
    @echo "  API Docs:    http://localhost:8000/docs"
    @echo ""

down:
    @echo "Stopping Nimbus platform..."
    docker compose down

restart:
    @echo "Restarting Nimbus platform..."
    docker compose down
    docker compose up -d

build:
    @echo "Building all Docker images..."
    docker compose build --no-cache

ps:
    docker compose ps

logs:
    docker compose logs -f

# =============================================================================
# DATABASE
# =============================================================================

migrate:
    @echo "Running migrations for all services..."
    docker compose exec auth-service alembic upgrade head
    docker compose exec workspace-service alembic upgrade head
    docker compose exec project-service alembic upgrade head
    docker compose exec task-service alembic upgrade head
    docker compose exec sprint-service alembic upgrade head
    docker compose exec roadmap-service alembic upgrade head
    docker compose exec document-service alembic upgrade head
    docker compose exec analytics-service alembic upgrade head
    docker compose exec notification-service alembic upgrade head
    docker compose exec agent-service alembic upgrade head
    @echo "All migrations complete"

seed:
    @echo "Seeding demo data..."
    docker compose exec auth-service python /app/scripts/seed.py
    @echo "Demo data seeded"

db-reset:
    @echo "WARNING: This will destroy all data"
    @read -p "Are you sure? [y/N] " confirm && [ "$$confirm" = "y" ]
    docker compose down -v
    docker compose up -d postgres redis
    @echo "Waiting for postgres..."
    sleep 5
    $(MAKE) migrate
    $(MAKE) seed
    @echo "Database reset complete"

db-shell:
    docker compose exec postgres psql -U ${POSTGRES_USER} -d ${POSTGRES_DB}

redis-shell:
    docker compose exec redis redis-cli

# =============================================================================
# DEVELOPMENT
# =============================================================================

dev:
    @echo "Starting in development mode..."
    docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d

web:
    @echo "Starting frontend only..."
    cd apps/web && npm run dev

services:
    @echo "Starting backend services only..."
    docker compose up -d postgres redis api-gateway auth-service workspace-service project-service task-service sprint-service roadmap-service document-service analytics-service notification-service ai-gateway agent-service

infra:
    @echo "Starting infrastructure only (postgres + redis)..."
    docker compose up -d postgres redis

# =============================================================================
# INDIVIDUAL SERVICES
# =============================================================================

gateway:
    docker compose up -d api-gateway

auth:
    docker compose up -d auth-service

workspace:
    docker compose up -d workspace-service

project:
    docker compose up -d project-service

task:
    docker compose up -d task-service

sprint:
    docker compose up -d sprint-service

roadmap:
    docker compose up -d roadmap-service

document:
    docker compose up -d document-service

analytics:
    docker compose up -d analytics-service

notification:
    docker compose up -d notification-service

ai:
    docker compose up -d ai-gateway

agent:
    docker compose up -d agent-service

# =============================================================================
# LOGS
# =============================================================================

logs-gateway:
    docker compose logs -f api-gateway

logs-auth:
    docker compose logs -f auth-service

logs-workspace:
    docker compose logs -f workspace-service

logs-project:
    docker compose logs -f project-service

logs-task:
    docker compose logs -f task-service

logs-agent:
    docker compose logs -f agent-service

logs-ai:
    docker compose logs -f ai-gateway

logs-db:
    docker compose logs -f postgres

logs-redis:
    docker compose logs -f redis

logs-web:
    docker compose logs -f web

# =============================================================================
# TESTING
# =============================================================================

test:
    @echo "Running all tests..."
    $(MAKE) test-auth
    $(MAKE) test-task
    $(MAKE) test-agent
    @echo "All tests complete"

test-auth:
    @echo "Running auth service tests..."
    docker compose exec auth-service pytest tests/ -v

test-workspace:
    @echo "Running workspace service tests..."
    docker compose exec workspace-service pytest tests/ -v

test-project:
    @echo "Running project service tests..."
    docker compose exec project-service pytest tests/ -v

test-task:
    @echo "Running task service tests..."
    docker compose exec task-service pytest tests/ -v

test-agent:
    @echo "Running agent service tests..."
    docker compose exec agent-service pytest tests/ -v --mock-llm

test-e2e:
    @echo "Running end-to-end tests..."
    docker compose exec agent-service pytest tests/e2e/ -v

test-coverage:
    @echo "Running tests with coverage..."
    docker compose exec auth-service pytest tests/ --cov=src --cov-report=html
    docker compose exec task-service pytest tests/ --cov=src --cov-report=html

# =============================================================================
# CODE QUALITY
# =============================================================================

lint:
    @echo "Linting all Python services..."
    docker compose exec auth-service ruff check src/
    docker compose exec task-service ruff check src/
    docker compose exec agent-service ruff check src/

format:
    @echo "Formatting all Python services..."
    docker compose exec auth-service ruff format src/
    docker compose exec task-service ruff format src/
    docker compose exec agent-service ruff format src/

typecheck:
    @echo "Type checking frontend..."
    cd apps/web && npx tsc --noEmit

# =============================================================================
# HEALTH CHECKS
# =============================================================================

health:
    @echo "Checking health of all services..."
    @curl -sf http://localhost:8000/health && echo "  API Gateway:    OK" || echo "  API Gateway:    FAIL"
    @curl -sf http://localhost:8001/health && echo "  Auth Service:   OK" || echo "  Auth Service:   FAIL"
    @curl -sf http://localhost:8002/health && echo "  Workspace:      OK" || echo "  Workspace:      FAIL"
    @curl -sf http://localhost:8003/health && echo "  Project:        OK" || echo "  Project:        FAIL"
    @curl -sf http://localhost:8004/health && echo "  Task:           OK" || echo "  Task:           FAIL"
    @curl -sf http://localhost:8005/health && echo "  Sprint:         OK" || echo "  Sprint:         FAIL"
    @curl -sf http://localhost:8006/health && echo "  Roadmap:        OK" || echo "  Roadmap:        FAIL"
    @curl -sf http://localhost:8007/health && echo "  Document:       OK" || echo "  Document:       FAIL"
    @curl -sf http://localhost:8008/health && echo "  Analytics:      OK" || echo "  Analytics:      FAIL"
    @curl -sf http://localhost:8009/health && echo "  Notification:   OK" || echo "  Notification:   FAIL"
    @curl -sf http://localhost:8010/health && echo "  AI Gateway:     OK" || echo "  AI Gateway:     FAIL"
    @curl -sf http://localhost:8011/health && echo "  Agent:          OK" || echo "  Agent:          FAIL"

# =============================================================================
# CLEANUP
# =============================================================================

clean:
    @echo "Removing containers and images..."
    docker compose down --rmi local

clean-all:
    @echo "WARNING: Removing everything including volumes and data"
    docker compose down -v --rmi local
    docker system prune -f

# =============================================================================
# SETUP (First time)
# =============================================================================

setup:
    @echo "First time setup for Nimbus..."
    @test -f .env || (cp .env.example .env && echo ".env created from .env.example — please fill in your API keys")
    @echo "Installing frontend dependencies..."
    cd apps/web && npm install
    @echo "Building Docker images..."
    docker compose build
    @echo "Starting infrastructure..."
    docker compose up -d postgres redis
    @echo "Waiting for database to be ready..."
    sleep 8
    @echo "Running migrations..."
    $(MAKE) migrate
    @echo "Seeding demo data..."
    $(MAKE) seed
    @echo ""
    @echo "Setup complete. Run: make up"
    @echo ""
