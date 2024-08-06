// In routes/blogs.js
const express = require('express');
const Blog = require('../models/blog');
const router = express.Router();

// GET /api/blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// POST /api/blogs
router.post('/', async (req, res) => {
  const { title, author, url, likes = 0 } = req.body;

  // Validate required fields
  if (!title || !url) {
    return res.status(400).json({
      error: title ? 'URL is required' : 'Title is required'
    });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes
  });

  try {
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create blog' });
  }
});

module.exports = router;
