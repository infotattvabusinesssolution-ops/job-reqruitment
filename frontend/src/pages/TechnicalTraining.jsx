import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiDesktopComputer, HiCloudDownload, HiDatabase, HiShieldExclamation, HiArrowRight, HiArrowLeft } from 'react-icons/hi';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.6 }
};

const TechnicalTraining = () => {
  const highlights = [
    {
      title: 'Full-Stack Software Engineering',
      desc: 'Master React, Node.js, Express, databases (SQL & NoSQL), version control (Git), and deployment pipelines (Docker, CI/CD).',
      icon: HiDesktopComputer,
      bg: 'bg-indigo-50 text-indigo-600',
    },
    {
      title: 'Cloud Architecture & DevOps',
      desc: 'Get hands-on with AWS, Google Cloud, and Azure architectures, including container orchestration with Kubernetes and infrastructure as code.',
      icon: HiCloudDownload,
      bg: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Data Science & AI/ML Engineering',
      desc: 'Build regression models, classification models, neural networks, NLP systems, and big data analysis workflows using Python.',
      icon: HiDatabase,
      bg: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Cybersecurity & Network Defense',
      desc: 'Learn ethical hacking, secure coding compliance, penetration testing, threat detection, and standard security audit procedures.',
      icon: HiShieldExclamation,
      bg: 'bg-rose-50 text-rose-600',
    },
  ];

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen text-left">
      <Helmet>
        <title>Technical Training Programs - Geo India Limited</title>
        <meta name="description" content="Accelerate your technology career with our expert-led technical training. Study full-stack development, cloud computing, data science, and cyber security." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-950 via-indigo-900 to-indigo-950 text-white py-20 mb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(67,56,202,0.15),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div>
            <Link
              to="/job-seekers"
              className="inline-flex items-center text-xs font-bold text-white/70 hover:text-white transition-colors gap-1.5 group"
            >
              <HiArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" /> Back to Job Seekers
            </Link>
          </div>
          <div className="inline-flex items-center px-3.5 py-1.5 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-200 text-[10px] font-bold tracking-widest uppercase">
            Technical Mastery
          </div>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold max-w-3xl leading-tight">
            Build Cutting-Edge Capabilities with <span className="text-indigo-400">Technical Training</span>
          </h1>
          <p className="text-base sm:text-lg text-indigo-100 max-w-2xl leading-relaxed">
            Gain high-demand capabilities guided by active software engineers and systems architects. Bridge the gap between engineering theory and production code.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Intro */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeInUp} className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-secondary-900">
              Industry-Aligned Curricula Designed for Real Production
            </h2>
            <p className="text-xs sm:text-sm text-secondary-650 leading-relaxed font-semibold">
              The technology sector evolves at an extraordinary rate. Standard academic curricula often lag years behind actual production tools, resulting in graduates who require extensive onboarding.
            </p>
            <p className="text-xs sm:text-sm text-secondary-650 leading-relaxed">
              Geo India Limited provides technical training programs centered around actual product engineering. We teach you how to write maintainable code, configure automated test suites, optimize database queries, and secure API layers so you can add immediate value from day one.
            </p>
          </motion.div>

          <motion.div {...fadeInUp} className="bg-white p-8 rounded-3xl border border-gray-150 shadow-sm relative overflow-hidden flex flex-col justify-center min-h-[300px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-12 -mt-12 pointer-events-none" />
            <div className="space-y-4 relative z-10">
              <span className="text-3xl">💻</span>
              <h3 className="text-lg font-bold text-secondary-900">Hands-on Sandbox Training</h3>
              <p className="text-xs text-secondary-500 leading-relaxed font-medium">
                Our sandbox labs match actual production workflows. Students build real-world products, resolve deployment issues, run code audits, and push to cloud environments.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Highlights Grid */}
        <section className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-secondary-900">Core Focus Areas</h2>
            <p className="text-xs text-secondary-500 font-semibold">Specialized pathways structured to guide you to junior and senior software roles.</p>
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
        <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-32 -mb-32 pointer-events-none" />
          <div className="space-y-3 max-w-xl z-10 text-center md:text-left">
            <h2 className="text-2xl font-bold">Ready to Become a Software Professional?</h2>
            <p className="text-xs sm:text-sm text-indigo-100 font-semibold">
              Browse our training calendars, request a syllabus, or schedule an entry level diagnostic test.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-8 py-4 bg-white hover:bg-indigo-50 text-indigo-800 font-bold text-xs rounded-xl shadow-md transition-all whitespace-nowrap flex items-center gap-2 group z-10"
          >
            Enroll in Technical Training <HiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </section>

      </div>
    </div>
  );
};

export default TechnicalTraining;
