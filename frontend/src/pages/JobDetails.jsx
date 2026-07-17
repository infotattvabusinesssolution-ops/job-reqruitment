import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { jobApi } from '../api/jobApi';
import {
  HiBriefcase,
  HiLocationMarker,
  HiCurrencyRupee,
  HiClock,
  HiOfficeBuilding,
  HiStar,
  HiBookmark,
  HiShare,
  HiArrowLeft,
  HiCheck,
  HiAcademicCap,
  HiLightningBolt,
  HiMail,
  HiPhone,
} from 'react-icons/hi';

const JobDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');

  // Fetch job details by slug
  const { data: job, isLoading, isError } = useQuery({
    queryKey: ['job', slug],
    queryFn: async () => {
      const response = await jobApi.getBySlug(slug);
      return response.data.data;
    },
  });

  // Apply job mutation
  const applyMutation = useMutation({
    mutationFn: async () => {
      return jobApi.applyJob(job._id, { coverLetter });
    },
    onSuccess: () => {
      toast.success('Application submitted successfully!');
      setShowApplyModal(false);
      queryClient.invalidateQueries(['job', slug]);
    },
    onError: (error) => {
      const msg = error.response?.data?.message || 'Failed to submit application';
      toast.error(msg);
    },
  });

  // Save/Unsave job mutation
  const saveMutation = useMutation({
    mutationFn: async (isSaved) => {
      if (isSaved) {
        return jobApi.unsaveJob(job._id);
      } else {
        return jobApi.saveJob(job._id);
      }
    },
    onSuccess: (_, isSaved) => {
      toast.success(isSaved ? 'Job bookmark removed' : 'Job bookmarked successfully');
      queryClient.invalidateQueries(['job', slug]);
    },
    onError: (error) => {
      const msg = error.response?.data?.message || 'Action failed';
      toast.error(msg);
    },
  });

  if (isLoading) {
    return (
      <div className="pt-32 pb-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="text-sm font-semibold text-secondary-500">Loading career details...</p>
        </div>
      </div>
    );
  }

  if (isError || !job) {
    return (
      <div className="pt-32 pb-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold text-secondary-900 mb-2">Job Postings Not Found</h2>
          <p className="text-sm text-secondary-500 mb-6">The listing may have expired, been filled, or archived.</p>
          <Link to="/jobs" className="bg-primary-600 text-white hover:bg-primary-700 px-6 py-2.5 rounded-xl text-xs font-semibold">
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Share link copied to clipboard!');
    jobApi.shareJob(job._id);
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <Helmet><title>{job.title} - JobReqruitment</title></Helmet>

      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Link to="/jobs" className="inline-flex items-center text-secondary-600 hover:text-primary-600 font-semibold text-xs transition-colors">
          <HiArrowLeft className="w-4 h-4 mr-1.5" /> Back to Search
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main details body */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header profile */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <HiBriefcase className="w-8 h-8 text-primary-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-heading font-bold text-secondary-900 mb-1">{job.title}</h1>
                    <p className="text-base text-primary-600 font-semibold">{job.company?.name || 'Enterprise partner'}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => saveMutation.mutate(false)}
                    className="p-2.5 rounded-xl border border-gray-200 text-secondary-400 hover:border-primary-200 hover:text-primary-600 transition-all bg-white"
                  >
                    <HiBookmark className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2.5 rounded-xl border border-gray-200 text-secondary-400 hover:border-primary-200 hover:text-primary-600 transition-all bg-white"
                  >
                    <HiShare className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Attributes badges list */}
              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  { icon: HiLocationMarker, text: `${job.locations?.[0]?.city || 'Hybrid'}, ${job.locations?.[0]?.country || 'India'}` },
                  { icon: HiBriefcase, text: job.employmentType },
                  { icon: HiClock, text: job.workMode },
                  { icon: HiAcademicCap, text: `${job.experienceLevel} level` },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs text-secondary-600">
                    <item.icon className="w-4 h-4 text-primary-500" />
                    <span className="capitalize">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Metadata dates */}
              <div className="flex flex-wrap items-center justify-between pt-6 border-t border-gray-100 gap-4">
                <div className="flex gap-4 text-[10px] text-gray-400">
                  <span>Posted: {new Date(job.createdAt).toLocaleDateString()}</span>
                  {job.applicationDeadline && (
                    <span>Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}</span>
                  )}
                  <span>Openings: {job.numberOfOpenings}</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowApplyModal(true)}
                    className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold text-xs shadow-md shadow-primary-100 transition-all"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Job Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm"
            >
              <h2 className="text-lg font-bold text-secondary-900 mb-4">Job Description</h2>
              <div className="text-secondary-600 text-sm leading-relaxed whitespace-pre-line">{job.description}</div>
            </motion.div>

            {/* Responsibilities list */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm"
              >
                <h2 className="text-lg font-bold text-secondary-900 mb-4">Responsibilities</h2>
                <ul className="space-y-3 text-sm text-secondary-600">
                  {job.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <HiLightningBolt className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Requirements list */}
            {job.requirements && job.requirements.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm"
              >
                <h2 className="text-lg font-bold text-secondary-900 mb-4">Requirements</h2>
                <ul className="space-y-3 text-sm text-secondary-600">
                  {job.requirements.map((reqItem, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <HiCheck className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>{reqItem}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Required Skills list */}
            {job.skills && job.skills.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm"
              >
                <h2 className="text-lg font-bold text-secondary-900 mb-4">Preferred Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 bg-gray-50 border border-gray-150 rounded-xl text-xs font-semibold text-secondary-700 capitalize"
                    >
                      {skill.name} • {skill.level}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar cards */}
          <div className="space-y-6">
            {/* CTA action card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-28 space-y-4">
              <h3 className="text-base font-bold text-secondary-900">Interested in this role?</h3>
              <p className="text-xs text-secondary-500">Apply with your uploaded resume or save to bookmarks to review later.</p>
              <button
                onClick={() => setShowApplyModal(true)}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white rounded-xl py-3 text-xs font-bold transition-all shadow-md shadow-primary-100"
              >
                Apply for this Job
              </button>
              <button
                onClick={() => saveMutation.mutate(false)}
                className="w-full bg-white border border-gray-200 hover:border-primary-500 hover:text-primary-600 rounded-xl py-3 text-xs font-bold text-secondary-700 transition-all"
              >
                Bookmark Job
              </button>
            </div>

            {/* Company outline details */}
            {job.company && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-secondary-900">About Company</h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <HiOfficeBuilding className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary-900 text-sm">{job.company.name}</h4>
                    {job.company.website && (
                      <a href={job.company.website} target="_blank" rel="noopener noreferrer" className="text-xs text-primary-600 hover:underline">
                        Visit Website
                      </a>
                    )}
                  </div>
                </div>
                {job.company.description && (
                  <p className="text-xs text-secondary-500 leading-relaxed">{job.company.description}</p>
                )}
                <div className="border-t border-gray-100 pt-4 space-y-2.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-secondary-400">Company Size</span>
                    <span className="font-semibold text-secondary-750">{job.company.companySize || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-400">Founded</span>
                    <span className="font-semibold text-secondary-750">{job.company.foundedYear || 'N/A'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Apply Modal popup */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl max-w-md w-full p-6 space-y-6 shadow-xl"
          >
            <div>
              <h3 className="text-lg font-bold text-secondary-900">Submit Application</h3>
              <p className="text-xs text-secondary-400">Confirm your application to {job.company?.name || 'this company'}.</p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-secondary-500 uppercase tracking-wider">Cover Letter (Optional)</label>
              <textarea
                rows={4}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Briefly describe why you are a good fit for this role..."
                className="w-full border border-gray-200 rounded-xl p-3 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
              ></textarea>
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowApplyModal(false)}
                className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-secondary-700 text-xs font-semibold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={applyMutation.isLoading}
                onClick={() => applyMutation.mutate()}
                className="px-5 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md"
              >
                {applyMutation.isLoading ? 'Submitting...' : 'Confirm Submission'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;