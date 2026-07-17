import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown, HiSearch, HiLightningBolt, HiUserGroup, HiBriefcase, HiShieldCheck } from 'react-icons/hi';

const faqs = [
  {
    category: 'General',
    icon: HiLightningBolt,
    questions: [
      {
        q: 'What is GeoIndiaLimited?',
        a: 'GeoIndiaLimited is India\'s premier recruitment and staffing solutions provider. We connect talented professionals with leading organizations across various industries including Technology, Healthcare, Finance, Manufacturing, and more.'
      },
      {
        q: 'How does GeoIndiaLimited work?',
        a: 'Job seekers can create a profile upload their resume and apply for jobs. Employers can post jobs and search for candidates. Our AI-powered matching system helps connect the right talent with the right opportunities.'
      },
      {
        q: 'Is GeoIndiaLimited free for job seekers?',
        a: 'Yes creating a profile searching for jobs and applying to positions is completely free for job seekers. We also offer premium services like resume review and career counseling at nominal charges.'
      },
      {
        q: 'Which industries does GeoIndiaLimited serve?',
        a: 'We serve a wide range of industries including Technology Healthcare Finance Education Manufacturing Retail Construction Media and more. Our extensive network covers both domestic and international opportunities.'
      },
    ],
  },
  {
    category: 'For Job Seekers',
    icon: HiUserGroup,
    questions: [
      {
        q: 'How do I create an account?',
        a: 'Click on "Get Started" or "Sign Up" button on the top right corner. Fill in your details including name email and password. You can then complete your profile with your skills experience and education.'
      },
      {
        q: 'How do I apply for a job?',
        a: 'Browse through the job listings use filters to narrow down your search and click on a job that interests you. On the job details page click "Apply Now" and follow the instructions.'
      },
      {
        q: 'Can I upload my resume?',
        a: 'Yes you can upload your resume in PDF DOC or DOCX format. Your resume will be parsed automatically and used to enhance your profile and improve job matching.'
      },
      {
        q: 'How do I get job alerts?',
        a: 'Once you create a profile and set your preferences you will automatically receive job alerts via email and notifications based on your skills experience and location preferences.'
      },
    ],
  },
  {
    category: 'For Employers',
    icon: HiBriefcase,
    questions: [
      {
        q: 'How do I post a job?',
        a: 'Create an employer account and navigate to your dashboard. Click on "Post a Job" and fill in the job details including title description requirements and salary range. Once published your job will be visible to thousands of candidates.'
      },
      {
        q: 'How does the AI matching work?',
        a: 'Our AI algorithms analyze job requirements and candidate profiles to provide intelligent matching. Employers receive suggestions for top candidates and candidates see the most relevant job opportunities.'
      },
      {
        q: 'Can I search for candidates?',
        a: 'Yes employer accounts include access to our extensive candidate database. You can search filter and view profiles of potential candidates.'
      },
      {
        q: 'What are the pricing plans?',
        a: 'We offer flexible pricing plans including pay-per-job postings monthly subscriptions and enterprise solutions. Contact our sales team for detailed pricing information.'
      },
    ],
  },
  {
    category: 'Account & Support',
    icon: HiShieldCheck,
    questions: [
      {
        q: 'How do I reset my password?',
        a: 'Click on "Forgot Password" on the login page. Enter your registered email address and we will send you a password reset link.'
      },
      {
        q: 'How do I update my profile?',
        a: 'Log in to your account and navigate to your profile/dashboard. You can edit your personal information skills experience education and other details from there.'
      },
      {
        q: 'How can I contact support?',
        a: 'You can reach our support team through the Contact page email us at contact@geoindialimited.com or call us at +91 (22) 4567-8900. We are available Monday to Friday 9 AM to 6 PM IST.'
      },
    ],
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...faqs.map((f) => f.category)];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter((cat) =>
    activeCategory === 'All' ? true : cat.category === activeCategory
  );

  const allQuestions = filteredFaqs.flatMap((cat) =>
    cat.questions.map((q, i) => ({ ...q, category: cat.category, globalIndex: `${cat.category}-${i}` }))
  ).filter((q) =>
    searchQuery === '' || 
    q.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    q.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          {searchQuery ? (
            allQuestions.length > 0 ? (
              <div className="space-y-4">
                {allQuestions.map((item, idx) => (
                  <motion.div
                    key={item.globalIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => toggleQuestion(item.globalIndex)}
                      className="w-full flex items-center justify-between p-6 text-left"
                    >
                      <div>
                        <span className="text-xs text-primary-600 font-medium mb-1 block">{item.category}</span>
                        <span className="text-secondary-900 font-medium">{item.q}</span>
                      </div>
                      <HiChevronDown className={`w-5 h-5 text-secondary-400 transition-transform flex-shrink-0 ml-4 ${
                        openIndex === item.globalIndex ? 'rotate-180' : ''
                      }`} />
                    </button>
                    <AnimatePresence>
                      {openIndex === item.globalIndex && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-6 text-secondary-600 leading-relaxed">{item.a}</p>
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
          ) : (
            <div className="space-y-12">
              {filteredFaqs.map((cat) => (
                <div key={cat.category}>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
                      <cat.icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-secondary-900">{cat.category}</h2>
                  </div>
                  <div className="space-y-4">
                    {cat.questions.map((item, idx) => {
                      const globalIdx = `${cat.category}-${idx}`;
                      return (
                        <motion.div
                          key={globalIdx}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                          <button
                            onClick={() => toggleQuestion(globalIdx)}
                            className="w-full flex items-center justify-between p-6 text-left"
                          >
                            <span className="text-secondary-900 font-medium pr-4">{item.q}</span>
                            <HiChevronDown className={`w-5 h-5 text-secondary-400 transition-transform flex-shrink-0 ${
                              openIndex === globalIdx ? 'rotate-180' : ''
                            }`} />
                          </button>
                          <AnimatePresence>
                            {openIndex === globalIdx && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <p className="px-6 pb-6 text-secondary-600 leading-relaxed">{item.a}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FAQ;