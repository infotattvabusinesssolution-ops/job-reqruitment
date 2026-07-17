import axiosInstance from './axiosInstance';

export const dashboardApi = {
  getStats: async () => axiosInstance.get('/dashboard/stats'),
  getRecentActivity: async () => axiosInstance.get('/dashboard/activity'),
  getJobStats: async () => axiosInstance.get('/dashboard/job-stats'),
  getApplicationStats: async () => axiosInstance.get('/dashboard/application-stats'),
  getCandidateStats: async () => axiosInstance.get('/dashboard/candidate-stats'),
  getEmployerStats: async () => axiosInstance.get('/dashboard/employer-stats'),
  getRevenueData: async () => axiosInstance.get('/dashboard/revenue'),
  getNotifications: async () => axiosInstance.get('/dashboard/notifications'),
  getUpcomingInterviews: async () => axiosInstance.get('/dashboard/upcoming-interviews'),
};

export const adminApi = {
  getUsers: async (params) => axiosInstance.get('/admin/users', { params }),
  getUser: async (id) => axiosInstance.get(`/admin/users/${id}`),
  updateUser: async (id, data) => axiosInstance.put(`/admin/users/${id}`, data),
  deleteUser: async (id) => axiosInstance.delete(`/admin/users/${id}`),
  getSystemStats: async () => axiosInstance.get('/admin/system-stats'),
  getAuditLogs: async (params) => axiosInstance.get('/admin/audit-logs', { params }),
  getSettings: async () => axiosInstance.get('/admin/settings'),
  updateSettings: async (data) => axiosInstance.put('/admin/settings', data),
};

export const uploadApi = {
  uploadFile: async (file, fieldName = 'file') => {
    const formData = new FormData();
    formData.append(fieldName, file);
    return axiosInstance.post('/uploads', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  uploadResume: async (file) => {
    const formData = new FormData();
    formData.append('resume', file);
    return axiosInstance.post('/uploads/resume', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return axiosInstance.post('/uploads/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  deleteFile: async (publicId) => axiosInstance.delete(`/uploads/${publicId}`),
};