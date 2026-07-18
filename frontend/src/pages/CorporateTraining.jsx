import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiBriefcase, HiAcademicCap, HiTrendingUp, HiUsers, HiArrowRight, HiShieldCheck, HiArrowLeft } from 'react-icons/hi';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.6 }
};

const CorporateTraining = () => {
  const highlights = [
    {
      title: 'Leadership Development',
      desc: 'Equip C-suite executives and managers with strategic leadership methodologies and emotional intelligence coaching.',
      icon: HiTrendingUp,
      bg: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Technical Upskilling',
      desc: 'Customized workshops in advanced engineering, cloud infrastructure, AI integration, and full-stack development.',
      icon: HiAcademicCap,
      bg: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Team Building & Dynamics',
      desc: 'Experiential learning programs designed to foster cross-departmental collaboration and trust within teams.',
      icon: HiUsers,
      bg: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Compliance & Governance',
      desc: 'Ensure compliance with statutory laws, ISO certifications, safety standards, and ESG framework training.',
      icon: HiShieldCheck,
      bg: 'bg-amber-50 text-amber-600',
    },
  ];

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen text-left">
      <Helmet>
        <title>Corporate Training Solutions - Geo India Limited</title>
        <meta name="description" content="Customized workforce development, technical upskilling, and leadership training programs designed to drive innovation and productivity in your organization." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary-900 via-secondary-800 to-primary-950 text-white py-20 mb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div>
            <Link
              to="/job-seekers"
              className="inline-flex items-center text-xs font-bold text-white/70 hover:text-white transition-colors gap-1.5 group"
            >
              <HiArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" /> Back to Job Seekers
            </Link>
          </div>
          <div className="inline-flex items-center px-3.5 py-1.5 bg-primary-500/20 border border-primary-500/30 rounded-full text-primary-200 text-[10px] font-bold tracking-widest uppercase">
            Workforce Innovation
          </div>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold max-w-3xl leading-tight">
            Elevate Your Team with <span className="text-primary-400">Corporate Training</span>
          </h1>
          <p className="text-base sm:text-lg text-secondary-200 max-w-2xl leading-relaxed">
            We deliver tailor-made corporate development programs that align your organizational objectives with workforce competencies, boosting operational velocity.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Intro */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeInUp} className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-secondary-900">
              Customized Learning Frameworks for Modern Enterprises
            </h2>
            <p className="text-xs sm:text-sm text-secondary-650 leading-relaxed font-semibold">
              In a rapidly evolving digital landscape, continuous learning is a core competitive differentiator. Geo India Limited collaborates with HR departments and business units to identify skills gaps and construct customized training architectures.
            </p>
            <p className="text-xs sm:text-sm text-secondary-650 leading-relaxed">
              Our master trainers and industry practitioners bring decades of hands-on experience, providing actionable insights through case studies, sandbox workshops, and interactive business simulations.
            </p>
          </motion.div>

          <motion.div {...fadeInUp} className="bg-white p-8 rounded-3xl border border-gray-150 shadow-sm relative overflow-hidden flex flex-col justify-center min-h-[300px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -mr-12 -mt-12 pointer-events-none" />
            <div className="space-y-4 relative z-10">
              <span className="text-3xl">🎯</span>
              <h3 className="text-lg font-bold text-secondary-900">Our Training Philosophy</h3>
              <p className="text-xs text-secondary-500 leading-relaxed font-medium">
                We believe in output-driven training models. Our curricula are designed around tangible, real-world key performance indicators (KPIs) to ensure training translates directly into higher workplace productivity and team alignment.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Highlights Grid */}
        <section className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-secondary-900">Core Focus Areas</h2>
            <p className="text-xs text-secondary-500 font-semibold">Our versatile programs address fundamental scaling vectors across enterprise operations.</p>
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
        <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-32 -mb-32 pointer-events-none" />
          <div className="space-y-3 max-w-xl z-10 text-center md:text-left">
            <h2 className="text-2xl font-bold">Ready to Upskill Your Workforce?</h2>
            <p className="text-xs sm:text-sm text-primary-100 font-semibold">
              Contact our corporate program managers to schedule a comprehensive organizational skills audit.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-8 py-4 bg-white hover:bg-primary-50 text-primary-800 font-bold text-xs rounded-xl shadow-md transition-all whitespace-nowrap flex items-center gap-2 z-10 group"
          >
            Request Training Proposal <HiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </section>

      </div>
    </div>
  );
};

export default CorporateTraining;
