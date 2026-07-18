import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { jobApi } from '../../../api/jobApi';
import { HiTrash, HiPlus, HiPencil } from 'react-icons/hi';

const AdminJobs = () => {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [jobForm, setJobForm] = useState({
    title: '',
    employmentType: 'full-time',
    workMode: 'remote',
    experienceLevel: 'entry',
    salaryMin: '',
    salaryMax: '',
    city: '',
    state: '',
    country: 'India',
    description: '',
    shortDescription: '',
    requirements: '',
    skills: '',
  });

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ['adminJobs'],
    queryFn: async () => {
      const res = await jobApi.getAll({ limit: 100 });
      return res.data.data.jobs;
    },
  });

  const createJobMutation = useMutation({
    mutationFn: async (data) => jobApi.create(data),
    onSuccess: () => {
      toast.success('Job listing created successfully');
      setModalOpen(false);
      resetForm();
      queryClient.invalidateQueries(['adminJobs']);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to create job listing'),
  });

  const updateJobMutation = useMutation({
    mutationFn: async ({ id, data }) => jobApi.update(id, data),
    onSuccess: () => {
      toast.success('Job listing updated successfully');
      setModalOpen(false);
      resetForm();
      queryClient.invalidateQueries(['adminJobs']);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to update job listing'),
  });

  const deleteJobMutation = useMutation({
    mutationFn: async (id) => jobApi.delete(id),
    onSuccess: () => {
      toast.success('Job deleted successfully');
      queryClient.invalidateQueries(['adminJobs']);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to delete job'),
  });

  const resetForm = () => {
    setJobForm({
      title: '',
      employmentType: 'full-time',
      workMode: 'remote',
      experienceLevel: 'entry',
      salaryMin: '',
      salaryMax: '',
      city: '',
      state: '',
      country: 'India',
      description: '',
      shortDescription: '',
      requirements: '',
      skills: '',
    });
    setEditingJob(null);
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setJobForm({
      title: job.title,
      employmentType: job.employmentType || 'full-time',
      workMode: job.workMode || 'remote',
      experienceLevel: job.experienceLevel || 'entry',
      salaryMin: job.salary?.min || '',
      salaryMax: job.salary?.max || '',
      city: job.locations?.[0]?.city || '',
      state: job.locations?.[0]?.state || '',
      country: job.locations?.[0]?.country || 'India',
      description: job.description || '',
      shortDescription: job.shortDescription || '',
      requirements: job.requirements?.join('\n') || '',
      skills: job.skills?.map((s) => s.name).join(', ') || '',
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const locations = [{
      city: jobForm.city,
      state: jobForm.state,
      country: jobForm.country || 'India',
      address: `${jobForm.city}, ${jobForm.state}`
    }];

    const salary = {
      min: Number(jobForm.salaryMin) || 0,
      max: Number(jobForm.salaryMax) || 0,
      currency: 'INR',
      period: 'monthly',
      isVisible: true,
    };

    const requirements = jobForm.requirements
      .split('\n')
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    const skills = jobForm.skills
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map((s) => ({
        name: s,
        level: 'intermediate',
        isRequired: true
      }));

    const payload = {
      title: jobForm.title,
      employmentType: jobForm.employmentType,
      workMode: jobForm.workMode,
      experienceLevel: jobForm.experienceLevel,
      description: jobForm.description,
      shortDescription: jobForm.shortDescription || jobForm.description.slice(0, 150),
      requirements,
      locations,
      salary,
      skills,
      status: 'published',
    };

    if (editingJob) {
      updateJobMutation.mutate({ id: editingJob._id, data: payload });
    } else {
      createJobMutation.mutate(payload);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-xs text-secondary-400 animate-pulse">Loading job listings...</div>;
  }

  return (
    <div className="space-y-6 animate-fadeIn text-left">
      {/* Action Header */}
      <div className="flex justify-end">
        <button
          onClick={() => { resetForm(); setModalOpen(true); }}
          className="btn-primary inline-flex items-center gap-1 px-4 py-2 text-xs"
        >
          <HiPlus className="w-4 h-4" /> Create Job Listing
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-150 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-150 text-[10px] uppercase font-bold text-secondary-500">
                <th className="px-6 py-4">Job Title</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Mode</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Applications</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs text-secondary-700">
              {jobs.map((j) => (
                <tr key={j._id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-semibold">{j.title}</td>
                  <td className="px-6 py-4 text-secondary-500 capitalize">{j.employmentType}</td>
                  <td className="px-6 py-4 text-secondary-500 capitalize">{j.workMode}</td>
                  <td className="px-6 py-4">{j.locations?.[0]?.city || 'Remote'}</td>
                  <td className="px-6 py-4 font-bold text-primary-600">{j.applicationsCount || j.applicationCount || 0} applied</td>
                  <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(j)}
                      className="text-primary-600 hover:text-primary-700 p-1.5 rounded-lg hover:bg-primary-50 inline-block"
                    >
                      <HiPencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Delete job listing permanently?')) {
                          deleteJobMutation.mutate(j._id);
                        }
                      }}
                      className="text-danger-600 hover:text-danger-700 p-1.5 rounded-lg hover:bg-danger-50 inline-block"
                    >
                      <HiTrash className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-secondary-400">No job listings found. Create one to get started!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog for Job Form */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-xl relative max-h-[90vh] overflow-y-auto text-left">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-lg font-bold"
            >
              &times;
            </button>

            <h3 className="text-xl font-heading font-bold text-secondary-900">
              {editingJob ? 'Edit Job Listing' : 'Create New Job Listing'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-secondary-700 uppercase tracking-wider">Job Title *</label>
                <input
                  type="text"
                  required
                  value={jobForm.title}
                  onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                  placeholder="e.g. Senior Full Stack Engineer"
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-xs bg-white text-secondary-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-secondary-700 uppercase tracking-wider">Employment Type *</label>
                  <select
                    value={jobForm.employmentType}
                    onChange={(e) => setJobForm({ ...jobForm, employmentType: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs bg-white text-secondary-900 focus:ring-2 focus:ring-primary-500 outline-none"
                  >
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                    <option value="freelance">Freelance</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-secondary-700 uppercase tracking-wider">Work Mode *</label>
                  <select
                    value={jobForm.workMode}
                    onChange={(e) => setJobForm({ ...jobForm, workMode: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs bg-white text-secondary-900 focus:ring-2 focus:ring-primary-500 outline-none"
                  >
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="on-site">On-site</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-secondary-700 uppercase tracking-wider">Experience Level *</label>
                  <select
                    value={jobForm.experienceLevel}
                    onChange={(e) => setJobForm({ ...jobForm, experienceLevel: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs bg-white text-secondary-900 focus:ring-2 focus:ring-primary-500 outline-none"
                  >
                    <option value="entry">Entry Level</option>
                    <option value="mid">Mid Level</option>
                    <option value="senior">Senior Level</option>
                    <option value="lead">Lead / Management</option>
                    <option value="executive">Executive</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-secondary-700 uppercase tracking-wider">City *</label>
                  <input
                    type="text"
                    required
                    value={jobForm.city}
                    onChange={(e) => setJobForm({ ...jobForm, city: e.target.value })}
                    placeholder="e.g. Mumbai"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs bg-white text-secondary-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-secondary-700 uppercase tracking-wider">State *</label>
                  <input
                    type="text"
                    required
                    value={jobForm.state}
                    onChange={(e) => setJobForm({ ...jobForm, state: e.target.value })}
                    placeholder="e.g. Maharashtra"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs bg-white text-secondary-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-secondary-700 uppercase tracking-wider">Country</label>
                  <input
                    type="text"
                    value={jobForm.country}
                    onChange={(e) => setJobForm({ ...jobForm, country: e.target.value })}
                    placeholder="e.g. India"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs bg-white text-secondary-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-secondary-700 uppercase tracking-wider">Min Salary (Monthly in INR)</label>
                  <input
                    type="number"
                    value={jobForm.salaryMin}
                    onChange={(e) => setJobForm({ ...jobForm, salaryMin: e.target.value })}
                    placeholder="e.g. 50000"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs bg-white text-secondary-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-secondary-700 uppercase tracking-wider">Max Salary (Monthly in INR)</label>
                  <input
                    type="number"
                    value={jobForm.salaryMax}
                    onChange={(e) => setJobForm({ ...jobForm, salaryMax: e.target.value })}
                    placeholder="e.g. 90000"
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs bg-white text-secondary-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-secondary-700 uppercase tracking-wider">Required Skills (Comma-separated) *</label>
                <input
                  type="text"
                  required
                  value={jobForm.skills}
                  onChange={(e) => setJobForm({ ...jobForm, skills: e.target.value })}
                  placeholder="e.g. React, Node.js, REST APIs, Git"
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-xs bg-white text-secondary-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-secondary-700 uppercase tracking-wider">Short Description (for preview cards)</label>
                <input
                  type="text"
                  value={jobForm.shortDescription}
                  onChange={(e) => setJobForm({ ...jobForm, shortDescription: e.target.value })}
                  placeholder="e.g. Join our tech team to build premium enterprise web systems."
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-xs bg-white text-secondary-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-secondary-700 uppercase tracking-wider">Job Description *</label>
                <textarea
                  rows={4}
                  required
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  placeholder="Provide a thorough overview of the role, team alignment, and expectations..."
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-xs bg-white text-secondary-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-secondary-700 uppercase tracking-wider">Role Requirements (One per line) *</label>
                <textarea
                  rows={3}
                  required
                  value={jobForm.requirements}
                  onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
                  placeholder="e.g. Bachelor's in CS or equivalent experience&#10;3+ years coding full stack React apps&#10;Strong understanding of relational database structures"
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-xs bg-white text-secondary-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 border border-gray-200 rounded-xl text-xs font-semibold text-secondary-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createJobMutation.isLoading || updateJobMutation.isLoading}
                  className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  {createJobMutation.isLoading || updateJobMutation.isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminJobs;
