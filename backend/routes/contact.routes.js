const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');
const { authenticate, authorize } = require('../middlewares/auth');
const emailService = require('../utils/emailService');
const logger = require('../utils/logger');

// POST /api/contact/submit or /api/contact - Public contact form submission
const handleContactSubmit = async (req, res, next) => {
  try {
    const {
      fullName,
      companyName,
      email,
      phone,
      enquiryType,
      serviceRequired,
      vacancies,
      jobLocation,
      message,
    } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Full Name, Email, and Message are required fields.',
      });
    }

    // Save to Database so Admin can view full details
    const newMessage = await ContactMessage.create({
      fullName,
      companyName,
      email,
      phone,
      formType: 'contact',
      enquiryType: enquiryType || 'General Inquiry',
      serviceRequired,
      vacancies,
      jobLocation,
      message,
    });

    const hrEmail = process.env.SMTP_USER || 'Hr@geoindialimited.com';

    // Dispatch email alert asynchronously
    try {
      await emailService.sendContactEnquiryAlert({
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
      });
    } catch (mailError) {
      logger.error('Failed to send contact enquiry email alert:', mailError);
    }

    res.status(200).json({
      success: true,
      message: 'Your contact enquiry has been received successfully. Our team will contact you shortly.',
      data: newMessage,
    });
  } catch (err) {
    next(err);
  }
};

router.post('/submit', handleContactSubmit);
router.post('/', handleContactSubmit);

// Admin Endpoints for Form Messages Management
// GET /api/contact/messages - List all messages (Admin)
router.get('/messages', authenticate, authorize('admin', 'super_admin'), async (req, res, next) => {
  try {
    const { search, formType, status } = req.query;
    const query = {};

    if (formType && formType !== 'all') {
      query.formType = formType;
    }
    if (status && status !== 'all') {
      query.status = status;
    }
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
      ];
    }

    const messages = await ContactMessage.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/contact/messages/:id - Get single message
router.get('/messages/:id', authenticate, authorize('admin', 'super_admin'), async (req, res, next) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Enquiry message not found' });
    }
    res.status(200).json({ success: true, data: message });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/contact/messages/:id/status - Update status & notes
router.patch('/messages/:id/status', authenticate, authorize('admin', 'super_admin'), async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ success: false, message: 'Enquiry message not found' });
    }

    if (status) message.status = status;
    if (notes !== undefined) message.notes = notes;

    await message.save();

    res.status(200).json({
      success: true,
      message: 'Status updated successfully',
      data: message,
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/contact/seed-sample-messages - Seed 8 sample form enquiries
router.post('/seed-sample-messages', async (req, res, next) => {
  try {
    const sampleMessages = [
      // 2 Contact Form Entries
      {
        fullName: 'Vikas Sharma',
        email: 'vikas.sharma@techcorp.in',
        phone: '+91 98765 43210',
        companyName: 'TechCorp Solutions',
        formType: 'contact',
        enquiryType: 'Employer Services',
        serviceRequired: 'Permanent Recruitment Support',
        vacancies: '5',
        jobLocation: 'Noida, UP',
        message: 'We are looking for customized IT recruitment services for expanding our engineering squad in Noida. Please share your engagement terms and commercial proposal.',
        status: 'new',
      },
      {
        fullName: 'Ananya Roy',
        email: 'ananya.roy@solutions.com',
        phone: '+91 91234 56789',
        companyName: 'Global Solutions India',
        formType: 'contact',
        enquiryType: 'Corporate Training',
        serviceRequired: 'Soft Skills & Leadership Training',
        vacancies: '50',
        jobLocation: 'Gurugram, Haryana',
        message: 'Urgent requirement for a 3-day corporate soft skills and client communication workshop for 50 newly onboarded consultants.',
        status: 'contacted',
        notes: 'Initial call completed on 17th July. Sent proposal document via email.',
      },

      // 2 Hiring Support Entries
      {
        fullName: 'Priya Verma',
        email: 'p.verma@enterprisetech.co.in',
        phone: '+91 99887 76655',
        companyName: 'Enterprise Tech Solutions',
        formType: 'hiring_support',
        enquiryType: 'Employer Services',
        serviceRequired: 'Full Time Permanent Hiring',
        vacancies: '5',
        jobPosition: 'Senior React & Node.js Developers',
        jobLocation: 'Bengaluru / Remote',
        message: 'Qualification: B.Tech / M.Tech in CS\nExperience: 4 - 7 Years\nSalary Range: 15 - 22 LPA\nRequired Skills: React, Node.js, AWS, MongoDB\nExpected Joining: Immediate to 30 Days\n\nJob Description / Remarks:\nWe need 5 senior full stack engineers with solid cloud experience for our fintech product suite.',
        status: 'in_progress',
        notes: 'Shortlisted candidate resumes dispatched to client HR.',
      },
      {
        fullName: 'Rohan Kulkarni',
        email: 'r.kulkarni@tataauto.com',
        phone: '+91 94567 12345',
        companyName: 'Tata Auto Components',
        formType: 'hiring_support',
        enquiryType: 'Employer Services',
        serviceRequired: 'Bulk Campus & Industrial Staffing',
        vacancies: '20',
        jobPosition: 'Mechanical Quality Control Engineers',
        jobLocation: 'Pune, Maharashtra',
        message: 'Qualification: Diploma / B.E Mechanical\nExperience: 0 - 2 Years\nSalary Range: 3.5 - 5.0 LPA\nRequired Skills: Quality Inspection, AutoCAD, ISO Standards\nExpected Joining: 1st August 2026\n\nJob Description / Remarks:\nBulk hiring drive required for 20 diploma and engineering graduates for our plant in Chakan, Pune.',
        status: 'new',
      },

      // 2 Job Seeker Resume Upload Entries
      {
        fullName: 'Amit Kumar Patel',
        email: 'amit.patel.dev@gmail.com',
        phone: '+91 88776 65544',
        companyName: '',
        formType: 'job_seeker',
        enquiryType: 'Job Seeker Resume Upload',
        serviceRequired: 'IT & Software Engineering',
        jobPosition: 'Senior Java Backend Engineer',
        jobLocation: 'Bengaluru / Hyderabad',
        message: 'Highest Qualification: M.Tech Software Engineering\nWork Experience: 6.5 Years\nCurrent Job Title: Senior Software Engineer\nCurrent Salary (LPA): 14.5\nExpected Salary (LPA): 19.0\nNotice Period: 15 Days\nPreferred Industry: IT / Product\nPreferred Role: Lead Java / Microservices Developer',
        resumeUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf',
        status: 'contacted',
        notes: 'Profile screened. Matching with Enterprise Tech requisition.',
      },
      {
        fullName: 'Neha Gupta',
        email: 'neha.gupta.hr@yahoo.com',
        phone: '+91 97112 33445',
        companyName: '',
        formType: 'job_seeker',
        enquiryType: 'Job Seeker Resume Upload',
        serviceRequired: 'Human Resources & Talent Acquisition',
        jobPosition: 'HR Generalist & Operations Specialist',
        jobLocation: 'Delhi NCR',
        message: 'Highest Qualification: MBA in Human Resources\nWork Experience: 4 Years\nCurrent Job Title: Senior HR Executive\nCurrent Salary (LPA): 6.8\nExpected Salary (LPA): 9.0\nNotice Period: 30 Days\nPreferred Industry: Corporate / Staffing\nPreferred Role: HR Manager / Talent Acquisition Lead',
        resumeUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf',
        status: 'new',
      },

      // 2 Career Application Entries
      {
        fullName: 'Rajesh V. Nair',
        email: 'rajesh.nair@gmail.com',
        phone: '+91 98220 11223',
        companyName: '',
        formType: 'career_apply',
        enquiryType: 'Career Application',
        jobPosition: 'Senior IT Recruitment Consultant',
        message: 'Applying for the Senior IT Recruitment Consultant role at Geo India Limited. I bring 5+ years of experience in technical sourcing, client relationship management, and bulk tech hiring across IT hubs.',
        resumeUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf',
        status: 'resolved',
        notes: 'Interview scheduled and final offer letter issued.',
      },
      {
        fullName: 'Simran Kaur',
        email: 'simran.kaur98@gmail.com',
        phone: '+91 99100 44332',
        companyName: '',
        formType: 'career_apply',
        enquiryType: 'Career Application',
        jobPosition: 'Business Development & Digital Marketing Intern',
        message: 'Currently pursuing final year BBA in Marketing. Enthusiastic about joining Geo India Limited to support client acquisition, social media campaigns, and lead generation.',
        resumeUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf',
        status: 'new',
      },
    ];

    await ContactMessage.deleteMany({});
    const created = await ContactMessage.insertMany(sampleMessages);

    res.status(200).json({
      success: true,
      message: `Seeded ${created.length} sample form enquiries successfully!`,
      data: created,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
