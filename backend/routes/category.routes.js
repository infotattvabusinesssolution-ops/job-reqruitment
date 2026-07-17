const express = require('express');
const router = express.Router();
const { authenticate, authorize, optionalAuth } = require('../middlewares/auth');

// GET /api/category - List all
router.get('/', optionalAuth, (req, res) => {
  res.json({ success: true, message: 'category list endpoint', data: [] });
});

// GET /api/category/:id - Get single
router.get('/:id', optionalAuth, (req, res) => {
  res.json({ success: true, message: 'category detail endpoint', data: null });
});

// POST /api/category - Create
router.post('/', authenticate, authorize('admin', 'super_admin'), (req, res) => {
  res.json({ success: true, message: 'Create category endpoint', data: null });
});

// PUT /api/category/:id - Update
router.put('/:id', authenticate, (req, res) => {
  res.json({ success: true, message: 'Update category endpoint', data: null });
});

// DELETE /api/category/:id - Delete
router.delete('/:id', authenticate, authorize('admin', 'super_admin'), (req, res) => {
  res.json({ success: true, message: 'Delete category endpoint' });
});

module.exports = router;
