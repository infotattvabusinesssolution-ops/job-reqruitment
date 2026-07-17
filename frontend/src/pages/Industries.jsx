import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  HiOutlineDesktopComputer,
  HiOutlineHeart,
  HiOutlineLibrary,
  HiOutlinePresentationChartBar,
  HiOutlineShoppingCart,
  HiOutlineSupport,
  HiOutlineTruck,
} from 'react-icons/hi';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.1 },
  transition: { duration: 0.6 },
};

const Industries = () => {
  const industries = [
    {
      icon: HiOutlineDesktopComputer,
      title: 'Information Technology (IT)',
      desc: 'We provide IT recruitment and technology staffing services for software companies, IT service providers, startups, digital agencies, product companies, and technology departments.',
      roles: ['Software Developers', 'React & Node.js Developers', 'Full-Stack Developers', 'UI & UX Designers', 'QA Analysts & Testers', 'DevOps & Cloud Engineers', 'Data Analysts & Data Scientists', 'Cybersecurity Professionals', 'Technical Project Managers'],
      bgColor: 'from-blue-500 to-indigo-600',
    },
    {
      icon: HiOutlineSupport,
      title: 'BPO and KPO',
      desc: 'Geo India Limited provides recruitment services for BPO, KPO, customer service, telecalling, technical support, data processing, and back-office operations. Our bulk hiring solutions support large recurring needs.',
      roles: ['Customer Support Executives', 'Telecallers', 'Voice & Non-Voice Process Executives', 'Technical Support Specialists', 'Team Leaders', 'Quality Analysts', 'Trainers & Operations Managers'],
      bgColor: 'from-teal-500 to-emerald-600',
    },
    {
      icon: HiOutlineLibrary,
      title: 'Banking, Financial Services & Insurance (BFSI)',
      desc: 'We provide BFSI recruitment services for banks, insurance companies, financial service providers, loan companies, fintech organisations, and accounting businesses.',
      roles: ['Relationship Managers', 'Loan Officers', 'Insurance Advisors', 'Accountants & Finance Executives', 'Credit & Collection Analysts', 'Branch Operations Staff', 'Customer Service Executives'],
      bgColor: 'from-amber-500 to-orange-600',
    },
    {
      icon: HiOutlineHeart,
      title: 'Healthcare',
      desc: 'Our healthcare recruitment services support hospitals, clinics, diagnostic centres, laboratories, pharmacies, healthcare service providers, and medical administration teams.',
      roles: ['Clinical Practitioners', 'Lab & Technical Personnel', 'Support & Operations Staff', 'Healthcare Administrators'],
      bgColor: 'from-rose-500 to-red-600',
    },
    {
      icon: HiOutlineTruck,
      title: 'Manufacturing',
      desc: 'Geo India Limited provides manufacturing recruitment and industrial staffing solutions for production companies, factories, warehouses, and engineering businesses.',
      roles: ['Production Executives', 'Quality Control & Maintenance', 'Warehouse Operations & Supply Chain', 'Procurement Officers', 'Safety Advisors', 'Plant Administrators & Managers'],
      bgColor: 'from-gray-700 to-slate-800',
    },
    {
      icon: HiOutlineShoppingCart,
      title: 'Retail and E-commerce',
      desc: 'We provide recruitment services for retail stores, shopping outlets, supermarkets, online marketplaces, e-commerce businesses, warehouses, and delivery operations.',
      roles: ['Store Managers & Sales Associates', 'Warehouse & Inventory Executives', 'E-commerce Operations Executives', 'Digital Marketing Professionals', 'Logistics Coordinators & Operations Managers'],
      bgColor: 'from-purple-500 to-pink-600',
    },
    {
      icon: HiOutlinePresentationChartBar,
      title: 'Telecommunications',
      desc: 'Our telecom recruitment services support telecommunications companies, network service providers, field operations businesses, customer support centres, and technical service teams.',
      roles: ['Telecom Sales Executives', 'Field Operations Engineers', 'Technical Support Officers', 'Network & Installation Technicians', 'Maintenance Engineers', 'Telecom Managers'],
      bgColor: 'from-cyan-500 to-blue-600',
    },
  ];

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <Helmet><title>Industries We Serve - Geo India Limited</title></Helmet>

      {/* Header Banner */}
      <section className="bg-gradient-to-r from-secondary-900 via-secondary-800 to-primary-950 text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-heading font-bold"
          >
            Industries We Serve
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-secondary-200 max-w-2xl mx-auto"
          >
            Customised hiring solutions across IT, Banking, Healthcare, Manufacturing, Retail, and Telecom.
          </motion.p>
        </div>
      </section>

      {/* Grid List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {industries.map((ind, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={fadeInUp.viewport}
              whileHover={{ scale: 1.01 }}
              className="bg-white rounded-3xl overflow-hidden border border-gray-150 shadow-sm flex flex-col md:flex-row"
            >
              {/* Left Color Icon block */}
              <div className={`w-full md:w-1/3 bg-gradient-to-br ${ind.bgColor} p-6 flex flex-col justify-between items-center md:items-start text-white text-center md:text-left`}>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <ind.icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-75">Industry Profile</span>
              </div>

              {/* Right Content details */}
              <div className="w-full md:w-2/3 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-xl font-heading font-bold text-secondary-900 mb-2">{ind.title}</h3>
                  <p className="text-xs text-secondary-500 leading-relaxed mb-4">{ind.desc}</p>
                </div>

                <div className="space-y-2 border-t border-gray-100 pt-4">
                  <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider font-sans">Common Positions We Recruit</span>
                  <div className="flex flex-wrap gap-1.5">
                    {ind.roles.map((role, rIdx) => (
                      <span key={rIdx} className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-md text-[10px] font-semibold text-secondary-650">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Industries;