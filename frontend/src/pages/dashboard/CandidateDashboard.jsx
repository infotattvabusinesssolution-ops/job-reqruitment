import React from 'react';
import { Helmet } from 'react-helmet-async';
const CandidateDashboard = () => (
  <div>
    <Helmet><title>Candidate Dashboard - JobReqruitment</title></Helmet>
    <div className="mb-8">
      <h1 className="text-2xl font-heading font-bold text-secondary-900">Candidate Dashboard</h1>
      <p className="text-secondary-500">Dashboard overview and management</p>
    </div>
    <div className="bg-white rounded-2xl border border-gray-200 p-8">
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-secondary-900 mb-2">Dashboard Ready</h3>
        <p className="text-secondary-500">Content will be populated with real data.</p>
      </div>
    </div>
  </div>
);
export default CandidateDashboard;