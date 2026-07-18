import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import axiosInstance from '../../../api/axiosInstance';
import {
  HiMail,
  HiPhone,
  HiOfficeBuilding,
  HiUserGroup,
  HiSearch,
  HiFilter,
  HiEye,
  HiTrash,
  HiCheckCircle,
  HiClock,
  HiDocumentDownload,
  HiPaperClip,
  HiX,
  HiSparkles,
  HiChatAlt2,
  HiBadgeCheck
} from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

const AdminEnquiries = () => {
  const [search, setSearch] = useState('');
  const [formType, setFormType] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [statusNotes, setStatusNotes] = useState('');

  const queryClient = useQueryClient();

  // Fetch messages from backend
  const { data: messages = [], isLoading, refetch } = useQuery({
    queryKey: ['admin-enquiries', search, formType, statusFilter],
    queryFn: async () => {
      const res = await axiosInstance.get('/contact/messages', {
        params: { search, formType, status: statusFilter },
      });
      return res.data.data;
    },
  });

  // Status Update Mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status, notes }) => {
      const res = await axiosInstance.patch(`/contact/messages/${id}/status`, { status, notes });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Enquiry status updated successfully');
      queryClient.invalidateQueries(['admin-enquiries']);
      if (selectedMessage) {
        setSelectedMessage(null);
      }
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to update status');
    },
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`/contact/messages/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Enquiry message deleted');
      queryClient.invalidateQueries(['admin-enquiries']);
      if (selectedMessage) {
        setSelectedMessage(null);
      }
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to delete entry');
    },
  });

  const handleOpenDetail = (msg) => {
    setSelectedMessage(msg);
    setStatusNotes(msg.notes || '');
  };

  const handleStatusChange = (id, newStatus) => {
    updateStatusMutation.mutate({ id, status: newStatus, notes: statusNotes });
  };

  const getFormBadge = (type) => {
    switch (type) {
      case 'hiring_support':
        return <span className="px-2.5 py-1 bg-amber-50 text-amber-700 font-bold rounded-lg text-[10px] border border-amber-200">Employer Hiring Request</span>;
      case 'job_seeker':
        return <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-lg text-[10px] border border-emerald-200">Resume Upload</span>;
      case 'career_apply':
        return <span className="px-2.5 py-1 bg-purple-50 text-purple-700 font-bold rounded-lg text-[10px] border border-purple-200">Career Application</span>;
      default:
        return <span className="px-2.5 py-1 bg-blue-50 text-blue-700 font-bold rounded-lg text-[10px] border border-blue-200">Contact Enquiry</span>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'resolved':
        return <span className="px-2.5 py-1 bg-emerald-500 text-white font-bold rounded-full text-[10px] shadow-sm">Resolved</span>;
      case 'in_progress':
        return <span className="px-2.5 py-1 bg-amber-500 text-white font-bold rounded-full text-[10px] shadow-sm">In Progress</span>;
      case 'contacted':
        return <span className="px-2.5 py-1 bg-blue-500 text-white font-bold rounded-full text-[10px] shadow-sm">Contacted</span>;
      default:
        return <span className="px-2.5 py-1 bg-red-500 text-white font-bold rounded-full text-[10px] shadow-sm animate-pulse">New Request</span>;
    }
  };

  // Metric counts
  const totalCount = messages.length;
  const newCount = messages.filter((m) => m.status === 'new').length;
  const hiringCount = messages.filter((m) => m.formType === 'hiring_support').length;
  const resumeCount = messages.filter((m) => m.resumeUrl).length;

  return (
    <div className="space-y-8 text-left pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-150 shadow-sm">
        <div>
          <div className="inline-flex items-center px-3 py-1 bg-primary-50 rounded-full text-primary-700 text-[11px] font-bold uppercase tracking-wider mb-1">
            <HiSparkles className="w-3.5 h-3.5 mr-1" /> Form Inbox & Leads
          </div>
          <h1 className="text-2xl font-heading font-bold text-secondary-900">
            Form Submissions & <span className="gradient-text">Enquiries</span>
          </h1>
          <p className="text-xs text-secondary-500 mt-0.5">
            Full record of candidate applications, employer hiring requests, and contact messages sent to Hr@geoindialimited.com.
          </p>
        </div>

        <button
          onClick={() => refetch()}
          className="self-start sm:self-auto px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-xl shadow-md transition-all"
        >
          Refresh Inbox
        </button>
      </div>

      {/* Top Counter Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl">
            <HiMail className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-secondary-500">Total Enquiries</p>
            <h3 className="text-xl font-heading font-bold text-secondary-900">{totalCount}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold text-xl">
            <HiClock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-secondary-500">New Unread</p>
            <h3 className="text-xl font-heading font-bold text-red-600">{newCount}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xl">
            <HiOfficeBuilding className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-secondary-500">Hiring Requirements</p>
            <h3 className="text-xl font-heading font-bold text-secondary-900">{hiringCount}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl">
            <HiPaperClip className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-secondary-500">Resumes Attached</p>
            <h3 className="text-xl font-heading font-bold text-secondary-900">{resumeCount}</h3>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-5 rounded-3xl border border-gray-150 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, phone, company..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Form Type Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-gray-100 rounded-xl text-xs font-bold w-full md:w-auto">
            {[
              { id: 'all', label: 'All Forms' },
              { id: 'contact', label: 'Contact Form' },
              { id: 'hiring_support', label: 'Hiring Support' },
              { id: 'job_seeker', label: 'Resume Uploads' },
              { id: 'career_apply', label: 'Careers' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFormType(tab.id)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  formType === tab.id
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-secondary-600 hover:text-secondary-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-secondary-800 outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="new">New Only</option>
            <option value="contacted">Contacted</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Messages Data Table */}
      <div className="bg-white rounded-3xl border border-gray-150 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-secondary-500 text-xs font-semibold">
            Loading enquiries and form submissions...
          </div>
        ) : messages.length === 0 ? (
          <div className="p-12 text-center text-secondary-500 text-xs font-semibold">
            No form messages found matching your search or filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-150 text-[11px] font-bold text-secondary-600 uppercase tracking-wider">
                  <th className="py-4 px-6">Sender / Contact</th>
                  <th className="py-4 px-4">Form Source</th>
                  <th className="py-4 px-4">Subject / Position</th>
                  <th className="py-4 px-4">Submission Date</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {messages.map((msg) => (
                  <tr key={msg._id} className="hover:bg-primary-50/30 transition-colors group">
                    {/* Sender Info */}
                    <td className="py-4 px-6">
                      <div className="space-y-0.5">
                        <p className="font-bold text-secondary-900 flex items-center gap-1.5">
                          {msg.fullName}
                          {msg.resumeUrl && (
                            <span className="text-emerald-600" title="Resume File Attached">
                              <HiPaperClip className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </p>
                        <p className="text-[11px] text-secondary-500">{msg.email}</p>
                        {msg.phone && <p className="text-[11px] text-secondary-400">{msg.phone}</p>}
                        {msg.companyName && (
                          <span className="inline-block mt-1 text-[10px] font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded">
                            {msg.companyName}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Form Source Badge */}
                    <td className="py-4 px-4">{getFormBadge(msg.formType)}</td>

                    {/* Subject / Position */}
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-bold text-secondary-800">{msg.jobPosition || msg.enquiryType || 'General Inquiry'}</p>
                        {msg.serviceRequired && <p className="text-[11px] text-secondary-500">{msg.serviceRequired}</p>}
                        {msg.vacancies && <p className="text-[10px] text-accent-700 font-bold">{msg.vacancies} Vacancies</p>}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 text-secondary-500 text-[11px] whitespace-nowrap">
                      {new Date(msg.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">{getStatusBadge(msg.status)}</td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenDetail(msg)}
                        className="p-2 bg-primary-50 text-primary-600 hover:bg-primary-600 hover:text-white rounded-xl transition-all shadow-sm"
                        title="View Full Details"
                      >
                        <HiEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this form enquiry?')) {
                            deleteMutation.mutate(msg._id);
                          }
                        }}
                        className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all shadow-sm"
                        title="Delete Enquiry"
                      >
                        <HiTrash className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedMessage && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-150 relative space-y-6 text-left max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMessage(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
              >
                <HiX className="w-5 h-5" />
              </button>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  {getFormBadge(selectedMessage.formType)}
                  {getStatusBadge(selectedMessage.status)}
                </div>
                <h2 className="text-xl font-heading font-bold text-secondary-900">
                  {selectedMessage.fullName}
                </h2>
                {selectedMessage.companyName && (
                  <p className="text-xs font-bold text-primary-700">{selectedMessage.companyName}</p>
                )}
                <p className="text-[11px] text-secondary-400 mt-1">
                  Received on {new Date(selectedMessage.createdAt).toLocaleString('en-IN')}
                </p>
              </div>

              {/* Contact Credentials */}
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-150 text-xs">
                <div>
                  <span className="font-semibold text-secondary-500 block">Email Address</span>
                  <a href={`mailto:${selectedMessage.email}`} className="font-bold text-primary-600 hover:underline">
                    {selectedMessage.email}
                  </a>
                </div>
                <div>
                  <span className="font-semibold text-secondary-500 block">Phone Number</span>
                  <p className="font-bold text-secondary-900">{selectedMessage.phone || 'N/A'}</p>
                </div>
                {selectedMessage.serviceRequired && (
                  <div>
                    <span className="font-semibold text-secondary-500 block">Service Required</span>
                    <p className="font-bold text-secondary-800">{selectedMessage.serviceRequired}</p>
                  </div>
                )}
                {selectedMessage.vacancies && (
                  <div>
                    <span className="font-semibold text-secondary-500 block">Vacancies</span>
                    <p className="font-bold text-accent-700">{selectedMessage.vacancies} Positions</p>
                  </div>
                )}
                {selectedMessage.jobLocation && (
                  <div>
                    <span className="font-semibold text-secondary-500 block">Job Location</span>
                    <p className="font-bold text-secondary-800">{selectedMessage.jobLocation}</p>
                  </div>
                )}
              </div>

              {/* Resume File Download Button if present */}
              {selectedMessage.resumeUrl && (
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                      <HiPaperClip className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-emerald-950">Candidate Resume Attached</h4>
                      <p className="text-[11px] text-emerald-700">Click to view/download resume document</p>
                    </div>
                  </div>
                  <a
                    href={selectedMessage.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all"
                  >
                    <HiDocumentDownload className="w-4 h-4" /> Download Resume
                  </a>
                </div>
              )}

              {/* Message Content */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-secondary-600 mb-2">
                  Full Submission Details & Message:
                </h3>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-150 text-xs text-secondary-800 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message || 'No additional details provided.'}
                </div>
              </div>

              {/* Status Updater Controls */}
              <div className="border-t border-gray-150 pt-4 space-y-3">
                <label className="block text-xs font-bold text-secondary-700 uppercase tracking-wider">
                  Update Enquiry Status
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'new', label: 'New Request', color: 'bg-red-50 text-red-700 hover:bg-red-600 hover:text-white' },
                    { id: 'contacted', label: 'Mark Contacted', color: 'bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white' },
                    { id: 'in_progress', label: 'In Progress', color: 'bg-amber-50 text-amber-700 hover:bg-amber-600 hover:text-white' },
                    { id: 'resolved', label: 'Mark Resolved', color: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white' },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => handleStatusChange(selectedMessage._id, btn.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border border-gray-200 ${
                        selectedMessage.status === btn.id
                          ? 'bg-secondary-900 text-white shadow-md'
                          : btn.color
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct Quick Actions */}
              <div className="pt-4 border-t border-gray-150 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-xl shadow-sm"
                  >
                    <HiMail className="w-4 h-4" /> Email Back
                  </a>
                  {selectedMessage.phone && (
                    <a
                      href={`https://wa.me/${selectedMessage.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm"
                    >
                      <FaWhatsapp className="w-4 h-4" /> WhatsApp
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setSelectedMessage(null)}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-secondary-800 text-xs font-bold rounded-xl"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminEnquiries;
