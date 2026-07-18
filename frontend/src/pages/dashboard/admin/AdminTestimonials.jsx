import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { testimonialApi } from '../../../api/candidateApi';
import { HiTrash, HiPlus, HiPencil, HiStar } from 'react-icons/hi';

const AdminTestimonials = () => {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [testimonialForm, setTestimonialForm] = useState({
    name: '',
    role: '',
    company: '',
    content: '',
    rating: 5,
    avatar: '',
    isActive: true,
    isFeatured: false,
  });

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['adminTestimonials'],
    queryFn: async () => {
      const res = await testimonialApi.getAll({ all: true });
      return res.data.data;
    },
  });

  const createTestimonialMutation = useMutation({
    mutationFn: async (data) => testimonialApi.create(data),
    onSuccess: () => {
      toast.success('Testimonial created successfully');
      setModalOpen(false);
      resetForm();
      queryClient.invalidateQueries(['adminTestimonials']);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to create testimonial'),
  });

  const updateTestimonialMutation = useMutation({
    mutationFn: async ({ id, data }) => testimonialApi.update(id, data),
    onSuccess: () => {
      toast.success('Testimonial updated successfully');
      setModalOpen(false);
      resetForm();
      queryClient.invalidateQueries(['adminTestimonials']);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to update testimonial'),
  });

  const deleteTestimonialMutation = useMutation({
    mutationFn: async (id) => testimonialApi.delete(id),
    onSuccess: () => {
      toast.success('Testimonial deleted successfully');
      queryClient.invalidateQueries(['adminTestimonials']);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to delete testimonial'),
  });

  const resetForm = () => {
    setTestimonialForm({
      name: '',
      role: '',
      company: '',
      content: '',
      rating: 5,
      avatar: '',
      isActive: true,
      isFeatured: false,
    });
    setEditingTestimonial(null);
  };

  const handleEdit = (t) => {
    setEditingTestimonial(t);
    setTestimonialForm({
      name: t.name,
      role: t.role,
      company: t.company,
      content: t.content,
      rating: t.rating || 5,
      avatar: t.avatar || '',
      isActive: t.isActive,
      isFeatured: t.isFeatured,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTestimonial) {
      updateTestimonialMutation.mutate({ id: editingTestimonial._id, data: testimonialForm });
    } else {
      createTestimonialMutation.mutate(testimonialForm);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-xs text-secondary-400 animate-pulse">Loading testimonials...</div>;
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Action Header */}
      <div className="flex justify-end">
        <button
          onClick={() => { resetForm(); setModalOpen(true); }}
          className="btn-primary inline-flex items-center gap-1 px-4 py-2 text-xs"
        >
          <HiPlus className="w-4 h-4" /> Create Testimonial
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-150 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-150 text-[10px] uppercase font-bold text-secondary-500">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Role & Company</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Featured</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs text-secondary-700">
              {testimonials.map((t) => (
                <tr key={t._id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-semibold">{t.name}</td>
                  <td className="px-6 py-4">{t.role} at {t.company}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-0.5 text-warning-500">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <HiStar key={idx} className={`w-4 h-4 ${idx < t.rating ? '' : 'text-gray-200'}`} />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      t.isFeatured ? 'bg-indigo-50 text-indigo-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {t.isFeatured ? 'Featured' : 'Standard'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      t.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {t.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(t)}
                      className="text-primary-600 hover:text-primary-700 p-1.5 rounded-lg hover:bg-primary-50 inline-block"
                    >
                      <HiPencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Delete Testimonial permanently?')) {
                          deleteTestimonialMutation.mutate(t._id);
                        }
                      }}
                      className="text-danger-600 hover:text-danger-700 p-1.5 rounded-lg hover:bg-danger-50 inline-block"
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

      {/* Modal Dialog for Testimonial Form */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-xl relative max-h-[90vh] overflow-y-auto text-left">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-lg font-bold"
            >
              &times;
            </button>

            <h3 className="text-xl font-heading font-bold text-secondary-900">
              {editingTestimonial ? 'Edit Testimonial' : 'Create New Testimonial'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Reviewer Name *</label>
                  <input
                    type="text"
                    required
                    value={testimonialForm.name}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Avatar URL</label>
                  <input
                    type="text"
                    value={testimonialForm.avatar}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, avatar: e.target.value })}
                    placeholder="https://image-link.com/avatar.jpg"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Job Title/Role *</label>
                  <input
                    type="text"
                    required
                    value={testimonialForm.role}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                    placeholder="e.g. Tech Lead"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={testimonialForm.company}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, company: e.target.value })}
                    placeholder="e.g. Google"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Rating</label>
                  <select
                    value={testimonialForm.rating}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) || 5 })}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none bg-white"
                  >
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Review Content *</label>
                <textarea
                  rows={4}
                  required
                  value={testimonialForm.content}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, content: e.target.value })}
                  placeholder="Paste reviewer feedback here..."
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div className="flex gap-6 pt-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="testimonialIsActive"
                    checked={testimonialForm.isActive}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, isActive: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="testimonialIsActive" className="text-xs font-semibold text-secondary-750">Active</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="testimonialIsFeatured"
                    checked={testimonialForm.isFeatured}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="testimonialIsFeatured" className="text-xs font-semibold text-secondary-750">Featured (Highlight on home page/carousels)</label>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 border border-gray-200 rounded-xl text-xs font-semibold text-secondary-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createTestimonialMutation.isLoading || updateTestimonialMutation.isLoading}
                  className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  {createTestimonialMutation.isLoading || updateTestimonialMutation.isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;
