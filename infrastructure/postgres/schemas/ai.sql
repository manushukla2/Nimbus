-- =============================================================================
-- AI SCHEMA — Conversations, Tool Executions, Approvals, Audit Logs
-- =============================================================================

-- ---------------------------------------------------------------------------
-- CONVERSATIONS TABLE
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ai.conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL,
    project_id UUID,
    user_id UUID NOT NULL,
    title VARCHAR(255),
    agent_type VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_conversations_workspace_id ON ai.conversations(workspace_id);
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON ai.conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_project_id ON ai.conversations(project_id);

-- ---------------------------------------------------------------------------
-- MESSAGES TABLE
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ai.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES ai.conversations(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL,
    content TEXT NOT NULL,
    agent_type VARCHAR(50),
    tokens_used INTEGER,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON ai.messages(conversation_id);

-- ---------------------------------------------------------------------------
-- TOOL EXECUTIONS TABLE (Audit every AI tool call)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ai.tool_executions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES ai.conversations(id) ON DELETE SET NULL,
    user_id UUID NOT NULL,
    workspace_id UUID NOT NULL,
    agent_type VARCHAR(50) NOT NULL,
    tool_name VARCHAR(100) NOT NULL,
    tool_arguments JSONB NOT NULL DEFAULT '{}',
    tool_result JSONB,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    risk_level VARCHAR(20) NOT NULL DEFAULT 'LOW',
    duration_ms INTEGER,
    error_message TEXT,
    executed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tool_executions_user_id ON ai.tool_executions(user_id);
CREATE INDEX IF NOT EXISTS idx_tool_executions_workspace_id ON ai.tool_executions(workspace_id);
CREATE INDEX IF NOT EXISTS idx_tool_executions_tool_name ON ai.tool_executions(tool_name);
CREATE INDEX IF NOT EXISTS idx_tool_executions_status ON ai.tool_executions(status);
CREATE INDEX IF NOT EXISTS idx_tool_executions_executed_at ON ai.tool_executions(executed_at);

-- ---------------------------------------------------------------------------
-- APPROVAL REQUESTS TABLE (Human-in-the-loop)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ai.approval_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES ai.conversations(id) ON DELETE SET NULL,
    user_id UUID NOT NULL,
    workspace_id UUID NOT NULL,
    agent_type VARCHAR(50) NOT NULL,
    tool_name VARCHAR(100) NOT NULL,
    tool_arguments JSONB NOT NULL DEFAULT '{}',
    risk_level VARCHAR(20) NOT NULL,
    reason TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    reviewed_by UUID,
    reviewed_at TIMESTAMPTZ,
    review_note TEXT,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_approval_requests_user_id ON ai.approval_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_approval_requests_status ON ai.approval_requests(status);
CREATE INDEX IF NOT EXISTS idx_approval_requests_workspace_id ON ai.approval_requests(workspace_id);

-- Triggers
CREATE TRIGGER update_conversations_updated_at
    BEFORE UPDATE ON ai.conversations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
