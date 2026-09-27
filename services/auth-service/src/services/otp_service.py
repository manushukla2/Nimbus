import redis.asyncio as redis
from src.config import settings


class OTPService:

    def __init__(self):
        self.redis = redis.from_url(settings.REDIS_URL)
        self.expiry = 300  # 5 minutes

    async def store_otp(self, email: str, otp: str) -> None:
        key = f'otp:{email}'
        await self.redis.setex(key, self.expiry, otp)

    async def verify_otp(self, email: str, otp: str) -> bool:
        key = f'otp:{email}'
        stored = await self.redis.get(key)
        if not stored:
            return False
        if stored.decode() != otp:
            return False
        await self.redis.delete(key)
        return True

    async def store_reset_token(self, email: str) -> None:
        key = f'reset_verified:{email}'
        await self.redis.setex(key, 600, '1')

    async def is_reset_verified(self, email: str) -> bool:
        key = f'reset_verified:{email}'
        val = await self.redis.get(key)
        return val is not None

    async def clear_reset_token(self, email: str) -> None:
        key = f'reset_verified:{email}'
        await self.redis.delete(key)
