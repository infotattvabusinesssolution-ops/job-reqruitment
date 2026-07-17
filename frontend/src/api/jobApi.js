import axiosInstance from './axiosInstance';

export const jobApi = {
  getAll: async (params = {}) => {
    return axiosInstance.get('/jobs', { params });
  },

  getById: async (id) => {
    return axiosInstance.get(`/jobs/${id}`);
  },

  getBySlug: async (slug) => {
    return axiosInstance.get(`/jobs/slug/${slug}`);
  },

  create: async (jobData) => {
    return axiosInstance.post('/jobs', jobData);
  },

  update: async (id, jobData) => {
    return axiosInstance.put(`/jobs/${id}`, jobData);
  },

  delete: async (id) => {
    return axiosInstance.delete(`/jobs/${id}`);
  },

  getFeatured: async () => {
    return axiosInstance.get('/jobs/featured');
  },

  getRecent: async (limit = 5) => {
    return axiosInstance.get('/jobs/recent', { params: { limit } });
  },

  getSimilar: async (id) => {
    return axiosInstance.get(`/jobs/${id}/similar`);
  },

  saveJob: async (jobId) => {
    return axiosInstance.post(`/jobs/${jobId}/save`);
  },

  unsaveJob: async (jobId) => {
    return axiosInstance.delete(`/jobs/${jobId}/save`);
  },

  applyJob: async (jobId, applicationData) => {
    return axiosInstance.post(`/jobs/${jobId}/apply`, applicationData);
  },

  shareJob: async (jobId, shareData) => {
    return axiosInstance.post(`/jobs/${jobId}/share`, shareData);
  },

  reportJob: async (jobId, reportData) => {
    return axiosInstance.post(`/jobs/${jobId}/report`, reportData);
  },
};