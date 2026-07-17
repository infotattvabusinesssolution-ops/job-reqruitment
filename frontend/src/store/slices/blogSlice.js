import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  blogs: [],
  currentBlog: null,
  totalBlogs: 0,
  pagination: {
    page: 1,
    limit: 10,
    totalPages: 0,
  },
  isLoading: false,
  error: null,
};

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload.blogs;
      state.totalBlogs = action.payload.total;
      state.pagination.totalPages = action.payload.totalPages;
    },
    setCurrentBlog: (state, action) => {
      state.currentBlog = action.payload;
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
  setBlogs, setCurrentBlog,
  setLoading, setError, setPage,
} = blogSlice.actions;

export const selectBlogs = (state) => state.blogs.blogs;
export const selectCurrentBlog = (state) => state.blogs.currentBlog;
export const selectBlogsPagination = (state) => state.blogs.pagination;

export default blogSlice.reducer;