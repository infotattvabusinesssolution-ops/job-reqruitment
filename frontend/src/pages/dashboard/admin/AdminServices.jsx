import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { serviceApi } from '../../../api/candidateApi';
import { HiTrash, HiPlus, HiPencil } from 'react-icons/hi';

const iconOptions = [
  { value: 'desktop', label: 'IT/Desktop' },
  { value: 'briefcase', label: 'Briefcase (Non-IT)' },
  { value: 'group', label: 'User Group (Bulk Hiring)' },
  { value: 'users', label: 'Users (Executive)' },
  { value: 'clock', label: 'Clock (Contract)' },
  { value: 'trending', label: 'Trending Graph (Permanent)' },
  { value: 'rupee', label: 'Rupee Coin (Payroll)' },
  { value: 'globe', label: 'Globe (RPO)' },
];

const AdminServices = () => {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    serviceId: '',
    icon: 'briefcase',
    title: '',
    shortDesc: '',
    longDesc: '',
    order: 0,
    isActive: true,
  });
  const [features, setFeatures] = useState([]);

  const { data: services = [], isLoading } = useQuery({
    queryKey: ['adminServices'],
    queryFn: async () => {
      const res = await serviceApi.getAll({ all: true });
      return res.data.data;
    },
  });

  const createServiceMutation = useMutation({
    mutationFn: async (data) => serviceApi.create(data),
    onSuccess: () => {
      toast.success('Service created successfully');
      setModalOpen(false);
      resetForm();
      queryClient.invalidateQueries(['adminServices']);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to create service'),
  });

  const updateServiceMutation = useMutation({
    mutationFn: async ({ id, data }) => serviceApi.update(id, data),
    onSuccess: () => {
      toast.success('Service updated successfully');
      setModalOpen(false);
      resetForm();
      queryClient.invalidateQueries(['adminServices']);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to update service'),
  });

  const deleteServiceMutation = useMutation({
    mutationFn: async (id) => serviceApi.delete(id),
    onSuccess: () => {
      toast.success('Service deleted successfully');
      queryClient.invalidateQueries(['adminServices']);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to delete service'),
  });

  const resetForm = () => {
    setServiceForm({
      serviceId: '',
      icon: 'briefcase',
      title: '',
      shortDesc: '',
      longDesc: '',
      order: 0,
      isActive: true,
    });
    setFeatures([]);
    setEditingService(null);
  };

  const handleEdit = (svc) => {
    setEditingService(svc);
    setServiceForm({
      serviceId: svc.serviceId,
      icon: svc.icon || 'briefcase',
      title: svc.title,
      shortDesc: svc.shortDesc,
      longDesc: svc.longDesc,
      order: svc.order || 0,
      isActive: svc.isActive,
    });
    setFeatures(svc.features || []);
    setModalOpen(true);
  };

  const handleAddFeature = () => {
    setFeatures([...features, '']);
  };

  const handleFeatureChange = (index, val) => {
    const updated = [...features];
    updated[index] = val;
    setFeatures(updated);
  };

  const handleRemoveFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedFeatures = features.filter((f) => f.trim() !== '');
    const dataToSend = { ...serviceForm, features: cleanedFeatures };

    if (editingService) {
      updateServiceMutation.mutate({ id: editingService._id, data: dataToSend });
    } else {
      createServiceMutation.mutate(dataToSend);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-xs text-secondary-400 animate-pulse">Loading Services...</div>;
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Action Header */}
      <div className="flex justify-end">
        <button
          onClick={() => { resetForm(); setModalOpen(true); }}
          className="btn-primary inline-flex items-center gap-1 px-4 py-2 text-xs"
        >
          <HiPlus className="w-4 h-4" /> Create Service
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-150 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-150 text-[10px] uppercase font-bold text-secondary-500">
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Service ID</th>
                <th className="px-6 py-4">Icon Key</th>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs text-secondary-700">
              {services.map((svc) => (
                <tr key={svc._id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-semibold">{svc.title}</td>
                  <td className="px-6 py-4">{svc.serviceId}</td>
                  <td className="px-6 py-4 font-mono">{svc.icon}</td>
                  <td className="px-6 py-4">{svc.order}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      svc.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {svc.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(svc)}
                      className="text-primary-600 hover:text-primary-700 p-1.5 rounded-lg hover:bg-primary-50 inline-block"
                    >
                      <HiPencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Delete Service permanently?')) {
                          deleteServiceMutation.mutate(svc._id);
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

      {/* Modal Dialog for Service Form */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-xl relative max-h-[90vh] overflow-y-auto text-left">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-lg font-bold"
            >
              &times;
            </button>

            <h3 className="text-xl font-heading font-bold text-secondary-900">
              {editingService ? 'Edit Service' : 'Create New Service'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Service Title *</label>
                  <input
                    type="text"
                    required
                    value={serviceForm.title}
                    onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                    placeholder="e.g. IT Recruitment Services"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Service ID * (e.g. slug)</label>
                  <input
                    type="text"
                    required
                    disabled={!!editingService}
                    value={serviceForm.serviceId}
                    onChange={(e) => setServiceForm({ ...serviceForm, serviceId: e.target.value })}
                    placeholder="e.g. it-recruitment"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none disabled:bg-gray-50 disabled:text-gray-400"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Icon</label>
                  <select
                    value={serviceForm.icon}
                    onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none bg-white"
                  >
                    {iconOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Sort Order</label>
                  <input
                    type="number"
                    value={serviceForm.order}
                    onChange={(e) => setServiceForm({ ...serviceForm, order: parseInt(e.target.value) || 0 })}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Short Description *</label>
                <input
                  type="text"
                  required
                  value={serviceForm.shortDesc}
                  onChange={(e) => setServiceForm({ ...serviceForm, shortDesc: e.target.value })}
                  placeholder="A one-sentence summary for card grid..."
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Long Description *</label>
                <textarea
                  rows={3}
                  required
                  value={serviceForm.longDesc}
                  onChange={(e) => setServiceForm({ ...serviceForm, longDesc: e.target.value })}
                  placeholder="Detailed description shown in popup..."
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              {/* Dynamic Features List Editor */}
              <div className="space-y-2 border-t border-gray-100 pt-4">
                <div className="flex justify-between items-center">
                  <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Scope / Recruited Roles List</label>
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="text-primary-600 hover:text-primary-700 text-xs font-bold flex items-center gap-0.5"
                  >
                    <HiPlus className="w-3.5 h-3.5" /> Add Bullet Point
                  </button>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {features.map((feat, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => handleFeatureChange(idx, e.target.value)}
                        placeholder={`e.g. software engineer position ${idx + 1}`}
                        className="flex-1 border border-gray-200 rounded-xl p-2 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="text-danger-550 hover:text-danger-650 text-xs font-bold"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  {features.length === 0 && (
                    <div className="text-center text-xs text-secondary-400 py-2">No scope bullets added yet.</div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="serviceIsActive"
                  checked={serviceForm.isActive}
                  onChange={(e) => setServiceForm({ ...serviceForm, isActive: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="serviceIsActive" className="text-xs font-semibold text-secondary-750">Active (Visible on public services page)</label>
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
                  disabled={createServiceMutation.isLoading || updateServiceMutation.isLoading}
                  className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  {createServiceMutation.isLoading || updateServiceMutation.isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
