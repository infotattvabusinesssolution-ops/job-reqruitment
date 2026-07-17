import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recruiters: [],
  currentRecruiter: null,
  totalRecruiters: 0,
  pagination: {
    page: 1,
    limit: 12,
    totalPages: 0,
  },
  isLoading: false,
  error: null,
};

const recruiterSlice = createSlice({
  name: 'recruiters',
  initialState,
  reducers: {
    setRecruiters: (state, action) => {
      state.recruiters = action.payload.recruiters;
      state.totalRecruiters = action.payload.total;
      state.pagination.totalPages = action.payload.totalPages;
    },
    setCurrentRecruiter: (state, action) => {
      state.currentRecruiter = action.payload;
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
  setRecruiters, setCurrentRecruiter,
  setLoading, setError, setPage,
} = recruiterSlice.actions;

export const selectRecruiters = (state) => state.recruiters.recruiters;
export const selectCurrentRecruiter = (state) => state.recruiters.currentRecruiter;
export const selectRecruitersPagination = (state) => state.recruiters.pagination;

export default recruiterSlice.reducer;