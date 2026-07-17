const express = require('express');
const router = express.Router();
const { authenticate, authorize, optionalAuth } = require('../middlewares/auth');

// GET /api/skill - List all
router.get('/', optionalAuth, (req, res) => {
  res.json({ success: true, message: 'skill list endpoint', data: [] });
});

// GET /api/skill/:id - Get single
router.get('/:id', optionalAuth, (req, res) => {
  res.json({ success: true, message: 'skill detail endpoint', data: null });
});

// POST /api/skill - Create
router.post('/', authenticate, authorize('admin', 'super_admin'), (req, res) => {
  res.json({ success: true, message: 'Create skill endpoint', data: null });
});

// PUT /api/skill/:id - Update
router.put('/:id', authenticate, (req, res) => {
  res.json({ success: true, message: 'Update skill endpoint', data: null });
});

// DELETE /api/skill/:id - Delete
router.delete('/:id', authenticate, authorize('admin', 'super_admin'), (req, res) => {
  res.json({ success: true, message: 'Delete skill endpoint' });
});

module.exports = router;
