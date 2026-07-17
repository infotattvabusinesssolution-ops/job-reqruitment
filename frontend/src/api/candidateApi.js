import axiosInstance from './axiosInstance';

export const candidateApi = {
  getProfile: async () => axiosInstance.get('/candidates/profile'),
  updateProfile: async (data) => axiosInstance.put('/candidates/profile', data),
  getSavedJobs: async () => axiosInstance.get('/candidates/saved-jobs'),
  getApplications: async (params) => axiosInstance.get('/candidates/applications', { params }),
  uploadResume: async (file) => {
    const formData = new FormData();
    formData.append('resume', file);
    return axiosInstance.post('/candidates/upload-resume', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  deleteResume: async () => axiosInstance.delete('/candidates/resume'),
  addSkill: async (skill) => axiosInstance.post('/candidates/skills', skill),
  removeSkill: async (skillId) => axiosInstance.delete(`/candidates/skills/${skillId}`),
  addExperience: async (experience) => axiosInstance.post('/candidates/experience', experience),
  updateExperience: async (id, data) => axiosInstance.put(`/candidates/experience/${id}`, data),
  deleteExperience: async (id) => axiosInstance.delete(`/candidates/experience/${id}`),
  addEducation: async (education) => axiosInstance.post('/candidates/education', education),
  updateEducation: async (id, data) => axiosInstance.put(`/candidates/education/${id}`, data),
  deleteEducation: async (id) => axiosInstance.delete(`/candidates/education/${id}`),
};

export const recruiterApi = {
  getDashboard: async () => axiosInstance.get('/recruiters/dashboard'),
  getAssignedJobs: async () => axiosInstance.get('/recruiters/assigned-jobs'),
  getCandidates: async (params) => axiosInstance.get('/recruiters/candidates', { params }),
  getPipeline: async () => axiosInstance.get('/recruiters/pipeline'),
};

export const employerApi = {
  getProfile: async () => axiosInstance.get('/employers/profile'),
  updateProfile: async (data) => axiosInstance.put('/employers/profile', data),
  getCompany: async () => axiosInstance.get('/employers/company'),
  updateCompany: async (data) => axiosInstance.put('/employers/company', data),
  getJobs: async (params) => axiosInstance.get('/employers/jobs', { params }),
  getApplications: async (params) => axiosInstance.get('/employers/applications', { params }),
  getApplicants: async (jobId) => axiosInstance.get(`/employers/jobs/${jobId}/applicants`),
};

export const applicationApi = {
  getAll: async (params) => axiosInstance.get('/applications', { params }),
  getById: async (id) => axiosInstance.get(`/applications/${id}`),
  updateStatus: async (id, status, note) => axiosInstance.put(`/applications/${id}/status`, { status, note }),
  addNote: async (id, note) => axiosInstance.post(`/applications/${id}/notes`, note),
  scheduleInterview: async (id, interviewData) => axiosInstance.post(`/applications/${id}/interview`, interviewData),
  sendOffer: async (id, offerData) => axiosInstance.post(`/applications/${id}/offer`, offerData),
  withdraw: async (id) => axiosInstance.put(`/applications/${id}/withdraw`),
};

export const blogApi = {
  getAll: async (params) => axiosInstance.get('/blogs', { params }),
  getById: async (id) => axiosInstance.get(`/blogs/${id}`),
  getBySlug: async (slug) => axiosInstance.get(`/blogs/slug/${slug}`),
  create: async (data) => axiosInstance.post('/blogs', data),
  update: async (id, data) => axiosInstance.put(`/blogs/${id}`, data),
  delete: async (id) => axiosInstance.delete(`/blogs/${id}`),
  getFeatured: async () => axiosInstance.get('/blogs/featured'),
  like: async (id) => axiosInstance.post(`/blogs/${id}/like`),
  addComment: async (id, comment) => axiosInstance.post(`/blogs/${id}/comments`, comment),
};

export const contactApi = {
  sendMessage: async (data) => axiosInstance.post('/contact', data),
  subscribeNewsletter: async (email) => axiosInstance.post('/contact/newsletter', { email }),
};

export const notificationApi = {
  getAll: async (params) => axiosInstance.get('/notifications', { params }),
  markAsRead: async (id) => axiosInstance.put(`/notifications/${id}/read`),
  markAllAsRead: async () => axiosInstance.put('/notifications/read-all'),
  delete: async (id) => axiosInstance.delete(`/notifications/${id}`),
  getUnreadCount: async () => axiosInstance.get('/notifications/unread-count'),
};