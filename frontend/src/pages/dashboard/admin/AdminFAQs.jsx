import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { faqApi } from '../../../api/candidateApi';
import { HiTrash, HiPlus, HiPencil } from 'react-icons/hi';

const AdminFAQs = () => {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [faqForm, setFaqForm] = useState({
    question: '',
    answer: '',
    category: 'General',
    order: 0,
    isActive: true,
  });

  const { data: faqs = [], isLoading } = useQuery({
    queryKey: ['adminFaqs'],
    queryFn: async () => {
      const res = await faqApi.getAll({ all: true });
      return res.data.data;
    },
  });

  const createFaqMutation = useMutation({
    mutationFn: async (data) => faqApi.create(data),
    onSuccess: () => {
      toast.success('FAQ created successfully');
      setModalOpen(false);
      resetForm();
      queryClient.invalidateQueries(['adminFaqs']);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to create FAQ'),
  });

  const updateFaqMutation = useMutation({
    mutationFn: async ({ id, data }) => faqApi.update(id, data),
    onSuccess: () => {
      toast.success('FAQ updated successfully');
      setModalOpen(false);
      resetForm();
      queryClient.invalidateQueries(['adminFaqs']);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to update FAQ'),
  });

  const deleteFaqMutation = useMutation({
    mutationFn: async (id) => faqApi.delete(id),
    onSuccess: () => {
      toast.success('FAQ deleted successfully');
      queryClient.invalidateQueries(['adminFaqs']);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to delete FAQ'),
  });

  const resetForm = () => {
    setFaqForm({
      question: '',
      answer: '',
      category: 'General',
      order: 0,
      isActive: true,
    });
    setEditingFaq(null);
  };

  const handleEdit = (faq) => {
    setEditingFaq(faq);
    setFaqForm({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      order: faq.order || 0,
      isActive: faq.isActive,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingFaq) {
      updateFaqMutation.mutate({ id: editingFaq._id, data: faqForm });
    } else {
      createFaqMutation.mutate(faqForm);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-xs text-secondary-400 animate-pulse">Loading FAQs...</div>;
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Action Header */}
      <div className="flex justify-end">
        <button
          onClick={() => { resetForm(); setModalOpen(true); }}
          className="btn-primary inline-flex items-center gap-1 px-4 py-2 text-xs"
        >
          <HiPlus className="w-4 h-4" /> Create FAQ
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-150 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-150 text-[10px] uppercase font-bold text-secondary-500">
                <th className="px-6 py-4">Question</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs text-secondary-700">
              {faqs.map((f) => (
                <tr key={f._id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-semibold max-w-md truncate">{f.question}</td>
                  <td className="px-6 py-4">{f.category}</td>
                  <td className="px-6 py-4">{f.order}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      f.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {f.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(f)}
                      className="text-primary-600 hover:text-primary-700 p-1.5 rounded-lg hover:bg-primary-50 inline-block"
                    >
                      <HiPencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Delete FAQ permanently?')) {
                          deleteFaqMutation.mutate(f._id);
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

      {/* Modal Dialog for FAQ Form */}
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
              {editingFaq ? 'Edit FAQ' : 'Create New FAQ'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Question *</label>
                <input
                  type="text"
                  required
                  value={faqForm.question}
                  onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                  placeholder="e.g. How do I upload my resume?"
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Answer *</label>
                <textarea
                  rows={4}
                  required
                  value={faqForm.answer}
                  onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                  placeholder="Provide a detailed explanation..."
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Category</label>
                  <select
                    value={faqForm.category}
                    onChange={(e) => setFaqForm({ ...faqForm, category: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none bg-white"
                  >
                    <option value="General">General</option>
                    <option value="For Job Seekers">For Job Seekers</option>
                    <option value="For Employers">For Employers</option>
                    <option value="Account & Support">Account & Support</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Sort Order</label>
                  <input
                    type="number"
                    value={faqForm.order}
                    onChange={(e) => setFaqForm({ ...faqForm, order: parseInt(e.target.value) || 0 })}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="faqIsActive"
                  checked={faqForm.isActive}
                  onChange={(e) => setFaqForm({ ...faqForm, isActive: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="faqIsActive" className="text-xs font-semibold text-secondary-750">Active (Visible on public pages)</label>
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
                  disabled={createFaqMutation.isLoading || updateFaqMutation.isLoading}
                  className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  {createFaqMutation.isLoading || updateFaqMutation.isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFAQs;
