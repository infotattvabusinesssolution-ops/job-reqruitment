import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { HiMail, HiArrowLeft, HiCheckCircle, HiPaperAirplane } from 'react-icons/hi';
import { authApi } from '../api/authApi';
import logo from '../assets/image/geo india.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await authApi.forgotPassword(email);
      setSent(true);
      toast.success(res.data.message || 'Password reset link sent to your email');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to send reset link. Please try again.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-96px)] mt-[96px] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <Helmet>
        <title>Forgot Password - JobRecruitment</title>
        <meta name="description" content="Reset your password for JobRecruitment account via email link." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-2xl shadow-primary-200/30 p-8 sm:p-10 text-left">
          {/* Header Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center mb-6">
              <img src={logo} alt="Geo India Limited Logo" className="h-16 w-auto object-contain" />
            </Link>
            <h1 className="text-2xl font-heading font-bold text-secondary-900">Forgot Password?</h1>
            <p className="text-xs text-secondary-500 mt-2 leading-relaxed">
              No worries! Enter your registered email address below and we’ll send you an SMTP reset link.
            </p>
          </div>

          {sent ? (
            /* Sent State View */
            <div className="text-center space-y-6 animate-fadeIn">
              <div className="w-16 h-16 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto text-green-600">
                <HiCheckCircle className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-secondary-900 mb-1">Reset Link Dispatched</h3>
                <p className="text-xs text-secondary-600 leading-relaxed">
                  We have sent a password reset email to:
                </p>
                <span className="inline-block mt-1 font-bold text-primary-700 bg-primary-50 px-3 py-1 rounded-lg text-xs">
                  {email}
                </span>
                <p className="text-[11px] text-gray-400 mt-3 leading-relaxed">
                  Please check your inbox (and spam folder). The link will expire in 1 hour.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl text-xs font-semibold text-secondary-600 hover:bg-gray-50 transition-all"
                >
                  Resend Email
                </button>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center text-xs font-bold text-primary-600 hover:text-primary-700 gap-1 hover:underline"
                >
                  <HiArrowLeft className="w-4 h-4" /> Return to Sign In
                </Link>
              </div>
            </div>
          ) : (
            /* Initial Form View */
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-danger-50 text-danger-600 px-4 py-3 rounded-xl text-xs font-medium border border-danger-100">
                  {error}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-secondary-700 uppercase tracking-wider">
                  Registered Email Address *
                </label>
                <div className="relative">
                  <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-xl py-3.5 text-xs font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Sending Reset Link...</span>
                ) : (
                  <>
                    <HiPaperAirplane className="w-4 h-4 rotate-45" /> Send Reset Link
                  </>
                )}
              </button>

              <div className="text-center pt-2 border-t border-gray-100">
                <Link
                  to="/login"
                  className="inline-flex items-center text-xs font-semibold text-secondary-600 hover:text-primary-600 transition-colors gap-1 hover:underline"
                >
                  <HiArrowLeft className="w-4 h-4" /> Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;