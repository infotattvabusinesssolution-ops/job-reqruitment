const Blog = require('../models/Blog');
const { NotFoundError, BadRequestError, ForbiddenError } = require('../utils/errors');
const logger = require('../utils/logger');
const slugify = require('slugify');

class BlogController {
  /**
   * Retrieve list of published articles with filters
   */
  async getAllBlogs(req, res, next) {
    try {
      const { search, category, tag, page = 1, limit = 6 } = req.query;

      const query = { status: 'published' };

      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
        ];
      }

      if (category) {
        query.category = category;
      }

      if (tag) {
        query.tags = tag;
      }

      const skip = (Number(page) - 1) * Number(limit);

      const [blogs, total] = await Promise.all([
        Blog.find(query)
          .populate('author', 'firstName lastName profileImage')
          .populate('category', 'name icon')
          .sort({ publishedAt: -1, createdAt: -1 })
          .skip(skip)
          .limit(Number(limit)),
        Blog.countDocuments(query),
      ]);

      res.status(200).json({
        success: true,
        data: {
          blogs,
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieve single blog by ID
   */
  async getBlogById(req, res, next) {
    try {
      const { id } = req.params;
      const blog = await Blog.findById(id)
        .populate('author', 'firstName lastName profileImage')
        .populate('category');

      if (!blog) {
        throw new NotFoundError('Blog article not found');
      }

      blog.views += 1;
      await blog.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        data: blog,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieve single blog by slug
   */
  async getBlogBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const blog = await Blog.findOne({ slug })
        .populate('author', 'firstName lastName profileImage')
        .populate('category');

      if (!blog) {
        throw new NotFoundError('Blog article not found');
      }

      blog.views += 1;
      await blog.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        data: blog,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create new blog post (admin, super_admin, or recruiter/employer if granted)
   */
  async createBlog(req, res, next) {
    try {
      const authorId = req.user._id;

      if (typeof req.body.coverImage === 'string') {
        req.body.coverImage = { url: req.body.coverImage, alt: req.body.title || '' };
      }

      const blogData = {
        ...req.body,
        author: authorId,
        status: req.body.status || 'published',
      };

      const blog = await Blog.create(blogData);

      res.status(201).json({
        success: true,
        message: 'Blog article posted successfully',
        data: blog,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update existing blog post details
   */
  async updateBlog(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user._id;
      const userRole = req.user.role.name;

      const blog = await Blog.findById(id);
      if (!blog) {
        throw new NotFoundError('Blog article not found');
      }

      // Check access permission (author or admin)
      if (blog.author.toString() !== userId.toString() && !['admin', 'super_admin'].includes(userRole)) {
        throw new ForbiddenError('You are not authorized to update this article');
      }

      if (typeof req.body.coverImage === 'string') {
        req.body.coverImage = { url: req.body.coverImage, alt: req.body.title || blog.title };
      }

      if (req.body.title) {
        blog.title = req.body.title;
        blog.slug = slugify(req.body.title, { lower: true, strict: true });
      }

      Object.assign(blog, req.body);
      await blog.save();

      res.status(200).json({
        success: true,
        message: 'Blog article updated successfully',
        data: blog,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete blog post
   */
  async deleteBlog(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user._id;
      const userRole = req.user.role.name;

      const blog = await Blog.findById(id);
      if (!blog) {
        throw new NotFoundError('Blog article not found');
      }

      if (blog.author.toString() !== userId.toString() && !['admin', 'super_admin'].includes(userRole)) {
        throw new ForbiddenError('You are not authorized to delete this article');
      }

      await blog.deleteOne();

      res.status(200).json({
        success: true,
        message: 'Blog article deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieve featured articles list
   */
  async getFeaturedBlogs(req, res, next) {
    try {
      const blogs = await Blog.find({ isFeatured: true, status: 'published' })
        .populate('author', 'firstName lastName profileImage')
        .limit(3);

      res.status(200).json({
        success: true,
        data: blogs,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Increment like counter for a blog
   */
  async likeBlog(req, res, next) {
    try {
      const { id } = req.params;

      const blog = await Blog.findById(id);
      if (!blog) {
        throw new NotFoundError('Blog article not found');
      }

      blog.likes += 1;
      await blog.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        message: 'Liked successfully',
        data: { likes: blog.likes },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Append comment details to nested comments array
   */
  async addComment(req, res, next) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const userId = req.user?._id;

      if (!content) {
        throw new BadRequestError('Comment content is required');
      }

      const blog = await Blog.findById(id);
      if (!blog) {
        throw new NotFoundError('Blog article not found');
      }

      const commentData = {
        content,
        createdAt: new Date(),
        isApproved: true, // Auto-approve in dev environment
      };

      if (userId) {
        commentData.user = userId;
        commentData.name = req.user.fullName;
        commentData.email = req.user.email;
      } else {
        commentData.name = req.body.name || 'Anonymous Reader';
        commentData.email = req.body.email || 'anonymous@jobrecruitment.com';
      }

      blog.comments.push(commentData);
      await blog.save();

      res.status(201).json({
        success: true,
        message: 'Comment added successfully',
        data: blog.comments,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BlogController();
