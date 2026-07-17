import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { adminApi } from '../../../api/dashboardApi';
import { HiCheckCircle, HiXCircle, HiTrash } from 'react-icons/hi';

const AdminUsers = () => {
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: async () => {
      const res = await adminApi.getUsers({ limit: 100 });
      return res.data.data.users;
    },
  });

  const toggleUserMutation = useMutation({
    mutationFn: async ({ id, isActive }) => adminApi.updateUser(id, { isActive }),
    onSuccess: () => {
      toast.success('User status updated');
      queryClient.invalidateQueries(['adminUsers']);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Operation failed'),
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (id) => adminApi.deleteUser(id),
    onSuccess: () => {
      toast.success('User deleted');
      queryClient.invalidateQueries(['adminUsers']);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to delete user'),
  });

  if (isLoading) {
    return <div className="p-8 text-center text-xs text-secondary-400 animate-pulse">Loading accounts directory...</div>;
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-150 shadow-sm overflow-hidden animate-fadeIn">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-150 text-[10px] uppercase font-bold text-secondary-500">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs text-secondary-700">
            {users?.map((u) => (
              <tr key={u._id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4 font-semibold">{u.firstName} {u.lastName}</td>
                <td className="px-6 py-4 text-secondary-500">{u.email}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 bg-gray-100 rounded text-[10px] font-bold text-secondary-600 capitalize">
                    {u.role?.displayName || u.role?.name || 'Candidate'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {u.isActive ? (
                    <span className="text-green-600 flex items-center gap-1 font-semibold">
                      <HiCheckCircle className="w-4 h-4" /> Active
                    </span>
                  ) : (
                    <span className="text-gray-400 flex items-center gap-1 font-semibold">
                      <HiXCircle className="w-4 h-4" /> Suspended
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => toggleUserMutation.mutate({ id: u._id, isActive: !u.isActive })}
                    className="text-[10px] font-bold text-primary-600 hover:underline"
                  >
                    {u.isActive ? 'Suspend' : 'Activate'}
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Delete user profile permanently?')) {
                        deleteUserMutation.mutate(u._id);
                      }
                    }}
                    className="text-danger-600 hover:text-danger-700 p-1.5 rounded-lg hover:bg-danger-50 inline-block align-middle"
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

export default AdminUsers;
