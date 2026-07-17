const express = require('express');
const router = express.Router();
const { authenticate, authorize, optionalAuth } = require('../middlewares/auth');

// GET /api/search - List all
router.get('/', optionalAuth, (req, res) => {
  res.json({ success: true, message: 'search list endpoint', data: [] });
});

// GET /api/search/:id - Get single
router.get('/:id', optionalAuth, (req, res) => {
  res.json({ success: true, message: 'search detail endpoint', data: null });
});

// POST /api/search - Create
router.post('/', authenticate, authorize('admin', 'super_admin'), (req, res) => {
  res.json({ success: true, message: 'Create search endpoint', data: null });
});

// PUT /api/search/:id - Update
router.put('/:id', authenticate, (req, res) => {
  res.json({ success: true, message: 'Update search endpoint', data: null });
});

// DELETE /api/search/:id - Delete
router.delete('/:id', authenticate, authorize('admin', 'super_admin'), (req, res) => {
  res.json({ success: true, message: 'Delete search endpoint' });
});

module.exports = router;
