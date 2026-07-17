import React from 'react';

const AdminAnalytics = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 animate-fadeIn">
      <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-secondary-900">User Demographics Profile</h3>
        <div className="h-64 bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-xs text-secondary-400">
          [Pie Chart: 75% Candidate Pool, 15% Employers, 10% Recruiters]
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-secondary-900">Monthly Placement Sprints</h3>
        <div className="h-64 bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-xs text-secondary-400">
          [Bar Graph: 120 placements average per month]
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
