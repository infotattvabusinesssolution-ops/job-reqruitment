import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { blogApi } from '../api/candidateApi';
import { getImageUrl } from '../constants';
import {
  HiClock,
  HiUser,
  HiCalendar,
  HiArrowLeft,
  HiHeart,
  HiChatAlt2,
} from 'react-icons/hi';

const BlogDetails = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();
  const [commentContent, setCommentContent] = useState('');

  // Fetch article details
  const { data: blog, isLoading, isError } = useQuery({
    queryKey: ['blog', slug],
    queryFn: async () => {
      const response = await blogApi.getBySlug(slug);
      return response.data.data;
    },
  });

  // Submit comment mutation
  const commentMutation = useMutation({
    mutationFn: async () => {
      return blogApi.addComment(blog._id, { content: commentContent });
    },
    onSuccess: () => {
      toast.success('Comment posted successfully!');
      setCommentContent('');
      queryClient.invalidateQueries(['blog', slug]);
    },
    onError: (error) => {
      const msg = error.response?.data?.message || 'Failed to post comment';
      toast.error(msg);
    },
  });

  // Like mutation
  const likeMutation = useMutation({
    mutationFn: async () => {
      return blogApi.like(blog._id);
    },
    onSuccess: () => {
      toast.success('Thanks for liking!');
      queryClient.invalidateQueries(['blog', slug]);
    },
    onError: (error) => {
      const msg = error.response?.data?.message || 'Action failed';
      toast.error(msg);
    },
  });

  if (isLoading) {
    return (
      <div className="pt-32 pb-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="text-sm font-semibold text-secondary-500">Loading article...</p>
        </div>
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="pt-32 pb-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold text-secondary-900 mb-2">Article Not Found</h2>
          <p className="text-sm text-secondary-500 mb-6">The article you are looking for may have been removed or archived.</p>
          <Link to="/blogs" className="bg-primary-600 text-white hover:bg-primary-700 px-6 py-2.5 rounded-xl text-xs font-semibold">
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <Helmet><title>{blog.title} - JobRecruitment</title></Helmet>

      {/* Back button */}
      <div className="max-w-4xl mx-auto px-4 mb-6">
        <Link to="/blogs" className="inline-flex items-center text-secondary-600 hover:text-primary-600 font-semibold text-xs transition-colors">
          <HiArrowLeft className="w-4 h-4 mr-1.5" /> Back to Articles
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <motion.article
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-150 shadow-sm overflow-hidden p-6 sm:p-10 space-y-8"
        >
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-secondary-900 leading-tight">
              {blog.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <HiUser className="w-4 h-4 text-primary-500" />
                {blog.author ? `${blog.author.firstName} ${blog.author.lastName}` : 'System Admin'}
              </span>
              <span className="flex items-center gap-1">
                <HiCalendar className="w-4 h-4 text-primary-500" />
                {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <HiClock className="w-4 h-4 text-primary-500" />
                {blog.readTime} min read
              </span>
            </div>
          </div>

          {/* Cover image */}
          {(blog.coverImage?.url || (typeof blog.coverImage === 'string' && blog.coverImage)) && (
            <div className="space-y-2">
              <div className="h-64 sm:h-96 rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50 relative overflow-hidden flex items-center justify-center border border-gray-150 shadow-inner">
                <img
                  src={getImageUrl(typeof blog.coverImage === 'string' ? blog.coverImage : blog.coverImage.url)}
                  alt={blog.coverImage?.alt || blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {blog.coverImage?.alt && (
                <p className="text-[11px] text-gray-400 italic text-center font-medium">
                  {blog.coverImage.alt}
                </p>
              )}
            </div>
          )}

          {/* Body content */}
          <div className="text-secondary-700 text-sm leading-relaxed whitespace-pre-line border-b border-gray-100 pb-8">
            {blog.content}
          </div>

          {/* Article / Section Images Gallery */}
          {blog.images && blog.images.length > 0 && (
            <div className="py-6 border-b border-gray-100 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-heading font-bold text-secondary-900 flex items-center gap-2">
                  <span className="p-1.5 bg-primary-50 rounded-lg text-primary-600">🖼️</span> Visual Gallery & Key Highlights
                </h3>
                <span className="text-xs text-gray-400 font-semibold">{blog.images.length} Image{blog.images.length !== 1 ? 's' : ''}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {blog.images.map((img, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-150 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
                    <div className="h-48 overflow-hidden bg-gray-200 relative">
                      <img
                        src={getImageUrl(img.url)}
                        alt={img.alt || img.caption || `Section image ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/400x250?text=Image+Not+Found'; }}
                      />
                    </div>
                    {(img.caption || img.alt) && (
                      <div className="p-3 bg-white border-t border-gray-100 space-y-0.5">
                        {img.caption && <p className="text-xs font-bold text-secondary-800 line-clamp-1">{img.caption}</p>}
                        {img.alt && <p className="text-[10px] text-gray-400 truncate">{img.alt}</p>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions (Likes) */}
          <div className="flex items-center gap-6 pt-4 text-sm font-semibold text-secondary-600">
            <button
              onClick={() => likeMutation.mutate()}
              className="flex items-center gap-1.5 hover:text-danger-600 transition-colors group"
            >
              <HiHeart className="w-6 h-6 text-gray-300 group-hover:text-danger-500 transition-colors" />
              <span>{blog.likes} Likes</span>
            </button>
            <span className="flex items-center gap-1.5 text-secondary-500">
              <HiChatAlt2 className="w-6 h-6 text-gray-300" />
              <span>{blog.comments?.length || 0} Comments</span>
            </span>
          </div>

          {/* Comments section */}
          {blog.allowComments && (
            <div className="pt-8 space-y-6">
              <h2 className="text-lg font-bold text-secondary-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                Comments ({blog.comments?.length || 0})
              </h2>

              {/* Comments list */}
              <div className="space-y-4">
                {blog.comments && blog.comments.filter(c => c.isApproved).length === 0 ? (
                  <p className="text-xs text-secondary-400 italic">No comments posted yet. Be the first to share your thoughts!</p>
                ) : (
                  blog.comments
                    ?.filter(c => c.isApproved)
                    .map((comment, idx) => (
                      <div key={idx} className="bg-gray-50 border border-gray-100 p-4 rounded-xl space-y-2">
                        <div className="flex justify-between text-xs font-semibold text-secondary-750">
                          <span>{comment.name}</span>
                          <span className="text-[10px] text-gray-400 font-normal">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-secondary-600 leading-relaxed">{comment.content}</p>
                      </div>
                    ))
                )}
              </div>

              {/* Add comment form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (commentContent.trim()) {
                    commentMutation.mutate();
                  }
                }}
                className="pt-6 space-y-3"
              >
                <label className="block text-xs font-bold text-secondary-500 uppercase tracking-wider">Leave a Comment</label>
                <textarea
                  rows={4}
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder="Share your feedback or questions..."
                  className="w-full border border-gray-200 rounded-xl p-3.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                ></textarea>
                <button
                  type="submit"
                  disabled={commentMutation.isLoading}
                  className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all"
                >
                  {commentMutation.isLoading ? 'Posting...' : 'Post Comment'}
                </button>
              </form>
            </div>
          )}
        </motion.article>
      </div>
    </div>
  );
};

export default BlogDetails;