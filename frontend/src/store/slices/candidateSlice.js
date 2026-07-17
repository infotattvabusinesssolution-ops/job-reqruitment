import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  savedJobs: [],
  appliedJobs: [],
  isLoading: false,
  error: null,
};

const candidateSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {
    setProfile: (state, action) => { state.profile = action.payload; },
    setSavedJobs: (state, action) => { state.savedJobs = action.payload; },
    setAppliedJobs: (state, action) => { state.appliedJobs = action.payload; },
    setLoading: (state, action) => { state.isLoading = action.payload; },
    setError: (state, action) => { state.error = action.payload; },
  },
});

export const { setProfile, setSavedJobs, setAppliedJobs, setLoading, setError } = candidateSlice.actions;
export default candidateSlice.reducer;