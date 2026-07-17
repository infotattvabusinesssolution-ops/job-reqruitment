import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { adminApi } from '../../../api/dashboardApi';

const AdminSettings = () => {
  const { data: settingsData, isLoading } = useQuery({
    queryKey: ['adminSettings'],
    queryFn: async () => {
      const res = await adminApi.getSettings();
      return res.data.data;
    },
  });

  const updateSettingsMutation = useMutation({
    mutationFn: async (data) => adminApi.updateSettings(data),
    onSuccess: () => toast.success('Settings updated successfully'),
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to update settings'),
  });

  if (isLoading) {
    return <div className="text-center text-xs text-secondary-400 animate-pulse py-8">Loading site settings...</div>;
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-150 shadow-sm max-w-2xl animate-fadeIn">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateSettingsMutation.mutate(settingsData);
        }}
        className="space-y-6"
      >
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Site Name</label>
            <input
              type="text"
              defaultValue={settingsData?.siteName || 'Geo India Limited'}
              className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Contact Email</label>
            <input
              type="email"
              defaultValue={settingsData?.contactEmail || 'contact@geoindialimited.com'}
              className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">System Alert Banner Message</label>
          <input
            type="text"
            defaultValue={settingsData?.alertMessage || 'We are currently hiring for top MNC positions!'}
            className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
          />
        </div>

        <button
          type="submit"
          className="bg-primary-600 hover:bg-primary-700 text-white rounded-xl px-6 py-2.5 text-xs font-bold shadow-md transition-all"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;
