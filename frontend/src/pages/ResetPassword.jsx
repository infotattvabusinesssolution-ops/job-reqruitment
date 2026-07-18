import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { HiLockClosed, HiEye, HiEyeOff, HiCheckCircle, HiArrowLeft } from 'react-icons/hi';
import { authApi } from '../api/authApi';
import logo from '../assets/image/geo india.png';

const ResetPassword = () => {
  const { token: routeToken } = useParams();
  const [searchParams] = useSearchParams();
  const token = routeToken || searchParams.get('token') || '';

  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError('Missing or invalid reset token. Please request a new link.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await authApi.resetPassword(token, password, confirmPassword);
      setSuccess(true);
      toast.success(res.data.message || 'Password reset successfully!');
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid or expired reset token. Please request a new link.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-96px)] mt-[96px] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <Helmet>
        <title>Reset Password - JobRecruitment</title>
        <meta name="description" content="Set a new password for your JobRecruitment account." />
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
            <h1 className="text-2xl font-heading font-bold text-secondary-900">Set New Password</h1>
            <p className="text-xs text-secondary-500 mt-2 leading-relaxed">
              Please enter and confirm your new password below.
            </p>
          </div>

          {success ? (
            /* Success State */
            <div className="text-center space-y-6 animate-fadeIn">
              <div className="w-16 h-16 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto text-green-600">
                <HiCheckCircle className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-secondary-900 mb-1">Password Changed Successfully!</h3>
                <p className="text-xs text-secondary-600 leading-relaxed">
                  Your account password has been updated. You can now sign in with your new credentials.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button
                  onClick={() => navigate('/login')}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white rounded-xl py-3.5 text-xs font-bold shadow-lg transition-all"
                >
                  Proceed to Sign In
                </button>
              </div>
            </div>
          ) : (
            /* Reset Password Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {!token && (
                <div className="bg-amber-50 text-amber-800 p-3 rounded-xl text-xs font-medium border border-amber-200">
                  ⚠️ No reset token detected in URL. If you opened this page manually, please check the link sent to your email.
                </div>
              )}

              {error && (
                <div className="bg-danger-50 text-danger-600 px-4 py-3 rounded-xl text-xs font-medium border border-danger-100">
                  {error}
                </div>
              )}

              {/* New Password Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-secondary-700 uppercase tracking-wider">
                  New Password *
                </label>
                <div className="relative">
                  <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl py-3 pl-12 pr-12 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                    placeholder="Enter new password (min. 6 characters)"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-secondary-700 uppercase tracking-wider">
                  Confirm New Password *
                </label>
                <div className="relative">
                  <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl py-3 pl-12 pr-12 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                    placeholder="Re-enter new password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !token}
                className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-xl py-3.5 text-xs font-bold shadow-lg hover:shadow-xl transition-all"
              >
                {loading ? 'Updating Password...' : 'Reset Password'}
              </button>

              <div className="text-center pt-2 border-t border-gray-100">
                <Link
                  to="/forgot-password"
                  className="inline-flex items-center text-xs font-semibold text-secondary-600 hover:text-primary-600 transition-colors gap-1 hover:underline"
                >
                  <HiArrowLeft className="w-4 h-4" /> Request New Reset Link
                </Link>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;