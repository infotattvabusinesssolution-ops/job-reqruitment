import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../../../api/dashboardApi';
import { HiUsers, HiBriefcase, HiDocumentText, HiUserGroup, HiCheckCircle } from 'react-icons/hi';

const AdminOverview = () => {
  const { data: statsData, isLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const res = await adminApi.getSystemStats();
      return res.data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 bg-white border border-gray-200 rounded-2xl" />
        ))}
      </div>
    );
  }

  const items = [
    { title: 'Registered Users', val: statsData?.usersCount || 0, icon: HiUsers, color: 'text-blue-600 bg-blue-50' },
    { title: 'Job Listings', val: statsData?.jobsCount || 0, icon: HiBriefcase, color: 'text-teal-600 bg-teal-50' },
    { title: 'Applications Logs', val: statsData?.applicationsCount || 0, icon: HiDocumentText, color: 'text-indigo-600 bg-indigo-50' },
    { title: 'Company Profiles', val: statsData?.employersCount || 0, icon: HiUserGroup, color: 'text-rose-600 bg-rose-50' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-secondary-400 tracking-wider">{item.title}</span>
              <p className="text-2xl font-bold text-secondary-900">{item.val}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}>
              <item.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      {/* System Status */}
      <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm">
        <h3 className="text-base font-bold text-secondary-900 border-b border-gray-100 pb-3 mb-4">
          System Settings Status
        </h3>
        <div className="grid md:grid-cols-3 gap-6 text-xs font-semibold text-secondary-750">
          <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl space-y-1">
            <span className="text-[9px] uppercase font-bold text-gray-400">Environment</span>
            <p className="text-secondary-900">Node Development Mode</p>
          </div>
          <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl space-y-1">
            <span className="text-[9px] uppercase font-bold text-gray-400">Database Connection</span>
            <p className="text-green-600 flex items-center gap-1">
              <HiCheckCircle className="w-4 h-4" /> Connected & Active
            </p>
          </div>
          <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl space-y-1">
            <span className="text-[9px] uppercase font-bold text-gray-400">Seeding Version</span>
            <p className="text-secondary-900">GIL Schema v1.0.2</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
