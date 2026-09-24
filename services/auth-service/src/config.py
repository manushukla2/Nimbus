from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import List


class Settings(BaseSettings):
    # -------------------------------------------------------------------------
    # SERVICE
    # -------------------------------------------------------------------------
    SERVICE_NAME: str = "auth-service"
    HOST: str = "0.0.0.0"
    PORT: int = 8001
    DEBUG: bool = False
    APP_ENV: str = "development"
    APP_VERSION: str = "0.1.0"

    # -------------------------------------------------------------------------
    # DATABASE
    # -------------------------------------------------------------------------
    DATABASE_URL: str
    DB_POOL_SIZE: int = 10
    DB_MAX_OVERFLOW: int = 20
    DB_POOL_TIMEOUT: int = 30
    DB_ECHO: bool = False

    # -------------------------------------------------------------------------
    # REDIS
    # -------------------------------------------------------------------------
    REDIS_URL: str = "redis://redis:6379/0"

    # -------------------------------------------------------------------------
    # JWT
    # -------------------------------------------------------------------------
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    JWT_REFRESH_TOKEN_EXPIRE_DAYS: int = 30

    # -------------------------------------------------------------------------
    # SECURITY
    # -------------------------------------------------------------------------
    BCRYPT_ROUNDS: int = 12
    SECRET_KEY: str = "change-this-secret"

    # -------------------------------------------------------------------------
    # CORS
    # -------------------------------------------------------------------------
    CORS_ORIGINS: List[str] = ["http://localhost:3000"]

    # -------------------------------------------------------------------------
    # LOGGING
    # -------------------------------------------------------------------------
    LOG_LEVEL: str = "INFO"
    LOG_FORMAT: str = "json"
    ENABLE_REQUEST_LOGGING: bool = True

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True
        extra = "ignore"


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
