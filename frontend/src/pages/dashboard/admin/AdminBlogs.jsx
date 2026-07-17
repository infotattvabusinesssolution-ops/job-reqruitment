import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { blogApi } from '../../../api/candidateApi';
import { HiTrash, HiPlus } from 'react-icons/hi';

const AdminBlogs = () => {
  const queryClient = useQueryClient();
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '',
    excerpt: '',
    readTime: 5,
    allowComments: true,
  });

  const { data: blogs, isLoading } = useQuery({
    queryKey: ['adminBlogs'],
    queryFn: async () => {
      const res = await blogApi.getAll({ limit: 100 });
      return res.data.data.blogs;
    },
  });

  const createBlogMutation = useMutation({
    mutationFn: async (data) => blogApi.create(data),
    onSuccess: () => {
      toast.success('Blog post created successfully');
      setBlogModalOpen(false);
      setNewBlog({ title: '', content: '', excerpt: '', readTime: 5, allowComments: true });
      queryClient.invalidateQueries(['adminBlogs']);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to create blog post'),
  });

  const deleteBlogMutation = useMutation({
    mutationFn: async (id) => blogApi.delete(id),
    onSuccess: () => {
      toast.success('Blog post deleted');
      queryClient.invalidateQueries(['adminBlogs']);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to delete blog post'),
  });

  if (isLoading) {
    return <div className="p-8 text-center text-xs text-secondary-400 animate-pulse">Loading blog directory...</div>;
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Action Header */}
      <div className="flex justify-end">
        <button
          onClick={() => setBlogModalOpen(true)}
          className="btn-primary inline-flex items-center gap-1 px-4 py-2 text-xs"
        >
          <HiPlus className="w-4 h-4" /> Create Article
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-150 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-150 text-[10px] uppercase font-bold text-secondary-500">
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Comments</th>
                <th className="px-6 py-4">Likes</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs text-secondary-700">
              {blogs?.map((b) => (
                <tr key={b._id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-semibold">{b.title}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-[10px] font-bold">
                      Published
                    </span>
                  </td>
                  <td className="px-6 py-4 text-secondary-500">{b.comments?.length || 0}</td>
                  <td className="px-6 py-4 text-secondary-500">{b.likes || 0} likes</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => {
                        if (window.confirm('Delete blog article permanently?')) {
                          deleteBlogMutation.mutate(b._id);
                        }
                      }}
                      className="text-danger-600 hover:text-danger-700 p-1.5 rounded-lg hover:bg-danger-50"
                    >
                      <HiTrash className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog for Blog Creation */}
      {blogModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-xl relative max-h-[90vh] overflow-y-auto text-left">
            <button
              onClick={() => setBlogModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-lg font-bold"
            >
              &times;
            </button>

            <h3 className="text-xl font-heading font-bold text-secondary-900">Create New Article</h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                createBlogMutation.mutate(newBlog);
              }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Article Title *</label>
                <input
                  type="text"
                  required
                  value={newBlog.title}
                  onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                  placeholder="e.g. 5 Tips to Build a Strong CV"
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Short Excerpt *</label>
                <input
                  type="text"
                  required
                  value={newBlog.excerpt}
                  onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                  placeholder="A quick summary of the article..."
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Full Content *</label>
                <textarea
                  rows={6}
                  required
                  value={newBlog.content}
                  onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                  placeholder="Write the full content of the article here..."
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div className="flex gap-4 animate-fadeIn">
                <div className="space-y-1 flex-1">
                  <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Read Time (minutes)</label>
                  <input
                    type="number"
                    min={1}
                    value={newBlog.readTime}
                    onChange={(e) => setNewBlog({ ...newBlog, readTime: parseInt(e.target.value) || 5 })}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="allowComments"
                    checked={newBlog.allowComments}
                    onChange={(e) => setNewBlog({ ...newBlog, allowComments: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="allowComments" className="text-xs font-semibold text-secondary-750">Allow Reader Comments</label>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setBlogModalOpen(false)}
                  className="px-5 py-2.5 border border-gray-200 rounded-xl text-xs font-semibold text-secondary-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createBlogMutation.isLoading}
                  className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  {createBlogMutation.isLoading ? 'Publishing...' : 'Publish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;
