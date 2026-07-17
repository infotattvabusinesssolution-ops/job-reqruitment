import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../../../api/dashboardApi';

const AdminCompanies = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: async () => {
      const res = await adminApi.getUsers({ limit: 100 });
      return res.data.data.users;
    },
  });

  if (isLoading) {
    return <div className="p-8 text-center text-xs text-secondary-400 animate-pulse">Loading company registry...</div>;
  }

  const employers = users?.filter((u) => u.role?.name === 'employer' || u.role?.name === 'admin') || [];

  return (
    <div className="bg-white rounded-2xl border border-gray-150 shadow-sm overflow-hidden animate-fadeIn">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-150 text-[10px] uppercase font-bold text-secondary-500">
              <th className="px-6 py-4">Company Name</th>
              <th className="px-6 py-4">Representative</th>
              <th className="px-6 py-4">Business Email</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs text-secondary-700">
            {employers.map((u) => (
              <tr key={u._id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4 font-bold">{u.employerProfile?.companyName || 'Not Set'}</td>
                <td className="px-6 py-4">{u.firstName} {u.lastName}</td>
                <td className="px-6 py-4 text-secondary-500">{u.email}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-[10px] font-bold">
                    Verified Partner
                  </span>
                </td>
              </tr>
            ))}
            {employers.length === 0 && (
              <tr>
                <td colSpan="4" className="p-8 text-center text-xs text-secondary-400 italic">
                  No company profiles registered.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCompanies;
