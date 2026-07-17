import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employers: [],
  currentEmployer: null,
  totalEmployers: 0,
  pagination: {
    page: 1,
    limit: 12,
    totalPages: 0,
  },
  isLoading: false,
  error: null,
};

const employerSlice = createSlice({
  name: 'employers',
  initialState,
  reducers: {
    setEmployers: (state, action) => {
      state.employers = action.payload.employers;
      state.totalEmployers = action.payload.total;
      state.pagination.totalPages = action.payload.totalPages;
    },
    setCurrentEmployer: (state, action) => {
      state.currentEmployer = action.payload;
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
  setEmployers, setCurrentEmployer,
  setLoading, setError, setPage,
} = employerSlice.actions;

export const selectEmployers = (state) => state.employers.employers;
export const selectCurrentEmployer = (state) => state.employers.currentEmployer;
export const selectEmployersPagination = (state) => state.employers.pagination;

export default employerSlice.reducer;