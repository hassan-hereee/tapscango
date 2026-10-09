import nodemailer from "nodemailer";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const EMAIL_FROM =
  process.env.EMAIL_FROM || '"TapScan Security" <security@tapscan.pk>';

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Send email verification link to newly registered user
 */
export async function sendVerificationEmail({
  to,
  name,
  token,
}: {
  to: string;
  name: string;
  token: string;
}) {
  const verificationUrl = `${APP_URL}/api/auth/confirm-email?token=${token}`;
  const transporter = getTransporter();

  if (!transporter) {
    console.log("--------------------------------------------------");
    console.log("📧 [EMAIL DEV MODE] Email Verification Needed:");
    console.log(`Recipient: ${to} (${name})`);
    console.log(`Verification Token: ${token}`);
    console.log(`Direct Verification URL: ${verificationUrl}`);
    console.log("--------------------------------------------------");

    return {
      success: true,
      mode: "dev_console",
      verificationUrl,
      token,
    };
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h2 style="color: #08497e; margin: 0;">TapScan.pk</h2>
        <p style="color: #64748b; font-size: 13px; margin: 4px 0 0;">Smart NFC & QR Code Stands</p>
      </div>

      <h3 style="color: #1e293b; margin-bottom: 12px;">Confirm Your Email Address</h3>
      <p style="color: #475569; font-size: 14px; line-height: 1.6;">
        Salam <strong>${name}</strong>,<br><br>
        Thank you for creating your TapScan account. Please verify your email address to activate your account and start ordering custom NFC standees.
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationUrl}" style="background-color: #0b69b3; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block;">
          Verify Email Address
        </a>
      </div>

      <p style="color: #64748b; font-size: 12px; line-height: 1.5;">
        Or copy and paste this link into your browser:<br>
        <a href="${verificationUrl}" style="color: #0b69b3; word-break: break-all;">${verificationUrl}</a>
      </p>

      <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 24px 0;">
      <p style="color: #94a3b8; font-size: 11px; text-align: center;">
        This link is valid for 24 hours. If you did not create this account, please ignore this email.
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: EMAIL_FROM,
    to,
    subject: "Verify Your Email - TapScan.pk",
    html,
  });

  return { success: true, mode: "smtp" };
}

/**
 * Send password reset link to user
 */
export async function sendPasswordResetEmail({
  to,
  name,
  token,
}: {
  to: string;
  name: string;
  token: string;
}) {
  const resetUrl = `${APP_URL}/auth/reset-password?token=${token}`;
  const transporter = getTransporter();

  if (!transporter) {
    console.log("--------------------------------------------------");
    console.log("🔑 [EMAIL DEV MODE] Password Reset Requested:");
    console.log(`Recipient: ${to} (${name})`);
    console.log(`Reset Token: ${token}`);
    console.log(`Reset URL: ${resetUrl}`);
    console.log("--------------------------------------------------");

    return {
      success: true,
      mode: "dev_console",
      resetUrl,
      token,
    };
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h2 style="color: #08497e; margin: 0;">TapScan.pk</h2>
        <p style="color: #64748b; font-size: 13px; margin: 4px 0 0;">Security Verification</p>
      </div>

      <h3 style="color: #1e293b; margin-bottom: 12px;">Reset Your Password</h3>
      <p style="color: #475569; font-size: 14px; line-height: 1.6;">
        Salam <strong>${name}</strong>,<br><br>
        We received a request to reset your TapScan account password. Click the button below to choose a new password.
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" style="background-color: #0b69b3; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block;">
          Reset Password
        </a>
      </div>

      <p style="color: #64748b; font-size: 12px; line-height: 1.5;">
        Or use this token directly in Postman or on the reset page:<br>
        <strong>${token}</strong>
      </p>

      <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 24px 0;">
      <p style="color: #94a3b8; font-size: 11px; text-align: center;">
        This password reset link is valid for 1 hour. If you did not request this change, your account is still secure and you can safely ignore this email.
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: EMAIL_FROM,
    to,
    subject: "Reset Your Password - TapScan.pk",
    html,
  });

  return { success: true, mode: "smtp" };
}
