const nodemailer = require('nodemailer');
const logger = require('./logger');

class EmailService {
  constructor() {
    this.transporter = null;
    this.initialize();
  }

  initialize() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendMail({ to, subject, html, text, attachments = [] }) {
    try {
      const mailOptions = {
        from: `"${process.env.SMTP_FROM_NAME || 'JobReqruitment'}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
        to,
        subject,
        html,
        text,
        attachments,
      };

      const info = await this.transporter.sendMail(mailOptions);
      logger.info(`Email sent successfully to ${to}: ${info.messageId}`);
      return info;
    } catch (error) {
      logger.error(`Failed to send email to ${to}:`, error);
      throw error;
    }
  }

  async sendWelcomeEmail(user) {
    const subject = 'Welcome to JobReqruitment Platform';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to JobReqruitment!</h1>
          <p style="color: rgba(255,255,255,0.9); margin-top: 10px;">Your dream career starts here</p>
        </div>
        <div style="background: #ffffff; padding: 40px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
          <p>Hello <strong>${user.firstName}</strong>,</p>
          <p>Thank you for joining JobReqruitment! We're excited to help you take the next step in your career journey.</p>
          <p>With JobReqruitment, you can:</p>
          <ul>
            <li>Browse thousands of job opportunities</li>
            <li>Connect with top employers and recruiters</li>
            <li>Build and showcase your professional profile</li>
            <li>Get personalized job recommendations</li>
          </ul>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              Get Started
            </a>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 30px;">If you didn't create this account, please ignore this email.</p>
        </div>
      </div>
    `;
    return this.sendMail({ to: user.email, subject, html });
  }

  async sendPasswordResetEmail(user, resetToken) {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;
    const subject = 'Password Reset Request';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Reset Your Password</h1>
        </div>
        <div style="background: #ffffff; padding: 40px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
          <p>Hello <strong>${user.firstName}</strong>,</p>
          <p>You recently requested to reset your password. Click the button below to reset it:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p style="color: #666; font-size: 14px;">This link will expire in 1 hour.</p>
          <p style="color: #666; font-size: 12px;">If you didn't request this, please ignore this email.</p>
        </div>
      </div>
    `;
    return this.sendMail({ to: user.email, subject, html });
  }

  async sendEmailVerification(user, verificationToken) {
    const verifyUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-email/${verificationToken}`;
    const subject = 'Verify Your Email Address';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Verify Your Email</h1>
        </div>
        <div style="background: #ffffff; padding: 40px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
          <p>Hello <strong>${user.firstName}</strong>,</p>
          <p>Thank you for registering! Please verify your email address by clicking the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verifyUrl}" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              Verify Email
            </a>
          </div>
          <p style="color: #666; font-size: 12px;">This link will expire in 24 hours.</p>
        </div>
      </div>
    `;
    return this.sendMail({ to: user.email, subject, html });
  }

  async sendInterviewInvitation(email, interviewDetails) {
    const subject = `Interview Invitation - ${interviewDetails.jobTitle}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Interview Invitation</h1>
        </div>
        <div style="background: #ffffff; padding: 40px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
          <p>Dear Candidate,</p>
          <p>Congratulations! You have been invited for an interview for the position of <strong>${interviewDetails.jobTitle}</strong>.</p>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Date:</strong> ${interviewDetails.date}</p>
            <p><strong>Time:</strong> ${interviewDetails.startTime} - ${interviewDetails.endTime}</p>
            <p><strong>Type:</strong> ${interviewDetails.type}</p>
            <p><strong>Location/Meeting:</strong> ${interviewDetails.location || interviewDetails.meetingLink}</p>
          </div>
          <p>Please confirm your availability at your earliest convenience.</p>
          <p style="color: #666; font-size: 12px;">Best regards,<br/>${interviewDetails.companyName}</p>
        </div>
      </div>
    `;
    return this.sendMail({ to: email, subject, html });
  }

  async sendApplicationConfirmation(email, jobTitle, companyName) {
    const subject = `Application Received - ${jobTitle}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Application Received</h2>
        <p>Thank you for applying to <strong>${jobTitle}</strong> at <strong>${companyName}</strong>.</p>
        <p>Your application is now under review. We will keep you updated on the status.</p>
        <p>Best of luck!</p>
      </div>
    `;
    return this.sendMail({ to: email, subject, html });
  }

  async sendOfferLetter(email, offerDetails) {
    const subject = `Offer Letter - ${offerDetails.jobTitle}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Congratulations! You've Got an Offer!</h2>
        <p>We are pleased to offer you the position of <strong>${offerDetails.jobTitle}</strong>.</p>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 5px;">
          <p><strong>Position:</strong> ${offerDetails.jobTitle}</p>
          <p><strong>Company:</strong> ${offerDetails.companyName}</p>
          <p><strong>Start Date:</strong> ${offerDetails.startDate}</p>
          <p><strong>Salary:</strong> ${offerDetails.salary}</p>
        </div>
        <p>Please review the attached offer letter for full details.</p>
      </div>
    `;
    return this.sendMail({ to: email, subject, html });
  }

  async sendOTP(email, otp) {
    const subject = 'Your OTP Code';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; text-align: center;">
        <h2>Your OTP Code</h2>
        <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; padding: 20px; background: #f8f9fa; border-radius: 10px; margin: 20px 0;">
          ${otp}
        </div>
        <p>This code will expire in 10 minutes.</p>
      </div>
    `;
    return this.sendMail({ to: email, subject, html });
  }
}

module.exports = new EmailService();