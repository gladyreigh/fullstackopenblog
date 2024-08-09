// src/components/BlogForm.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog }) => {
  // State to manage form inputs
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  // Handles form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    createBlog({ title, author, url });

    // Clear the form fields after submission
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h3>Create a new blog</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input
            id="url"
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            required
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
