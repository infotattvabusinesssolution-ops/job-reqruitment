import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  HiMail, 
  HiPhone, 
  HiLocationMarker, 
  HiClock, 
  HiPaperAirplane, 
  HiCheck, 
  HiOfficeBuilding, 
  HiUserGroup, 
  HiSparkles,
  HiCheckCircle,
  HiShieldCheck,
  HiLightBulb
} from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

import axiosInstance from '../api/axiosInstance';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    enquiryType: 'Employer Services',
    serviceRequired: 'IT Recruitment',
    vacancies: '1',
    jobLocation: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTypeSelect = (type) => {
    setFormData((prev) => ({ ...prev, enquiryType: type }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      toast.error('Please fill in required fields (Name, Email, Message).');
      return;
    }

    setSubmitted(true);
    try {
      await axiosInstance.post('/contact/submit', formData);
      toast.success('Your enquiry has been submitted successfully! Our recruitment team will contact you shortly.');
      setFormData({
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        enquiryType: 'Employer Services',
        serviceRequired: 'IT Recruitment',
        vacancies: '1',
        jobLocation: '',
        message: '',
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <div className="pt-20 pb-20 bg-gray-50 min-h-screen">
      <Helmet>
        <title>Contact Us - Geo India Limited</title>
        <meta name="description" content="Contact Geo India Limited for recruitment services, corporate training, staffing solutions, executive search, and payroll support." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary-950 via-primary-900 to-secondary-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(217,119,6,0.12),transparent)] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center px-4 py-1.5 bg-accent-500/20 border border-accent-500/30 rounded-full text-accent-300 text-xs font-bold tracking-widest uppercase mb-4">
              <HiSparkles className="w-3.5 h-3.5 mr-1.5" /> Direct Contact & Consultation
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white leading-tight">
              Get in Touch with Our <span className="gradient-text">Experts</span>
            </h1>
            <p className="text-sm sm:text-base text-secondary-300 max-w-2xl mx-auto leading-relaxed mt-3">
              Partner with Geo India Limited for end-to-end recruitment, corporate training, bulk hiring, executive search, and verified talent placement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: HiLocationMarker,
              title: 'Corporate HQ',
              desc: 'Mahagun Mantra, Greater Noida West',
              sub: 'Tower Siddhi, 7th Floor, Unit 723',
              action: 'Get Directions',
              link: 'https://maps.google.com/?q=Mahagun+Mantra+Greater+Noida+West',
              accent: 'from-blue-500 to-indigo-600',
            },
            {
              icon: HiPhone,
              title: 'Call Support',
              desc: '+91 120 319 3279',
              sub: 'Mon - Sat, 9:30 AM to 6:30 PM',
              action: 'Call Us Now',
              link: 'tel:+911203193279',
              accent: 'from-accent-500 to-amber-600',
            },
            {
              icon: FaWhatsapp,
              title: 'WhatsApp Chat',
              desc: '+91 96346 85866',
              sub: 'Instant recruiter messaging',
              action: 'Start WhatsApp Chat',
              link: 'https://wa.me/919634685866',
              accent: 'from-emerald-500 to-teal-600',
            },
            {
              icon: HiMail,
              title: 'Official Email',
              desc: 'Hr@geoindialimited.com',
              sub: 'Prompt response within 24 hours',
              action: 'Send Email',
              link: 'mailto:Hr@geoindialimited.com',
              accent: 'from-purple-500 to-indigo-600',
            },
          ].map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between group text-left"
            >
              <div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.accent} text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-secondary-900 text-sm mb-1">{item.title}</h3>
                <p className="text-xs font-semibold text-primary-700 mb-1">{item.desc}</p>
                <p className="text-[11px] text-secondary-500 leading-relaxed mb-4">{item.sub}</p>
              </div>
              <a
                href={item.link}
                target={item.link.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-bold text-primary-600 group-hover:text-primary-800 transition-colors gap-1 pt-2 border-t border-gray-100"
              >
                {item.action} <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Section: Form & Support Widgets */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Form Column (7 Cols) */}
            <motion.div
              {...fadeInUp}
              className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-gray-150 shadow-xl space-y-6 text-left"
            >
              <div>
                <div className="inline-flex items-center px-3 py-1 bg-primary-50 rounded-full text-primary-700 text-[11px] font-bold uppercase tracking-wider mb-2">
                  <HiOfficeBuilding className="w-3.5 h-3.5 mr-1" /> Client & Candidate Request
                </div>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-secondary-900">
                  Send Us a <span className="gradient-text">Message</span>
                </h2>
                <p className="text-xs sm:text-sm text-secondary-500 mt-1">
                  Fill out the form below and our dedicated talent manager will reach out within 24 hours.
                </p>
              </div>

              {/* Interactive Type Selector Tabs */}
              <div>
                <label className="block text-[11px] font-bold text-secondary-700 uppercase tracking-wider mb-2">
                  Select Enquiry Type
                </label>
                <div className="grid grid-cols-3 gap-2 p-1.5 bg-gray-100 rounded-xl">
                  {[
                    { label: 'Employer Services', icon: HiOfficeBuilding },
                    { label: 'Job Seeker Support', icon: HiUserGroup },
                    { label: 'General Inquiry', icon: HiLightBulb },
                  ].map((tab) => {
                    const isActive = formData.enquiryType === tab.label;
                    return (
                      <button
                        key={tab.label}
                        type="button"
                        onClick={() => handleTypeSelect(tab.label)}
                        className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
                          isActive
                            ? 'bg-primary-600 text-white shadow-md'
                            : 'text-secondary-600 hover:text-secondary-900 hover:bg-gray-200/60'
                        }`}
                      >
                        <tab.icon className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{tab.label}</span>
                        <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-secondary-700 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-200 rounded-xl p-3 text-xs bg-white text-secondary-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all shadow-sm"
                      placeholder="e.g. Aditya Sharma"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-secondary-700 uppercase tracking-wider mb-1.5">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl p-3 text-xs bg-white text-secondary-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all shadow-sm"
                      placeholder="e.g. Enterprise Solutions Pvt Ltd"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-secondary-700 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-200 rounded-xl p-3 text-xs bg-white text-secondary-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all shadow-sm"
                      placeholder="business@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-secondary-700 uppercase tracking-wider mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl p-3 text-xs bg-white text-secondary-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all shadow-sm"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-secondary-700 uppercase tracking-wider mb-1.5">
                      Service Required *
                    </label>
                    <select
                      name="serviceRequired"
                      value={formData.serviceRequired}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl p-3 text-xs bg-white text-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all shadow-sm"
                    >
                      <option value="IT Recruitment">IT Recruitment</option>
                      <option value="Non-IT Recruitment">Non-IT Recruitment</option>
                      <option value="Bulk Hiring">Bulk Hiring</option>
                      <option value="Executive Search">Executive Search</option>
                      <option value="Contract Staffing">Contract Staffing</option>
                      <option value="Permanent Staffing">Permanent Staffing</option>
                      <option value="Payroll Services">Payroll Services</option>
                      <option value="RPO Solutions">RPO Solutions</option>
                      <option value="Corporate Training">Corporate Training</option>
                      <option value="Internship Programs">Internship Programs</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-secondary-700 uppercase tracking-wider mb-1.5">
                      Vacancies / Positions
                    </label>
                    <input
                      type="number"
                      min={1}
                      name="vacancies"
                      value={formData.vacancies}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl p-3 text-xs bg-white text-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-secondary-700 uppercase tracking-wider mb-1.5">
                    Target Job Location
                  </label>
                  <input
                    type="text"
                    name="jobLocation"
                    value={formData.jobLocation}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl p-3 text-xs bg-white text-secondary-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all shadow-sm"
                    placeholder="e.g. Greater Noida, Delhi NCR, Mumbai, Remote"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-secondary-700 uppercase tracking-wider mb-1.5">
                    Detailed Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full border border-gray-200 rounded-xl p-3 text-xs bg-white text-secondary-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none transition-all shadow-sm"
                    placeholder="Describe your candidate profile requirements, timeline, budget range, or questions..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitted}
                  className="w-full sm:w-auto bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white rounded-xl px-10 py-3.5 text-xs font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-75"
                >
                  {submitted ? (
                    <>
                      <HiCheck className="w-4 h-4 animate-bounce" /> Submitted Successfully!
                    </>
                  ) : (
                    <>
                      <HiPaperAirplane className="w-4 h-4 rotate-45 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /> Submit Enquiry
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Right Column: WhatsApp & Working Hours (5 Cols) */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="lg:col-span-5 space-y-6 text-left"
            >
              {/* WhatsApp Support Box */}
              <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-secondary-950 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden border border-emerald-500/20">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="relative z-10 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                    <FaWhatsapp className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-white">Instant WhatsApp Connect</h3>
                    <p className="text-xs text-emerald-200 mt-1 leading-relaxed">
                      Need immediate candidate profiles or urgent staffing consultation? Chat directly with our lead recruiters.
                    </p>
                  </div>

                  <div className="space-y-2.5 py-2">
                    {[
                      'Direct line to Senior Recruitment Managers',
                      'Share requirements & salary ranges instantly',
                      'Get candidate shortlist updates in real-time',
                    ].map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-xs text-emerald-100 font-medium">
                        <HiCheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="https://wa.me/919634685866"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-emerald-500 hover:bg-emerald-400 text-secondary-950 font-extrabold text-xs rounded-xl px-6 py-3.5 shadow-lg transition-all transform hover:-translate-y-0.5"
                  >
                    Chat on WhatsApp (+91 96346 85866)
                  </a>
                </div>
              </div>

              {/* Working Hours Card */}
              <div className="bg-white rounded-3xl p-8 border border-gray-150 shadow-lg space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                    <HiClock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-secondary-900 text-sm">Business Operations Hours</h3>
                    <p className="text-[11px] text-secondary-500">Standard Indian Standard Time (IST)</p>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-3 space-y-2 text-xs text-secondary-700">
                  <div className="flex justify-between py-1">
                    <span className="font-semibold text-secondary-600">Monday - Saturday:</span>
                    <span className="font-bold text-primary-700">9:30 AM - 6:30 PM</span>
                  </div>
                  <div className="flex justify-between py-1 border-t border-gray-50">
                    <span className="font-semibold text-secondary-600">Sundays & Holidays:</span>
                    <span className="font-bold text-red-500">Closed</span>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-gradient-to-r from-primary-50 via-white to-accent-50 rounded-3xl p-6 border border-gray-200/80 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-gray-150 shadow-sm flex items-center justify-center text-primary-600 flex-shrink-0">
                  <HiShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-secondary-900 text-xs">Verified Recruitment Agency</h4>
                  <p className="text-[11px] text-secondary-500 leading-relaxed mt-0.5">
                    Zero upfront fees charged to job seekers. Transparent enterprise hiring agreements.
                  </p>
                </div>
              </div>

            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;