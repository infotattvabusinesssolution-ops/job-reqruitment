import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  HiSearch,
  HiBriefcase,
  HiCheckCircle,
  HiAcademicCap,
  HiDocumentText,
  HiMail,
  HiArrowRight,
  HiCloudUpload,
} from 'react-icons/hi';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.15 },
  transition: { duration: 0.6 },
};

const JobSeekers = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    currentLocation: '',
    preferredLocation: '',
    highestQualification: '',
    workExperience: '',
    currentJobTitle: '',
    currentSalary: '',
    expectedSalary: '',
    noticePeriod: '',
    preferredIndustry: '',
    preferredJobRole: '',
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.email || !resumeFile) {
      toast.error('Please fill in required fields (Name, Phone, Email) and upload your resume.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      toast.success('Your resume and details have been submitted successfully!');
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        currentLocation: '',
        preferredLocation: '',
        highestQualification: '',
        workExperience: '',
        currentJobTitle: '',
        currentSalary: '',
        expectedSalary: '',
        noticePeriod: '',
        preferredIndustry: '',
        preferredJobRole: '',
      });
      setResumeFile(null);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <Helmet><title>Find Your Next Job Opportunity - Geo India Limited</title></Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-r from-secondary-900 via-secondary-800 to-primary-950 text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-heading font-bold"
          >
            Find Your Next Job Opportunity
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-secondary-200 max-w-2xl mx-auto"
          >
            Geo India Limited helps job seekers explore suitable career opportunities across different industries in India.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Disclaimer */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.6 }}
              className="bg-amber-50 rounded-2xl p-6 border border-amber-200 text-xs text-amber-850 leading-relaxed font-semibold space-y-2"
            >
              <h4 className="font-heading font-bold text-amber-900">Candidate Disclaimer</h4>
              <p>
                Geo India Limited does not guarantee employment to any candidate. Job opportunities depend on employer requirements, vacancy availability, candidate qualifications, skills, experience, interview performance, document verification, and final selection.
              </p>
              <p className="text-danger-700 font-bold">
                * Candidates should not provide money or confidential banking information to any unauthorised person claiming to represent Geo India Limited.
              </p>
            </motion.div>

            {/* Advice Sections */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-150 shadow-sm space-y-6 text-left"
            >
              <h2 className="text-xl font-heading font-bold text-secondary-900 border-b border-gray-100 pb-3">
                Career Tips for Job Seekers
              </h2>

              <div className="space-y-6">
                {/* Resume Build */}
                <div className="space-y-2">
                  <h3 className="font-heading font-bold text-secondary-900 text-sm flex items-center gap-1.5">
                    <HiDocumentText className="w-5 h-5 text-primary-500" /> How to Create a Professional Resume
                  </h3>
                  <p className="text-xs text-secondary-500 leading-relaxed">
                    Keep your resume clear, accurate, and relevant to the job you are applying for. Include your contact details, career summary, qualifications, skills, work experience, achievements, and certifications. Avoid adding incorrect employment information or skills that you cannot explain during an interview.
                  </p>
                </div>

                {/* Interview Prep */}
                <div className="space-y-2">
                  <h3 className="font-heading font-bold text-secondary-900 text-sm flex items-center gap-1.5">
                    <HiSearch className="w-5 h-5 text-teal-500" /> How to Prepare for a Job Interview
                  </h3>
                  <p className="text-xs text-secondary-500 leading-relaxed">
                    Research the company, understand the job description, revise your skills, prepare examples from your experience, and practise answering common interview questions. Attend the interview on time and maintain professional communication.
                  </p>
                </div>

                {/* Employer Skills */}
                <div className="space-y-2">
                  <h3 className="font-heading font-bold text-secondary-900 text-sm flex items-center gap-1.5">
                    <HiCheckCircle className="w-5 h-5 text-green-500" /> Skills Employers Look for
                  </h3>
                  <p className="text-xs text-secondary-500 leading-relaxed">
                    Employers commonly evaluate: Job-related knowledge, communication skills, problem-solving ability, teamwork, time management, professional attitude, adaptability, reliability, and willingness to learn.
                  </p>
                </div>

                {/* Freshers */}
                <div className="space-y-2">
                  <h3 className="font-heading font-bold text-secondary-900 text-sm flex items-center gap-1.5">
                    <HiAcademicCap className="w-5 h-5 text-indigo-500" /> Tips for Freshers
                  </h3>
                  <p className="text-xs text-secondary-500 leading-relaxed">
                    Freshers should focus on developing practical skills, improving communication, creating a professional resume, completing relevant internships, and preparing for basic interview questions. Highlight academic projects, certifications, internships, and transferable skills.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Upload Resume Form */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm space-y-6"
            >
              <div className="text-center sm:text-left flex flex-col items-center sm:items-start">
                <h3 className="text-lg font-bold text-secondary-900 flex items-center gap-2 justify-center sm:justify-start">
                  <HiMail className="w-5 h-5 text-primary-500" /> Upload Your Resume
                </h3>
                <p className="text-xs text-secondary-400">Provide details to match future opportunities.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {/* Full name */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Aditya Sharma"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>

                {/* Contact email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Phone Number *</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 98765 43210"
                      className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                </div>

                {/* Current & Preferred Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Current Location</label>
                    <input
                      type="text"
                      name="currentLocation"
                      value={formData.currentLocation}
                      onChange={handleChange}
                      placeholder="e.g. Pune"
                      className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Preferred Location</label>
                    <input
                      type="text"
                      name="preferredLocation"
                      value={formData.preferredLocation}
                      onChange={handleChange}
                      placeholder="e.g. Mumbai / Bangalore"
                      className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                </div>

                {/* Qualification & Experience */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Highest Qualification</label>
                    <input
                      type="text"
                      name="highestQualification"
                      value={formData.highestQualification}
                      onChange={handleChange}
                      placeholder="e.g. B.Tech / MBA"
                      className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Total Experience</label>
                    <input
                      type="text"
                      name="workExperience"
                      value={formData.workExperience}
                      onChange={handleChange}
                      placeholder="e.g. 3 Years"
                      className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                </div>

                {/* Job Title & Notice Period */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Current Job Title</label>
                    <input
                      type="text"
                      name="currentJobTitle"
                      value={formData.currentJobTitle}
                      onChange={handleChange}
                      placeholder="e.g. Developer"
                      className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Notice Period</label>
                    <input
                      type="text"
                      name="noticePeriod"
                      value={formData.noticePeriod}
                      onChange={handleChange}
                      placeholder="e.g. 30 Days"
                      className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                </div>

                {/* Current & Expected Salary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Current Salary (LPA)</label>
                    <input
                      type="text"
                      name="currentSalary"
                      value={formData.currentSalary}
                      onChange={handleChange}
                      placeholder="e.g. 4.5 LPA"
                      className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Expected Salary (LPA)</label>
                    <input
                      type="text"
                      name="expectedSalary"
                      value={formData.expectedSalary}
                      onChange={handleChange}
                      placeholder="e.g. 6.5 LPA"
                      className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                </div>

                {/* Preferred Industry & Preferred Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Preferred Industry</label>
                    <input
                      type="text"
                      name="preferredIndustry"
                      value={formData.preferredIndustry}
                      onChange={handleChange}
                      placeholder="e.g. IT Services"
                      className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Preferred Job Role</label>
                    <input
                      type="text"
                      name="preferredJobRole"
                      value={formData.preferredJobRole}
                      onChange={handleChange}
                      placeholder="e.g. React Developer"
                      className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                </div>

                {/* Upload File */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider font-sans">Upload Resume (PDF/Word) *</label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer bg-gray-50 hover:bg-primary-50/20 hover:border-primary-400 transition-all p-4 text-center">
                    <div className="flex flex-col items-center justify-center pt-2 pb-3">
                      <HiCloudUpload className="w-8 h-8 text-primary-500 mb-2" />
                      <p className="text-xs text-secondary-700 font-bold max-w-[200px] truncate">
                        {resumeFile ? resumeFile.name : 'Click to select resume'}
                      </p>
                      <p className="text-[10px] text-secondary-400 mt-1">PDF, DOC, or DOCX (Max. 5MB)</p>
                    </div>
                    <input
                      type="file"
                      required
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-xl py-3 text-xs font-bold transition-all shadow-md"
                >
                  {isSubmitting ? 'Uploading...' : 'Submit Resume'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekers;