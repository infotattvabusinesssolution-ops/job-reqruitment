import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiShieldCheck, HiOutlineLightBulb, HiSparkles, HiArrowRight, HiMail, HiLocationMarker, HiPhone } from 'react-icons/hi';
import logo from '../assets/image/geo india.png';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.15 },
  transition: { duration: 0.6 },
};

const About = () => (
  <div className="pt-24 pb-16">
    <Helmet><title>About Us - Geo India Limited</title></Helmet>

    {/* Hero */}
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-200/30 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-sm font-medium mb-6">
              <HiShieldCheck className="w-4 h-4 mr-2" />
              Geo India Limited
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-secondary-900 leading-tight mb-6">
              Connecting Employers With{' '}
              <span className="gradient-text">Suitable Talent</span>
            </h1>
            <p className="text-base text-secondary-600 mb-8 leading-relaxed">
              Geo India Limited is a professional recruitment, staffing, and workforce solutions company committed to connecting employers with suitable talent across India.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="hidden lg:block">
            <div className="w-full aspect-video rounded-3xl bg-white border border-gray-150 p-8 flex items-center justify-center">
              <img src={logo} alt="Geo India Limited Logo" className="w-full h-auto max-h-56 rounded-2xl object-contain" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Objective & Methodology */}
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div {...fadeInUp} className="bg-white rounded-2xl p-8 border border-gray-150 shadow-sm">
            <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mb-6">
              <HiSparkles className="w-7 h-7 text-primary-600" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-secondary-900 mb-4">Our Objective</h2>
            <p className="text-xs text-secondary-650 leading-relaxed">
              Our objective is to make recruitment simple, transparent, organised, and effective for both employers and candidates. We work closely with organisations to streamline candidate sourcing and onboarding cycles.
            </p>
          </motion.div>

          <motion.div {...fadeInUp} className="bg-white rounded-2xl p-8 border border-gray-150 shadow-sm">
            <div className="w-14 h-14 bg-accent-50 rounded-xl flex items-center justify-center mb-6">
              <HiOutlineLightBulb className="w-7 h-7 text-accent-600" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-secondary-900 mb-4">Tailored Understanding</h2>
            <p className="text-xs text-secondary-650 leading-relaxed">
              We understand that hiring the right employee requires time, industry knowledge, candidate screening, interview coordination, and continuous follow-up. Our consultants map recruitment plans matching your budget, experience level, and timeline.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Sectors We Support */}
    <section className="py-20 bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-16 space-y-2">
          <h2 className="text-4xl font-heading font-bold text-secondary-900">Industries We Serve</h2>
          <p className="text-xs text-secondary-500 max-w-xl mx-auto">We provide tailored recruitment support across major industry verticals in India.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {[
            { title: 'Information Technology', desc: 'Software developers, UI/UX designers, DevOps, Cloud Architects, and technical leadership roles.' },
            { title: 'BPO and KPO', desc: 'Customer support, technical support, voice and non-voice process agents, trainers, and team leads.' },
            { title: 'Banking & Insurance', desc: 'Relationship managers, loan advisors, accountants, finance executives, and bank operations staff.' },
            { title: 'Healthcare & Pharma', desc: 'Clinical, medical technical staff, pharmacists, laboratory admins, and operational personnel.' },
            { title: 'Manufacturing', desc: 'Production staff, quality control, maintenance, supply chain planners, and warehouse operators.' },
            { title: 'Retail & E-commerce', desc: 'Retail store managers, sales associates, inventory handlers, and e-commerce logistics managers.' },
            { title: 'Telecommunications', desc: 'Network technicians, telecom sales agents, installation engineers, and maintenance managers.' },
            { title: 'Services & Operations', desc: 'HR generalists, admin personnel, executive assistants, office coordinators, and logistics leads.' },
          ].map((sector) => (
            <motion.div key={sector.title} {...fadeInUp} className="bg-white p-6 rounded-2xl border border-gray-150 hover:shadow-md transition-all space-y-2">
              <h3 className="font-heading font-bold text-secondary-900 text-sm">{sector.title}</h3>
              <p className="text-[11px] text-secondary-500 leading-relaxed">{sector.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Candidate Support */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeInUp} className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-secondary-900">Support for Job Seekers</h2>
            <p className="text-xs text-secondary-650 leading-relaxed">
              For job seekers, we provide access to employment opportunities based on their qualifications, skills, experience, preferred location, and career goals.
            </p>
            <p className="text-xs text-secondary-650 leading-relaxed">
              Whether you are an experienced professional or a fresher starting your career, Geo India Limited helps you explore open vacancies that align with your long-term career growth.
            </p>
            <div>
              <Link to="/jobs" className="btn-primary inline-flex items-center gap-1 text-xs">
                Browse Open Openings <HiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
          <motion.div {...fadeInUp} className="p-8 bg-primary-50 rounded-3xl space-y-4">
            <h3 className="text-lg font-heading font-bold text-secondary-900">Why Candidates Trust Us</h3>
            <ul className="space-y-3 text-xs text-secondary-750 font-semibold">
              <li className="flex items-center gap-2">✓ Verified job roles and company parameters</li>
              <li className="flex items-center gap-2">✓ Complete transparency in interview schedules</li>
              <li className="flex items-center gap-2">✓ Resume review and interview advice</li>
              <li className="flex items-center gap-2">✓ No charges/fees asked from candidates</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>

    {/* CTA Partner */}
    <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600 text-white relative overflow-hidden">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-4xl font-heading font-bold">Partner with Geo India Limited</h2>
        <p className="text-sm text-white/80 max-w-2xl mx-auto leading-relaxed">
          Discuss your requirements with our experienced recruitment consultants and identify candidates tailored to your business structure.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link to="/contact" className="inline-flex items-center px-6 py-3 bg-white text-primary-700 rounded-xl font-bold text-xs shadow-md hover:shadow-lg transition-all">
            Get Hiring Support <HiArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <Link to="/jobs" className="inline-flex items-center px-6 py-3 border border-white text-white rounded-xl font-bold text-xs hover:bg-white/10 transition-all">
            View Current Openings
          </Link>
        </div>
      </div>
    </section>

    {/* Contact coordinates */}
    <section className="py-16 bg-gray-50 border-t border-gray-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: HiLocationMarker, title: 'Corporate Address', info: 'Geo India Limited\n723, 7th Floor, Tower Siddhi,\nMahagun Mantra, Greater Noida West 201306' },
            { icon: HiPhone, title: 'Enquiries', info: 'Phone: +91 95993 44168\nWhatsApp: +91 95993 44168' },
            { icon: HiMail, title: 'Email Address', info: 'Hr@geoindialimited.com' },
          ].map((item) => (
            <motion.div key={item.title} {...fadeInUp} className="bg-white rounded-2xl p-6 border border-gray-150 flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <item.icon className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-secondary-900 text-xs">{item.title}</h3>
                <p className="text-secondary-500 text-xs whitespace-pre-line leading-relaxed">{item.info}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;