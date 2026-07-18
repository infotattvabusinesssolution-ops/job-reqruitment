import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown, HiSearch, HiLightningBolt, HiUserGroup, HiBriefcase, HiShieldCheck, HiQuestionMarkCircle } from 'react-icons/hi';
import { faqApi } from '../api/candidateApi';

const categoryIconMap = {
  'General': HiLightningBolt,
  'For Job Seekers': HiUserGroup,
  'For Employers': HiBriefcase,
  'Account & Support': HiShieldCheck,
};

const getCategoryIcon = (category) => {
  return categoryIconMap[category] || HiQuestionMarkCircle;
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const { data: faqs = [], isLoading } = useQuery({
    queryKey: ['faqs'],
    queryFn: async () => {
      const res = await faqApi.getAll();
      return res.data.data;
    },
  });

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Get unique categories from fetched FAQs
  const categories = ['All', ...new Set(faqs.map((f) => f.category))];

  // Filter and group FAQs based on search and selected category
  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Grouping for non-search categorization
  const groupedFaqs = [];
  filteredFaqs.forEach((faq) => {
    let group = groupedFaqs.find((g) => g.category === faq.category);
    if (!group) {
      group = {
        category: faq.category,
        icon: getCategoryIcon(faq.category),
        questions: [],
      };
      groupedFaqs.push(group);
    }
    group.questions.push({ q: faq.question, a: faq.answer, _id: faq._id });
  });

  return (
    <div className="pt-24 pb-16">
      <Helmet><title>FAQ - GeoIndiaLimited</title></Helmet>

      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl font-heading font-bold text-secondary-900 mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h1>
            <p className="text-xl text-secondary-600 mb-8 max-w-2xl mx-auto">
              Find answers to common questions about GeoIndiaLimited services
            </p>
            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none shadow-sm"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-200'
                    : 'bg-gray-100 text-secondary-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-16 text-secondary-500 animate-pulse">Loading questions...</div>
          ) : searchQuery ? (
            filteredFaqs.length > 0 ? (
              <div className="space-y-4">
                {filteredFaqs.map((item, idx) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => toggleQuestion(item._id)}
                      className="w-full flex items-center justify-between p-6 text-left"
                    >
                      <div>
                        <span className="text-xs text-primary-600 font-medium mb-1 block">{item.category}</span>
                        <span className="text-secondary-900 font-medium">{item.question}</span>
                      </div>
                      <HiChevronDown className={`w-5 h-5 text-secondary-400 transition-transform flex-shrink-0 ml-4 ${
                        openIndex === item._id ? 'rotate-180' : ''
                      }`} />
                    </button>
                    <AnimatePresence>
                      {openIndex === item._id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-6 text-secondary-650 leading-relaxed text-xs">{item.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-secondary-500 text-lg">No results found for "{searchQuery}"</p>
                <p className="text-secondary-400 mt-2">Try a different search term</p>
              </div>
            )
          ) : groupedFaqs.length > 0 ? (
            <div className="space-y-12">
              {groupedFaqs.map((group) => (
                <div key={group.category}>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
                      <group.icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-secondary-900">{group.category}</h2>
                  </div>
                  <div className="space-y-4">
                    {group.questions.map((item) => (
                      <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
                        <button
                          onClick={() => toggleQuestion(item._id)}
                          className="w-full flex items-center justify-between p-6 text-left"
                        >
                          <span className="text-secondary-900 font-medium pr-4">{item.q}</span>
                          <HiChevronDown className={`w-5 h-5 text-secondary-400 transition-transform flex-shrink-0 ${
                            openIndex === item._id ? 'rotate-180' : ''
                          }`} />
                        </button>
                        <AnimatePresence>
                          {openIndex === item._id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="px-6 pb-6 text-secondary-650 leading-relaxed text-xs">{item.a}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-secondary-500">No FAQ questions available.</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FAQ;