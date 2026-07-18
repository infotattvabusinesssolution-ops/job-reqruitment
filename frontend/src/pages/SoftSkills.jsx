import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiChatAlt, HiLightBulb, HiUserGroup, HiPresentationChartLine, HiArrowRight, HiVolumeUp, HiArrowLeft } from 'react-icons/hi';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.6 }
};

const SoftSkills = () => {
  const highlights = [
    {
      title: 'Business Communication & Etiquette',
      desc: 'Master the art of writing effective emails, formatting documents, active listening, and representing your company in client-facing calls.',
      icon: HiChatAlt,
      bg: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Emotional Intelligence & EQ',
      desc: 'Learn methods of self-regulation, empathy development, collaboration dynamics, and remaining productive under critical feedback.',
      icon: HiLightBulb,
      bg: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Public Speaking & Presentation',
      desc: 'Overcome stage fright and deliver high-impact slide presentations, structured slide decks, and data-driven reviews.',
      icon: HiPresentationChartLine,
      bg: 'bg-rose-50 text-rose-600',
    },
    {
      title: 'Conflict Resolution & Leadership',
      desc: 'Negotiate constructively, navigate team friction, align priorities, and guide projects to success through consensus.',
      icon: HiUserGroup,
      bg: 'bg-amber-50 text-amber-600',
    },
  ];

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen text-left">
      <Helmet>
        <title>Soft Skills Training Programs - Geo India Limited</title>
        <meta name="description" content="Enhance your interpersonal communication, emotional intelligence, presentation skills, and conflict resolution with our executive-level soft skills training." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 via-purple-800 to-pink-950 text-white py-20 mb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(219,39,119,0.1),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div>
            <Link
              to="/job-seekers"
              className="inline-flex items-center text-xs font-bold text-white/70 hover:text-white transition-colors gap-1.5 group"
            >
              <HiArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" /> Back to Job Seekers
            </Link>
          </div>
          <div className="inline-flex items-center px-3.5 py-1.5 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-200 text-[10px] font-bold tracking-widest uppercase">
            Interpersonal Growth
          </div>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold max-w-3xl leading-tight">
            Amplify Your Value with Professional <span className="text-purple-400">Soft Skills</span>
          </h1>
          <p className="text-base sm:text-lg text-purple-100 max-w-2xl leading-relaxed">
            Technical expertise gets you hired, but soft skills get you promoted. Develop communication, EQ, and collaborative skills to succeed in global teams.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Intro */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeInUp} className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-secondary-900">
              The Secret Language of Effective Corporate Leadership
            </h2>
            <p className="text-xs sm:text-sm text-secondary-650 leading-relaxed font-semibold">
              Modern workplaces are highly collaborative ecosystems. Technical skills are foundational, but the ability to articulate complex concepts, handle feedback, manage time, and coordinate efforts is what drives project speed.
            </p>
            <p className="text-xs sm:text-sm text-secondary-650 leading-relaxed">
              At Geo India Limited, we design soft skills training that addresses corporate communication, conflict resolution, active listening, and workplace productivity. Our practical modules feature real-world role-plays, client-facing simulations, and storytelling frameworks to enhance your leadership presence.
            </p>
          </motion.div>

          <motion.div {...fadeInUp} className="bg-white p-8 rounded-3xl border border-gray-150 shadow-sm relative overflow-hidden flex flex-col justify-center min-h-[300px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full -mr-12 -mt-12 pointer-events-none" />
            <div className="space-y-4 relative z-10">
              <span className="text-3xl">👥</span>
              <h3 className="text-lg font-bold text-secondary-900">A Global Standard</h3>
              <p className="text-xs text-secondary-500 leading-relaxed font-medium">
                Our modules align with international corporate communication standards, preparing you to collaborate smoothly with global clients, remote team members, and diverse project stakes.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Highlights Grid */}
        <section className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-secondary-900">Core Focus Areas</h2>
            <p className="text-xs text-secondary-500 font-semibold">Key capabilities required to drive team cohesion, present concepts clearly, and guide product cycles.</p>
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
        <section className="bg-gradient-to-br from-purple-600 to-pink-800 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-32 -mb-32 pointer-events-none" />
          <div className="space-y-3 max-w-xl z-10 text-center md:text-left">
            <h2 className="text-2xl font-bold">Invest in Your Team's Cohesion</h2>
            <p className="text-xs sm:text-sm text-purple-100 font-semibold">
              Contact us to set up a soft skills or presentation workshop customized for your team's specific context.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-8 py-4 bg-white hover:bg-purple-50 text-purple-800 font-bold text-xs rounded-xl shadow-md transition-all whitespace-nowrap flex items-center gap-2 group z-10"
          >
            Inquire About Workshops <HiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </section>

      </div>
    </div>
  );
};

export default SoftSkills;
