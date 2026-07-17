import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroImg from '../assets/image/hero-img.png';
import { FaWhatsapp } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import {
  HiSearch,
  HiLocationMarker,
  HiBriefcase,
  HiOfficeBuilding,
  HiUserGroup,
  HiStar,
  HiArrowRight,
  HiCheck,
  HiShieldCheck,
  HiLightningBolt,
  HiChartBar,
  HiPhone,
  HiMail,
  HiChat,
  HiClock,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.15 },
  transition: { duration: 0.6 },
};

const stagger = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: false, amount: 0.15 },
};

const Hero = () => (
  <section className="relative min-h-[90vh] pt-16 md:pt-34 flex items-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-200/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary-100/20 to-accent-100/20 rounded-full blur-3xl" />
    </div>

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="text-center lg:text-left flex flex-col items-center lg:items-start">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-sm font-medium mb-6">
            <HiShieldCheck className="w-4 h-4 mr-2" />
            Trusted Recruitment Partner
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-secondary-900 leading-tight mb-6">
            Connecting Businesses with <span className="gradient-text">Exceptional Talent</span>
          </h1>
          <p className="text-xs sm:text-sm text-secondary-650 mb-8 max-w-xl leading-relaxed">
            Geo India Limited is a trusted recruitment and staffing company helping businesses find qualified, skilled, and reliable candidates across India. We provide customised hiring solutions for startups, small businesses, growing companies, and large organisations.
          </p>

          {/* Quick Search */}
          <div className="bg-white rounded-2xl shadow-xl shadow-primary-150 p-3 mb-8 w-full">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input type="text" placeholder="Job title or skills..." className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-secondary-50 border-0 focus:ring-2 focus:ring-primary-500 outline-none text-xs" />
              </div>
              <div className="flex-1 relative">
                <HiLocationMarker className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input type="text" placeholder="Location or remote..." className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-secondary-50 border-0 focus:ring-2 focus:ring-primary-500 outline-none text-xs" />
              </div>
              <Link to="/jobs" className="btn-primary px-8 py-3.5 text-xs whitespace-nowrap">
                Browse Jobs
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
            {[
              { value: '15+', label: 'Years of Experience' },
              { value: '50K+', label: 'Placed Talent' },
              { value: '5K+', label: 'Partner Enterprises' },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <p className="text-2xl font-heading font-bold text-secondary-900">{stat.value}</p>
                <p className="text-xs text-secondary-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Content */}
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="hidden lg:block relative">
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="relative flex items-center justify-center"
          >
            <img src={heroImg} alt="Empowering Indian Enterprises - Geo India Limited" className="w-full h-auto max-h-[500px] object-contain rounded-3xl drop-shadow-xl" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);

const AboutPreview = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div {...fadeInUp} className="text-center lg:text-left flex flex-col items-center lg:items-start">
          <h2 className="text-3xl font-heading font-bold text-secondary-900 mb-6">About Geo India Limited</h2>
          <p className="text-xs text-secondary-650 leading-relaxed mb-6">
            Geo India Limited is a professional recruitment, staffing, and workforce solutions company committed to connecting employers with suitable talent across India.
          </p>
          <p className="text-xs text-secondary-650 leading-relaxed mb-8">
            We understand that hiring the right employee requires time, industry knowledge, candidate screening, interview coordination, and continuous follow-up. Our recruitment consultants work closely with employers to understand their workforce requirements and provide relevant candidate profiles.
          </p>
          <Link to="/about" className="inline-flex items-center text-xs font-bold text-primary-600 hover:text-primary-700 gap-1.5 hover:underline">
            Read Our Story <HiArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div {...fadeInUp} className="bg-gradient-to-br from-secondary-50 to-primary-50 p-8 rounded-3xl border border-gray-100 grid grid-cols-2 gap-4">
          {[
            { title: 'Excellence', desc: 'Verified placement assurance.' },
            { title: 'Velocity', desc: '48-hour candidate delivery.' },
            { title: 'Accuracy', desc: 'AI-assisted profile filtering.' },
            { title: 'Compliance', desc: 'Complete third-party legal setups.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100">
              <h4 className="font-bold text-secondary-900 text-sm mb-1">{item.title}</h4>
              <p className="text-[11px] text-secondary-500">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

const ServicesPreview = () => {
  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.18
      }
    }
  };

  const serviceCardVariant = {
    initial: { opacity: 0, y: 80, scale: 0.92 },
    whileInView: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const services = [
    { 
      icon: HiBriefcase, 
      title: 'Permanent Staffing', 
      desc: 'Vetted direct hires looking to build careers at your firm.', 
      color: 'blue',
      bgLight: 'bg-blue-50/70',
      iconColor: 'text-blue-600',
      shadowColor: 'hover:shadow-[0_20px_40px_rgba(59,130,246,0.12)] hover:border-blue-200'
    },
    { 
      icon: HiClock, 
      title: 'Contract Staffing', 
      desc: 'On-demand contract talent for project sprints.', 
      color: 'teal',
      bgLight: 'bg-teal-50/70',
      iconColor: 'text-teal-600',
      shadowColor: 'hover:shadow-[0_20px_40px_rgba(20,184,166,0.12)] hover:border-teal-200'
    },
    { 
      icon: HiUserGroup, 
      title: 'Executive Search', 
      desc: 'Boardroom-level leadership and C-suite placements.', 
      color: 'purple',
      bgLight: 'bg-purple-50/70',
      iconColor: 'text-purple-600',
      shadowColor: 'hover:shadow-[0_20px_40px_rgba(168,85,247,0.12)] hover:border-purple-200'
    },
    { 
      icon: HiLightningBolt, 
      title: 'Bulk Hiring', 
      desc: 'Volume hiring mobilizations for immediate scale.', 
      color: 'amber',
      bgLight: 'bg-amber-50/70',
      iconColor: 'text-amber-600',
      shadowColor: 'hover:shadow-[0_20px_40px_rgba(245,158,11,0.12)] hover:border-amber-200'
    },
  ];

  return (
    <section className="py-20 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-3xl font-heading font-bold text-secondary-900 mb-4">Our Services</h2>
          <p className="text-xs text-secondary-500 max-w-md mx-auto">Specialized staffing workflows to meet your project goals</p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: false, amount: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((svc, idx) => (
            <motion.div
              key={idx}
              variants={serviceCardVariant}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`bg-white p-7 rounded-3xl border border-gray-100 shadow-sm transition-all duration-500 ease-out flex flex-col justify-between ${svc.shadowColor}`}
            >
              <div>
                <div className={`w-12 h-12 ${svc.bgLight} rounded-2xl flex items-center justify-center mb-6`}>
                  <svc.icon className={`w-6 h-6 ${svc.iconColor}`} />
                </div>
                <h3 className="font-bold text-secondary-900 text-sm mb-3">{svc.title}</h3>
                <p className="text-[11px] text-secondary-500 leading-relaxed mb-6 font-semibold">{svc.desc}</p>
              </div>
              <Link to="/services" className={`text-xs font-bold ${svc.iconColor} inline-flex items-center gap-1 hover:underline`}>
                Read Details <HiArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const IndustriesPreview = () => {
  const industries = [
    { name: 'IT', icon: '💻' },
    { name: 'BPO/KPO', icon: '📞' },
    { name: 'BFSI', icon: '🏦' },
    { name: 'Healthcare', icon: '🏥' },
    { name: 'Manufacturing', icon: '🏭' },
    { name: 'Retail / E-comm', icon: '🛍️' },
    { name: 'Telecom', icon: '📡' },
  ];

  const doubledIndustries = [...industries, ...industries, ...industries, ...industries];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div {...fadeInUp} className="text-center">
          <h2 className="text-3xl font-heading font-bold text-secondary-900 mb-4">Industries We Serve</h2>
          <p className="text-xs text-secondary-500 max-w-md mx-auto">Providing qualified, skilled, and reliable candidates across key sectors in India.</p>
        </motion.div>
      </div>

      {/* Marquee scroll container */}
      <div className="w-full overflow-hidden relative py-2">
        {/* Soft edge gradients */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white via-white/85 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white via-white/85 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex gap-4">
          {doubledIndustries.map((ind, idx) => (
            <Link
              key={idx}
              to="/industries"
              className="min-w-[140px] p-5 bg-gray-50 border border-gray-150 rounded-2xl hover:bg-primary-50 hover:border-primary-200 transition-all flex flex-col items-center justify-center gap-3 text-center"
            >
              <span className="text-3xl">{ind.icon}</span>
              <span className="text-xs font-semibold text-secondary-800">{ind.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProcessSection = () => {
  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.18
      }
    }
  };

  const processCardVariant = {
    initial: { opacity: 0, y: 80, scale: 0.92 },
    whileInView: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const steps = [
    { step: '01', title: 'Understanding Hiring Need', desc: 'We discuss the employer’s job vacancies, required skills, and timeline.' },
    { step: '02', title: 'Candidate Sourcing', desc: 'We source candidates through databases, networks, and outreach.' },
    { step: '03', title: 'Resume Vetting', desc: 'Candidate profiles are screened for experience and suitability.' },
    { step: '04', title: 'Interview & Joining Support', desc: 'We coordinate interviews and follow up until final candidate joining.' },
  ];

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-3xl font-heading font-bold text-secondary-900 mb-4">Our Recruitment Process</h2>
          <p className="text-xs text-secondary-500 max-w-md mx-auto">Transparent, verified stages ensuring talent accuracy</p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: false, amount: 0.1 }}
          className="grid md:grid-cols-4 gap-8"
        >
          {steps.map((st, idx) => (
            <motion.div
              key={idx}
              variants={processCardVariant}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm relative transition-all duration-500 ease-out hover:shadow-primary-100/50 hover:border-primary-200 group text-left"
            >
              <span className="text-3xl font-heading font-black text-primary-200/50 absolute top-6 right-6 transition-colors duration-300 group-hover:text-primary-450/70">{st.step}</span>
              <h3 className="font-bold text-secondary-900 text-sm mb-3">{st.title}</h3>
              <p className="text-[11px] text-secondary-500 leading-relaxed font-semibold">{st.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Testimonials = () => (
  <section className="py-20 bg-white border-t border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div {...fadeInUp} className="text-center mb-16">
        <h2 className="text-3xl font-heading font-bold text-secondary-900 mb-4">Client Testimonials</h2>
        <p className="text-xs text-secondary-500 max-w-md mx-auto">What partner companies say about our staffing velocity</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { quote: "Geo India Limited delivered vetted React developers in just 48 hours. Exceptional turnaround time and support.", author: "COO, InnovateLabs India" },
          { quote: "Our contract staffing requirements were met with extreme speed. Compliant payroll services saved us hours.", author: "HR Director, TechCorp Services" },
          { quote: "Placed boardroom leaders with high discretion. Their executive search team is the best in the country.", author: "CEO, NexGen Telecommunications" },
        ].map((item, idx) => (
          <div key={idx} className="bg-gray-50 border border-gray-100 p-6 rounded-2xl space-y-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, starIdx) => <HiStar key={starIdx} className="w-4 h-4 text-yellow-500" />)}
            </div>
            <p className="text-xs text-secondary-600 italic leading-relaxed">"{item.quote}"</p>
            <p className="text-[11px] font-bold text-secondary-950">- {item.author}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ContactHome = () => {
  const [data, setData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.name || !data.email) {
      toast.error('Name and Email are required.');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast.success('Thank you! Message dispatched successfully.');
      setData({ name: '', email: '', message: '' });
      setSubmitting(false);
    }, 1200);
  };

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
            <h2 className="text-3xl font-heading font-bold text-secondary-900">Partner With Us</h2>
            <p className="text-sm text-secondary-500 leading-relaxed">
              Have candidate needs, custom project scopes, or want to discuss permanent placements? Our dedicated account managers are online.
            </p>
            <div className="space-y-3 text-xs text-secondary-600 flex flex-col items-center lg:items-start font-semibold">
              <div className="flex items-center gap-2">
                <HiPhone className="w-4 h-4 text-primary-500" /> Phone: +91 120 319 3279
              </div>
              <div className="flex items-center gap-2">
                <FaWhatsapp className="w-4 h-4 text-green-500" /> WhatsApp: +91 96346 85866
              </div>
              <div className="flex items-center gap-2">
                <HiMail className="w-4 h-4 text-primary-500" /> Email: Hr@geoindialimited.com
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-150 shadow-sm space-y-4">
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Your Name</label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                placeholder="John Doe"
                className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-855 outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="john@example.com"
                className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-855 outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Message</label>
              <textarea
                rows={3}
                value={data.message}
                onChange={(e) => setData({ ...data, message: e.target.value })}
                placeholder="Describe your staffing needs..."
                className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-855 outline-none focus:ring-2 focus:ring-primary-500"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white rounded-xl py-3 text-xs font-bold transition-all shadow-md"
            >
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div>
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <IndustriesPreview />
      <ProcessSection />
      <Testimonials />
      <ContactHome />
    </div>
  );
};

export default Home;