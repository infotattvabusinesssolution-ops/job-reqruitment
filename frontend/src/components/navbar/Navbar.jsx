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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isAuthenticated, user, logout, userRole } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a2e5c] border-b border-[#253f7c] shadow-lg shadow-black/10">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between py-0.5 min-h-[64px] md:min-h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center -ml-2 sm:-ml-4 pt-3">
            <img src={logo} alt="Geo India Limited" className="h-32 md:h-40 w-auto object-contain -my-6 md:-my-8" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(link.path)
                  ? 'text-white bg-[#253f7c] font-semibold'
                  : 'text-neutral-200 hover:text-white hover:bg-[#253f7c]/70'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            {isAuthenticated && (
              <button className="p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-[#253f7c] transition-all relative">
                <HiBell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full"></span>
              </button>
            )}

            {/* Auth User Menu */}
            {isAuthenticated && (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#253f7c] transition-all"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </span>
                  </div>
                  <HiChevronDown className="w-4 h-4 text-neutral-350" />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-[#1a2e5c] border border-[#253f7c] rounded-xl shadow-2xl py-2"
                    >
                      <div className="px-4 py-2 border-b border-[#253f7c]">
                        <p className="text-sm font-medium text-white">{user?.firstName} {user?.lastName}</p>
                        <p className="text-xs text-neutral-350 capitalize">{userRole}</p>
                      </div>
                      <Link to="/dashboard" className="block px-4 py-2 text-sm text-neutral-200 hover:bg-[#253f7c] hover:text-white">
                        Dashboard
                      </Link>
                      <Link to="/dashboard/profile" className="block px-4 py-2 text-sm text-neutral-200 hover:bg-[#253f7c] hover:text-white">
                        My Profile
                      </Link>
                      <Link to="/dashboard/settings" className="block px-4 py-2 text-sm text-neutral-200 hover:bg-[#253f7c] hover:text-white">
                        Settings
                      </Link>
                      <hr className="my-1 border-[#253f7c]" />
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-sm text-danger-400 hover:bg-danger-950/20"
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-neutral-300 hover:bg-[#253f7c] transition-all"
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
            className="lg:hidden border-t border-[#253f7c] bg-[#1a2e5c]"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive(link.path)
                    ? 'text-white bg-[#253f7c] font-semibold'
                    : 'text-neutral-200 hover:bg-[#253f7c]/70 hover:text-white'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;