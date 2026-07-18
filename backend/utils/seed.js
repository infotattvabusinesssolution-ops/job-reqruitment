require('dotenv').config();
const database = require('../config/database');
const Role = require('../models/Role');
const User = require('../models/User');
const Category = require('../models/Category');
const FAQ = require('../models/FAQ');
const Testimonial = require('../models/Testimonial');
const Service = require('../models/Service');
const Blog = require('../models/Blog');
const Career = require('../models/Career');
const Company = require('../models/Company');
const Job = require('../models/Job');
const logger = require('../utils/logger');
const slugify = require('slugify');

async function seed() {
  try {
    logger.info('Starting database seeding...');
    await database.connect();

    // Seed roles
    logger.info('Seeding roles...');
    await Role.seedDefaultRoles();
    logger.info('Roles seeded successfully');

    // Seed categories
    logger.info('Seeding categories...');
    await seedCategories();
    logger.info('Categories seeded successfully');

    // Seed admin user
    logger.info('Seeding admin user...');
    await seedAdminUser();
    logger.info('Admin user seeded successfully');

    // Seed FAQs
    logger.info('Seeding FAQs...');
    await seedFAQs();
    logger.info('FAQs seeded successfully');

    // Seed Testimonials
    logger.info('Seeding Testimonials...');
    await seedTestimonials();
    logger.info('Testimonials seeded successfully');

    // Seed Services
    logger.info('Seeding Services...');
    await seedServices();
    logger.info('Services seeded successfully');

    // Seed Blogs
    logger.info('Seeding Blogs...');
    await seedBlogs();
    logger.info('Blogs seeded successfully');

    // Seed Careers
    logger.info('Seeding Careers...');
    await seedCareers();
    logger.info('Careers seeded successfully');

    // Seed Jobs
    logger.info('Seeding Jobs...');
    await seedJobs();
    logger.info('Jobs seeded successfully');

    logger.info('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    logger.error('Seeding failed:', error);
    process.exit(1);
  }
}

async function seedCategories() {
  const categories = [
    // Industries
    { name: 'Technology', type: 'industry', icon: '💻', description: 'IT and Technology sector', sortOrder: 1 },
    { name: 'Healthcare', type: 'industry', icon: '🏥', description: 'Healthcare and Medical', sortOrder: 2 },
    { name: 'Finance', type: 'industry', icon: '💰', description: 'Banking and Financial Services', sortOrder: 3 },
    { name: 'Education', type: 'industry', icon: '📚', description: 'Education and Training', sortOrder: 4 },
    { name: 'Manufacturing', type: 'industry', icon: '🏭', description: 'Manufacturing and Production', sortOrder: 5 },
    { name: 'Retail', type: 'industry', icon: '🛍️', description: 'Retail and E-commerce', sortOrder: 6 },
    { name: 'Construction', type: 'industry', icon: '🏗️', description: 'Construction and Real Estate', sortOrder: 7 },
    { name: 'Hospitality', type: 'industry', icon: '🍽️', description: 'Hospitality and Tourism', sortOrder: 8 },

    // Job Categories
    { name: 'Software Development', type: 'job_category', icon: '👨‍💻', description: 'Software engineering and development', sortOrder: 1 },
    { name: 'Data Science', type: 'job_category', icon: '📊', description: 'Data analysis and science', sortOrder: 2 },
    { name: 'Design', type: 'job_category', icon: '🎨', description: 'UI/UX and Graphic Design', sortOrder: 3 },
    { name: 'Marketing', type: 'job_category', icon: '📢', description: 'Marketing and Advertising', sortOrder: 4 },
    { name: 'Sales', type: 'job_category', icon: '🤝', description: 'Sales and Business Development', sortOrder: 5 },
    { name: 'Human Resources', type: 'job_category', icon: '👥', description: 'HR and Recruitment', sortOrder: 6 },
    { name: 'Accounting', type: 'job_category', icon: '📋', description: 'Accounting and Finance', sortOrder: 7 },
    { name: 'Engineering', type: 'job_category', icon: '⚙️', description: 'Mechanical, Electrical, Civil Engineering', sortOrder: 8 },

    // Blog Categories
    { name: 'Career Advice', type: 'blog', icon: '📈', description: 'Tips and advice for job hunters', sortOrder: 1 },
    { name: 'Hiring Trends', type: 'blog', icon: '📊', description: 'Insights for employers and recruiters', sortOrder: 2 },
    { name: 'Interview Tips', type: 'blog', icon: '🎯', description: 'Prepare for your interviews', sortOrder: 3 },
  ];

  for (const category of categories) {
    category.slug = slugify(category.name, { lower: true, strict: true });
    await Category.findOneAndUpdate(
      { name: category.name, type: category.type },
      category,
      { upsert: true, new: true }
    );
  }
}

async function seedAdminUser() {
  const adminRole = await Role.findOne({ name: 'super_admin' });
  if (!adminRole) {
    logger.error('Admin role not found');
    return;
  }

  const existingAdmin = await User.findOne({ email: 'admin@jobreqruitment.com' });
  if (existingAdmin) {
    logger.info('Admin user already exists');
    return;
  }

  await User.create({
    firstName: 'Super',
    lastName: 'Admin',
    email: 'admin@jobreqruitment.com',
    password: 'Admin@12345',
    role: adminRole._id,
    isEmailVerified: true,
    isActive: true,
  });

  logger.info('Admin user created: admin@jobreqruitment.com / Admin@12345');
}

async function seedFAQs() {
  const defaultFaqs = [
    {
      question: 'What is GeoIndiaLimited?',
      answer: 'GeoIndiaLimited is India\'s premier recruitment and staffing solutions provider. We connect talented professionals with leading organizations across various industries including Technology, Healthcare, Finance, Manufacturing, and more.',
      category: 'General',
      order: 1
    },
    {
      question: 'How does GeoIndiaLimited work?',
      answer: 'Job seekers can create a profile upload their resume and apply for jobs. Employers can post jobs and search for candidates. Our AI-powered matching system helps connect the right talent with the right opportunities.',
      category: 'General',
      order: 2
    },
    {
      question: 'Is GeoIndiaLimited free for job seekers?',
      answer: 'Yes creating a profile searching for jobs and applying to positions is completely free for job seekers. We also offer premium services like resume review and career counseling at nominal charges.',
      category: 'General',
      order: 3
    },
    {
      question: 'Which industries does GeoIndiaLimited serve?',
      answer: 'We serve a wide range of industries including Technology Healthcare Finance Education Manufacturing Retail Construction Media and more. Our extensive network covers both domestic and international opportunities.',
      category: 'General',
      order: 4
    },
    {
      question: 'How do I create an account?',
      answer: 'Click on "Get Started" or "Sign Up" button on the top right corner. Fill in your details including name email and password. You can then complete your profile with your skills experience and education.',
      category: 'For Job Seekers',
      order: 5
    },
    {
      question: 'How do I apply for a job?',
      answer: 'Browse through the job listings use filters to narrow down your search and click on a job that interests you. On the job details page click "Apply Now" and follow the instructions.',
      category: 'For Job Seekers',
      order: 6
    },
    {
      question: 'Can I upload my resume?',
      answer: 'Yes you can upload your resume in PDF DOC or DOCX format. Your resume will be parsed automatically and used to enhance your profile and improve job matching.',
      category: 'For Job Seekers',
      order: 7
    },
    {
      question: 'How do I get job alerts?',
      answer: 'Once you create a profile and set your preferences you will automatically receive job alerts via email and notifications based on your skills experience and location preferences.',
      category: 'For Job Seekers',
      order: 8
    },
    {
      question: 'How do I post a job?',
      answer: 'Create an employer account and navigate to your dashboard. Click on "Post a Job" and fill in the job details including title description requirements and salary range. Once published your job will be visible to thousands of candidates.',
      category: 'For Employers',
      order: 9
    },
    {
      question: 'How does the AI matching work?',
      answer: 'Our AI algorithms analyze job requirements and candidate profiles to provide intelligent matching. Employers receive suggestions for top candidates and candidates see the most relevant job opportunities.',
      category: 'For Employers',
      order: 10
    },
    {
      question: 'Can I search for candidates?',
      answer: 'Yes employer accounts include access to our extensive candidate database. You can search filter and view profiles of potential candidates.',
      category: 'For Employers',
      order: 11
    },
    {
      question: 'What are the pricing plans?',
      answer: 'We offer flexible pricing plans including pay-per-job postings monthly subscriptions and enterprise solutions. Contact our sales team for detailed pricing information.',
      category: 'For Employers',
      order: 12
    },
    {
      question: 'How do I reset my password?',
      answer: 'Click on "Forgot Password" on the login page. Enter your registered email address and we will send you a password reset link.',
      category: 'Account & Support',
      order: 13
    },
    {
      question: 'How do I update my profile?',
      answer: 'Log in to your account and navigate to your profile/dashboard. You can edit your personal information skills experience education and other details from there.',
      category: 'Account & Support',
      order: 14
    },
    {
      question: 'How can I contact support?',
      answer: 'You can reach our support team through the Contact page email us at contact@geoindialimited.com or call us at +91 (22) 4567-8900. We are available Monday to Friday 9 AM to 6 PM IST.',
      category: 'Account & Support',
      order: 15
    }
  ];

  await FAQ.deleteMany({}); // Reset FAQs to seed cleanly
  await FAQ.insertMany(defaultFaqs);
  logger.info(`Seeded ${defaultFaqs.length} FAQ questions`);
}

async function seedTestimonials() {
  const defaultTestimonials = [
    {
      name: 'Anjali Sharma',
      role: 'Senior HR Manager',
      company: 'Infosys',
      content: 'GeoIndiaLimited has transformed our recruitment process. Their AI-driven search helped us find perfect candidates for our software development team in record time.',
      rating: 5,
      isFeatured: true
    },
    {
      name: 'Rahul Verma',
      role: 'Software Engineer',
      company: 'TCS',
      content: 'I found my dream job through GeoIndiaLimited. The process was smooth, transparent, and completely free. Highly recommended for job seekers!',
      rating: 5,
      isFeatured: true
    },
    {
      name: 'Vikram Malhotra',
      role: 'Operations Director',
      company: 'Flipkart',
      content: 'Excellent support and high-quality candidates. The recruiters at GeoIndiaLimited really understand the industry requirements and deliver on time.',
      rating: 4,
      isFeatured: true
    },
    {
      name: 'Priya Nair',
      role: 'Product Designer',
      company: 'Cognizant',
      content: 'The user experience of the platform is amazing, and their team provided great guidance during my interview preparation. I got hired in less than two weeks!',
      rating: 5,
      isFeatured: false
    }
  ];

  await Testimonial.deleteMany({}); // Reset Testimonials
  await Testimonial.insertMany(defaultTestimonials);
  logger.info(`Seeded ${defaultTestimonials.length} Testimonials`);
}

async function seedServices() {
  const defaultServices = [
    {
      serviceId: 'it',
      icon: 'desktop',
      title: 'IT Recruitment Services',
      shortDesc: 'Geo India Limited provides IT recruitment services for companies looking to hire skilled technology professionals.',
      longDesc: 'We help businesses recruit candidates for software development, website development, mobile application development, cloud computing, cybersecurity, data analytics, artificial intelligence, technical support, and IT project management roles. Our IT hiring process includes requirement analysis, candidate sourcing, technical profile screening, interview coordination, selection support, and joining follow-up.',
      features: [
        'Software Developers',
        'Front-End / Back-End / Full-Stack Developers',
        'React / Node.js Developers',
        'Java / Python / PHP & Laravel Developers',
        'Flutter & Mobile App Developers',
        'UI and UX Designers',
        'Software Testers & Quality Analysts',
        'DevOps & Cloud Engineers',
        'Data Analysts & Data Scientists',
        'Cybersecurity Professionals',
        'Database Administrators',
        'IT Support Executives & Tech Project Managers'
      ],
      order: 1
    },
    {
      serviceId: 'non-it',
      icon: 'briefcase',
      title: 'Non-IT Recruitment Services',
      shortDesc: 'Our non-IT recruitment services help businesses recruit qualified professionals for sales, marketing, finance, administration, and operations.',
      longDesc: 'We shortlist candidates according to the employer’s required qualifications, experience, communication skills, job location, salary budget, and employment type. Sourced candidates cover sales, marketing, finance, administration, operations, customer service, human resources, and management positions.',
      features: [
        'Sales & Business Development Executives',
        'Digital Marketing Executives',
        'Accountants & Finance Executives',
        'Human Resource Executives & Recruiters',
        'Customer Support Executives & Telecallers',
        'Operations Executives & Office Administrators',
        'Relationship Managers & Store Managers',
        'Warehouse Executives & Field Executives',
        'Team Leaders & Branch Managers'
      ],
      order: 2
    },
    {
      serviceId: 'bulk',
      icon: 'group',
      title: 'Bulk Hiring Services',
      shortDesc: 'Geo India Limited provides bulk hiring and high-volume recruitment services for businesses that need to hire multiple candidates.',
      longDesc: 'Our bulk hiring process includes workforce planning, large-scale candidate sourcing, initial screening, interview scheduling, documentation support, selection tracking, and joining coordination. We develop a recruitment plan based on the number of vacancies, required skills, job location, salary range, interview process, and expected joining date.',
      features: [
        'New office or branch openings',
        'BPO and customer support operations',
        'Retail store expansions',
        'Sales team recruitment sprints',
        'Manufacturing workforce requirements',
        'Warehouse and logistics operations',
        'Field sales campaigns & seasonal hiring',
        'Business expansion projects & customer service teams'
      ],
      order: 3
    },
    {
      serviceId: 'executive',
      icon: 'users',
      title: 'Executive Search Services',
      shortDesc: 'Our executive search services help organisations identify experienced professionals for senior management and leadership positions.',
      longDesc: 'Our executive recruitment approach focuses on experience, leadership capability, industry expertise, professional background, organisational suitability, and long-term business requirements. We maintain confidentiality throughout the executive search and leadership recruitment process.',
      features: [
        'Chief Executive Officer (CEO)',
        'Chief Operating Officer (CO)',
        'Chief Financial Officer (CFO)',
        'Directors & Vice Presidents',
        'General Managers & Department Heads',
        'Regional Managers & Business Leaders',
        'Senior Consultants & Tech Leaders'
      ],
      order: 4
    },
    {
      serviceId: 'contract',
      icon: 'clock',
      title: 'Contract Staffing Services',
      shortDesc: 'Geo India Limited provides contract staffing solutions for temporary, project-based, seasonal, or fixed-term requirements.',
      longDesc: 'Contract staffing can help businesses manage workforce requirements without immediately creating long-term permanent positions. We help employers identify suitable contract professionals based on the project duration, required skills, experience, job location, working schedule, and budget.',
      features: [
        'Short-term projects & fixed-duration assignments',
        'Seasonal workloads & peak periods',
        'Temporary employee replacements',
        'Technology implementation projects',
        'Business expansion & operational projects',
        'Client-specific & specialized assignments'
      ],
      order: 5
    },
    {
      serviceId: 'permanent',
      icon: 'trending',
      title: 'Permanent Staffing Services',
      shortDesc: 'Our permanent staffing services help employers recruit suitable candidates for long-term positions within their organisations.',
      longDesc: 'We manage the permanent recruitment process from initial requirement discussion to candidate joining. Permanent staffing is suitable for companies looking to build stable teams and recruit employees who can contribute to long-term business growth.',
      features: [
        'Understanding the job requirement',
        'Preparing candidate profiles & sourcing professionals',
        'Resume screening & candidate shortlisting',
        'Interview coordination & selection communication',
        'Offer follow-up & joining assistance'
      ],
      order: 6
    },
    {
      serviceId: 'payroll',
      icon: 'rupee',
      title: 'Payroll Management Services',
      shortDesc: 'Geo India Limited provides payroll support services to help businesses manage employee salary processing and records.',
      longDesc: 'Our payroll solutions can be customised according to the organisation’s employee strength, salary structure, attendance policy, and reporting requirements. This ensures accurate and timely payroll cycles.',
      features: [
        'Monthly salary processing & leave calculations',
        'Employee attendance & documentation records',
        'Payslip generation & statutory deductions',
        'Payroll reporting & reimbursement tracking',
        'Employee data management & final settlements'
      ],
      order: 7
    },
    {
      serviceId: 'rpo',
      icon: 'globe',
      title: 'Recruitment Process Outsourcing',
      shortDesc: 'Our RPO services allow businesses to outsource part or all of their recruitment activities to our experienced team.',
      longDesc: 'Geo India Limited can work as an extended recruitment partner for your organisation. RPO services are suitable for businesses with regular hiring requirements, multiple job openings, limited internal recruitment resources, or plans for rapid expansion.',
      features: [
        'Workforce planning & job description preparation',
        'Recruitment campaign management & sourcing',
        'Resume screening & interview coordination',
        'Candidate communication & offer management',
        'Employer branding & candidate joining follow-up',
        'Recruitment database management & reporting'
      ],
      order: 8
    }
  ];

  await Service.deleteMany({});
  await Service.insertMany(defaultServices);
  logger.info(`Seeded ${defaultServices.length} Services`);
}

async function seedBlogs() {
  const admin = await User.findOne({ email: 'admin@jobreqruitment.com' });
  if (!admin) {
    logger.error('Admin user not found for seeding blogs');
    return;
  }

  // Find blog categories
  const careerAdviceCat = await Category.findOne({ name: 'Career Advice', type: 'blog' });
  const hiringTrendsCat = await Category.findOne({ name: 'Hiring Trends', type: 'blog' });
  const interviewTipsCat = await Category.findOne({ name: 'Interview Tips', type: 'blog' });

  const defaultBlogs = [
    {
      title: 'How to Build a Modern Resume in 2026',
      excerpt: 'A comprehensive guide to writing a standout resume that gets you noticed by top employers.',
      content: 'Writing a resume in 2026 requires a different approach than in previous years. With AI matching and ATS (Applicant Tracking Systems) being widely adopted by enterprise companies like GeoIndiaLimited, it is critical to tailor your resume. In this article, we cover formatting, keywords, sections, and structural patterns that yield maximum success.',
      author: admin._id,
      category: careerAdviceCat?._id,
      tags: ['resume', 'career', 'jobseeker'],
      status: 'published',
      isFeatured: true,
      publishedAt: new Date(),
    },
    {
      title: 'Top IT Skills in High Demand This Year',
      excerpt: 'Find out which programming languages, frameworks, and tools are most sought after in the current job market.',
      content: 'The technology landscape is moving fast. Right now, Cloud Infrastructure, Artificial Intelligence, and Full Stack Javascript frameworks (like Node.js, React, and TypeScript) are extremely hot. This guide details exactly what skills you should focus on to land high-paying IT roles in major Indian hubs.',
      author: admin._id,
      category: hiringTrendsCat?._id,
      tags: ['IT', 'technology', 'skills'],
      status: 'published',
      isFeatured: true,
      publishedAt: new Date(),
    },
    {
      title: 'Cracking the Tech Interview: 5 Critical Rules',
      excerpt: 'Essential tips and strategies to help you ace technical screenings and behavioral interviews.',
      content: 'Interviews can be stressful, but preparation is key. We outline 5 critical rules that candidates should follow, including system design basics, coding problem practice, behavioral structure (STAR method), and showing cultural fit during follow-up conversations.',
      author: admin._id,
      category: interviewTipsCat?._id,
      tags: ['interview', 'preparation', 'tech'],
      status: 'published',
      isFeatured: false,
      publishedAt: new Date(),
    }
  ];

  const blogsWithSlugs = defaultBlogs.map((blog) => ({
    ...blog,
    slug: slugify(blog.title, { lower: true, strict: true }),
  }));

  await Blog.deleteMany({});
  await Blog.insertMany(blogsWithSlugs);
  logger.info(`Seeded ${defaultBlogs.length} Blogs`);
}

async function seedCareers() {
  const defaultCareers = [
    { title: 'Recruitment Executive', dept: 'HR & Sourcing', loc: 'Mumbai / Remote', exp: '1-2 Years', salary: '2.5 - 4 LPA', order: 1 },
    { title: 'Senior Recruiter', dept: 'Client Hiring', loc: 'Pune / Noida', exp: '3-5 Years', salary: '4.5 - 6.5 LPA', order: 2 },
    { title: 'HR Generalist / HR Executive', dept: 'Administration', loc: 'Mumbai', exp: '2-4 Years', salary: '3 - 5 LPA', order: 3 },
    { title: 'Business Development Executive', dept: 'Client Acquisition', loc: 'Delhi NCR', exp: '1-3 Years', salary: '3.5 - 5 LPA + Incentives', order: 4 },
    { title: 'Digital Marketing Executive', dept: 'Marketing', loc: 'Remote', exp: '1-3 Years', salary: '3 - 4.5 LPA', order: 5 },
    { title: 'Office Administrator', dept: 'Operations', loc: 'Mumbai', exp: '1-3 Years', salary: '2 - 3 LPA', order: 6 },
  ];

  await Career.deleteMany({});
  await Career.insertMany(defaultCareers);
  logger.info(`Seeded ${defaultCareers.length} Careers`);
}

async function seedJobs() {
  const admin = await User.findOne({ email: 'admin@jobreqruitment.com' });
  if (!admin) {
    logger.error('Admin user not found for seeding jobs');
    return;
  }

  // Find or create Company
  let company = await Company.findOne({ name: 'Geo India Operations' });
  if (!company) {
    company = await Company.create({
      name: 'Geo India Operations',
      employer: admin._id,
      description: 'Enterprise recruitment and staffing operations division.',
      website: 'https://geoindialimited.com',
      isVerified: true,
      locations: [{
        address: 'Geo House, Bandra West',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
      }]
    });
  }

  // Find categories
  const softwareDevCat = await Category.findOne({ name: 'Software Development', type: 'job_category' });
  const dataScienceCat = await Category.findOne({ name: 'Data Science', type: 'job_category' });
  const designCat = await Category.findOne({ name: 'Design', type: 'job_category' });
  const salesCat = await Category.findOne({ name: 'Sales', type: 'job_category' });
  const hrCat = await Category.findOne({ name: 'Human Resources', type: 'job_category' });
  const marketingCat = await Category.findOne({ name: 'Marketing', type: 'job_category' });

  const defaultJobs = [
    {
      title: 'Senior React Developer',
      company: company._id,
      employer: admin._id,
      category: softwareDevCat?._id,
      employmentType: 'full-time',
      workMode: 'remote',
      experienceLevel: 'senior',
      experienceMin: 5,
      experienceMax: 8,
      description: 'We are seeking a senior React Developer to build high-performance web interfaces and manage frontend deployments.',
      requirements: ['Expert proficiency in React and TypeScript', '5+ years software engineering experience', 'Experience with modern bundlers and build tools'],
      locations: [{ city: 'Mumbai', state: 'Maharashtra', country: 'India' }],
      salary: { min: 80000, max: 120000, currency: 'INR', period: 'monthly', isVisible: true },
      skills: [{ name: 'React' }, { name: 'TypeScript' }, { name: 'CSS' }],
      status: 'published',
      publishedAt: new Date()
    },
    {
      title: 'Node.js Backend Engineer',
      company: company._id,
      employer: admin._id,
      category: softwareDevCat?._id,
      employmentType: 'full-time',
      workMode: 'hybrid',
      experienceLevel: 'mid',
      experienceMin: 3,
      experienceMax: 5,
      description: 'Join our team to construct robust microservices and secure database APIs using Express, Mongoose, and Redis.',
      requirements: ['Strong Node.js and Express development skills', 'Experience with MongoDB and indexing optimizations', 'Understanding of RESTful API standards'],
      locations: [{ city: 'Pune', state: 'Maharashtra', country: 'India' }],
      salary: { min: 60000, max: 95000, currency: 'INR', period: 'monthly', isVisible: true },
      skills: [{ name: 'Node.js' }, { name: 'Express' }, { name: 'MongoDB' }],
      status: 'published',
      publishedAt: new Date()
    },
    {
      title: 'Lead Data Scientist',
      company: company._id,
      employer: admin._id,
      category: dataScienceCat?._id,
      employmentType: 'full-time',
      workMode: 'remote',
      experienceLevel: 'lead',
      experienceMin: 6,
      experienceMax: 10,
      description: 'Guide our analytics division to build ML models, recommendation engines, and neural networks in python.',
      requirements: ['Mastery of Python, Pandas, and Scikit-Learn', '6+ years data science implementation', 'Experience deploying ML pipelines to production cloud setups'],
      locations: [{ city: 'Bangalore', state: 'Karnataka', country: 'India' }],
      salary: { min: 120000, max: 180000, currency: 'INR', period: 'monthly', isVisible: true },
      skills: [{ name: 'Python' }, { name: 'Machine Learning' }, { name: 'SQL' }],
      status: 'published',
      publishedAt: new Date()
    },
    {
      title: 'UI/UX Designer',
      company: company._id,
      employer: admin._id,
      category: designCat?._id,
      employmentType: 'full-time',
      workMode: 'hybrid',
      experienceLevel: 'mid',
      experienceMin: 2,
      experienceMax: 4,
      description: 'Create beautiful user interfaces, interactive wireframes, and harmonious design systems in Figma.',
      requirements: ['Expert proficiency with Figma and prototyping tools', 'Solid understanding of layout systems and UX design practices', 'Strong portfolio showing mobile & web UI outputs'],
      locations: [{ city: 'Delhi', state: 'Delhi NCR', country: 'India' }],
      salary: { min: 50000, max: 75000, currency: 'INR', period: 'monthly', isVisible: true },
      skills: [{ name: 'Figma' }, { name: 'UI Design' }, { name: 'UX Prototyping' }],
      status: 'published',
      publishedAt: new Date()
    },
    {
      title: 'HR Recruiter',
      company: company._id,
      employer: admin._id,
      category: hrCat?._id,
      employmentType: 'full-time',
      workMode: 'on-site',
      experienceLevel: 'entry',
      experienceMin: 1,
      experienceMax: 3,
      description: 'Coordinate end-to-end recruitment pipelines, vet candidate profiles, and schedule corporate interviews.',
      requirements: ['Excellent communication and screening capabilities', 'Familiarity with job boards and candidate databases', 'Strong organizational skills'],
      locations: [{ city: 'Noida', state: 'Uttar Pradesh', country: 'India' }],
      salary: { min: 25000, max: 40000, currency: 'INR', period: 'monthly', isVisible: true },
      skills: [{ name: 'Recruitment' }, { name: 'Communication' }, { name: 'HR Operations' }],
      status: 'published',
      publishedAt: new Date()
    },
    {
      title: 'Business Development Manager',
      company: company._id,
      employer: admin._id,
      category: salesCat?._id,
      employmentType: 'full-time',
      workMode: 'on-site',
      experienceLevel: 'lead',
      experienceMin: 4,
      experienceMax: 7,
      description: 'Lead client acquisition campaigns and build long-term relationships with enterprise partners across India.',
      requirements: ['Proven experience in corporate B2B sales', '4+ years client acquisition records', 'Strong negotiation and presentation capabilities'],
      locations: [{ city: 'Mumbai', state: 'Maharashtra', country: 'India' }],
      salary: { min: 70000, max: 110000, currency: 'INR', period: 'monthly', isVisible: true },
      skills: [{ name: 'B2B Sales' }, { name: 'Client Relations' }, { name: 'Negotiation' }],
      status: 'published',
      publishedAt: new Date()
    },
    {
      title: 'Software Engineer Intern',
      company: company._id,
      employer: admin._id,
      category: softwareDevCat?._id,
      employmentType: 'internship',
      workMode: 'remote',
      experienceLevel: 'entry',
      experienceMin: 0,
      experienceMax: 1,
      description: 'Study software workflows, participate in agile scrum standups, and resolve bugs in JavaScript repositories.',
      requirements: ['Basic understanding of JavaScript and web architecture', 'Familiarity with Git and version control flow', 'Eagerness to learn production workflows'],
      locations: [{ city: 'Bangalore', state: 'Karnataka', country: 'India' }],
      salary: { min: 15000, max: 25000, currency: 'INR', period: 'monthly', isVisible: true },
      skills: [{ name: 'JavaScript' }, { name: 'Git' }, { name: 'HTML/CSS' }],
      status: 'published',
      publishedAt: new Date()
    },
    {
      title: 'DevOps & Infrastructure Architect',
      company: company._id,
      employer: admin._id,
      category: softwareDevCat?._id,
      employmentType: 'contract',
      workMode: 'remote',
      experienceLevel: 'senior',
      experienceMin: 5,
      experienceMax: 9,
      description: 'Audit cloud infrastructure, construct automated CI/CD deployment pipelines, and configure Kubernetes systems.',
      requirements: ['Expertise with AWS and cloud configuration', 'Experience with Docker, Kubernetes, and Terraform', 'Strong scripting skills in Bash or Python'],
      locations: [{ city: 'Hyderabad', state: 'Telangana', country: 'India' }],
      salary: { min: 100000, max: 150000, currency: 'INR', period: 'monthly', isVisible: true },
      skills: [{ name: 'DevOps' }, { name: 'AWS' }, { name: 'Docker/Kubernetes' }],
      status: 'published',
      publishedAt: new Date()
    },
    {
      title: 'Digital Marketing Strategist',
      company: company._id,
      employer: admin._id,
      category: marketingCat?._id,
      employmentType: 'part-time',
      workMode: 'remote',
      experienceLevel: 'mid',
      experienceMin: 2,
      experienceMax: 5,
      description: 'Manage digital advertising campaigns, optimize SEO search rankings, and design strategic growth funnels.',
      requirements: ['Solid understanding of SEO best practices and tools', 'Experience running social media ad campaigns', 'Data-driven analysis capabilities'],
      locations: [{ city: 'Chennai', state: 'Tamil Nadu', country: 'India' }],
      salary: { min: 35000, max: 55000, currency: 'INR', period: 'monthly', isVisible: true },
      skills: [{ name: 'SEO' }, { name: 'AdWords' }, { name: 'Growth Marketing' }],
      status: 'published',
      publishedAt: new Date()
    },
    {
      title: 'Office Operations Coordinator',
      company: company._id,
      employer: admin._id,
      category: hrCat?._id,
      employmentType: 'full-time',
      workMode: 'on-site',
      experienceLevel: 'entry',
      experienceMin: 1,
      experienceMax: 3,
      description: 'Manage admin operations, organize client schedules, track office inventories, and support general HR generalist processes.',
      requirements: ['Strong coordination and communication capabilities', 'Proficiency with spreadsheets and report software', 'Detail-oriented organizer'],
      locations: [{ city: 'Pune', state: 'Maharashtra', country: 'India' }],
      salary: { min: 20000, max: 32000, currency: 'INR', period: 'monthly', isVisible: true },
      skills: [{ name: 'Office Operations' }, { name: 'Communication' }, { name: 'Organization' }],
      status: 'published',
      publishedAt: new Date()
    }
  ];

  await Job.deleteMany({});
  
  // Create jobs while generating their slugs
  for (const job of defaultJobs) {
    job.slug = slugify(job.title, { lower: true, strict: true }) + '-' + Date.now().toString(36);
    await Job.create(job);
  }

  logger.info(`Seeded ${defaultJobs.length} Jobs`);
}

seed();