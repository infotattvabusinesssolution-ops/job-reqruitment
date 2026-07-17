export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  RECRUITER: 'recruiter',
  EMPLOYER: 'employer',
  CANDIDATE: 'candidate',
  GUEST: 'guest',
};

export const JOB_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  CLOSED: 'closed',
  FILLED: 'filled',
  EXPIRED: 'expired',
  ARCHIVED: 'archived',
};

export const APPLICATION_STATUS = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  UNDER_REVIEW: 'under_review',
  SHORTLISTED: 'shortlisted',
  INTERVIEW_SCHEDULED: 'interview_scheduled',
  INTERVIEWED: 'interviewed',
  OFFER_SENT: 'offer_sent',
  OFFER_ACCEPTED: 'offer_accepted',
  OFFER_DECLINED: 'offer_declined',
  HIRED: 'hired',
  REJECTED: 'rejected',
  WITHDRAWN: 'withdrawn',
  ON_HOLD: 'on_hold',
};

export const EMPLOYMENT_TYPES = [
  { value: 'full-time', label: 'Full Time' },
  { value: 'part-time', label: 'Part Time' },
  { value: 'contract', label: 'Contract' },
  { value: 'temporary', label: 'Temporary' },
  { value: 'internship', label: 'Internship' },
  { value: 'freelance', label: 'Freelance' },
];

export const WORK_MODES = [
  { value: 'on-site', label: 'On-site' },
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' },
];

export const EXPERIENCE_LEVELS = [
  { value: 'entry', label: 'Entry Level' },
  { value: 'mid', label: 'Mid Level' },
  { value: 'senior', label: 'Senior Level' },
  { value: 'lead', label: 'Lead Level' },
  { value: 'executive', label: 'Executive Level' },
];

export const INDUSTRIES = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Manufacturing',
  'Retail',
  'Construction',
  'Hospitality',
  'Media',
  'Transportation',
  'Energy',
  'Agriculture',
];

export const SKILL_LEVELS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'expert', label: 'Expert' },
];

export const NOTIFICATION_TYPES = {
  APPLICATION_RECEIVED: 'application_received',
  APPLICATION_STATUS: 'application_status',
  INTERVIEW_SCHEDULED: 'interview_scheduled',
  INTERVIEW_REMINDER: 'interview_reminder',
  JOB_MATCH: 'job_match',
  JOB_RECOMMENDATION: 'job_recommendation',
  PROFILE_VIEW: 'profile_view',
  MESSAGE: 'message',
  OFFER: 'offer',
  SYSTEM: 'system',
  ALERT: 'alert',
};

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'salary_high', label: 'Salary: High to Low' },
  { value: 'salary_low', label: 'Salary: Low to High' },
  { value: 'relevance', label: 'Most Relevant' },
];

export const ITEMS_PER_PAGE = 12;

export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB

export const ALLOWED_FILE_TYPES = {
  image: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  resume: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
};

export const PASSWORD_RULES = {
  minLength: 8,
  maxLength: 128,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecialChar: true,
};

export const DEFAULT_PAGINATION = {
  page: 1,
  limit: ITEMS_PER_PAGE,
};

export const THEME = {
  primary: '#3b82f6',
  secondary: '#64748b',
  accent: '#d946ef',
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',
};