import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  HiBriefcase,
  HiUserGroup,
  HiDesktopComputer,
  HiCurrencyRupee,
  HiGlobeAlt,
  HiUsers,
  HiTrendingUp,
  HiArrowRight,
  HiCheckCircle,
  HiClock,
} from 'react-icons/hi';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.1 },
  transition: { duration: 0.6 },
};

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 'it',
      icon: HiDesktopComputer,
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
    },
    {
      id: 'non-it',
      icon: HiBriefcase,
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
    },
    {
      id: 'bulk',
      icon: HiUserGroup,
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
    },
    {
      id: 'executive',
      icon: HiUsers,
      title: 'Executive Search Services',
      shortDesc: 'Our executive search services help organisations identify experienced professionals for senior management and leadership positions.',
      longDesc: 'Our executive recruitment approach focuses on experience, leadership capability, industry expertise, professional background, organisational suitability, and long-term business requirements. We maintain confidentiality throughout the executive search and leadership recruitment process.',
      features: [
        'Chief Executive Officer (CEO)',
        'Chief Operating Officer (COO)',
        'Chief Financial Officer (CFO)',
        'Directors & Vice Presidents',
        'General Managers & Department Heads',
        'Regional Managers & Business Leaders',
        'Senior Consultants & Tech Leaders'
      ],
    },
    {
      id: 'contract',
      icon: HiClock,
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
    },
    {
      id: 'permanent',
      icon: HiTrendingUp,
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
    },
    {
      id: 'payroll',
      icon: HiCurrencyRupee,
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
    },
    {
      id: 'rpo',
      icon: HiGlobeAlt,
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
    },
  ];

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <Helmet><title>Our Recruitment & Staffing Services - Geo India Limited</title></Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-r from-secondary-900 via-secondary-800 to-primary-950 text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-heading font-bold"
          >
            Our Staffing & Recruitment Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-secondary-200 max-w-2xl mx-auto"
          >
            Customised hiring solutions for startups, small businesses, growing companies, and large organisations.
          </motion.p>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc) => (
            <motion.div
              key={svc.id}
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={fadeInUp.viewport}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedService(svc)}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-150 shadow-sm cursor-pointer hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-6">
                  <svc.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-heading font-bold text-secondary-900 mb-2">{svc.title}</h3>
                <p className="text-xs text-secondary-500 leading-relaxed mb-6">{svc.shortDesc}</p>
              </div>

              <div className="flex items-center text-xs font-semibold text-primary-600 gap-1 hover:underline">
                Learn Details & Positions <HiArrowRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Popup for Details */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-xl relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
            >
              &times;
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                <selectedService.icon className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-secondary-900">{selectedService.title}</h3>
            </div>

            <p className="text-sm text-secondary-650 leading-relaxed">{selectedService.longDesc}</p>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-secondary-500 uppercase tracking-wider">Scope and Roles We Recruit</h4>
              <div className="grid sm:grid-cols-2 gap-2 text-xs text-secondary-700 font-medium">
                {selectedService.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <HiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedService(null)}
                className="px-6 py-2.5 bg-secondary-900 hover:bg-secondary-800 text-white rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Services;