import React from 'react';
import { Helmet } from 'react-helmet-async';

const Terms = () => (
  <div className="pt-24 pb-16 bg-gray-50 min-h-screen text-left">
    <Helmet><title>Terms and Conditions - Geo India Limited</title></Helmet>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white rounded-3xl border border-gray-150 shadow-sm space-y-6">
      <h1 className="text-3xl font-heading font-bold text-secondary-900 border-b border-gray-100 pb-3">Terms and Conditions</h1>
      <p className="text-xs text-secondary-650 leading-relaxed">
        The information available on the Geo India Limited website is provided for general recruitment and employment-related purposes.
      </p>
      <p className="text-xs text-secondary-650 leading-relaxed">
        Submitting a job application, resume, contact form, or hiring requirement does not create a guarantee of employment, candidate placement, or recruitment success.
      </p>
      <p className="text-xs text-secondary-650 leading-relaxed">
        Candidates are responsible for providing accurate information regarding qualifications, skills, experience, employment history, salary, and personal details.
      </p>
      <p className="text-xs text-secondary-650 leading-relaxed">
        Employers are responsible for providing accurate job descriptions, salary information, working conditions, employment terms, and selection requirements.
      </p>
      <p className="text-xs text-secondary-650 leading-relaxed">
        Final candidate selection remains the responsibility of the employer.
      </p>
      <p className="text-xs text-secondary-650 leading-relaxed">
        Geo India Limited may update website content, services, job openings, policies, and terms when required.
      </p>
    </div>
  </div>
);

export default Terms;
