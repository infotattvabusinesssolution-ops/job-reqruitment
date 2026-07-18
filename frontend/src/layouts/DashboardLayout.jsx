import React, { useState } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiHome, HiBriefcase, HiUsers, HiDocumentText, HiCalendar,
  HiChartBar, HiBell, HiCog, HiLogout, HiMenu, HiX,
  HiStar, HiClock, HiUserGroup, HiSearch, HiTrendingUp,
  HiQuestionMarkCircle, HiMail
} from 'react-icons/hi';
import { useAuth } from '../hooks/useAuth';

const sidebarLinks = {
  candidate: [
    { name: 'Dashboard', path: '/dashboard/candidate', icon: HiHome },
    { name: 'My Profile', path: '/dashboard/candidate/profile', icon: HiUserGroup },
    { name: 'Saved Jobs', path: '/dashboard/candidate/saved', icon: HiStar },
    { name: 'Applications', path: '/dashboard/candidate/applications', icon: HiDocumentText },
    { name: 'Interviews', path: '/dashboard/candidate/interviews', icon: HiCalendar },
    { name: 'Notifications', path: '/dashboard/candidate/notifications', icon: HiBell },
    { name: 'Settings', path: '/dashboard/candidate/settings', icon: HiCog },
  ],
  employer: [
    { name: 'Dashboard', path: '/dashboard/employer', icon: HiHome },
    { name: 'Company Profile', path: '/dashboard/employer/company', icon: HiBriefcase },
    { name: 'Post Job', path: '/dashboard/employer/post-job', icon: HiDocumentText },
    { name: 'My Jobs', path: '/dashboard/employer/jobs', icon: HiBriefcase },
    { name: 'Applicants', path: '/dashboard/employer/applicants', icon: HiUsers },
    { name: 'Interviews', path: '/dashboard/employer/interviews', icon: HiCalendar },
    { name: 'Analytics', path: '/dashboard/employer/analytics', icon: HiChartBar },
    { name: 'Notifications', path: '/dashboard/employer/notifications', icon: HiBell },
    { name: 'Settings', path: '/dashboard/employer/settings', icon: HiCog },
  ],
  recruiter: [
    { name: 'Dashboard', path: '/dashboard/recruiter', icon: HiHome },
    { name: 'Assigned Jobs', path: '/dashboard/recruiter/jobs', icon: HiBriefcase },
    { name: 'Candidates', path: '/dashboard/recruiter/candidates', icon: HiUsers },
    { name: 'Pipeline', path: '/dashboard/recruiter/pipeline', icon: HiTrendingUp },
    { name: 'Interviews', path: '/dashboard/recruiter/interviews', icon: HiCalendar },
    { name: 'Analytics', path: '/dashboard/recruiter/analytics', icon: HiChartBar },
    { name: 'Notifications', path: '/dashboard/recruiter/notifications', icon: HiBell },
    { name: 'Settings', path: '/dashboard/recruiter/settings', icon: HiCog },
  ],
  admin: [
    { name: 'Dashboard', path: '/dashboard/admin', icon: HiHome },
    { name: 'Form Enquiries', path: '/dashboard/admin/enquiries', icon: HiMail },
    { name: 'Users', path: '/dashboard/admin/users', icon: HiUsers },
    { name: 'Jobs', path: '/dashboard/admin/jobs', icon: HiBriefcase },
    { name: 'Companies', path: '/dashboard/admin/companies', icon: HiUserGroup },
    { name: 'Blogs', path: '/dashboard/admin/blogs', icon: HiDocumentText },
    { name: 'Services', path: '/dashboard/admin/services', icon: HiBriefcase },
    { name: 'FAQs', path: '/dashboard/admin/faqs', icon: HiQuestionMarkCircle },
    { name: 'Testimonials', path: '/dashboard/admin/testimonials', icon: HiStar },
    { name: 'Careers', path: '/dashboard/admin/careers', icon: HiBriefcase },
    { name: 'Analytics', path: '/dashboard/admin/analytics', icon: HiChartBar },
    { name: 'Settings', path: '/dashboard/admin/settings', icon: HiCog },
  ],
};

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, userRole, logout } = useAuth();
  const location = useLocation();

  const activeRole = userRole === 'super_admin' ? 'admin' : (userRole || 'candidate');
  const links = sidebarLinks[activeRole] || sidebarLinks.candidate;

  // Redirect to proper dashboard based on role
  if (location.pathname === '/dashboard') {
    return <Navigate to={`/dashboard/${activeRole}`} replace />;
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed inset-y-0 left-0 w-72 bg-white border-r border-gray-200 z-50 lg:hidden overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <Link to="/" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">JR</span>
                  </div>
                  <span className="text-lg font-bold">Menu</span>
                </Link>
                <button onClick={() => setSidebarOpen(false)}>
                  <HiX className="w-6 h-6" />
                </button>
              </div>
              <SidebarLinks links={links} location={location} onClick={() => setSidebarOpen(false)} />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-6">
            <Link to="/" className="flex items-center space-x-2 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">JR</span>
              </div>
              <div>
                <span className="text-lg font-heading font-bold block leading-tight">JobRecruitment</span>
                <span className="text-xs text-secondary-500 capitalize">{userRole}</span>
              </div>
            </Link>
            <SidebarLinks links={links} location={location} />
          </div>

          {/* User Info & Logout */}
          <div className="mt-auto p-6 border-t border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-secondary-500 truncate">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 w-full px-4 py-2.5 rounded-lg text-secondary-600 hover:bg-danger-50 hover:text-danger-600 transition-all text-sm"
            >
              <HiLogout className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-secondary-500 hover:bg-gray-100"
            >
              <HiMenu className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-4 ml-auto">
              <button className="p-2 rounded-lg text-secondary-500 hover:bg-gray-100 relative">
                <HiBell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full"></span>
              </button>
              <Link to="/" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                Back to Site
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const SidebarLinks = ({ links, location, onClick }) => (
  <nav className="space-y-1">
    {links.map((link) => {
      const isActive = location.pathname === link.path;
      return (
        <Link
          key={link.path}
          to={link.path}
          onClick={onClick}
          className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
            isActive
              ? 'bg-primary-50 text-primary-700'
              : 'text-secondary-600 hover:bg-gray-50 hover:text-secondary-900'
          }`}
        >
          <link.icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : ''}`} />
          <span>{link.name}</span>
        </Link>
      );
    })}
  </nav>
);

export default DashboardLayout;