
# Blog List Frontend - README

This document explains the modifications and implementations made to complete the exercises from steps 5.5 to 5.11 for the Blog List frontend application.

## Steps Completed

### 5.5 Blog List Frontend, Step 5

**Objective:** Change the form for creating blog posts to be displayed conditionally using a button.

**Implementation:**

- **Component:** BlogForm
- **State Management:** Used the Togglable component to toggle the visibility of the BlogForm.
- **Behavior:**
  - The form is hidden by default.
  - Clicking the "Create new blog" button reveals the form.
  - After creating a new blog, the form hides again.

**Code Snippet:**

```jsx
import React from 'react';
import Togglable from './Togglable';
import BlogForm from './BlogForm';

// Inside App component's return
<Togglable buttonLabel="Create new blog">
  <BlogForm createBlog={createBlog} />
</Togglable>
```

### 5.6 Blog List Frontend, Step 6

**Objective:** Separate the blog creation form into its own component and manage its internal state.

**Implementation:**

- **Component:** BlogForm
- **State Management:** Moved form states (title, author, url) to BlogForm.

**Code Snippet:**

```jsx
import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    createBlog({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input value={title} onChange={({ target }) => setTitle(target.value)} required />
      </div>
      <div>
        <label>Author:</label>
        <input value={author} onChange={({ target }) => setAuthor(target.value)} required />
      </div>
      <div>
        <label>URL:</label>
        <input value={url} onChange={({ target }) => setUrl(target.value)} required />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default BlogForm;
```

### 5.7 Blog List Frontend, Step 7

**Objective:** Add a button to each blog to toggle the visibility of its details.

**Implementation:**

- **Component:** Blog
- **State Management:** Added a visible state to control the display of blog details.

**Code Snippet:**

```jsx
import React, { useState } from 'react';

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div style={{ paddingTop: 10, paddingLeft: 2, border: 'solid', borderWidth: 1, marginBottom: 5 }}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'Hide' : 'View'}</button>
      </div>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>{blog.likes} likes</p>
          <button onClick={() => handleLike(blog)}>Like</button>
          <p>Added by {blog.user.name}</p>
          {blog.user.username === user.username && (
            <button onClick={() => handleDelete(blog)}>Delete</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
```

### 5.8 Blog List Frontend, Step 8

**Objective:** Implement the functionality for the like button.

**Implementation:**

- **Functionality:** `handleLike` sends a PUT request to update the blog's like count.

**Code Snippet:**

```jsx
const handleLike = async (blog) => {
  try {
    await blogService.like(blog.id);
    fetchBlogs();
    notify('Blog liked', 'success');
  } catch (exception) {
    const errorMessage = exception.response?.data?.error || 'Error liking blog';
    notify(errorMessage, 'error');
  }
};
```

### 5.9 Blog List Frontend, Step 9

**Objective:** Ensure that the user who added the blog is displayed correctly after liking.

**Issue:** The user's name was not showing correctly after a blog was liked.

**Solution:** Ensure the user field is correctly populated in the blog details. This issue was fixed by ensuring the backend response includes the user information and updating the frontend accordingly.

### 5.10 Blog List Frontend, Step 10

**Objective:** Sort the blogs by the number of likes.

**Implementation:**

- **Sorting:** Applied sorting to the list of blogs based on likes.

**Code Snippet:**

```jsx
{blogs
  .sort((a, b) => b.likes - a.likes) // Sort by likes in descending order
  .map((blog) => (
    <Blog
      key={blog.id}
      blog={blog}
      user={user}
      handleLike={() => handleLike(blog)}
      handleDelete={() => handleDelete(blog)}
    />
  ))}
```

### 5.11 Blog List Frontend, Step 11

**Objective:** Add a delete button and implement its functionality.

**Implementation:**

- **Functionality:** `handleDelete` confirms deletion and sends a DELETE request.
- **Visibility:** The delete button is only shown if the logged-in user is the author of the blog.

**Code Snippet:**

```jsx
const handleDelete = async (blog) => {
  if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
    try {
      await blogService.remove(blog.id);
      fetchBlogs();
      notify('Blog removed successfully', 'success');
    } catch (exception) {
      notify('Error removing blog', 'error');
    }
  }
};
```
