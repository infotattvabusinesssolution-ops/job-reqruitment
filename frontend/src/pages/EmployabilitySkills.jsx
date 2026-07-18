import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiCollection, HiSearch, HiIdentification, HiUserGroup, HiArrowRight, HiTrendingUp, HiArrowLeft } from 'react-icons/hi';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.6 }
};

const EmployabilitySkills = () => {
  const highlights = [
    {
      title: 'Professional Resume Engineering',
      desc: 'Learn ATS-compliant resume formatting, action-verb inclusion, and key metrics highlights to stand out in the filtering stack.',
      icon: HiIdentification,
      bg: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Job Sourcing & Applications',
      desc: 'Master the art of locating hidden opportunities, networking on LinkedIn, and customizing cover letters for high reply rates.',
      icon: HiSearch,
      bg: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Portfolio & Branding',
      desc: 'Build digital portfolios (GitHub, Behance, personal sites) that showcase tangible deliverables to technical hiring managers.',
      icon: HiCollection,
      bg: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Corporate Onboarding Preparation',
      desc: 'Understand workplace dynamics, code-of-conduct compliance, reporting hierarchies, and project delivery workflows.',
      icon: HiUserGroup,
      bg: 'bg-amber-50 text-amber-600',
    },
  ];

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen text-left">
      <Helmet>
        <title>Employability Skills Training - Geo India Limited</title>
        <meta name="description" content="Prepare yourself for corporate recruiters with our expert-led employability training, covering ATS resume design, job search strategies, and professional branding." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-950 text-white py-20 mb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.1),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div>
            <Link
              to="/job-seekers"
              className="inline-flex items-center text-xs font-bold text-white/70 hover:text-white transition-colors gap-1.5 group"
            >
              <HiArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" /> Back to Job Seekers
            </Link>
          </div>
          <div className="inline-flex items-center px-3.5 py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-200 text-[10px] font-bold tracking-widest uppercase">
            Bridge the Gap
          </div>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold max-w-3xl leading-tight">
            Boost Your Corporate Ready <span className="text-emerald-400">Employability Skills</span>
          </h1>
          <p className="text-base sm:text-lg text-emerald-100 max-w-2xl leading-relaxed">
            Gain critical skillsets that recruiters actively scan for. We equip candidates with CV engineering, branding, and strategic job-hunting tools.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Intro */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeInUp} className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-secondary-900">
              Why Technical Skill Alone is Not Enough
            </h2>
            <p className="text-xs sm:text-sm text-secondary-650 leading-relaxed font-semibold">
              Recruiters sift through hundreds of applications daily. An exceptional candidate can be filtered out within 6 seconds due to poor resume layouts or lack of clear profile branding.
            </p>
            <p className="text-xs sm:text-sm text-secondary-650 leading-relaxed">
              Our Employability Skills curriculum is designed by senior HR recruiters to target key alignment markers. We teach you how to write descriptive portfolios, utilize targeted keywords, and communicate your practical experience in language that hiring managers respect.
            </p>
          </motion.div>

          <motion.div {...fadeInUp} className="bg-white p-8 rounded-3xl border border-gray-150 shadow-sm relative overflow-hidden flex flex-col justify-center min-h-[300px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-12 -mt-12 pointer-events-none" />
            <div className="space-y-4 relative z-10">
              <span className="text-3xl">🚀</span>
              <h3 className="text-lg font-bold text-secondary-900">The 48-Hour Advantage</h3>
              <p className="text-xs text-secondary-500 leading-relaxed font-medium">
                Candidates who complete our Employability Skills training and optimize their professional profiles experience up to a 65% increase in recruiter callback rates within their first week of market application.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Highlights Grid */}
        <section className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-secondary-900">Core Focus Areas</h2>
            <p className="text-xs text-secondary-500 font-semibold">Step-by-step strategies designed to transform you from an applicant to a high-value prospect.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl border border-gray-150 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start"
              >
                <div className={`w-12 h-12 shrink-0 ${item.bg} rounded-2xl flex items-center justify-center`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-secondary-900 text-sm">{item.title}</h3>
                  <p className="text-[11px] text-secondary-500 font-semibold leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-br from-emerald-600 to-teal-800 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-32 -mb-32 pointer-events-none" />
          <div className="space-y-3 max-w-xl z-10 text-center md:text-left">
            <h2 className="text-2xl font-bold">Ready to Land Your Dream Job?</h2>
            <p className="text-xs sm:text-sm text-emerald-100 font-semibold">
              Browse our active job listings or contact our career counsellors to get profile feedback.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 z-10">
            <Link
              to="/contact"
              className="px-8 py-4 bg-white hover:bg-emerald-50 text-emerald-800 font-bold text-xs rounded-xl shadow-md transition-all whitespace-nowrap flex items-center gap-2 group"
            >
              Get Career Counselling <HiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};

export default EmployabilitySkills;
