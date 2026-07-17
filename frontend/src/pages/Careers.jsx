import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  HiBriefcase,
  HiLightBulb,
  HiAcademicCap,
  HiUserGroup,
  HiArrowRight,
  HiMail,
} from 'react-icons/hi';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.1 },
  transition: { duration: 0.6 },
};

const Careers = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: 'Recruitment Executive',
    coverLetter: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error('Please fill in your name and email address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      toast.success('Application submitted successfully! Our HR team will get back to you.');
      setFormData({ name: '', email: '', phone: '', position: 'Recruitment Executive', coverLetter: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  const vacancies = [
    { title: 'Recruitment Executive', dept: 'HR & Sourcing', loc: 'Mumbai / Remote', exp: '1-2 Years', salary: '2.5 - 4 LPA' },
    { title: 'Senior Recruiter', dept: 'Client Hiring', loc: 'Pune / Noida', exp: '3-5 Years', salary: '4.5 - 6.5 LPA' },
    { title: 'HR Generalist / HR Executive', dept: 'Administration', loc: 'Mumbai', exp: '2-4 Years', salary: '3 - 5 LPA' },
    { title: 'Business Development Executive', dept: 'Client Acquisition', loc: 'Delhi NCR', exp: '1-3 Years', salary: '3.5 - 5 LPA + Incentives' },
    { title: 'Digital Marketing Executive', dept: 'Marketing', loc: 'Remote', exp: '1-3 Years', salary: '3 - 4.5 LPA' },
    { title: 'Office Administrator', dept: 'Operations', loc: 'Mumbai', exp: '1-3 Years', salary: '2 - 3 LPA' },
  ];

  const internships = [
    'Human Resources & Recruitment',
    'Business Development & Client Relations',
    'Digital Marketing & Content Strategy',
    'Operations & Database Management'
  ];

  const benefits = [
    'Professional, supportive work environment',
    'Practical end-to-end recruitment experience',
    'Continuous structured learning & development',
    'Fast-track career development opportunities',
    'Performance recognition & competitive incentives',
    'Exposure to hiring trends across multiple industries',
    'Direct client communication and handling experience'
  ];

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <Helmet><title>Careers - Join Our Recruitment Team - Geo India Limited</title></Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-r from-secondary-900 via-secondary-800 to-primary-950 text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-heading font-bold"
          >
            Careers at Geo India Limited
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-secondary-200 max-w-2xl mx-auto"
          >
            Join our recruitment team and help connect talent with opportunities across India.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-150 shadow-sm space-y-6 text-left"
            >
              <h2 className="text-xl font-heading font-bold text-secondary-900 flex items-center gap-1.5 border-b border-gray-100 pb-3">
                <HiLightBulb className="w-5 h-5 text-yellow-500" /> Why Work With Geo India Limited?
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start text-xs text-secondary-700 font-semibold">
                    <span className="text-green-500 text-sm">✓</span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Vacancies */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-150 shadow-sm space-y-6 text-left"
            >
              <h2 className="text-xl font-heading font-bold text-secondary-900 flex items-center gap-1.5 border-b border-gray-100 pb-3">
                <HiBriefcase className="w-5 h-5 text-primary-500" /> Internal Job Vacancies
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {vacancies.map((job, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 border border-gray-100 rounded-xl space-y-2">
                    <h4 className="font-bold text-secondary-950 text-xs">{job.title}</h4>
                    <div className="text-[10px] text-secondary-500 space-y-1 font-semibold">
                      <p>Department: {job.dept}</p>
                      <p>Location: {job.loc}</p>
                      <p>Experience: {job.exp}</p>
                      <p>Expected Salary: {job.salary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Internships */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-150 shadow-sm space-y-4 text-left"
            >
              <h2 className="text-xl font-heading font-bold text-secondary-900 flex items-center gap-1.5 border-b border-gray-100 pb-3">
                <HiAcademicCap className="w-5 h-5 text-indigo-500" /> Internship Opportunities
              </h2>
              <p className="text-xs text-secondary-600 leading-relaxed">
                Geo India Limited offers internships to help students and freshers gain practical industry experience and understand professional recruitment processes.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {internships.map((intern, idx) => (
                  <span key={idx} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-lg border border-indigo-150">
                    {intern}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm space-y-6 sticky top-28"
            >
              <div>
                <h3 className="text-lg font-bold text-secondary-900 flex items-center gap-2">
                  <HiMail className="w-5 h-5 text-primary-500" /> Join Our Team
                </h3>
                <p className="text-xs text-secondary-400">Apply for internal vacancies or internships.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Aditya Sharma"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Position applied *</label>
                  <select
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                  >
                    <option value="Recruitment Executive">Recruitment Executive</option>
                    <option value="Senior Recruiter">Senior Recruiter</option>
                    <option value="HR Generalist">HR Generalist / HR Executive</option>
                    <option value="Business Development">Business Development Executive</option>
                    <option value="Digital Marketing">Digital Marketing Executive</option>
                    <option value="Internship Track">Internship Track</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Message / Cover Letter</label>
                  <textarea
                    rows={4}
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    placeholder="Briefly describe your interest or credentials..."
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-xl py-3 text-xs font-bold transition-all shadow-md inline-flex items-center justify-center gap-1"
                >
                  Apply Now <HiArrowRight className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
