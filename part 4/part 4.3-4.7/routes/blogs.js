const express = require('express')
const Blog = require('../models/blog')
const router = express.Router()

router.get('/', (req, res) => {
  Blog.find({})
    .then(blogs => res.json(blogs))
})

router.post('/', (req, res) => {
  const blog = new Blog(req.body)
  blog.save()
    .then(result => res.status(201).json(result))
})

module.exports = router
