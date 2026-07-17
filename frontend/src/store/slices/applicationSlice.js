import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  applications: [],
  currentApplication: null,
  totalApplications: 0,
  pagination: {
    page: 1,
    limit: 12,
    totalPages: 0,
  },
  isLoading: false,
  error: null,
};

const applicationSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    setApplications: (state, action) => {
      state.applications = action.payload.applications;
      state.totalApplications = action.payload.total;
      state.pagination.totalPages = action.payload.totalPages;
    },
    setCurrentApplication: (state, action) => {
      state.currentApplication = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
  },
});

export const {
  setApplications, setCurrentApplication,
  setLoading, setError, setPage,
} = applicationSlice.actions;

export const selectApplications = (state) => state.applications.applications;
export const selectCurrentApplication = (state) => state.applications.currentApplication;
export const selectApplicationsPagination = (state) => state.applications.pagination;

export default applicationSlice.reducer;