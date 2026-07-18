import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiMicrophone, HiChatAlt2, HiLightBulb, HiCurrencyRupee, HiArrowRight, HiShieldCheck } from 'react-icons/hi';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.6 }
};

const InterviewPreparation = () => {
  const highlights = [
    {
      title: 'One-on-One Mock Interviews',
      desc: 'Practice with industry experts under timed conditions, mimicking real-world pressure with comprehensive performance audits.',
      icon: HiMicrophone,
      bg: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Behavioral Round Frameworks',
      desc: 'Structure your answers using the STAR (Situation, Task, Action, Result) method to confidently answer situational hiring questions.',
      icon: HiChatAlt2,
      bg: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Problem Solving & Case Studies',
      desc: 'Learn how to approach business case studies, design challenges, and live coding exercises while communicating your thought process.',
      icon: HiLightBulb,
      bg: 'bg-amber-50 text-amber-600',
    },
    {
      title: 'Salary Negotiation Strategies',
      desc: 'Understand corporate compensation structures, evaluate benefits packages, and negotiate industry-standard offers confidently.',
      icon: HiCurrencyRupee,
      bg: 'bg-emerald-50 text-emerald-600',
    },
  ];

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen text-left">
      <Helmet>
        <title>Interview Preparation Training - Geo India Limited</title>
        <meta name="description" content="Master your job interviews with our training program. Learn mock interviews, behavioral structures, case study solving, and salary negotiation skills." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-850 to-purple-950 text-white py-20 mb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.15),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center px-3.5 py-1.5 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-200 text-[10px] font-bold tracking-widest uppercase">
            Master the Interview
          </div>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold max-w-3xl leading-tight">
            Excel Under Pressure with <span className="text-indigo-400">Interview Preparation</span>
          </h1>
          <p className="text-base sm:text-lg text-indigo-100 max-w-2xl leading-relaxed">
            Eliminate stress and approach technical and behavioral recruitment rounds with clear, structured communication strategies designed by veteran HR directors.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Intro */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeInUp} className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-secondary-900">
              Conquer Recruitment Rounds with Absolute Confidence
            </h2>
            <p className="text-xs sm:text-sm text-secondary-650 leading-relaxed font-semibold">
              The interview is your primary opportunity to demonstrate value alignment. Many qualified applicants fail simply because they cannot organize their thoughts coherently or communicate results effectively.
            </p>
            <p className="text-xs sm:text-sm text-secondary-650 leading-relaxed">
              We provide systematic training that covers technical debugging, architectural explanations, creative problem-solving, and emotional balance. Our mock evaluations identify pacing issues, posture, speech fillers, and technical gaps to refine your execution before the final day.
            </p>
          </motion.div>

          <motion.div {...fadeInUp} className="bg-white p-8 rounded-3xl border border-gray-150 shadow-sm relative overflow-hidden flex flex-col justify-center min-h-[300px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-12 -mt-12 pointer-events-none" />
            <div className="space-y-4 relative z-10">
              <span className="text-3xl">🎙️</span>
              <h3 className="text-lg font-bold text-secondary-900">Expert-Led Feedback Loops</h3>
              <p className="text-xs text-secondary-500 leading-relaxed font-medium">
                Our trainers analyze every mock interview session, providing scorecard reviews and recording breakdowns so you can track improvements and polish weak areas in real time.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Highlights Grid */}
        <section className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-secondary-900">Core Focus Areas</h2>
            <p className="text-xs text-secondary-500 font-semibold">Practical frameworks to answer challenging queries, showcase leadership, and demonstrate technical capability.</p>
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
        <section className="bg-gradient-to-br from-indigo-600 to-purple-800 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-32 -mb-32 pointer-events-none" />
          <div className="space-y-3 max-w-xl z-10 text-center md:text-left">
            <h2 className="text-2xl font-bold">Have an Upcoming Interview?</h2>
            <p className="text-xs sm:text-sm text-indigo-100 font-semibold">
              Get an instant mock interview slot with a senior technical manager in your field.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-8 py-4 bg-white hover:bg-indigo-50 text-indigo-850 font-bold text-xs rounded-xl shadow-md transition-all whitespace-nowrap flex items-center gap-2 z-10 group"
          >
            Book a Mock Interview <HiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </section>

      </div>
    </div>
  );
};

export default InterviewPreparation;
