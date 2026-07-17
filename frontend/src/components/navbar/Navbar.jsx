import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX, HiSearch, HiBell, HiUser, HiChevronDown } from 'react-icons/hi';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/image/geo india.png';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Jobs', path: '/jobs' },
  { name: 'Job Seekers', path: '/job-seekers' },
  { name: 'Employers', path: '/employers' },
  { name: 'Services', path: '/services' },
  { name: 'Careers', path: '/careers' },
  { name: 'Blog', path: '/blogs' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isAuthenticated, user, logout, userRole } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between py-1 min-h-[96px]">
          {/* Logo */}
          <Link to="/" className="flex items-center -ml-2 sm:-ml-4">
            <img src={logo} alt="Geo India Limited" className="h-20 md:h-24 w-auto object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-secondary-600 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg text-secondary-500 hover:text-primary-600 hover:bg-gray-50 transition-all"
            >
              <HiSearch className="w-5 h-5" />
            </button>

            {/* Notifications */}
            {isAuthenticated && (
              <button className="p-2 rounded-lg text-secondary-500 hover:text-primary-600 hover:bg-gray-50 transition-all relative">
                <HiBell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full"></span>
              </button>
            )}

            {/* Auth Buttons / User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-all"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </span>
                  </div>
                  <HiChevronDown className="w-4 h-4 text-secondary-500" />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2"
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-secondary-900">{user?.firstName} {user?.lastName}</p>
                        <p className="text-xs text-secondary-500 capitalize">{userRole}</p>
                      </div>
                      <Link to="/dashboard" className="block px-4 py-2 text-sm text-secondary-600 hover:bg-gray-50 hover:text-primary-600">
                        Dashboard
                      </Link>
                      <Link to="/dashboard/profile" className="block px-4 py-2 text-sm text-secondary-600 hover:bg-gray-50 hover:text-primary-600">
                        My Profile
                      </Link>
                      <Link to="/dashboard/settings" className="block px-4 py-2 text-sm text-secondary-600 hover:bg-gray-50 hover:text-primary-600">
                        Settings
                      </Link>
                      <hr className="my-1 border-gray-100" />
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-sm text-danger-600 hover:bg-danger-50"
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link to="/login" className="btn-secondary text-sm px-4 py-2">
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary text-sm px-4 py-2">
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-secondary-500 hover:bg-gray-50 transition-all"
            >
              {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-100 bg-white"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-secondary-600 hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {!isAuthenticated && (
                <div className="pt-4 space-y-2">
                  <Link to="/login" onClick={() => setIsOpen(false)} className="block w-full text-center btn-secondary">
                    Sign In
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="block w-full text-center btn-primary">
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg p-4"
          >
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input
                  type="text"
                  placeholder="Search jobs, companies, skills..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                  autoFocus
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;