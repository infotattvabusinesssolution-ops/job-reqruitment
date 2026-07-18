import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { careerApi } from '../../../api/candidateApi';
import { HiTrash, HiPlus, HiPencil } from 'react-icons/hi';

const AdminCareers = () => {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCareer, setEditingCareer] = useState(null);
  const [careerForm, setCareerForm] = useState({
    title: '',
    dept: '',
    loc: '',
    exp: '',
    salary: '',
    order: 0,
    isActive: true,
  });

  const { data: careers = [], isLoading } = useQuery({
    queryKey: ['adminCareers'],
    queryFn: async () => {
      const res = await careerApi.getAll({ all: true });
      return res.data.data;
    },
  });

  const createCareerMutation = useMutation({
    mutationFn: async (data) => careerApi.create(data),
    onSuccess: () => {
      toast.success('Career opening created successfully');
      setModalOpen(false);
      resetForm();
      queryClient.invalidateQueries(['adminCareers']);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to create career opening'),
  });

  const updateCareerMutation = useMutation({
    mutationFn: async ({ id, data }) => careerApi.update(id, data),
    onSuccess: () => {
      toast.success('Career opening updated successfully');
      setModalOpen(false);
      resetForm();
      queryClient.invalidateQueries(['adminCareers']);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to update career opening'),
  });

  const deleteCareerMutation = useMutation({
    mutationFn: async (id) => careerApi.delete(id),
    onSuccess: () => {
      toast.success('Career opening deleted successfully');
      queryClient.invalidateQueries(['adminCareers']);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to delete career opening'),
  });

  const resetForm = () => {
    setCareerForm({
      title: '',
      dept: '',
      loc: '',
      exp: '',
      salary: '',
      order: 0,
      isActive: true,
    });
    setEditingCareer(null);
  };

  const handleEdit = (career) => {
    setEditingCareer(career);
    setCareerForm({
      title: career.title,
      dept: career.dept,
      loc: career.loc,
      exp: career.exp,
      salary: career.salary,
      order: career.order || 0,
      isActive: career.isActive,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCareer) {
      updateCareerMutation.mutate({ id: editingCareer._id, data: careerForm });
    } else {
      createCareerMutation.mutate(careerForm);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-xs text-secondary-400 animate-pulse">Loading Careers...</div>;
  }

  return (
    <div className="space-y-6 animate-fadeIn text-left">
      {/* Action Header */}
      <div className="flex justify-end">
        <button
          onClick={() => { resetForm(); setModalOpen(true); }}
          className="btn-primary inline-flex items-center gap-1 px-4 py-2 text-xs"
        >
          <HiPlus className="w-4 h-4" /> Create Opening
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-150 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-150 text-[10px] uppercase font-bold text-secondary-500">
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Experience</th>
                <th className="px-6 py-4">Salary</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs text-secondary-700">
              {careers.map((c) => (
                <tr key={c._id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-semibold">{c.title}</td>
                  <td className="px-6 py-4">{c.dept}</td>
                  <td className="px-6 py-4">{c.loc}</td>
                  <td className="px-6 py-4">{c.exp}</td>
                  <td className="px-6 py-4">{c.salary}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      c.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {c.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(c)}
                      className="text-primary-600 hover:text-primary-700 p-1.5 rounded-lg hover:bg-primary-50 inline-block"
                    >
                      <HiPencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this career opening permanently?')) {
                          deleteCareerMutation.mutate(c._id);
                        }
                      }}
                      className="text-danger-600 hover:text-danger-700 p-1.5 rounded-lg hover:bg-danger-50 inline-block"
                    >
                      <HiTrash className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {careers.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-secondary-400">No career openings found. Create one to get started!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog for Career Form */}
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
              {editingCareer ? 'Edit Career Opening' : 'Create New Career Opening'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Job Title *</label>
                <input
                  type="text"
                  required
                  value={careerForm.title}
                  onChange={(e) => setCareerForm({ ...careerForm, title: e.target.value })}
                  placeholder="e.g. Senior Recruitment Executive"
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Department *</label>
                  <input
                    type="text"
                    required
                    value={careerForm.dept}
                    onChange={(e) => setCareerForm({ ...careerForm, dept: e.target.value })}
                    placeholder="e.g. HR & Sourcing"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Location *</label>
                  <input
                    type="text"
                    required
                    value={careerForm.loc}
                    onChange={(e) => setCareerForm({ ...careerForm, loc: e.target.value })}
                    placeholder="e.g. Mumbai / Noida / Remote"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Experience Required *</label>
                  <input
                    type="text"
                    required
                    value={careerForm.exp}
                    onChange={(e) => setCareerForm({ ...careerForm, exp: e.target.value })}
                    placeholder="e.g. 1-3 Years"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Expected Salary *</label>
                  <input
                    type="text"
                    required
                    value={careerForm.salary}
                    onChange={(e) => setCareerForm({ ...careerForm, salary: e.target.value })}
                    placeholder="e.g. 3.5 - 5 LPA"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Sort Order</label>
                  <input
                    type="number"
                    value={careerForm.order}
                    onChange={(e) => setCareerForm({ ...careerForm, order: parseInt(e.target.value) || 0 })}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="careerIsActive"
                  checked={careerForm.isActive}
                  onChange={(e) => setCareerForm({ ...careerForm, isActive: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="careerIsActive" className="text-xs font-semibold text-secondary-750">Active (Visible on public Careers page)</label>
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
                  disabled={createCareerMutation.isLoading || updateCareerMutation.isLoading}
                  className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  {createCareerMutation.isLoading || updateCareerMutation.isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCareers;
