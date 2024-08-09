import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';
import registerService from './services/register';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      fetchBlogs();
    }
  }, []);

  const fetchBlogs = async () => {
    try {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    } catch (error) {
      notify('Error fetching blogs', 'error');
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      fetchBlogs();
      notify(`Welcome ${user.name}`, 'success');
    } catch (exception) {
      notify('Invalid username or password', 'error');
    }
  };

  const handleRegister = async (username, name, password) => {
    try {
      await registerService.register({ username, name, password });
      await handleLogin(username, password);
    } catch (exception) {
      notify(exception.response?.data?.error || 'Registration failed', 'error');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
    setBlogs([]);
    notify('Successfully logged out', 'success');
  };

  const notify = (text, type) => {
    setNotification({ text, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const createBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      fetchBlogs();
      notify(`A new blog "${returnedBlog.title}" by ${returnedBlog.author} added`, 'success');
    } catch (exception) {
      notify('Error adding blog', 'error');
    }
  };

  const handleLike = async (blog) => {
    try {
      await blogService.like(blog.id);
      fetchBlogs(); // Refresh the list of blogs after liking
      notify('Blog liked', 'success');
    } catch (exception) {
      const errorMessage = exception.response?.data?.error || 'Error liking blog';
      notify(errorMessage, 'error');
    }
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id);
        fetchBlogs(); // Refresh the list of blogs after deleting
        notify('Blog removed successfully', 'success');
      } catch (exception) {
        notify('Error removing blog', 'error');
      }
    }
  };

  if (user === null) {
    return (
      <div>
        <Notification message={notification} />
        {showRegister ? (
          <RegisterForm handleRegister={handleRegister} handleBack={() => setShowRegister(false)} />
        ) : (
          <div>
            <LoginForm handleLogin={handleLogin} />
            <button onClick={() => setShowRegister(true)}>Register</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <Notification message={notification} />
      <h2>Blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="Create new blog">
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes) // Sort blogs by likes in descending order
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            handleLike={() => handleLike(blog)}
            handleDelete={() => handleDelete(blog)}
          />
        ))}
    </div>
  );
};

export default App;
