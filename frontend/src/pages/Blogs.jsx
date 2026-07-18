import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { blogApi } from '../api/candidateApi';
import { getImageUrl } from '../constants';
import {
  HiSearch,
  HiClock,
  HiUser,
  HiCalendar,
  HiChevronLeft,
  HiChevronRight,
  HiArrowRight,
} from 'react-icons/hi';

const Blogs = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const queryParams = {
    page,
    limit: 6,
    search: search || undefined,
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['blogs', queryParams],
    queryFn: async () => {
      const response = await blogApi.getAll(queryParams);
      return response.data.data;
    },
    keepPreviousData: true,
  });

  const blogs = data?.blogs || [];
  const totalPages = data?.totalPages || 1;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    refetch();
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <Helmet><title>Career Insights & Industry Trends - JobRecruitment</title></Helmet>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-secondary-900 via-secondary-800 to-primary-950 text-white py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-heading font-bold mb-3"
          >
            Insights & Industry Trends
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-secondary-200 max-w-2xl mx-auto"
          >
            Stay ahead with the latest recruitment advice, CV tips, and talent hiring strategies.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="bg-white p-3 rounded-2xl border border-gray-150 shadow-sm flex gap-3 max-w-md mx-auto mb-10">
          <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-primary-500 focus-within:bg-white transition-all">
            <HiSearch className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-0 outline-none w-full text-secondary-800 text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl px-5 py-2.5 transition-all text-xs shadow-md"
          >
            Search
          </button>
        </form>

        {/* Loading State */}
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl animate-pulse space-y-4 overflow-hidden">
                <div className="h-48 bg-gray-200 w-full"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="bg-red-50 text-red-700 p-6 rounded-2xl border border-red-100 text-center max-w-md mx-auto">
            <p className="font-semibold mb-2">Unable to retrieve blog posts.</p>
            <button onClick={() => refetch()} className="text-xs font-bold underline hover:text-red-800">
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && blogs.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center max-w-md mx-auto">
            <h3 className="text-base font-bold text-secondary-900 mb-1">No articles found</h3>
            <p className="text-xs text-secondary-500 mb-6">We couldn't find any articles matching your search terms.</p>
            <button
              onClick={() => { setSearch(''); setPage(1); }}
              className="bg-secondary-900 text-white text-xs font-semibold px-4 py-2 rounded-xl"
            >
              Reset Search
            </button>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          <AnimatePresence>
            {!isLoading &&
              blogs.map((blog) => (
                <motion.div
                  key={blog._id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-gray-150 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all"
                >
                  {/* Cover Image */}
                  <div className="h-48 bg-gradient-to-br from-primary-100 to-accent-100 relative overflow-hidden flex items-center justify-center group">
                    {blog.coverImage?.url || (typeof blog.coverImage === 'string' && blog.coverImage) ? (
                      <img
                        src={getImageUrl(typeof blog.coverImage === 'string' ? blog.coverImage : blog.coverImage.url)}
                        alt={blog.coverImage?.alt || blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="text-4xl text-primary-300">📝</div>
                    )}

                    {blog.isFeatured && (
                      <span className="absolute top-3 left-3 bg-accent-500 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md shadow-sm">
                        Featured
                      </span>
                    )}

                    {blog.images && blog.images.length > 0 && (
                      <span className="absolute top-3 right-3 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 backdrop-blur-sm">
                        📷 {blog.images.length + 1}
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Meta Details */}
                      <div className="flex items-center gap-4 text-[10px] text-gray-400 mb-3">
                        <span className="flex items-center gap-1">
                          <HiCalendar className="w-3.5 h-3.5" />
                          {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <HiClock className="w-3.5 h-3.5" />
                          {blog.readTime} min read
                        </span>
                      </div>

                      {/* Title & Excerpt */}
                      <h3 className="text-lg font-heading font-bold text-secondary-900 mb-2 hover:text-primary-600 transition-colors line-clamp-2">
                        <Link to={`/blogs/${blog.slug}`}>{blog.title}</Link>
                      </h3>
                      <p className="text-xs text-secondary-500 line-clamp-3 mb-6 leading-relaxed">
                        {blog.excerpt || 'Read the full article to gain insights into this topic.'}
                      </p>
                    </div>

                    {/* Author & CTA */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-xs font-bold text-primary-700">
                          {blog.author?.firstName?.[0] || <HiUser className="w-4 h-4" />}
                        </div>
                        <span className="text-xs text-secondary-750 font-semibold">
                          {blog.author ? `${blog.author.firstName} ${blog.author.lastName}` : 'System Admin'}
                        </span>
                      </div>

                      <Link
                        to={`/blogs/${blog.slug}`}
                        className="text-xs font-semibold text-primary-600 hover:text-primary-700 inline-flex items-center gap-1 hover:underline"
                      >
                        Read <HiArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
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
  );
};

export default Blogs;