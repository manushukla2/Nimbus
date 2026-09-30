import asyncio
import html
import logging
import secrets
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from src.config import settings

logger = logging.getLogger(__name__)

SMTP_TIMEOUT_SECONDS = 10


class EmailService:

    def generate_otp(self) -> str:
        # secrets uses the OS secure random source, so codes are not predictable
        return f'{secrets.randbelow(1_000_000):06d}'

    def build_otp_html(self, full_name: str, otp: str) -> str:
        safe_name = html.escape(full_name)
        return f"""
        <html>
        <body style="font-family: Arial, sans-serif; background: #f5f5f5; padding: 40px;">
            <div style="max-width: 480px; margin: 0 auto; background: white; border-radius: 16px; padding: 40px;">
                <div style="margin-bottom: 32px;">
                    <span style="font-weight: 700; font-size: 20px; color: #1A1A2E;">Nimbus</span>
                </div>
                <h2 style="color: #1A1A2E; font-size: 24px; margin-bottom: 8px;">Reset your password</h2>
                <p style="color: #9B9BAD; font-size: 14px; margin-bottom: 32px;">Hi {safe_name}, use this OTP to reset your password. Valid for 5 minutes.</p>
                <div style="background: #F5F4FF; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 32px;">
                    <span style="font-size: 36px; font-weight: 800; color: #6C63FF; letter-spacing: 8px;">{otp}</span>
                </div>
                <p style="color: #9B9BAD; font-size: 12px;">If you did not request this, ignore this email.</p>
            </div>
        </body>
        </html>
        """

    def send_otp_email(self, to_email: str, otp: str, full_name: str) -> bool:
        # Blocking SMTP call. Use send_otp_email_async from async code.
        try:
            msg = MIMEMultipart('alternative')
            msg['Subject'] = 'Nimbus - Password Reset OTP'
            msg['From'] = settings.EMAIL_FROM
            msg['To'] = to_email
            msg.attach(MIMEText(self.build_otp_html(full_name, otp), 'html'))

            with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=SMTP_TIMEOUT_SECONDS) as server:
                server.starttls()
                server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
                server.sendmail(settings.EMAIL_FROM, to_email, msg.as_string())
            return True

        except Exception:
            logger.exception('OTP email send failed')
            return False

    async def send_otp_email_async(self, to_email: str, otp: str, full_name: str) -> bool:
        # Runs the blocking SMTP code in a worker thread so the event loop stays free
        return await asyncio.to_thread(self.send_otp_email, to_email, otp, full_name)
