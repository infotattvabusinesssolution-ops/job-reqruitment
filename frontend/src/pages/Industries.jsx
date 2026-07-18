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
  HiOutlineAcademicCap,
  HiOutlineGlobe,
  HiOutlineLightningBolt,
  HiOutlineCube,
  HiOutlineCog,
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
      title: 'Information Technology (IT & Software)',
      desc: 'We provide IT recruitment and technology staffing services for software companies, IT service providers, startups, digital agencies, product companies, and technology departments.',
      roles: ['Software Developers', 'React & Node.js Developers', 'Full-Stack Developers', 'UI & UX Designers', 'QA Analysts & Testers', 'DevOps & Cloud Engineers', 'Data Analysts & Data Scientists', 'Cybersecurity Professionals', 'Technical Project Managers'],
      bgColor: 'from-blue-500 to-indigo-600',
    },
    {
      icon: HiOutlineSupport,
      title: 'BPO & Call Centers',
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
      title: 'Healthcare & Pharmaceuticals',
      desc: 'Our healthcare and pharma recruitment services support hospitals, clinics, diagnostic centres, clinical research organisations, laboratories, pharmacies, and healthcare administrative operations.',
      roles: ['Clinical Practitioners', 'Lab & Technical Personnel', 'Support & Operations Staff', 'Healthcare Administrators'],
      bgColor: 'from-rose-500 to-red-600',
    },
    {
      icon: HiOutlineCog,
      title: 'Manufacturing & Engineering',
      desc: 'Geo India Limited provides manufacturing and engineering recruitment and industrial staffing solutions for production companies, factories, heavy engineering plants, and assembly businesses.',
      roles: ['Production Executives', 'Quality Control & Maintenance', 'Industrial Engineers', 'Warehouse Operations & Supply Chain', 'Procurement Officers', 'Safety Advisors', 'Plant Administrators & Managers'],
      bgColor: 'from-gray-700 to-slate-800',
    },
    {
      icon: HiOutlineShoppingCart,
      title: 'E-commerce & Retail',
      desc: 'We provide recruitment services for retail stores, shopping outlets, supermarkets, online marketplaces, e-commerce businesses, warehouses, and delivery operations.',
      roles: ['Store Managers & Sales Associates', 'Warehouse & Inventory Executives', 'E-commerce Operations Executives', 'Digital Marketing Professionals', 'Logistics Coordinators & Operations Managers'],
      bgColor: 'from-purple-500 to-pink-600',
    },
    {
      icon: HiOutlineTruck,
      title: 'Logistics & Supply Chain',
      desc: 'We provide end-to-end staffing and recruitment services for logistics providers, warehousing operations, supply chain managers, distribution networks, and freight transport businesses.',
      roles: ['Supply Chain Analysts', 'Warehouse Supervisors', 'Logistics Coordinators', 'Fleet Managers', 'Inventory Controllers', 'Distribution Managers'],
      bgColor: 'from-blue-600 to-cyan-500',
    },
    {
      icon: HiOutlinePresentationChartBar,
      title: 'Telecom',
      desc: 'Our telecom recruitment services support telecommunications companies, network service providers, field operations businesses, customer support centres, and technical service teams.',
      roles: ['Telecom Sales Executives', 'Field Operations Engineers', 'Technical Support Officers', 'Network & Installation Technicians', 'Maintenance Engineers', 'Telecom Managers'],
      bgColor: 'from-cyan-500 to-blue-600',
    },
    {
      icon: HiOutlineAcademicCap,
      title: 'Education & EdTech',
      desc: 'Our education recruitment services support schools, universities, EdTech startups, online learning platforms, vocational institutes, and educational support service providers.',
      roles: ['EdTech Product Managers', 'Academic Coordinators', 'Online Tutors & Instructors', 'Subject Matter Experts', 'Instructional Designers', 'School Administrators'],
      bgColor: 'from-indigo-500 to-purple-600',
    },
    {
      icon: HiOutlineGlobe,
      title: 'Hospitality & Travel',
      desc: 'We source skilled professionals for hotels, resorts, travel agencies, tour operators, event management companies, and hospitality service operations.',
      roles: ['Hotel General Managers', 'Front Office Executives', 'Travel Consultants', 'Event Operations Managers', 'Guest Relations Officers', 'F&B Supervisors'],
      bgColor: 'from-pink-500 to-rose-600',
    },
    {
      icon: HiOutlineLightningBolt,
      title: 'Energy & Utilities',
      desc: 'Our recruitment solutions cover the energy sector, including renewable energy firms, solar/wind businesses, electrical utilities, power plants, and utility service operators.',
      roles: ['Project Engineers', 'Safety Officers', 'Operations Supervisors', 'Grid Technicians', 'Environmental Consultants', 'Energy Analysts'],
      bgColor: 'from-yellow-500 to-amber-600',
    },
    {
      icon: HiOutlineCog,
      title: 'Automotive',
      desc: 'We recruit for automotive manufacturers, parts suppliers, design centres, dealerships, servicing networks, and electric vehicle (EV) startups.',
      roles: ['Automotive Design Engineers', 'Production Supervisors', 'Service Technicians', 'EV Systems Engineers', 'Dealership Managers', 'Quality Assurance Inspectors'],
      bgColor: 'from-red-500 to-orange-600',
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
            className="text-base text-secondary-200 max-w-3xl mx-auto leading-relaxed"
          >
            Geo India Limited partners with organizations across diverse industries to provide recruitment, corporate training, internship programs, and verification services. Our experienced team understands the unique hiring needs of each sector and delivers reliable talent solutions.
          </motion.p>
        </div>
      </section>

      {/* Grid List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={fadeInUp.viewport}
              whileHover={{ scale: 1.015, y: -4 }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-150 shadow-sm flex flex-col transition-all duration-300"
            >
              {/* Top Color Icon block */}
              <div className={`w-full bg-gradient-to-br ${ind.bgColor} px-5 py-4 flex items-center justify-between text-white`}>
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                    <ind.icon className="w-5.5 h-5.5 text-white" />
                  </div>
                  <span className="text-[9px] uppercase font-bold tracking-wider opacity-90">Industry Profile</span>
                </div>
              </div>

              {/* Right Content details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-heading font-bold text-secondary-900 mb-1.5">{ind.title}</h3>
                  <p className="text-[11px] text-secondary-500 leading-relaxed">{ind.desc}</p>
                </div>

                <div className="space-y-1.5 border-t border-gray-100 pt-3 mt-auto">
                  <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider font-sans block">Common Positions</span>
                  <div className="flex flex-wrap gap-1">
                    {ind.roles.slice(0, 4).map((role, rIdx) => (
                      <span key={rIdx} className="px-2 py-0.5 bg-gray-50 border border-gray-100 rounded text-[9px] font-semibold text-secondary-650">
                        {role}
                      </span>
                    ))}
                    {ind.roles.length > 4 && (
                      <span className="px-2 py-0.5 bg-gray-50 border border-gray-100 rounded text-[9px] font-semibold text-gray-400">
                        +{ind.roles.length - 4} more
                      </span>
                    )}
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