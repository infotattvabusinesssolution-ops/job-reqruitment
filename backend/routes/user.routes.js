const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/auth');

// Placeholder - will be expanded
router.get('/', authenticate, authorize('admin', 'super_admin'), (req, res) => {
  res.json({ success: true, message: 'Users list endpoint' });
});

router.get('/:id', authenticate, (req, res) => {
  res.json({ success: true, message: 'User detail endpoint' });
});

module.exports = router;