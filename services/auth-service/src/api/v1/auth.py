from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from src.db.session import get_db
from src.services.auth_service import AuthService
from src.schemas.auth import (
    RegisterRequest, RegisterResponse,
    LoginRequest, TokenResponse,
    RefreshTokenRequest, MessageResponse
)
from src.api.deps import get_current_user
from src.models.user import User
from pydantic import BaseModel, EmailStr, Field

router = APIRouter(prefix='/auth', tags=['auth'])


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class VerifyOTPRequest(BaseModel):
    email: EmailStr
    otp: str = Field(..., min_length=6, max_length=6, pattern=r"^\d{6}$")


class ResetPasswordRequest(BaseModel):
    email: EmailStr
    new_password: str = Field(..., min_length=8, max_length=100)


@router.post('/register', response_model=RegisterResponse, status_code=status.HTTP_201_CREATED)
async def register(data: RegisterRequest, db: AsyncSession = Depends(get_db)):
    try:
        service = AuthService(db)
        return await service.register(data)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.post('/login', response_model=TokenResponse)
async def login(data: LoginRequest, db: AsyncSession = Depends(get_db)):
    try:
        service = AuthService(db)
        return await service.login(data)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))


@router.post('/forgot-password')
async def forgot_password(data: ForgotPasswordRequest, db: AsyncSession = Depends(get_db)):
    service = AuthService(db)
    return await service.forgot_password(data.email)


@router.post('/verify-otp')
async def verify_otp(data: VerifyOTPRequest, db: AsyncSession = Depends(get_db)):
    try:
        service = AuthService(db)
        return await service.verify_otp(data.email, data.otp)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.post('/reset-password')
async def reset_password(data: ResetPasswordRequest, db: AsyncSession = Depends(get_db)):
    try:
        service = AuthService(db)
        return await service.reset_password(data.email, data.new_password)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.post('/refresh', response_model=TokenResponse)
async def refresh(data: RefreshTokenRequest, db: AsyncSession = Depends(get_db)):
    try:
        service = AuthService(db)
        return await service.refresh(data.refresh_token)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))


@router.post('/logout', response_model=MessageResponse)
async def logout(
    data: RefreshTokenRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        service = AuthService(db)
        await service.logout(data.refresh_token)
        return MessageResponse(message='Logged out successfully')
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.get('/me', response_model=dict)
async def me(current_user: User = Depends(get_current_user)):
    return {
        'id': str(current_user.id),
        'email': current_user.email,
        'username': current_user.username,
        'full_name': current_user.full_name,
        'avatar_url': current_user.avatar_url,
        'is_active': current_user.is_active,
        'is_verified': current_user.is_verified,
    }
