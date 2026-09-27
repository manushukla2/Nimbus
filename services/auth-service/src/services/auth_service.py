from sqlalchemy.ext.asyncio import AsyncSession
from typing import Tuple
import hashlib
from datetime import datetime, timedelta, timezone

from src.repositories.user_repository import UserRepository, RefreshTokenRepository
from src.core.hashing import hash_password, verify_password
from src.core.jwt import create_access_token, create_refresh_token, decode_token
from src.schemas.auth import RegisterRequest, LoginRequest, TokenResponse, RegisterResponse
from src.schemas.auth import UserResponse
from src.config import settings
from src.services.email_service import EmailService
from src.services.otp_service import OTPService


class AuthService:

    def __init__(self, db: AsyncSession):
        self.db = db
        self.user_repo = UserRepository(db)
        self.token_repo = RefreshTokenRepository(db)
        self.email_service = EmailService()
        self.otp_service = OTPService()

    async def register(self, data: RegisterRequest) -> RegisterResponse:
        if await self.user_repo.email_exists(data.email):
            raise ValueError('Email already registered')
        if await self.user_repo.username_exists(data.username):
            raise ValueError('Username already taken')
        hashed = hash_password(data.password)
        user = await self.user_repo.create(
            email=data.email,
            username=data.username,
            full_name=data.full_name,
            hashed_password=hashed
        )
        access_token, refresh_token = await self._generate_tokens(str(user.id))
        return RegisterResponse(
            user=UserResponse.model_validate(user),
            access_token=access_token,
            refresh_token=refresh_token,
            expires_in=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES * 60
        )

    async def login(self, data: LoginRequest) -> TokenResponse:
        user = await self.user_repo.get_by_email(data.email)
        if not user:
            raise ValueError('Invalid email or password')
        if not verify_password(data.password, user.hashed_password):
            raise ValueError('Invalid email or password')
        if not user.is_active:
            raise ValueError('Account is disabled')
        await self.user_repo.update_last_login(user.id)
        access_token, refresh_token = await self._generate_tokens(str(user.id))
        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            expires_in=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES * 60
        )

    async def forgot_password(self, email: str) -> dict:
        user = await self.user_repo.get_by_email(email)
        if not user:
            return {'message': 'If this email exists, OTP has been sent'}
        otp = self.email_service.generate_otp()
        await self.otp_service.store_otp(email, otp)
        self.email_service.send_otp_email(email, otp, user.full_name)
        return {'message': 'If this email exists, OTP has been sent'}

    async def verify_otp(self, email: str, otp: str) -> dict:
        valid = await self.otp_service.verify_otp(email, otp)
        if not valid:
            raise ValueError('Invalid or expired OTP')
        await self.otp_service.store_reset_token(email)
        return {'message': 'OTP verified successfully'}

    async def reset_password(self, email: str, new_password: str) -> dict:
        verified = await self.otp_service.is_reset_verified(email)
        if not verified:
            raise ValueError('Please verify OTP first')
        user = await self.user_repo.get_by_email(email)
        if not user:
            raise ValueError('User not found')
        hashed = hash_password(new_password)
        await self.user_repo.update_password(user.id, hashed)
        await self.otp_service.clear_reset_token(email)
        return {'message': 'Password reset successfully'}

    async def refresh(self, refresh_token: str) -> TokenResponse:
        try:
            payload = decode_token(refresh_token)
        except ValueError as e:
            raise ValueError(str(e))
        if payload.get('type') != 'refresh':
            raise ValueError('Invalid token type')
        token_hash = self._hash_token(refresh_token)
        stored_token = await self.token_repo.get_by_hash(token_hash)
        if not stored_token:
            raise ValueError('Token revoked or not found')
        if stored_token.expires_at < datetime.now(timezone.utc):
            raise ValueError('Refresh token expired')
        await self.token_repo.revoke(token_hash)
        user_id = payload.get('sub')
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
        access_token = create_access_token({'sub': user_id})
        refresh_token = create_refresh_token({'sub': user_id})
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
