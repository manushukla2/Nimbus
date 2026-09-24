from sqlalchemy.ext.asyncio import AsyncAttrs
from sqlalchemy.orm import DeclarativeBase
import uuid
from sqlalchemy import Column, DateTime, func
from sqlalchemy.dialects.postgresql import UUID


class Base(AsyncAttrs, DeclarativeBase):
    """
    Base class for all SQLAlchemy models.
    All models inherit from this.
    """
    pass


class TimestampMixin:
    """
    Adds created_at and updated_at to any model.
    """
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False
    )


class UUIDMixin:
    """
    Adds UUID primary key to any model.
    """
    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        nullable=False
    )
