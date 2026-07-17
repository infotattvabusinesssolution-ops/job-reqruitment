const express = require('express');
const router = express.Router();
const { authenticate, authorize, optionalAuth } = require('../middlewares/auth');

// GET /api/faq - List all
router.get('/', optionalAuth, (req, res) => {
  res.json({ success: true, message: 'faq list endpoint', data: [] });
});

// GET /api/faq/:id - Get single
router.get('/:id', optionalAuth, (req, res) => {
  res.json({ success: true, message: 'faq detail endpoint', data: null });
});

// POST /api/faq - Create
router.post('/', authenticate, authorize('admin', 'super_admin'), (req, res) => {
  res.json({ success: true, message: 'Create faq endpoint', data: null });
});

// PUT /api/faq/:id - Update
router.put('/:id', authenticate, (req, res) => {
  res.json({ success: true, message: 'Update faq endpoint', data: null });
});

// DELETE /api/faq/:id - Delete
router.delete('/:id', authenticate, authorize('admin', 'super_admin'), (req, res) => {
  res.json({ success: true, message: 'Delete faq endpoint' });
});

module.exports = router;
