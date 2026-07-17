const express = require('express');
const router = express.Router();
const { authenticate, authorize, optionalAuth } = require('../middlewares/auth');

// GET /api/interview - List all
router.get('/', optionalAuth, (req, res) => {
  res.json({ success: true, message: 'interview list endpoint', data: [] });
});

// GET /api/interview/:id - Get single
router.get('/:id', optionalAuth, (req, res) => {
  res.json({ success: true, message: 'interview detail endpoint', data: null });
});

// POST /api/interview - Create
router.post('/', authenticate, authorize('admin', 'super_admin'), (req, res) => {
  res.json({ success: true, message: 'Create interview endpoint', data: null });
});

// PUT /api/interview/:id - Update
router.put('/:id', authenticate, (req, res) => {
  res.json({ success: true, message: 'Update interview endpoint', data: null });
});

// DELETE /api/interview/:id - Delete
router.delete('/:id', authenticate, authorize('admin', 'super_admin'), (req, res) => {
  res.json({ success: true, message: 'Delete interview endpoint' });
});

module.exports = router;
