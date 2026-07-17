const express = require('express');
const router = express.Router();
const { authenticate, authorize, optionalAuth } = require('../middlewares/auth');

// GET /api/testimonial - List all
router.get('/', optionalAuth, (req, res) => {
  res.json({ success: true, message: 'testimonial list endpoint', data: [] });
});

// GET /api/testimonial/:id - Get single
router.get('/:id', optionalAuth, (req, res) => {
  res.json({ success: true, message: 'testimonial detail endpoint', data: null });
});

// POST /api/testimonial - Create
router.post('/', authenticate, authorize('admin', 'super_admin'), (req, res) => {
  res.json({ success: true, message: 'Create testimonial endpoint', data: null });
});

// PUT /api/testimonial/:id - Update
router.put('/:id', authenticate, (req, res) => {
  res.json({ success: true, message: 'Update testimonial endpoint', data: null });
});

// DELETE /api/testimonial/:id - Delete
router.delete('/:id', authenticate, authorize('admin', 'super_admin'), (req, res) => {
  res.json({ success: true, message: 'Delete testimonial endpoint' });
});

module.exports = router;
