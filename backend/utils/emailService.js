const nodemailer = require('nodemailer');
const logger = require('./logger');

class EmailService {
  constructor() {
    this.transporter = null;
    this.initialize();
  }

  initialize() {
    const port = parseInt(process.env.SMTP_PORT) || 587;
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.hostinger.com',
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendMail({ to, subject, html, text, attachments = [] }) {
    try {
      const fromEmail = process.env.MAIL_FROM || process.env.SMTP_USER || 'Hr@geoindialimited.com';
      const mailOptions = {
        from: `"${process.env.SMTP_FROM_NAME || 'Geo India Limited'}" <${fromEmail}>`,
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

  async sendNewApplicationAlert({ hrEmail, candidateName, candidateEmail, candidatePhone, jobTitle, coverLetter, resumeUrl }) {
    const fs = require('fs');
    const path = require('path');

    let fullResumeUrl = resumeUrl || '';
    const emailAttachments = [];

    if (resumeUrl) {
      if (resumeUrl.startsWith('http://') || resumeUrl.startsWith('https://')) {
        fullResumeUrl = resumeUrl;
      } else {
        const baseUrl = process.env.BACKEND_URL || process.env.APP_URL || 'http://localhost:5000';
        fullResumeUrl = `${baseUrl.replace(/\/$/, '')}${resumeUrl.startsWith('/') ? '' : '/'}${resumeUrl}`;
      }

      if (resumeUrl.includes('/uploads/')) {
        const filename = resumeUrl.split('/uploads/')[1];
        const filePath = path.join(__dirname, '..', 'uploads', filename);
        if (fs.existsSync(filePath)) {
          emailAttachments.push({
            filename: filename,
            path: filePath,
          });
        }
      }
    }

    const subject = `New Job Application Received: ${jobTitle}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937;">
        <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Job Application</h1>
          <p style="color: #94a3b8; margin-top: 10px;">Position: ${jobTitle}</p>
        </div>
        <div style="background: #ffffff; padding: 45px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 10px 10px;">
          <h3 style="margin-top: 0; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Candidate Details</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 130px;">Name:</td>
              <td style="padding: 6px 0;">${candidateName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Email:</td>
              <td style="padding: 6px 0;"><a href="mailto:${candidateEmail}" style="color: #2563eb; text-decoration: none;">${candidateEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Phone:</td>
              <td style="padding: 6px 0;">${candidatePhone || 'N/A'}</td>
            </tr>
          </table>

          <h3 style="color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Cover Letter</h3>
          <p style="background-color: #f8fafc; padding: 15px; border-radius: 8px; font-style: italic; border-left: 4px solid #cbd5e1; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">
            ${coverLetter || 'No cover letter provided.'}
          </p>

          ${fullResumeUrl ? `
          <div style="text-align: center; margin-top: 35px;">
            <a href="${fullResumeUrl}" target="_blank" 
               style="background: #2563eb; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);">
              Download Candidate Resume
            </a>
          </div>
          ` : `
          <p style="color: #ef4444; font-weight: bold; margin-top: 20px;">No resume attachment linked to this candidate profile.</p>
          `}
        </div>
      </div>
    `;

    return this.sendMail({
      to: hrEmail,
      subject,
      html,
      attachments: emailAttachments,
    });
  }

  async sendHiringRequirementAlert({
    hrEmail,
    companyName,
    contactPerson,
    email,
    phone,
    jobPosition,
    vacancies,
    jobLocation,
    qualification,
    experience,
    salaryRange,
    skills,
    employmentType,
    joiningDate,
    jobDescription,
  }) {
    const subject = `New Hiring Support Request from: ${companyName}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937;">
        <div style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Hiring Support Requirement</h1>
          <p style="color: #e0f2fe; margin-top: 10px;">Submitted by: ${companyName}</p>
        </div>
        <div style="background: #ffffff; padding: 45px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 10px 10px;">
          <h3 style="margin-top: 0; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Contact Information</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 150px;">Company:</td>
              <td style="padding: 6px 0;">${companyName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Contact Person:</td>
              <td style="padding: 6px 0;">${contactPerson}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Official Email:</td>
              <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Phone:</td>
              <td style="padding: 6px 0;">${phone || 'N/A'}</td>
            </tr>
          </table>

          <h3 style="color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Requirement Details</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 150px;">Job Position:</td>
              <td style="padding: 6px 0;">${jobPosition}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Vacancies:</td>
              <td style="padding: 6px 0;">${vacancies || '1'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Job Location:</td>
              <td style="padding: 6px 0;">${jobLocation || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Qualification:</td>
              <td style="padding: 6px 0;">${qualification || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Experience:</td>
              <td style="padding: 6px 0;">${experience || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Salary Range:</td>
              <td style="padding: 6px 0;">${salaryRange || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Required Skills:</td>
              <td style="padding: 6px 0;">${skills || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Job Type:</td>
              <td style="padding: 6px 0;">${employmentType || 'Permanent'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Expected Joining:</td>
              <td style="padding: 6px 0;">${joiningDate || 'N/A'}</td>
            </tr>
          </table>

          <h3 style="color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Job Description / Remarks</h3>
          <p style="background-color: #f8fafc; padding: 15px; border-radius: 8px; font-style: italic; border-left: 4px solid #0284c7; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">
            ${jobDescription || 'No description provided.'}
          </p>
        </div>
      </div>
    `;

    return this.sendMail({
      to: hrEmail,
      subject,
      html,
    });
  }

  async sendContactEnquiryAlert({
    hrEmail,
    fullName,
    companyName,
    email,
    phone,
    enquiryType,
    serviceRequired,
    vacancies,
    jobLocation,
    message,
  }) {
    const subject = `New Contact Form Enquiry: [${enquiryType || 'General'}] ${fullName}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937;">
        <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          <p style="color: #94a3b8; margin-top: 10px;">Type: ${enquiryType || 'General Inquiry'}</p>
        </div>
        <div style="background: #ffffff; padding: 45px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 10px 10px;">
          <h3 style="margin-top: 0; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Contact Information</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 140px;">Full Name:</td>
              <td style="padding: 6px 0;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Company:</td>
              <td style="padding: 6px 0;">${companyName || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Email:</td>
              <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Phone:</td>
              <td style="padding: 6px 0;">${phone || 'N/A'}</td>
            </tr>
          </table>

          <h3 style="color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Enquiry Details</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 140px;">Enquiry Type:</td>
              <td style="padding: 6px 0;">${enquiryType || 'General Inquiry'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Service Required:</td>
              <td style="padding: 6px 0;">${serviceRequired || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Vacancies:</td>
              <td style="padding: 6px 0;">${vacancies || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Job Location:</td>
              <td style="padding: 6px 0;">${jobLocation || 'N/A'}</td>
            </tr>
          </table>

          <h3 style="color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Message</h3>
          <p style="background-color: #f8fafc; padding: 15px; border-radius: 8px; font-style: italic; border-left: 4px solid #2563eb; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">
            ${message || 'No message content provided.'}
          </p>
        </div>
      </div>
    `;

    return this.sendMail({
      to: hrEmail,
      subject,
      html,
    });
  }

  async sendResumeUploadAlert({
    hrEmail,
    fullName,
    phone,
    email,
    currentLocation,
    preferredLocation,
    highestQualification,
    workExperience,
    currentJobTitle,
    currentSalary,
    expectedSalary,
    noticePeriod,
    preferredIndustry,
    preferredJobRole,
    resumeUrl,
  }) {
    const fs = require('fs');
    const path = require('path');

    let fullResumeUrl = resumeUrl || '';
    const emailAttachments = [];

    if (resumeUrl) {
      if (resumeUrl.startsWith('http://') || resumeUrl.startsWith('https://')) {
        fullResumeUrl = resumeUrl;
      } else {
        const baseUrl = process.env.BACKEND_URL || process.env.APP_URL || 'http://localhost:5000';
        fullResumeUrl = `${baseUrl.replace(/\/$/, '')}${resumeUrl.startsWith('/') ? '' : '/'}${resumeUrl}`;
      }

      if (resumeUrl.includes('/uploads/')) {
        const filename = resumeUrl.split('/uploads/')[1];
        const filePath = path.join(__dirname, '..', 'uploads', filename);
        if (fs.existsSync(filePath)) {
          emailAttachments.push({
            filename: filename,
            path: filePath,
          });
        }
      }
    }

    const subject = `New Job Seeker Profile & Resume: ${fullName}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937;">
        <div style="background: linear-gradient(135deg, #0f766e 0%, #115e59 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Job Seeker Resume Upload</h1>
          <p style="color: #ccfbf1; margin-top: 10px;">Candidate: ${fullName}</p>
        </div>
        <div style="background: #ffffff; padding: 45px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 10px 10px;">
          <h3 style="margin-top: 0; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Personal & Contact Information</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 160px;">Name:</td>
              <td style="padding: 6px 0;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Email:</td>
              <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Phone:</td>
              <td style="padding: 6px 0;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Current Location:</td>
              <td style="padding: 6px 0;">${currentLocation || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Preferred Location:</td>
              <td style="padding: 6px 0;">${preferredLocation || 'N/A'}</td>
            </tr>
          </table>

          <h3 style="color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Professional Details</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 160px;">Highest Qualification:</td>
              <td style="padding: 6px 0;">${highestQualification || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Work Experience:</td>
              <td style="padding: 6px 0;">${workExperience || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Current Job Title:</td>
              <td style="padding: 6px 0;">${currentJobTitle || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Current Salary (LPA):</td>
              <td style="padding: 6px 0;">${currentSalary || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Expected Salary (LPA):</td>
              <td style="padding: 6px 0;">${expectedSalary || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Notice Period:</td>
              <td style="padding: 6px 0;">${noticePeriod || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Preferred Industry:</td>
              <td style="padding: 6px 0;">${preferredIndustry || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Preferred Job Role:</td>
              <td style="padding: 6px 0;">${preferredJobRole || 'N/A'}</td>
            </tr>
          </table>

          ${fullResumeUrl ? `
          <div style="text-align: center; margin-top: 35px;">
            <a href="${fullResumeUrl}" target="_blank" 
               style="background: #0d9488; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(13, 148, 136, 0.2);">
              Download Candidate Resume
            </a>
          </div>
          ` : `
          <p style="color: #ef4444; font-weight: bold; margin-top: 20px;">No resume file attached to this candidate profile.</p>
          `}
        </div>
      </div>
    `;

    return this.sendMail({
      to: hrEmail,
      subject,
      html,
      attachments: emailAttachments,
    });
  }
}

module.exports = new EmailService();