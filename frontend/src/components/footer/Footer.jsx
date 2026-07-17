import React from 'react';
import { Link } from 'react-router-dom';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import logo from '../../assets/image/geo india.png';

const Footer = () => {
  return (
    <footer className="bg-secondary-900 text-white border-t border-secondary-800">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Geo India Limited Logo" className="h-20 md:h-24 w-auto object-contain" />
            </Link>
            <p className="text-secondary-300 text-xs leading-relaxed">
              Geo India Limited provides professional recruitment, staffing, bulk hiring, executive search, payroll, and RPO solutions for businesses across India. We help employers find suitable candidates and support job seekers in discovering relevant career opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-sm font-heading font-bold uppercase tracking-wider text-secondary-200">Quick Links</h3>
            <ul className="space-y-3 text-xs text-secondary-300">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Recruitment Services</Link></li>
              <li><Link to="/industries" className="hover:text-white transition-colors">Industries We Serve</Link></li>
              <li><Link to="/employers" className="hover:text-white transition-colors">For Employers</Link></li>
              <li><Link to="/job-seekers" className="hover:text-white transition-colors">For Job Seekers</Link></li>
              <li><Link to="/jobs" className="hover:text-white transition-colors">Current Openings</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Recruitment Services */}
          <div className="space-y-6">
            <h3 className="text-sm font-heading font-bold uppercase tracking-wider text-secondary-200">Recruitment Services</h3>
            <ul className="space-y-3 text-xs text-secondary-300">
              <li><Link to="/services" className="hover:text-white transition-colors">IT Recruitment</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Non-IT Recruitment</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Bulk Hiring</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Executive Search</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Contract Staffing</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Permanent Staffing</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Payroll Services</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">RPO Solutions</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-sm font-heading font-bold uppercase tracking-wider text-secondary-200">Contact Information</h3>
            <ul className="space-y-4 text-xs text-secondary-300">
              <li className="flex items-start space-x-2.5">
                <HiLocationMarker className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <span>
                  Geo India Limited<br />
                  723, 7th Floor, Tower Siddhi,<br />
                  Mahagun Mantra, Greater Noida West 201306
                </span>
              </li>
              <li className="flex items-center space-x-2.5">
                <HiPhone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <span>+91 120 319 3279</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <FaWhatsapp className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span>+91 96346 85866</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <HiMail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <span>Hr@geoindialimited.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-800 bg-secondary-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-secondary-400 text-xs">
              &copy; {new Date().getFullYear()} Geo India Limited. All rights reserved.
            </p>
            <div className="flex space-x-6 text-xs text-secondary-400">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms and Conditions
              </Link>
              <Link to="/disclaimer" className="hover:text-white transition-colors">
                Candidate Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;