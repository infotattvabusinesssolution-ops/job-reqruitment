const fs = require('fs');
const path = require('path');

const pages = [
  'JobDetails', 'Candidates', 'Employers', 'Recruiters',
  'Blogs', 'BlogDetails', 'Testimonials', 'FAQ', 'Contact',
  'Register', 'ForgotPassword', 'ResetPassword',
];

const dashboards = [
  'CandidateDashboard', 'EmployerDashboard', 'RecruiterDashboard', 'AdminDashboard',
];

const baseDir = path.join(__dirname, 'frontend', 'src', 'pages');
const dashDir = path.join(baseDir, 'dashboard');

if (!fs.existsSync(dashDir)) fs.mkdirSync(dashDir, { recursive: true });

pages.forEach(name => {
  const content = `import React from 'react';
import { Helmet } from 'react-helmet-async';
const ${name} = () => (
  <div className="pt-24 pb-16">
    <Helmet><title>${name} - JobRecruitment</title></Helmet>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center py-20">
        <h1 className="text-5xl font-heading font-bold text-secondary-900 mb-4">${name.replace(/([A-Z])/g, ' $1').trim()}</h1>
        <p className="text-xl text-secondary-600">Content coming soon...</p>
      </div>
    </div>
  </div>
);
export default ${name};`;
  fs.writeFileSync(path.join(baseDir, `${name}.jsx`), content);
  console.log(`Created: ${name}.jsx`);
});

dashboards.forEach(name => {
  const content = `import React from 'react';
import { Helmet } from 'react-helmet-async';
const ${name} = () => (
  <div>
    <Helmet><title>${name.replace(/([A-Z])/g, ' $1').trim()} - JobRecruitment</title></Helmet>
    <div className="mb-8">
      <h1 className="text-2xl font-heading font-bold text-secondary-900">${name.replace(/([A-Z])/g, ' $1').trim()}</h1>
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
export default ${name};`;
  fs.writeFileSync(path.join(dashDir, `${name}.jsx`), content);
  console.log(`Created: dashboard/${name}.jsx`);
});

console.log('All pages created successfully!');