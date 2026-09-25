from sqlalchemy.ext.asyncio import AsyncSession
from typing import Tuple
import hashlib
import secrets
from datetime import datetime, timedelta, timezone

from src.repositories.user_repository import UserRepository, RefreshTokenRepository
from src.core.hashing import hash_password, verify_password
from src.core.jwt import create_access_token, create_refresh_token, decode_token
from src.schemas.auth import RegisterRequest, LoginRequest, TokenResponse, RegisterResponse
from src.schemas.auth import UserResponse
from src.config import settings


class AuthService:

    def __init__(self, db: AsyncSession):
        self.db = db
        self.user_repo = UserRepository(db)
        self.token_repo = RefreshTokenRepository(db)

    async def register(self, data: RegisterRequest) -> RegisterResponse:

        # Check duplicates
        if await self.user_repo.email_exists(data.email):
            raise ValueError("Email already registered")

        if await self.user_repo.username_exists(data.username):
            raise ValueError("Username already taken")

        # Create user
        hashed = hash_password(data.password)
        user = await self.user_repo.create(
            email=data.email,
            username=data.username,
            full_name=data.full_name,
            hashed_password=hashed
        )

        # Generate tokens
        access_token, refresh_token = await self._generate_tokens(str(user.id))

        return RegisterResponse(
            user=UserResponse.model_validate(user),
            access_token=access_token,
            refresh_token=refresh_token,
            expires_in=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES * 60
        )

    async def login(self, data: LoginRequest) -> TokenResponse:

        # Find user
        user = await self.user_repo.get_by_email(data.email)
        if not user:
            raise ValueError("Invalid email or password")

        # Verify password
        if not verify_password(data.password, user.hashed_password):
            raise ValueError("Invalid email or password")

        # Check active
        if not user.is_active:
            raise ValueError("Account is disabled")

        # Update last login
        await self.user_repo.update_last_login(user.id)

        # Generate tokens
        access_token, refresh_token = await self._generate_tokens(str(user.id))

        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            expires_in=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES * 60
        )

    async def refresh(self, refresh_token: str) -> TokenResponse:

        # Decode token
        try:
            payload = decode_token(refresh_token)
        except ValueError as e:
            raise ValueError(str(e))

        # Check token type
        if payload.get("type") != "refresh":
            raise ValueError("Invalid token type")

        # Check in database
        token_hash = self._hash_token(refresh_token)
        stored_token = await self.token_repo.get_by_hash(token_hash)
        if not stored_token:
            raise ValueError("Token revoked or not found")

        # Check expiry
        if stored_token.expires_at < datetime.now(timezone.utc):
            raise ValueError("Refresh token expired")

        # Revoke old token
        await self.token_repo.revoke(token_hash)

        # Issue new tokens
        user_id = payload.get("sub")
        access_token, new_refresh_token = await self._generate_tokens(user_id)

        return TokenResponse(
            access_token=access_token,
            refresh_token=new_refresh_token,
            expires_in=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES * 60
        )

    async def logout(self, refresh_token: str) -> None:
        token_hash = self._hash_token(refresh_token)
        await self.token_repo.revoke(token_hash)

    async def logout_all(self, user_id: str) -> None:
        await self.token_repo.revoke_all_for_user(user_id)

    async def _generate_tokens(self, user_id: str) -> Tuple[str, str]:

        # Create JWT tokens
        access_token = create_access_token({"sub": user_id})
        refresh_token = create_refresh_token({"sub": user_id})

        # Store refresh token hash in DB
        token_hash = self._hash_token(refresh_token)
        expires_at = datetime.now(timezone.utc) + timedelta(
            days=settings.JWT_REFRESH_TOKEN_EXPIRE_DAYS
        )
        await self.token_repo.create(
            user_id=user_id,
            token_hash=token_hash,
            expires_at=expires_at
        )

        return access_token, refresh_token

    def _hash_token(self, token: str) -> str:
        return hashlib.sha256(token.encode()).hexdigest()
