import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [],
  currentJob: null,
  totalJobs: 0,
  filters: {
    search: '',
    location: '',
    employmentType: '',
    experienceLevel: '',
    salaryRange: { min: 0, max: 0 },
    workMode: '',
    category: '',
  },
  sortBy: 'newest',
  pagination: {
    page: 1,
    limit: 12,
    totalPages: 0,
  },
  isLoading: false,
  error: null,
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload.jobs;
      state.totalJobs = action.payload.total;
      state.pagination.totalPages = action.payload.totalPages;
    },
    setCurrentJob: (state, action) => {
      state.currentJob = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const {
  setJobs, setCurrentJob, setFilters, setSortBy,
  setPage, setLoading, setError, clearFilters,
} = jobSlice.actions;

export const selectJobs = (state) => state.jobs.jobs;
export const selectCurrentJob = (state) => state.jobs.currentJob;
export const selectFilters = (state) => state.jobs.filters;
export const selectPagination = (state) => state.jobs.pagination;

export default jobSlice.reducer;