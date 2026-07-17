import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const Privacy = () => (
  <div className="pt-24 pb-16 bg-gray-50 min-h-screen text-left">
    <Helmet><title>Privacy Policy - Geo India Limited</title></Helmet>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white rounded-3xl border border-gray-150 shadow-sm space-y-6">
      <h1 className="text-3xl font-heading font-bold text-secondary-900 border-b border-gray-100 pb-3">Privacy Policy</h1>
      <p className="text-xs text-secondary-650 leading-relaxed">
        Geo India Limited respects the privacy of employers, candidates, clients, and website visitors.
      </p>
      <p className="text-xs text-secondary-650 leading-relaxed">
        We may collect personal information such as names, phone numbers, email addresses, resumes, qualifications, work experience, job preferences, company information, and recruitment requirements.
      </p>
      <p className="text-xs text-secondary-650 leading-relaxed">
        Candidate information may be reviewed and shared with suitable employers for legitimate recruitment purposes. Employer information may be used to provide recruitment services, communicate regarding hiring requirements, and manage recruitment assignments.
      </p>
      <p className="text-xs text-secondary-650 leading-relaxed">
        We take reasonable steps to protect personal information from unauthorised access, misuse, or disclosure.
      </p>
      <p className="text-xs text-secondary-650 leading-relaxed">
        Candidates and employers should ensure that all information submitted through the website is accurate and complete.
      </p>
      <p className="text-xs text-secondary-650 leading-relaxed">
        Users may contact Geo India Limited to request correction or deletion of their personal information, subject to applicable legal and business requirements.
      </p>
    </div>
  </div>
);

export default Privacy;
