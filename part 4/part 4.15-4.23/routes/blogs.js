const express = require('express');
const Blog = require('../models/blog');
const { userExtractor } = require('../utils/middleware'); // Add this line
const router = express.Router();

// GET /api/blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// POST /api/blogs
router.post('/', userExtractor, async (req, res) => {
  const { title, author, url, likes = 0 } = req.body;
  const user = req.user;

  // Validate input
  if (!title || !url) {
    return res.status(400).json({
      error: title ? 'URL is required' : 'Title is required'
    });
  }

  // Check for user
  if (!user) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  // Create new blog
  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user.id
  });

  try {
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create blog' });
  }
});

// DELETE /api/blogs/:id
router.delete('/:id', userExtractor, async (req, res) => {
  const user = req.user;

  // Check for user
  if (!user) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Check if the user is the blog owner
    if (blog.user.toString() !== user.id.toString()) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: 'Invalid ID format' });
  }
});

// PUT /api/blogs/:id
router.put('/:id', async (req, res) => {
  const { title, author, url, likes } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, author, url, likes },
      { new: true, runValidators: true }
    );
    if (updatedBlog) {
      res.json(updatedBlog);
    } else {
      res.status(404).json({ error: 'Blog not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

module.exports = router;
