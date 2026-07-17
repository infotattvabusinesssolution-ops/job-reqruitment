import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import AdminOverview from './admin/AdminOverview';
import AdminUsers from './admin/AdminUsers';
import AdminJobs from './admin/AdminJobs';
import AdminCompanies from './admin/AdminCompanies';
import AdminBlogs from './admin/AdminBlogs';
import AdminAnalytics from './admin/AdminAnalytics';
import AdminSettings from './admin/AdminSettings';

const AdminDashboard = () => {
  const { tab = 'overview' } = useParams();

  const renderTabContent = () => {
    switch (tab) {
      case 'overview':
        return <AdminOverview />;
      case 'users':
        return <AdminUsers />;
      case 'jobs':
        return <AdminJobs />;
      case 'companies':
        return <AdminCompanies />;
      case 'blogs':
        return <AdminBlogs />;
      case 'analytics':
        return <AdminAnalytics />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="space-y-8">
      <Helmet><title>Admin Control Center - Geo India Limited</title></Helmet>

      {/* Tab Header Title */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-secondary-900 capitalize">
            {tab === 'overview' ? 'Admin Control Center' : `${tab} Management`}
          </h1>
          <p className="text-xs text-secondary-500">Configure corporate records, placements, and system options.</p>
        </div>
      </div>

      {/* Render selected component */}
      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;