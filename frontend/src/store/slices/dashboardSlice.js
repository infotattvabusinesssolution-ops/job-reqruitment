import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stats: null,
  recentJobs: [],
  recentApplications: [],
  recentCandidates: [],
  charts: {
    jobViews: [],
    applicationsOverTime: [],
    topLocations: [],
  },
  isLoading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setStats: (state, action) => {
      state.stats = action.payload;
    },
    setRecentJobs: (state, action) => {
      state.recentJobs = action.payload;
    },
    setRecentApplications: (state, action) => {
      state.recentApplications = action.payload;
    },
    setRecentCandidates: (state, action) => {
      state.recentCandidates = action.payload;
    },
    setCharts: (state, action) => {
      state.charts = { ...state.charts, ...action.payload };
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setStats, setRecentJobs, setRecentApplications,
  setRecentCandidates, setCharts, setLoading, setError,
} = dashboardSlice.actions;

export const selectDashboardStats = (state) => state.dashboard.stats;
export const selectRecentJobs = (state) => state.dashboard.recentJobs;
export const selectRecentApplications = (state) => state.dashboard.recentApplications;
export const selectDashboardLoading = (state) => state.dashboard.isLoading;

export default dashboardSlice.reducer;