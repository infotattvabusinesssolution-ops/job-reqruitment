import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { jobApi } from '../../../api/jobApi';
import { HiTrash } from 'react-icons/hi';

const AdminJobs = () => {
  const queryClient = useQueryClient();

  const { data: jobs, isLoading } = useQuery({
    queryKey: ['adminJobs'],
    queryFn: async () => {
      const res = await jobApi.getAll({ limit: 100 });
      return res.data.data.jobs;
    },
  });

  const deleteJobMutation = useMutation({
    mutationFn: async (id) => jobApi.delete(id),
    onSuccess: () => {
      toast.success('Job deleted successfully');
      queryClient.invalidateQueries(['adminJobs']);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to delete job'),
  });

  if (isLoading) {
    return <div className="p-8 text-center text-xs text-secondary-400 animate-pulse">Loading job listings...</div>;
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-150 shadow-sm overflow-hidden animate-fadeIn">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-150 text-[10px] uppercase font-bold text-secondary-500">
              <th className="px-6 py-4">Job Title</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Applications</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs text-secondary-700">
            {jobs?.map((j) => (
              <tr key={j._id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4 font-semibold">{j.title}</td>
                <td className="px-6 py-4 text-secondary-500 capitalize">{j.category || 'General'}</td>
                <td className="px-6 py-4">{j.location}</td>
                <td className="px-6 py-4 font-bold text-primary-600">{j.applicationsCount || 0} applied</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => {
                      if (window.confirm('Delete job listing permanently?')) {
                        deleteJobMutation.mutate(j._id);
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
  );
};

export default AdminJobs;
