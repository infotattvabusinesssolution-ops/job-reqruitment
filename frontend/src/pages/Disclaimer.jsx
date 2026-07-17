import React from 'react';
import { Helmet } from 'react-helmet-async';

const Disclaimer = () => (
  <div className="pt-24 pb-16 bg-gray-50 min-h-screen text-left">
    <Helmet><title>Candidate Disclaimer - Geo India Limited</title></Helmet>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white rounded-3xl border border-gray-150 shadow-sm space-y-6">
      <h1 className="text-3xl font-heading font-bold text-secondary-900 border-b border-gray-100 pb-3">Candidate Disclaimer</h1>
      <p className="text-xs text-secondary-650 leading-relaxed font-semibold">
        Geo India Limited does not guarantee employment to any candidate.
      </p>
      <p className="text-xs text-secondary-650 leading-relaxed">
        Job opportunities depend on employer requirements, vacancy availability, candidate qualifications, skills, experience, interview performance, document verification, and final selection.
      </p>
      <p className="text-xs text-secondary-650 leading-relaxed text-danger-600 font-bold border-l-2 border-danger-500 pl-3">
        * Candidates should not provide money or confidential banking information to any unauthorised person claiming to represent Geo India Limited.
      </p>
      <p className="text-xs text-secondary-650 leading-relaxed">
        Any applicable candidate service policy or fee policy should be clearly communicated through official channels.
      </p>
    </div>
  </div>
);

export default Disclaimer;
