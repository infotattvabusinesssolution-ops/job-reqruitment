import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import jobReducer from './slices/jobSlice';
import candidateReducer from './slices/candidateSlice';
import employerReducer from './slices/employerSlice';
import recruiterReducer from './slices/recruiterSlice';
import applicationReducer from './slices/applicationSlice';
import dashboardReducer from './slices/dashboardSlice';
import notificationReducer from './slices/notificationSlice';
import blogReducer from './slices/blogSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
    candidates: candidateReducer,
    employers: employerReducer,
    recruiters: recruiterReducer,
    applications: applicationReducer,
    dashboard: dashboardReducer,
    notifications: notificationReducer,
    blogs: blogReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/setUser', 'auth/setCredentials'],
      },
    }),
  devTools: import.meta.env.DEV,
});