-- =============================================================================
-- DOCUMENT SCHEMA — Documents, Versions, Vector Embeddings (RAG)
-- =============================================================================

CREATE TYPE document.doc_type AS ENUM (
    'PRD',
    'MEETING_NOTES',
    'ARCHITECTURE',
    'DECISION_RECORD',
    'RELEASE_NOTES',
    'WIKI',
    'TECHNICAL',
    'GENERAL'
);

CREATE TYPE document.doc_status AS ENUM (
    'DRAFT',
    'PUBLISHED',
    'ARCHIVED'
);

-- ---------------------------------------------------------------------------
-- DOCUMENTS TABLE
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS document.documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL,
    project_id UUID,
    title VARCHAR(500) NOT NULL,
    content TEXT,
    doc_type document.doc_type NOT NULL DEFAULT 'GENERAL',
    status document.doc_status NOT NULL DEFAULT 'DRAFT',
    author_id UUID NOT NULL,
    last_edited_by UUID,
    is_pinned BOOLEAN DEFAULT FALSE,
    tags TEXT[] DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_documents_workspace_id ON document.documents(workspace_id);
CREATE INDEX IF NOT EXISTS idx_documents_project_id ON document.documents(project_id);
CREATE INDEX IF NOT EXISTS idx_documents_author_id ON document.documents(author_id);
CREATE INDEX IF NOT EXISTS idx_documents_doc_type ON document.documents(doc_type);
CREATE INDEX IF NOT EXISTS idx_documents_status ON document.documents(status);

-- ---------------------------------------------------------------------------
-- DOCUMENT VERSIONS TABLE
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS document.document_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID NOT NULL REFERENCES document.documents(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    content TEXT NOT NULL,
    edited_by UUID NOT NULL,
    change_summary TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(document_id, version_number)
);

CREATE INDEX IF NOT EXISTS idx_doc_versions_document_id ON document.document_versions(document_id);

-- ---------------------------------------------------------------------------
-- DOCUMENT CHUNKS TABLE (RAG)
-- Stores chunked text with vector embeddings for semantic search
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS document.document_chunks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID NOT NULL REFERENCES document.documents(id) ON DELETE CASCADE,
    workspace_id UUID NOT NULL,
    project_id UUID,
    chunk_index INTEGER NOT NULL,
    content TEXT NOT NULL,
    token_count INTEGER,
    embedding vector(1536),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chunks_document_id ON document.document_chunks(document_id);
CREATE INDEX IF NOT EXISTS idx_chunks_workspace_id ON document.document_chunks(workspace_id);
CREATE INDEX IF NOT EXISTS idx_chunks_project_id ON document.document_chunks(project_id);

-- Vector similarity search index (HNSW for fast approximate nearest neighbor)
CREATE INDEX IF NOT EXISTS idx_chunks_embedding ON document.document_chunks
    USING hnsw (embedding vector_cosine_ops)
    WITH (m = 16, ef_construction = 64);

-- Triggers
CREATE TRIGGER update_documents_updated_at
    BEFORE UPDATE ON document.documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
