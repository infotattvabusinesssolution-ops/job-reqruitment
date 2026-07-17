import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { jobApi } from '../api/jobApi';
import {
  HiSearch,
  HiLocationMarker,
  HiBriefcase,
  HiClock,
  HiCurrencyRupee,
  HiFilter,
  HiArrowRight,
  HiX,
  HiChevronLeft,
  HiChevronRight,
  HiAcademicCap,
} from 'react-icons/hi';

const Jobs = () => {
  // Page and filter state
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [workMode, setWorkMode] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Build API params
  const queryParams = {
    page,
    limit: 8,
    search: search || undefined,
    location: location || undefined,
    workMode: workMode || undefined,
    employmentType: employmentType || undefined,
    experienceLevel: experienceLevel || undefined,
  };

  // React Query fetch
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['jobs', queryParams],
    queryFn: async () => {
      const response = await jobApi.getAll(queryParams);
      return response.data.data;
    },
    keepPreviousData: true,
  });

  const jobs = data?.jobs || [];
  const totalPages = data?.totalPages || 1;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    refetch();
  };

  const handleClearFilters = () => {
    setSearch('');
    setLocation('');
    setWorkMode('');
    setEmploymentType('');
    setExperienceLevel('');
    setPage(1);
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <Helmet><title>Explore Premium Careers - JobReqruitment</title></Helmet>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-secondary-900 via-secondary-800 to-primary-950 text-white py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-heading font-bold mb-3"
          >
            Find Your Next Elite Opportunity
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-secondary-200 max-w-2xl mx-auto"
          >
            Discover hand-picked positions from the world's most innovative enterprises.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar Form */}
        <form onSubmit={handleSearchSubmit} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-primary-500 focus-within:bg-white transition-all">
            <HiSearch className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Job title, keywords, or skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-0 outline-none w-full text-secondary-800 text-sm"
            />
          </div>
          <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-primary-500 focus-within:bg-white transition-all">
            <HiLocationMarker className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="City, state, or country..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent border-0 outline-none w-full text-secondary-800 text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl px-6 py-2.5 transition-all text-sm shadow-md shadow-primary-200"
          >
            Search Jobs
          </button>
        </form>

        <div className="flex gap-8 items-start">
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden lg:block w-64 bg-white border border-gray-200 p-6 rounded-2xl shadow-sm space-y-6 flex-shrink-0">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <h3 className="font-bold text-secondary-900 text-sm flex items-center gap-2">
                <HiFilter className="w-4 h-4 text-primary-500" /> Filter Careers
              </h3>
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-xs text-primary-600 font-semibold hover:underline"
              >
                Clear All
              </button>
            </div>

            {/* Work Mode */}
            <div>
              <label className="block text-xs font-bold uppercase text-secondary-500 tracking-wider mb-2">Work Mode</label>
              <select
                value={workMode}
                onChange={(e) => { setWorkMode(e.target.value); setPage(1); }}
                className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-700 bg-white"
              >
                <option value="">All Work Modes</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="on-site">On-site</option>
              </select>
            </div>

            {/* Employment Type */}
            <div>
              <label className="block text-xs font-bold uppercase text-secondary-500 tracking-wider mb-2">Job Type</label>
              <select
                value={employmentType}
                onChange={(e) => { setEmploymentType(e.target.value); setPage(1); }}
                className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-700 bg-white"
              >
                <option value="">All Job Types</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
                <option value="freelance">Freelance</option>
              </select>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-xs font-bold uppercase text-secondary-500 tracking-wider mb-2">Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => { setExperienceLevel(e.target.value); setPage(1); }}
                className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-700 bg-white"
              >
                <option value="">All Levels</option>
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
                <option value="lead">Lead / Management</option>
                <option value="executive">Executive</option>
              </select>
            </div>
          </aside>

          {/* Main Job Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-bold text-secondary-900">
                {isLoading ? 'Searching...' : `Showing ${jobs.length} Positions`}
              </h2>
              <button
                type="button"
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-xl bg-white text-xs font-semibold text-secondary-700"
              >
                <HiFilter className="w-4 h-4 text-primary-500" /> Filters
              </button>
            </div>

            {/* Loading / Error States */}
            {isLoading && (
              <div className="grid sm:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white border border-gray-200 p-6 rounded-2xl animate-pulse space-y-4">
                    <div className="h-5 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="flex gap-2">
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {isError && (
              <div className="bg-red-50 text-red-700 p-6 rounded-2xl border border-red-100 text-center">
                <p className="font-semibold mb-2">Unable to retrieve job postings.</p>
                <button onClick={() => refetch()} className="text-xs font-bold underline hover:text-red-800">
                  Try Again
                </button>
              </div>
            )}

            {!isLoading && !isError && jobs.length === 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HiSearch className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-base font-bold text-secondary-900 mb-1">No matches found</h3>
                <p className="text-xs text-secondary-500 max-w-sm mx-auto mb-6">
                  Try checking your spelling, using more general keywords, or resetting your filter criteria.
                </p>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="bg-secondary-900 text-white hover:bg-secondary-800 text-xs font-semibold px-4 py-2 rounded-xl transition-all"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* Job Listings Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <AnimatePresence>
                {!isLoading &&
                  jobs.map((job) => (
                    <motion.div
                      key={job._id}
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Tags / Badges */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-primary-50 text-primary-700 rounded-md">
                            {job.employmentType}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-green-50 text-green-700 rounded-md">
                            {job.workMode}
                          </span>
                        </div>

                        {/* Title & Company */}
                        <h3 className="text-lg font-heading font-bold text-secondary-900 mb-1.5 hover:text-primary-600 transition-colors">
                          <Link to={`/jobs/${job.slug}`}>{job.title}</Link>
                        </h3>
                        <p className="text-xs text-primary-600 font-semibold mb-4">{job.company?.name || 'Enterprise partner'}</p>

                        {/* Locations & Salary details */}
                        <div className="space-y-2 mb-4 text-xs text-secondary-500">
                          <div className="flex items-center gap-1.5">
                            <HiLocationMarker className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span>{job.locations?.[0]?.city || 'Hybrid/Remote Locations'}, {job.locations?.[0]?.country || 'India'}</span>
                          </div>
                          {job.salary?.isVisible && (
                            <div className="flex items-center gap-1.5">
                              <HiCurrencyRupee className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              <span>₹{job.salary.min ? job.salary.min.toLocaleString('en-IN') : 'N/A'} - ₹{job.salary.max ? job.salary.max.toLocaleString('en-IN') : 'N/A'} {job.salary.period}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* CTA Footer */}
                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-4">
                        <span className="text-[10px] text-gray-400">
                          Posted {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                        <Link
                          to={`/jobs/${job.slug}`}
                          className="inline-flex items-center text-xs font-semibold text-primary-600 hover:text-primary-700 gap-1 hover:underline"
                        >
                          View Details <HiArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>

            {/* Pagination Controls */}
            {!isLoading && totalPages > 1 && (
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  className="p-2 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 disabled:opacity-50 transition-all text-secondary-600"
                >
                  <HiChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs font-semibold text-secondary-600">
                  Page {page} of {totalPages}
                </span>
                <button
                  type="button"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  className="p-2 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 disabled:opacity-50 transition-all text-secondary-600"
                >
                  <HiChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Collapsible Filters Overlay */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden flex justify-end"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween' }}
              className="w-80 bg-white h-full p-6 space-y-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <h3 className="font-bold text-secondary-900 text-sm flex items-center gap-2">
                    <HiFilter className="w-4 h-4 text-primary-500" /> Filter Careers
                  </h3>
                  <button type="button" onClick={() => setShowMobileFilters(false)}>
                    <HiX className="w-5 h-5 text-gray-500 hover:text-gray-800" />
                  </button>
                </div>

                <div className="space-y-4 mt-6">
                  {/* Work Mode */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-secondary-500 tracking-wider mb-2">Work Mode</label>
                    <select
                      value={workMode}
                      onChange={(e) => { setWorkMode(e.target.value); setPage(1); }}
                      className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-700 bg-white"
                    >
                      <option value="">All Work Modes</option>
                      <option value="remote">Remote</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="on-site">On-site</option>
                    </select>
                  </div>

                  {/* Employment Type */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-secondary-500 tracking-wider mb-2">Job Type</label>
                    <select
                      value={employmentType}
                      onChange={(e) => { setEmploymentType(e.target.value); setPage(1); }}
                      className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-700 bg-white"
                    >
                      <option value="">All Job Types</option>
                      <option value="full-time">Full Time</option>
                      <option value="part-time">Part Time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                      <option value="freelance">Freelance</option>
                    </select>
                  </div>

                  {/* Experience Level */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-secondary-500 tracking-wider mb-2">Experience Level</label>
                    <select
                      value={experienceLevel}
                      onChange={(e) => { setExperienceLevel(e.target.value); setPage(1); }}
                      className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-700 bg-white"
                    >
                      <option value="">All Levels</option>
                      <option value="entry">Entry Level</option>
                      <option value="mid">Mid Level</option>
                      <option value="senior">Senior Level</option>
                      <option value="lead">Lead / Management</option>
                      <option value="executive">Executive</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="flex-1 py-2.5 border border-gray-200 rounded-xl text-xs font-semibold text-secondary-700 text-center"
                >
                  Clear All
                </button>
                <button
                  type="button"
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-1 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-semibold text-center"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Jobs;