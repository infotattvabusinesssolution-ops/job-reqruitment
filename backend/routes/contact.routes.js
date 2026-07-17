const express = require('express');
const router = express.Router();
const { authenticate, authorize, optionalAuth } = require('../middlewares/auth');

// GET /api/contact - List all
router.get('/', optionalAuth, (req, res) => {
  res.json({ success: true, message: 'contact list endpoint', data: [] });
});

// GET /api/contact/:id - Get single
router.get('/:id', optionalAuth, (req, res) => {
  res.json({ success: true, message: 'contact detail endpoint', data: null });
});

// POST /api/contact - Create
router.post('/', authenticate, authorize('admin', 'super_admin'), (req, res) => {
  res.json({ success: true, message: 'Create contact endpoint', data: null });
});

// PUT /api/contact/:id - Update
router.put('/:id', authenticate, (req, res) => {
  res.json({ success: true, message: 'Update contact endpoint', data: null });
});

// DELETE /api/contact/:id - Delete
router.delete('/:id', authenticate, authorize('admin', 'super_admin'), (req, res) => {
  res.json({ success: true, message: 'Delete contact endpoint' });
});

module.exports = router;
