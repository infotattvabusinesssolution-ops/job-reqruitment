import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { setCredentials } from './store/slices/authSlice';
import { authApi } from './api/authApi';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Industries from './pages/Industries';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import JobSeekers from './pages/JobSeekers';
import Candidates from './pages/Candidates';
import Employers from './pages/Employers';
import Recruiters from './pages/Recruiters';
import Blogs from './pages/Blogs';
import BlogDetails from './pages/BlogDetails';
import Testimonials from './pages/Testimonials';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import CandidateDashboard from './pages/dashboard/CandidateDashboard';
import EmployerDashboard from './pages/dashboard/EmployerDashboard';
import RecruiterDashboard from './pages/dashboard/RecruiterDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import Careers from './pages/Careers';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Disclaimer from './pages/Disclaimer';
import CorporateTraining from './pages/CorporateTraining';
import EmployabilitySkills from './pages/EmployabilitySkills';
import InterviewPreparation from './pages/InterviewPreparation';
import SoftSkills from './pages/SoftSkills';
import TechnicalTraining from './pages/TechnicalTraining';
import InternshipPrograms from './pages/InternshipPrograms';
import NotFound from './pages/NotFound';
import preloaderLogo from './assets/image/White and Blue Modern Printing Service Instagram Post.png';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('accessToken');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role?.name)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isPreloading, setIsPreloading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPreloading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('accessToken');
      const user = JSON.parse(localStorage.getItem('user') || 'null');

      if (token && user) {
        dispatch(setCredentials({ user, accessToken: token }));
        try {
          const response = await authApi.getMe();
          localStorage.setItem('user', JSON.stringify(response.data.data.user));
          dispatch(setCredentials({
            user: response.data.data.user,
            accessToken: token,
          }));
        } catch (error) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');
        }
      }
    };
    initAuth();
  }, [dispatch]);

  if (isPreloading) {
    return (
      <div className="fixed inset-0 z-[9999] bg-secondary-900 flex flex-col items-center justify-center text-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center space-y-6"
        >
          {/* Logo Image */}
          <div className="relative flex items-center justify-center">
            <motion.img
              src={preloaderLogo}
              alt="Geo India Limited Logo"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="w-24 h-24 rounded-full object-cover border-2 border-primary-500 shadow-xl"
            />
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-heading font-bold"
          >
            Geo<span className="text-primary-500">IndiaLimited</span>
          </motion.h1>

          <p className="text-[10px] uppercase font-bold text-secondary-400 tracking-widest animate-pulse">
            Connecting Talent with Opportunity
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes with Main Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:slug" element={<JobDetails />} />
        <Route path="/job-seekers" element={<JobSeekers />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/employers" element={<Employers />} />
        <Route path="/recruiters" element={<Recruiters />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogDetails />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/corporate-training" element={<CorporateTraining />} />
        <Route path="/employability-skills" element={<EmployabilitySkills />} />
        <Route path="/interview-preparation" element={<InterviewPreparation />} />
        <Route path="/soft-skills" element={<SoftSkills />} />
        <Route path="/technical-training" element={<TechnicalTraining />} />
        <Route path="/internship-programs" element={<InternshipPrograms />} />

        {/* Auth Routes */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Route>

      {/* Protected Dashboard Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/dashboard/candidate" replace />} />
        <Route path="candidate" element={<CandidateDashboard />} />
        <Route path="employer" element={<EmployerDashboard />} />
        <Route path="recruiter" element={<RecruiterDashboard />} />
        <Route path="admin" element={
          <ProtectedRoute allowedRoles={['admin', 'super_admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="admin/:tab" element={
          <ProtectedRoute allowedRoles={['admin', 'super_admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;