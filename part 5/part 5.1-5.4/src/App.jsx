import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
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
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      const blogs = await blogService.getAll();
      setBlogs(blogs);
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
    setClearFields(true); // Trigger clearing of form fields
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
      setBlogs(blogs.concat(returnedBlog));
      notify(`A new blog "${returnedBlog.title}" by ${returnedBlog.author} added`, 'success');
    } catch (exception) {
      notify('Error adding blog', 'error');
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
      <BlogForm createBlog={createBlog} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
