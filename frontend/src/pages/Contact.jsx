import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { HiMail, HiPhone, HiLocationMarker, HiClock, HiPaperAirplane, HiCheck } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      toast.error('Please fill in required fields (Name, Email, Message).');
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      toast.success('Your enquiry has been submitted successfully! Our team will contact you.');
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
      setSubmitted(false);
    }, 1500);
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <Helmet><title>Contact Us - Geo India Limited</title></Helmet>

      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl font-heading font-bold text-secondary-900 mb-4">
              Discuss Your <span className="gradient-text">Recruitment Requirements</span>
            </h1>
            <p className="text-sm text-secondary-650 max-w-2xl mx-auto">
              Contact Geo India Limited for recruitment services, staffing solutions, bulk hiring, executive search, payroll support, contract staffing, permanent staffing, or RPO services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12 border-b border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: HiLocationMarker, title: 'Office Address', info: 'Geo India Limited\n723, 7th Floor, Tower Siddhi,\nMahagun Mantra, Greater Noida West 201306', bg: 'bg-blue-50', text: 'text-blue-600' },
              { icon: HiPhone, title: 'Phone / WhatsApp Support', info: 'Phone: +91 120 319 3279\nWhatsApp: +91 96346 85866', bg: 'bg-green-50', text: 'text-green-600' },
              { icon: HiMail, title: 'Email Address', info: 'Hr@geoindialimited.com\nEnquiry Response in 24 hrs', bg: 'bg-purple-50', text: 'text-purple-600' },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm"
              >
                <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <item.icon className={`w-6 h-6 ${item.text}`} />
                </div>
                <h3 className="font-semibold text-secondary-900 mb-2 text-sm">{item.title}</h3>
                <p className="text-secondary-500 text-xs whitespace-pre-line leading-relaxed">{item.info}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & WhatsApp Widget */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
              <div>
                <h2 className="text-2xl font-heading font-bold text-secondary-900">Let Us Help You Find the Right Talent</h2>
                <p className="text-xs text-secondary-500 mt-1">Please provide your contact information and recruitment requirement.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                      placeholder="e.g. Aditya Sharma"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider mb-2">Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                      placeholder="e.g. Company Pvt Ltd"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                      placeholder="business@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider mb-2">Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider mb-2">Enquiry Type *</label>
                    <select
                      name="enquiryType"
                      value={formData.enquiryType}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                    >
                      <option value="Employer Services">Employer Services</option>
                      <option value="Job Seeker Support">Job Seeker Support</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider mb-2">Service Required *</label>
                    <select
                      name="serviceRequired"
                      value={formData.serviceRequired}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                    >
                      <option value="IT Recruitment">IT Recruitment</option>
                      <option value="Non-IT Recruitment">Non-IT Recruitment</option>
                      <option value="Bulk Hiring">Bulk Hiring</option>
                      <option value="Executive Search">Executive Search</option>
                      <option value="Contract Staffing">Contract Staffing</option>
                      <option value="Permanent Staffing">Permanent Staffing</option>
                      <option value="Payroll Services">Payroll Services</option>
                      <option value="RPO Solutions">RPO Solutions</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider mb-2">Vacancies</label>
                    <input
                      type="number"
                      min={1}
                      name="vacancies"
                      value={formData.vacancies}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider mb-2">Job Location</label>
                  <input
                    type="text"
                    name="jobLocation"
                    value={formData.jobLocation}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="e.g. Mumbai, Maharashtra"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                    placeholder="Describe your requirement or details here..."
                  />
                </div>

                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 text-white rounded-xl px-8 py-3 text-xs font-bold shadow-md inline-flex items-center gap-1.5"
                >
                  {submitted ? (
                    <>
                      <HiCheck className="w-4 h-4" /> Submitted!
                    </>
                  ) : (
                    <>
                      <HiPaperAirplane className="w-4 h-4 rotate-45" /> Submit Enquiry
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* WhatsApp & Info */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
              {/* WhatsApp Widget */}
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-secondary-900 space-y-4 text-left">
                <h3 className="text-lg font-heading font-bold text-green-950 flex items-center gap-2">
                  <FaWhatsapp className="w-6 h-6 text-green-600" /> WhatsApp Recruitment Support
                </h3>
                <p className="text-xs text-green-900 leading-relaxed">
                  Connect with Geo India Limited through WhatsApp to discuss your recruitment and staffing requirements. Please share your company name, required position, number of vacancies, job location, salary range, and preferred joining date.
                </p>
                <div>
                  <a
                    href="https://wa.me/919634685866"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-xl px-5 py-3 shadow-md"
                  >
                    <FaWhatsapp className="w-4 h-4" /> Chat with Our Recruitment Team
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="bg-white rounded-2xl p-8 border border-gray-150 shadow-sm text-left space-y-3">
                <h3 className="text-sm font-heading font-bold text-secondary-900 flex items-center gap-1.5">
                  <HiClock className="w-5 h-5 text-primary-500" /> Working Hours
                </h3>
                <p className="text-xs text-secondary-650 leading-relaxed">
                  Monday to Saturday: 9:30 AM to 6:30 PM IST<br />
                  Closed on Sundays and National Holidays.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;