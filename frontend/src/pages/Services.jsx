import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  HiBriefcase,
  HiUserGroup,
  HiDesktopComputer,
  HiCurrencyRupee,
  HiGlobeAlt,
  HiUsers,
  HiTrendingUp,
  HiArrowRight,
  HiCheckCircle,
  HiClock,
  HiQuestionMarkCircle,
} from 'react-icons/hi';
import { serviceApi } from '../api/candidateApi';

const iconMap = {
  'desktop': HiDesktopComputer,
  'briefcase': HiBriefcase,
  'group': HiUserGroup,
  'users': HiUsers,
  'clock': HiClock,
  'trending': HiTrendingUp,
  'rupee': HiCurrencyRupee,
  'globe': HiGlobeAlt,
};

const getServiceIcon = (iconName) => {
  return iconMap[iconName] || HiBriefcase;
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.1 },
  transition: { duration: 0.6 },
};

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const res = await serviceApi.getAll();
      return res.data.data;
    },
  });

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <Helmet><title>Our Recruitment & Staffing Services - Geo India Limited</title></Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-r from-secondary-900 via-secondary-800 to-primary-950 text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-heading font-bold"
          >
            Our Staffing & Recruitment Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-secondary-200 max-w-2xl mx-auto"
          >
            Customised hiring solutions for startups, small businesses, growing companies, and large organisations.
          </motion.p>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="text-center py-16 text-secondary-500 animate-pulse">Loading our services...</div>
        ) : services.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc) => {
              const SvcIcon = getServiceIcon(svc.icon);
              return (
                <motion.div
                  key={svc.serviceId}
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="whileInView"
                  viewport={fadeInUp.viewport}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedService(svc)}
                  className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-150 shadow-sm cursor-pointer hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-6">
                      <SvcIcon className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-secondary-900 mb-2">{svc.title}</h3>
                    <p className="text-xs text-secondary-500 leading-relaxed mb-6">{svc.shortDesc}</p>
                  </div>

                  <div className="flex items-center text-xs font-semibold text-primary-600 gap-1 hover:underline">
                    Learn Details & Positions <HiArrowRight className="w-3.5 h-3.5" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 text-secondary-500">No services currently configured.</div>
        )}
      </div>

      {/* Modal Popup for Details */}
      {selectedService && (() => {
        const SelectedSvcIcon = getServiceIcon(selectedService.icon);
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              >
                &times;
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                  <SelectedSvcIcon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-secondary-900">{selectedService.title}</h3>
              </div>

              <p className="text-sm text-secondary-650 leading-relaxed">{selectedService.longDesc}</p>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-secondary-500 uppercase tracking-wider">Scope and Roles We Recruit</h4>
                <div className="grid sm:grid-cols-2 gap-2 text-xs text-secondary-700 font-medium">
                  {selectedService.features?.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <HiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-6 py-2.5 bg-secondary-900 hover:bg-secondary-800 text-white rounded-xl text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        );
      })()}
    </div>
  );
};

export default Services;