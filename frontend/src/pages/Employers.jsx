import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import axiosInstance from '../api/axiosInstance';
import {
  HiShieldCheck,
  HiBriefcase,
  HiCheckCircle,
  HiPaperAirplane,
} from 'react-icons/hi';

const Employers = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    jobPosition: '',
    vacancies: '1',
    jobLocation: '',
    qualification: '',
    experience: '',
    salaryRange: '',
    skills: '',
    employmentType: 'Permanent',
    joiningDate: '',
    jobDescription: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.companyName || !formData.contactPerson || !formData.email || !formData.jobPosition) {
      toast.error('Please fill in the required fields (Company, Contact Person, Email, Job Position).');
      return;
    }

    setIsSubmitting(true);
    try {
      await axiosInstance.post('/employers/hiring-support', formData);
      toast.success('Hiring requirement submitted successfully! Our recruitment team will review and contact you.');
      setFormData({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        jobPosition: '',
        vacancies: '1',
        jobLocation: '',
        qualification: '',
        experience: '',
        salaryRange: '',
        skills: '',
        employmentType: 'Permanent',
        joiningDate: '',
        jobDescription: '',
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit hiring requirement. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { step: '01', title: 'Understanding the Hiring Requirement', desc: 'We discuss the employer’s job vacancies, required skills, qualifications, experience level, salary budget, job location, employment type, and expected hiring timeline.' },
    { step: '02', title: 'Recruitment Planning', desc: 'Our team prepares a recruitment strategy based on the complexity of the position, number of vacancies, candidate availability, and employer expectations.' },
    { step: '03', title: 'Candidate Sourcing', desc: 'We source candidates through recruitment databases, professional networks, job platforms, employee referrals, social media, and direct candidate outreach.' },
    { step: '04', title: 'Resume Screening', desc: 'Candidate profiles are reviewed according to qualifications, experience, technical skills, employment history, location, salary expectations, and job suitability.' },
    { step: '05', title: 'Candidate Shortlisting', desc: 'Relevant candidate profiles are shortlisted and shared with the employer for review.' },
    { step: '06', title: 'Interview Coordination', desc: 'We communicate with candidates and employers to schedule interviews and provide necessary updates.' },
    { step: '07', title: 'Selection and Offer Support', desc: 'After candidate selection, we assist with offer communication, document requirements, salary discussions, and joining confirmation.' },
    { step: '08', title: 'Joining Follow-Up', desc: 'Our recruitment team follows up with the selected candidate until the joining process is completed.' },
  ];

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <Helmet><title>Recruitment Solutions for Employers - Geo India Limited</title></Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-r from-secondary-900 via-secondary-800 to-primary-950 text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-heading font-bold"
          >
            Hire Qualified Candidates for Your Business
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-secondary-200 max-w-2xl mx-auto"
          >
            Geo India Limited helps businesses reduce recruitment workload by managing candidate sourcing, screening, and interview coordination.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* SLA and TAT */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-150 shadow-sm space-y-4"
            >
              <h2 className="text-xl font-heading font-bold text-secondary-900 flex items-center gap-2 border-b border-gray-100 pb-3">
                <HiShieldCheck className="w-5 h-5 text-primary-600" /> SLA and Recruitment Turnaround Time
              </h2>
              <p className="text-xs text-secondary-600 leading-relaxed">
                The recruitment turnaround time depends on several factors, including: type of position, number of vacancies, required skills, required experience, job location, salary range, candidate availability, interview process, employer response time, and expected joining date.
              </p>
              <p className="text-xs text-secondary-650 leading-relaxed font-semibold">
                Before starting the recruitment assignment, our team will discuss the expected service process, candidate delivery timeline, communication method, and recruitment terms.
              </p>
            </motion.div>

            {/* 8-Step Recruitment Process */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-150 shadow-sm space-y-6"
            >
              <h2 className="text-xl font-heading font-bold text-secondary-900 flex items-center gap-2 border-b border-gray-100 pb-3">
                <HiCheckCircle className="w-5 h-5 text-green-500" /> Our Recruitment Process
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {steps.map((st, idx) => (
                  <div key={idx} className="flex gap-4 items-start border-b border-gray-50 pb-4">
                    <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center font-bold text-xs text-primary-600 flex-shrink-0">
                      {st.step}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-secondary-800">{st.title}</h4>
                      <p className="text-[11px] text-secondary-500 leading-relaxed">{st.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar Request Form */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm space-y-6"
            >
              <div>
                <h3 className="text-lg font-bold text-secondary-900 flex items-center gap-2">
                  <HiPaperAirplane className="w-4 h-4 text-primary-500 rotate-45" /> Request Hiring Support
                </h3>
                <p className="text-xs text-secondary-400">Share your recruitment requirements with our team.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {/* Company Name */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-secondary-700 uppercase tracking-wider">Company Name *</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Geo India Limited"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs bg-white text-secondary-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>

                {/* Contact Person */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-secondary-700 uppercase tracking-wider">Contact Person Name *</label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Rajesh Kumar"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs bg-white text-secondary-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-secondary-700 uppercase tracking-wider">Official Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="business@company.com"
                      className="w-full border border-gray-200 rounded-xl p-2.5 text-xs bg-white text-secondary-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-secondary-700 uppercase tracking-wider">Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full border border-gray-200 rounded-xl p-2.5 text-xs bg-white text-secondary-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                </div>

                {/* Job Position and Vacancies */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-secondary-700 uppercase tracking-wider">Job Position *</label>
                    <input
                      type="text"
                      name="jobPosition"
                      value={formData.jobPosition}
                      onChange={handleChange}
                      required
                      placeholder="e.g. HR Executive"
                      className="w-full border border-gray-200 rounded-xl p-2.5 text-xs bg-white text-secondary-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-secondary-700 uppercase tracking-wider">No. of Vacancies</label>
                    <input
                      type="number"
                      min={1}
                      name="vacancies"
                      value={formData.vacancies}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl p-2.5 text-xs bg-white text-secondary-900 focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                </div>

                {/* Location and Qualification */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-secondary-700 uppercase tracking-wider">Job Location</label>
                    <input
                      type="text"
                      name="jobLocation"
                      value={formData.jobLocation}
                      onChange={handleChange}
                      placeholder="e.g. Mumbai, India"
                      className="w-full border border-gray-200 rounded-xl p-2.5 text-xs bg-white text-secondary-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-secondary-700 uppercase tracking-wider">Required Qualification</label>
                    <input
                      type="text"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      placeholder="e.g. MBA / B.Tech"
                      className="w-full border border-gray-200 rounded-xl p-2.5 text-xs bg-white text-secondary-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                </div>

                {/* Experience & Salary */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-secondary-700 uppercase tracking-wider">Experience Level</label>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="e.g. 2-5 Years"
                      className="w-full border border-gray-200 rounded-xl p-2.5 text-xs bg-white text-secondary-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-secondary-700 uppercase tracking-wider">Salary Range</label>
                    <input
                      type="text"
                      name="salaryRange"
                      value={formData.salaryRange}
                      onChange={handleChange}
                      placeholder="e.g. 4-6 LPA"
                      className="w-full border border-gray-200 rounded-xl p-2.5 text-xs bg-white text-secondary-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                </div>

                {/* Skills & Joining Date */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-secondary-700 uppercase tracking-wider">Required Skills</label>
                    <input
                      type="text"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="e.g. IT Sourcing, Screening"
                      className="w-full border border-gray-200 rounded-xl p-2.5 text-xs bg-white text-secondary-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-secondary-700 uppercase tracking-wider">Expected Joining</label>
                    <input
                      type="text"
                      name="joiningDate"
                      value={formData.joiningDate}
                      onChange={handleChange}
                      placeholder="e.g. Immediate / 15 days"
                      className="w-full border border-gray-200 rounded-xl p-2.5 text-xs bg-white text-secondary-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                </div>

                {/* Job Description Text */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-secondary-700 uppercase tracking-wider">Complete Job Description</label>
                  <textarea
                    rows={4}
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleChange}
                    placeholder="Enter full job roles and responsibility parameters here..."
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs bg-white text-secondary-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-xl py-3 text-xs font-bold transition-all shadow-md"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Requirement'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employers;