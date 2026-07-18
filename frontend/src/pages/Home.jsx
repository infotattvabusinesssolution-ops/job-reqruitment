import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroImg from '../assets/image/hero-img.png';
import servicePermanent from '../assets/image/service_permanent.png';
import serviceContract from '../assets/image/service_contract.png';
import serviceExecutive from '../assets/image/service_executive.png';
import serviceBulk from '../assets/image/service_bulk.png';
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
        </motion.div>

        {/* Right Content */}
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="block relative mt-8 lg:mt-0">
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

const AboutPreview = () => {
  const pillars = [
    {
      title: 'Excellence',
      desc: 'Verified placement assurance.',
      icon: HiShieldCheck,
      bg: 'bg-blue-50/50 border-blue-100 hover:border-blue-200',
      iconBg: 'bg-blue-100/60 text-blue-600',
      yOffset: '',
    },
    {
      title: 'Velocity',
      desc: '48-hour candidate delivery.',
      icon: HiLightningBolt,
      bg: 'bg-emerald-50/50 border-emerald-100 hover:border-emerald-200',
      iconBg: 'bg-emerald-100/60 text-emerald-600',
      yOffset: 'lg:translate-y-6',
    },
    {
      title: 'Accuracy',
      desc: 'AI-assisted profile filtering.',
      icon: HiChartBar,
      bg: 'bg-purple-50/50 border-purple-100 hover:border-purple-200',
      iconBg: 'bg-purple-100/60 text-purple-600',
      yOffset: '',
    },
    {
      title: 'Compliance',
      desc: 'Complete third-party legal setups.',
      icon: HiOfficeBuilding,
      bg: 'bg-amber-50/50 border-amber-100 hover:border-amber-200',
      iconBg: 'bg-amber-100/60 text-amber-600',
      yOffset: 'lg:translate-y-6',
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Soft abstract backgrounds */}
      <div className="absolute top-20 right-0 w-[450px] h-[450px] bg-gradient-to-br from-primary-50/30 to-accent-50/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-gradient-to-br from-primary-100/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content and Badges */}
          <motion.div {...fadeInUp} className="text-center lg:text-left flex flex-col items-center lg:items-start space-y-6">
            <div className="inline-flex items-center px-4 py-1.5 bg-primary-50 border border-primary-100 rounded-full text-primary-750 text-[10px] font-extrabold tracking-wider uppercase">
              WHO WE ARE
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-secondary-900 leading-tight">
              About <span className="gradient-text font-extrabold">Geo India Limited</span>
            </h2>
            
            <p className="text-xs sm:text-sm text-secondary-650 leading-relaxed font-semibold">
              Geo India Limited is a professional recruitment, staffing, and workforce solutions company committed to connecting employers with suitable talent across India.
            </p>
            
            <p className="text-xs sm:text-sm text-secondary-650 leading-relaxed">
              We understand that hiring the right employee requires time, industry knowledge, candidate screening, interview coordination, and continuous follow-up. Our recruitment consultants work closely with employers to understand their workforce requirements and provide relevant candidate profiles.
            </p>

            {/* Quick Bullet Checklist */}
            <div className="grid grid-cols-2 gap-4 pt-4 w-full text-left">
              {[
                'Pan-India Network',
                'Industry-Specific Experts',
                '48-Hr Profile Turnaround',
                '100% Legal Compliance',
              ].map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 shrink-0">
                    <HiCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] font-extrabold text-secondary-800">{bullet}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link to="/about" className="inline-flex items-center text-xs font-extrabold text-primary-600 hover:text-primary-700 gap-1.5 hover:underline group">
                Read Our Story <HiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* Right: Dynamic Offset Pillars */}
          <motion.div {...fadeInUp} className="relative w-full py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10 lg:pb-12">
              {pillars.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={`bg-white/80 backdrop-blur-sm p-6 rounded-[2rem] border ${item.bg} shadow-[0_15px_35px_-15px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.06)] transition-all duration-500 flex flex-col items-start gap-4 text-left ${item.yOffset}`}
                >
                  <div className={`w-10 h-10 ${item.iconBg} rounded-xl flex items-center justify-center`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary-900 text-sm mb-1.5">{item.title}</h4>
                    <p className="text-[11px] text-secondary-500 font-semibold leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

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
    initial: { opacity: 0, y: 60 },
    whileInView: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const services = [
    { 
      icon: HiBriefcase, 
      badge: 'HIRE FOR THE LONG TERM',
      title: 'Permanent Staffing', 
      desc: 'Vetted direct hires looking to build careers at your firm.', 
      image: servicePermanent,
      color: 'blue',
      textColor: 'text-blue-600',
      badgeColor: 'text-blue-600 bg-blue-50/70 border border-blue-100',
      lineColor: 'bg-blue-600',
      iconBg: 'bg-blue-50/80',
      iconColor: 'text-blue-600',
      gradientBg: 'from-blue-400 to-indigo-600',
    },
    { 
      icon: HiClock, 
      badge: 'FLEXIBLE. FAST. RELIABLE',
      title: 'Contract Staffing', 
      desc: 'On-demand contract talent for project sprints.', 
      image: serviceContract,
      color: 'emerald',
      textColor: 'text-emerald-600',
      badgeColor: 'text-emerald-600 bg-emerald-50/70 border border-emerald-100',
      lineColor: 'bg-emerald-600',
      iconBg: 'bg-emerald-50/80',
      iconColor: 'text-emerald-600',
      gradientBg: 'from-emerald-400 to-teal-600',
    },
    { 
      icon: HiUserGroup, 
      badge: 'BUILD HIGH-PERFORMANCE TEAMS',
      title: 'Executive Search', 
      desc: 'Leadership hiring solutions for critical roles.', 
      image: serviceExecutive,
      color: 'purple',
      textColor: 'text-purple-600',
      badgeColor: 'text-purple-600 bg-purple-50/70 border border-purple-100',
      lineColor: 'bg-purple-600',
      iconBg: 'bg-purple-50/80',
      iconColor: 'text-purple-600',
      gradientBg: 'from-purple-400 to-indigo-600',
    },
    { 
      icon: HiLightningBolt, 
      badge: 'VOLUME HIRING ASSURANCES',
      title: 'Bulk Hiring', 
      desc: 'Volume hiring mobilizations for immediate scale.', 
      image: serviceBulk,
      color: 'amber',
      textColor: 'text-amber-600',
      badgeColor: 'text-amber-600 bg-amber-50/70 border border-amber-100',
      lineColor: 'bg-amber-600',
      iconBg: 'bg-amber-50/80',
      iconColor: 'text-amber-600',
      gradientBg: 'from-amber-400 to-orange-600',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 border-y border-gray-100">
      {/* Background Decorative Blur Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div {...fadeInUp} className="text-center mb-20">
          <h2 className="text-4xl font-heading font-bold text-secondary-900 mb-4">Our Services</h2>
          <p className="text-xs text-secondary-500 max-w-md mx-auto">Specialized staffing workflows to meet your project goals</p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: false, amount: 0.05 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {services.map((svc, idx) => (
            <motion.div
              key={idx}
              variants={serviceCardVariant}
              className="group bg-white rounded-[2.5rem] p-6 sm:p-8 border border-gray-100/85 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)] hover:border-gray-200 transition-all duration-500 flex flex-col justify-between relative overflow-hidden text-left"
            >
              {/* Subtle background decorative shapes inside the card */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-50 to-transparent rounded-full -mr-10 -mt-10 pointer-events-none" />

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  {/* Icon & Badge */}
                  <div className="flex flex-col gap-4 mb-5">
                    <div className={`w-12 h-12 ${svc.iconBg} rounded-2xl flex items-center justify-center`}>
                      <svc.icon className={`w-6 h-6 ${svc.iconColor}`} />
                    </div>
                    <span className={`px-3 py-1.5 rounded-full text-[9px] font-bold tracking-wider uppercase ${svc.badgeColor} self-start`}>
                      {svc.badge}
                    </span>
                  </div>

                  {/* Title & Line */}
                  <div className="space-y-2 mb-4">
                    <h3 className="text-lg md:text-xl font-heading font-bold text-secondary-900 leading-tight">
                      {svc.title}
                    </h3>
                    <div className={`w-10 h-1 rounded-full ${svc.lineColor}`} />
                  </div>

                  {/* Description */}
                  <p className="text-[11px] md:text-xs text-secondary-500 leading-relaxed font-semibold mb-6">
                    {svc.desc}
                  </p>
                </div>

                {/* Decorative Blob + Image */}
                <div className="relative w-full aspect-[1.4/1] mb-6 flex items-center justify-center select-none z-10">
                  {/* Dot Grid Pattern */}
                  <div className="absolute -right-3 -top-3 w-16 h-16 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:10px_10px] opacity-75 pointer-events-none" />
                  <div className="absolute -right-3 -bottom-3 w-16 h-16 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:10px_10px] opacity-75 pointer-events-none" />

                  {/* Soft Background Accent Glows */}
                  <div className={`absolute -bottom-2 -right-2 w-28 h-28 bg-gradient-to-tr ${svc.gradientBg} rounded-[1.5rem_2.5rem_1.5rem_3rem] opacity-85 blur-[1px] transition-transform duration-700 group-hover:scale-105 pointer-events-none`} />
                  <div className={`absolute -top-2 -left-2 w-24 h-24 bg-gradient-to-br ${svc.gradientBg} rounded-[2.5rem_1.5rem_3rem_1.5rem] opacity-25 blur-[1px] transition-transform duration-700 group-hover:scale-95 pointer-events-none`} />

                  {/* Main Rounded Image Container */}
                  <div className="relative w-full h-full rounded-[2rem] overflow-hidden border-[4px] border-white shadow-lg z-10">
                    <img 
                      src={svc.image} 
                      alt={svc.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    {/* Wavy Corner Overlay inside Image container */}
                    <div className={`absolute bottom-0 right-0 w-20 h-14 bg-gradient-to-tr ${svc.gradientBg} rounded-tl-[2.5rem] opacity-90 pointer-events-none z-20`} />
                  </div>
                </div>

                {/* Link */}
                <div className="z-10 mt-auto">
                  <Link 
                    to="/services" 
                    className={`inline-flex items-center gap-2 text-xs font-bold ${svc.textColor} hover:underline`}
                  >
                    Read Details <HiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const IndustriesPreview = () => {
  const industries = [
    { 
      name: 'IT', 
      icon: '💻', 
      bgLight: 'bg-blue-50 text-blue-600 border-blue-100', 
      hoverBg: 'hover:border-blue-300 hover:shadow-blue-50' 
    },
    { 
      name: 'BPO/KPO', 
      icon: '📞', 
      bgLight: 'bg-emerald-50 text-emerald-600 border-emerald-100', 
      hoverBg: 'hover:border-emerald-300 hover:shadow-emerald-50' 
    },
    { 
      name: 'BFSI', 
      icon: '🏦', 
      bgLight: 'bg-indigo-50 text-indigo-600 border-indigo-100', 
      hoverBg: 'hover:border-indigo-300 hover:shadow-indigo-50' 
    },
    { 
      name: 'Healthcare', 
      icon: '🏥', 
      bgLight: 'bg-rose-50 text-rose-600 border-rose-100', 
      hoverBg: 'hover:border-rose-300 hover:shadow-rose-50' 
    },
    { 
      name: 'Manufacturing', 
      icon: '🏭', 
      bgLight: 'bg-slate-50 text-slate-600 border-slate-100', 
      hoverBg: 'hover:border-slate-300 hover:shadow-slate-50' 
    },
    { 
      name: 'Retail / E-comm', 
      icon: '🛍️', 
      bgLight: 'bg-amber-50 text-amber-600 border-amber-100', 
      hoverBg: 'hover:border-amber-300 hover:shadow-amber-50' 
    },
    { 
      name: 'Telecom', 
      icon: '📡', 
      bgLight: 'bg-purple-50 text-purple-600 border-purple-100', 
      hoverBg: 'hover:border-purple-300 hover:shadow-purple-50' 
    },
  ];

  const doubledIndustries = [...industries, ...industries, ...industries, ...industries];

  return (
    <section className="py-24 bg-white relative overflow-hidden border-b border-gray-100">
      {/* Decorative background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-br from-primary-50/20 to-accent-50/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <motion.div {...fadeInUp} className="text-center flex flex-col items-center space-y-4">
          <div className="inline-flex items-center px-4 py-1.5 bg-primary-50 border border-primary-100 rounded-full text-primary-750 text-[10px] font-extrabold tracking-wider uppercase">
            SECTORS WE ALIGN WITH
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-secondary-900 leading-tight">
            Industries We <span className="gradient-text font-extrabold">Serve</span>
          </h2>
          <p className="text-xs text-secondary-500 max-w-md mx-auto">Providing qualified, skilled, and reliable candidates across key sectors in India.</p>
        </motion.div>
      </div>

      {/* Marquee scroll container */}
      <div className="w-full overflow-hidden relative py-6">
        {/* Soft edge gradients */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex gap-6">
          {doubledIndustries.map((ind, idx) => (
            <Link
              key={idx}
              to="/industries"
              className={`min-w-[155px] p-6 bg-white border border-gray-150 rounded-3xl transition-all duration-500 flex flex-col items-center justify-center gap-4 text-center group hover:-translate-y-2 shadow-[0_5px_15px_-5px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.05)] ${ind.hoverBg}`}
            >
              <div className={`w-14 h-14 ${ind.bgLight} rounded-2xl flex items-center justify-center text-3xl border transition-all duration-300 group-hover:scale-110 shadow-sm`}>
                {ind.icon}
              </div>
              <span className="text-xs font-bold text-secondary-800 tracking-tight group-hover:text-secondary-950 transition-colors">
                {ind.name}
              </span>
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
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 border-t border-gray-100">
      {/* Background Decorative Blur Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div {...fadeInUp} className="text-center mb-20 flex flex-col items-center space-y-4">
          <div className="inline-flex items-center px-4 py-1.5 bg-primary-50 border border-primary-100 rounded-full text-primary-750 text-[10px] font-extrabold tracking-wider uppercase">
            HOW WE WORK
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-secondary-900 leading-tight">
            Our Recruitment <span className="gradient-text font-extrabold">Process</span>
          </h2>
          <p className="text-xs text-secondary-500 max-w-md mx-auto">Transparent, verified stages ensuring talent accuracy</p>
        </motion.div>

        <div className="relative">
          {/* Connector Line behind cards (Desktop only) */}
          <div className="absolute top-[40%] left-[8%] right-[8%] border-t-2 border-dashed border-primary-200/60 z-0 pointer-events-none hidden lg:block" />

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: false, amount: 0.1 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10"
          >
            {steps.map((st, idx) => (
              <motion.div
                key={idx}
                variants={processCardVariant}
                whileHover={{ y: -8 }}
                className="bg-white p-8 rounded-[2rem] border border-gray-150 shadow-[0_15px_35px_-15px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.06)] hover:border-primary-300 transition-all duration-500 ease-out group text-left relative overflow-hidden flex flex-col min-h-[220px]"
              >
                {/* Large background watermark step number */}
                <div className="text-7xl font-black text-secondary-50 absolute -bottom-5 -right-3 select-none group-hover:text-primary-50/50 transition-colors duration-500 z-0">
                  {st.step}
                </div>

                <div className="relative z-10 flex-1 flex flex-col">
                  {/* Step Icon Badge */}
                  <div className="w-9 h-9 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center text-xs font-black mb-5 group-hover:bg-primary-600 group-hover:text-white transition-all duration-500 shadow-sm border border-primary-100/50">
                    {st.step}
                  </div>

                  {/* Title & Line */}
                  <div className="space-y-2 mb-3">
                    <h3 className="font-extrabold text-secondary-900 text-sm leading-snug group-hover:text-primary-750 transition-colors duration-300">{st.title}</h3>
                    <div className="w-6 h-1 rounded-full bg-gradient-to-r from-primary-400 to-accent-400 transition-all duration-500 group-hover:w-12" />
                  </div>

                  {/* Description */}
                  <p className="text-[11px] text-secondary-500 leading-relaxed font-semibold mt-1">
                    {st.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const testimonials = [
    { 
      quote: "Geo India Limited delivered vetted React developers in just 48 hours. Exceptional turnaround time and support.", 
      author: "COO", 
      company: "InnovateLabs India",
      initials: "IL",
      gradient: "from-blue-400 to-indigo-500",
    },
    { 
      quote: "Our contract staffing requirements were met with extreme speed. Compliant payroll services saved us hours.", 
      author: "HR Director", 
      company: "TechCorp Services",
      initials: "TC",
      gradient: "from-emerald-400 to-teal-500",
    },
    { 
      quote: "Placed boardroom leaders with high discretion. Their executive search team is the best in the country.", 
      author: "CEO", 
      company: "NexGen Telecommunications",
      initials: "NX",
      gradient: "from-purple-400 to-pink-500",
    },
  ];

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(timer);
  }, [current]);

  const t = testimonials[current];

  return (
    <section className="py-24 bg-white border-t border-gray-100 relative overflow-hidden">
      {/* Background soft glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-primary-50/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-50/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Header */}
        <motion.div {...fadeInUp} className="flex flex-col items-center space-y-4 mb-16">
          <div className="inline-flex items-center px-4 py-1.5 bg-primary-50 border border-primary-100 rounded-full text-primary-750 text-[10px] font-extrabold tracking-wider uppercase">
            PARTNER FEEDBACK
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-secondary-900 leading-tight">
            Client <span className="gradient-text font-extrabold">Testimonials</span>
          </h2>
          <p className="text-xs text-secondary-500 max-w-md mx-auto">What partner companies say about our staffing velocity</p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative min-h-[320px] md:min-h-[280px] flex items-center justify-center">
          
          {/* Main Card */}
          <div className="w-full bg-white/70 backdrop-blur-sm border border-gray-150 p-8 sm:p-12 rounded-[2.5rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.04)] relative">
            
            {/* Big quote mark decoration */}
            <span className="absolute top-6 left-8 text-7xl font-serif text-primary-200/40 select-none pointer-events-none">“</span>
            
            {/* Slide Content */}
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 flex flex-col items-center relative z-10"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, idx) => (
                  <HiStar key={idx} className="w-5 h-5 text-amber-400" />
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="text-sm sm:text-base md:text-lg text-secondary-800 italic leading-relaxed font-medium max-w-2xl">
                "{t.quote}"
              </blockquote>

              {/* Author & Avatar Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100 w-full justify-center">
                <div className={`w-12 h-12 bg-gradient-to-br ${t.gradient} text-white font-bold rounded-2xl flex items-center justify-center text-sm shadow-md`}>
                  {t.initials}
                </div>
                <div className="text-left">
                  <cite className="not-italic font-bold text-secondary-900 text-sm block text-left">
                    - {t.author}
                  </cite>
                  <span className="text-[11px] text-secondary-400 font-extrabold uppercase tracking-wider block text-left">
                    {t.company}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none px-2 sm:px-6">
            <button
              onClick={handlePrev}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white hover:bg-primary-50 border border-gray-150 rounded-full flex items-center justify-center text-secondary-700 hover:text-primary-600 shadow-md transition-all duration-300 pointer-events-auto -ml-5 sm:-ml-6 group hover:-translate-x-0.5"
            >
              <HiChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white hover:bg-primary-50 border border-gray-150 rounded-full flex items-center justify-center text-secondary-700 hover:text-primary-600 shadow-md transition-all duration-300 pointer-events-auto -mr-5 sm:-mr-6 group hover:translate-x-0.5"
            >
              <HiChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Dot Indicators */}
        <div className="flex gap-2 justify-center mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                current === idx ? 'w-8 bg-primary-600' : 'w-2.5 bg-gray-200 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

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
              <label className="block text-[10px] font-bold text-secondary-700 uppercase tracking-wider">Your Name</label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                placeholder="John Doe"
                className="w-full border border-gray-200 rounded-xl p-2.5 text-xs bg-white text-secondary-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-secondary-700 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="john@example.com"
                className="w-full border border-gray-200 rounded-xl p-2.5 text-xs bg-white text-secondary-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-secondary-700 uppercase tracking-wider">Message</label>
              <textarea
                rows={3}
                value={data.message}
                onChange={(e) => setData({ ...data, message: e.target.value })}
                placeholder="Describe your staffing needs..."
                className="w-full border border-gray-200 rounded-xl p-2.5 text-xs bg-white text-secondary-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-primary-500 resize-none"
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