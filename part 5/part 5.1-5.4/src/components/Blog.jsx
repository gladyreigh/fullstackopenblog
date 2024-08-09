// src/components/Blog.jsx
import React from 'react';

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
);

export default Blog;
