import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { HiStar } from 'react-icons/hi';
import { FaQuoteRight } from 'react-icons/fa';
import { testimonialApi } from '../api/candidateApi';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.25 } }
};

const Testimonials = () => {
  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const res = await testimonialApi.getAll();
      return res.data.data;
    },
  });

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, idx) => (
      <HiStar
        key={idx}
        className={`w-5 h-5 ${idx < rating ? 'text-warning-500' : 'text-gray-200'}`}
      />
    ));
  };

  return (
    <div className="pt-24 pb-16">
      <Helmet><title>Success Stories & Testimonials - GeoIndiaLimited</title></Helmet>

      {/* Hero Header */}
      <section className="py-16 bg-gradient-to-br from-primary-50 via-white to-accent-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl font-heading font-bold text-secondary-900 mb-4">
              Success Stories & <span className="gradient-text">Testimonials</span>
            </h1>
            <p className="text-xl text-secondary-600 mb-8 max-w-2xl mx-auto">
              Hear directly from candidates who found their career path and employers who scaled their teams with GeoIndiaLimited.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-16 text-secondary-500 animate-pulse">Loading testimonials...</div>
          ) : testimonials.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {testimonials.map((t) => (
                <motion.div
                  key={t._id}
                  variants={cardVariants}
                  className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all relative flex flex-col justify-between"
                >
                  <FaQuoteRight className="absolute top-6 right-6 w-10 h-10 text-primary-100 opacity-60" />
                  
                  <div className="space-y-4">
                    {/* Stars */}
                    <div className="flex space-x-1">
                      {renderStars(t.rating)}
                    </div>
                    {/* Content */}
                    <p className="text-secondary-650 leading-relaxed text-xs italic">
                      "{t.content}"
                    </p>
                  </div>

                  <div className="flex items-center space-x-4 pt-6 mt-6 border-t border-gray-55">
                    {/* Avatar */}
                    {t.avatar ? (
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-primary-500"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm">
                        {t.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-secondary-900 text-xs">{t.name}</h4>
                      <p className="text-[10px] text-secondary-500">
                        {t.role} at <span className="font-semibold text-secondary-700">{t.company}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16 text-secondary-500">No testimonials available. Check back soon!</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Testimonials;