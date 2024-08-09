const express = require('express');
const Blog = require('../models/blog');
const { userExtractor } = require('../utils/middleware');
const mongoose = require('mongoose');
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

  if (!title || !url) {
    return res.status(400).json({
      error: title ? 'URL is required' : 'Title is required'
    });
  }

  if (!user) {
    return res.status(401).json({ error: 'Token missing or invalid' });
  }

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
  const { id } = req.params;

  if (!user) {
    return res.status(401).json({ error: 'Token missing or invalid' });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    if (blog.user.toString() !== user.id.toString()) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await Blog.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting blog:', error.message);
    res.status(500).json({ error: 'Failed to delete blog' });
  }
});

// PUT /api/blogs/:id/like
router.put('/:id/like', userExtractor, async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Check if the user has already liked the blog
    if (blog.usersLiked.includes(user.id)) {
      return res.status(400).json({ error: 'You have already liked this blog' });
    }

    // Add user to liked users list and increment likes
    blog.usersLiked.push(user.id);
    blog.likes += 1;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    console.error('Error liking blog:', error.message);
    res.status(500).json({ error: 'Failed to like blog' });
  }
});

module.exports = router;
