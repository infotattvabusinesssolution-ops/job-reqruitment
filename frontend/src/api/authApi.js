import axiosInstance from './axiosInstance';

export const authApi = {
  register: async (userData) => {
    return axiosInstance.post('/auth/register', userData);
  },

  login: async (credentials) => {
    return axiosInstance.post('/auth/login', credentials);
  },

  logout: async () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    return axiosInstance.post('/auth/logout');
  },

  refreshToken: async () => {
    return axiosInstance.post('/auth/refresh-token');
  },

  getMe: async () => {
    return axiosInstance.get('/auth/me');
  },

  updateProfile: async (profileData) => {
    return axiosInstance.put('/auth/profile', profileData);
  },

  changePassword: async (passwordData) => {
    return axiosInstance.put('/auth/change-password', passwordData);
  },

  forgotPassword: async (email) => {
    return axiosInstance.post('/auth/forgot-password', { email });
  },

  resetPassword: async (token, password, confirmPassword) => {
    return axiosInstance.post('/auth/reset-password', {
      token,
      password,
      confirmPassword: confirmPassword || password,
    });
  },

  verifyEmail: async (token) => {
    return axiosInstance.get(`/auth/verify-email/${token}`);
  },

  sendOTP: async (email) => {
    return axiosInstance.post('/auth/send-otp', { email });
  },

  verifyOTP: async (email, otp) => {
    return axiosInstance.post('/auth/verify-otp', { email, otp });
  },
};