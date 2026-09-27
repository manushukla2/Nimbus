import smtplib
import random
import string
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from src.config import settings


class EmailService:

    def generate_otp(self) -> str:
        return ''.join(random.choices(string.digits, k=6))

    def send_otp_email(self, to_email: str, otp: str, full_name: str) -> bool:
        try:
            msg = MIMEMultipart('alternative')
            msg['Subject'] = 'Nimbus - Password Reset OTP'
            msg['From'] = settings.EMAIL_FROM
            msg['To'] = to_email

            html = f'''
            <html>
            <body style="font-family: Inter, sans-serif; background: #f5f5f5; padding: 40px;">
                <div style="max-width: 480px; margin: 0 auto; background: white; border-radius: 16px; padding: 40px;">
                    <div style="margin-bottom: 32px;">
                        <span style="font-weight: 700; font-size: 20px; color: #1A1A2E;">Nimbus</span>
                    </div>
                    <h2 style="color: #1A1A2E; font-size: 24px; margin-bottom: 8px;">Reset your password</h2>
                    <p style="color: #9B9BAD; font-size: 14px; margin-bottom: 32px;">Hi {full_name}, use this OTP to reset your password. Valid for 5 minutes.</p>
                    <div style="background: #F5F4FF; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 32px;">
                        <span style="font-size: 36px; font-weight: 800; color: #6C63FF; letter-spacing: 8px;">{otp}</span>
                    </div>
                    <p style="color: #9B9BAD; font-size: 12px;">If you did not request this, ignore this email.</p>
                </div>
            </body>
            </html>
            '''

            msg.attach(MIMEText(html, 'html'))

            with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
                server.starttls()
                server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
                server.sendmail(settings.EMAIL_FROM, to_email, msg.as_string())

            return True

        except Exception as e:
            print(f'Email send failed: {e}')
            return False
