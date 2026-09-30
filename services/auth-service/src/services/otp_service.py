import hmac
import redis.asyncio as redis
from src.config import settings

OTP_TTL_SECONDS = 300
MAX_OTP_ATTEMPTS = 5
OTP_REQUEST_COOLDOWN_SECONDS = 60
RESET_TTL_SECONDS = 600

# One shared Redis client for the whole process (not one per request)
_redis_client = redis.from_url(settings.REDIS_URL)


def _norm(email: str) -> str:
    return email.strip().lower()


class OTPService:

    def __init__(self):
        self.redis = _redis_client

    async def allow_otp_request(self, email: str) -> bool:
        key = f'otp_cooldown:{_norm(email)}'
        was_set = await self.redis.set(key, '1', ex=OTP_REQUEST_COOLDOWN_SECONDS, nx=True)
        return bool(was_set)

    async def store_otp(self, email: str, otp: str) -> None:
        email = _norm(email)
        await self.redis.setex(f'otp:{email}', OTP_TTL_SECONDS, otp)
        await self.redis.delete(f'otp_attempts:{email}')

    async def verify_otp(self, email: str, otp: str) -> bool:
        email = _norm(email)
        otp_key = f'otp:{email}'
        attempts_key = f'otp_attempts:{email}'

        stored = await self.redis.get(otp_key)
        if not stored:
            return False

        attempts = await self.redis.incr(attempts_key)
        if attempts == 1:
            await self.redis.expire(attempts_key, OTP_TTL_SECONDS)
        if attempts > MAX_OTP_ATTEMPTS:
            await self.redis.delete(otp_key, attempts_key)
            return False

        if not hmac.compare_digest(stored, otp.encode()):
            return False

        await self.redis.delete(otp_key, attempts_key)
        return True

    async def store_reset_token(self, email: str) -> None:
        await self.redis.setex(f'reset_verified:{_norm(email)}', RESET_TTL_SECONDS, '1')

    async def is_reset_verified(self, email: str) -> bool:
        val = await self.redis.get(f'reset_verified:{_norm(email)}')
        return val is not None

    async def clear_reset_token(self, email: str) -> None:
        await self.redis.delete(f'reset_verified:{_norm(email)}')
