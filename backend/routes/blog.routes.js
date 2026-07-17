const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');
const { authenticate, optionalAuth } = require('../middlewares/auth');

// Public endpoints
router.get('/', optionalAuth, blogController.getAllBlogs.bind(blogController));
router.get('/featured', optionalAuth, blogController.getFeaturedBlogs.bind(blogController));
router.get('/slug/:slug', optionalAuth, blogController.getBlogBySlug.bind(blogController));
router.get('/:id', optionalAuth, blogController.getBlogById.bind(blogController));

// Interactive endpoints
router.post('/:id/like', optionalAuth, blogController.likeBlog.bind(blogController));
router.post('/:id/comments', optionalAuth, blogController.addComment.bind(blogController));

// Administrative CRUD endpoints
router.post('/', authenticate, blogController.createBlog.bind(blogController));
router.put('/:id', authenticate, blogController.updateBlog.bind(blogController));
router.delete('/:id', authenticate, blogController.deleteBlog.bind(blogController));

module.exports = router;
