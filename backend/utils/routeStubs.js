/**
 * Route Stubs Generator
 * Run this once to create all missing route files
 */
const fs = require('fs');
const path = require('path');

const routeFiles = [
  'candidate.routes.js', 'employer.routes.js', 'recruiter.routes.js',
  'application.routes.js', 'interview.routes.js', 'blog.routes.js',
  'testimonial.routes.js', 'faq.routes.js', 'contact.routes.js',
  'dashboard.routes.js', 'admin.routes.js', 'upload.routes.js',
  'notification.routes.js', 'search.routes.js', 'analytics.routes.js',
  'category.routes.js', 'skill.routes.js'
];

const routeTemplate = (name) => `const express = require('express');
const router = express.Router();
const { authenticate, authorize, optionalAuth } = require('../middlewares/auth');

// GET /api/${name} - List all
router.get('/', optionalAuth, (req, res) => {
  res.json({ success: true, message: '${name} list endpoint', data: [] });
});

// GET /api/${name}/:id - Get single
router.get('/:id', optionalAuth, (req, res) => {
  res.json({ success: true, message: '${name} detail endpoint', data: null });
});

// POST /api/${name} - Create
router.post('/', authenticate, authorize('admin', 'super_admin'), (req, res) => {
  res.json({ success: true, message: 'Create ${name} endpoint', data: null });
});

// PUT /api/${name}/:id - Update
router.put('/:id', authenticate, (req, res) => {
  res.json({ success: true, message: 'Update ${name} endpoint', data: null });
});

// DELETE /api/${name}/:id - Delete
router.delete('/:id', authenticate, authorize('admin', 'super_admin'), (req, res) => {
  res.json({ success: true, message: 'Delete ${name} endpoint' });
});

module.exports = router;
`;

routeFiles.forEach(file => {
  const routeName = file.replace('.routes.js', '');
  const filePath = path.join(__dirname, '..', 'routes', file);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, routeTemplate(routeName));
    console.log(`Created: ${file}`);
  }
});

console.log('All route stubs created!');