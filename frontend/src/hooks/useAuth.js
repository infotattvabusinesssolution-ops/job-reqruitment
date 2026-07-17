import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  selectUser,
  selectIsAuthenticated,
  selectAccessToken,
  selectUserRole,
  logout as logoutAction,
  setCredentials,
} from '../store/slices/authSlice';
import { authApi } from '../api/authApi';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const accessToken = useSelector(selectAccessToken);
  const userRole = useSelector(selectUserRole);

  const login = async (credentials) => {
    try {
      const response = await authApi.login(credentials);
      const { user, accessToken } = response.data.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(setCredentials({ user, accessToken }));
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authApi.register(userData);
      const { user, accessToken } = response.data.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(setCredentials({ user, accessToken }));
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
      };
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      // Continue with logout regardless
    }
    dispatch(logoutAction());
    navigate('/login');
  };

  const isRole = (...roles) => {
    return roles.includes(userRole);
  };

  const isEmployer = userRole === 'employer';
  const isCandidate = userRole === 'candidate';
  const isRecruiter = userRole === 'recruiter';
  const isAdmin = userRole === 'admin' || userRole === 'super_admin';

  return {
    user,
    isAuthenticated,
    accessToken,
    userRole,
    login,
    register,
    logout,
    isRole,
    isEmployer,
    isCandidate,
    isRecruiter,
    isAdmin,
  };
};