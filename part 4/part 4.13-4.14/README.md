
# Blog List Application

## Overview

This project is a blog list application built with Node.js, Express, and MongoDB. It includes functionality for creating, retrieving, and managing blog posts. The project is structured to demonstrate various aspects of backend development including RESTful API design, unit testing, and error handling.

## Exercises 4.8 - 4.12

### 4.8: Blog List Tests, Step 1

- **Objective:** Verify that the application returns the correct amount of blog posts in the JSON format when making an HTTP GET request to the `/api/blogs` URL. Refactor the route handler to use async/await syntax instead of promises.

- **Implementation:**
  - Added a test using the SuperTest library to check the number of blog posts returned by the `/api/blogs` endpoint.
  - Refactored the route handler in `routes/blogs.js` to use async/await.

  **Test Code:**
  ```javascript
  const supertest = require('supertest');
  const app = require('../index'); // Ensure index.js is exporting the app

  describe('GET /api/blogs', () => {
    test('should return the correct number of blogs', async () => {
      const response = await supertest(app).get('/api/blogs');
      expect(response.status).toBe(200);
      expect(response.type).toBe('application/json');
      expect(response.body).toHaveLength(3); // Adjust based on your initial test data
    });
  });
  ```

### 4.9: Blog List Tests, Step 2

- **Objective:** Verify that the unique identifier property of blog posts is named `id`, instead of the default `_id` from MongoDB. Refactor the model to implement this change.

- **Implementation:**
  - Added a `toJSON` method to the Blog model in `models/blog.js` to rename `_id` to `id`.

  **Code Changes:**
  ```javascript
  const mongoose = require('mongoose');

  const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  });

  blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  });

  module.exports = mongoose.model('Blog', blogSchema);
  ```

### 4.10: Blog List Tests, Step 3

- **Objective:** Verify that making an HTTP POST request to the `/api/blogs` URL successfully creates a new blog post and increases the total number of blogs by one. Refactor the route handler to use async/await.

- **Implementation:**
  - Added a test to check that a new blog post is created and the total number of blogs increases.
  - Refactored the route handler in `routes/blogs.js` to use async/await.

  **Test Code:**
  ```javascript
  describe('POST /api/blogs', () => {
    test('should create a new blog post', async () => {
      const initialBlogs = await supertest(app).get('/api/blogs');
      const initialCount = initialBlogs.body.length;

      const newBlog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'https://test.com',
        likes: 5
      };

      await supertest(app).post('/api/blogs').send(newBlog).expect(201);

      const updatedBlogs = await supertest(app).get('/api/blogs');
      expect(updatedBlogs.body).toHaveLength(initialCount + 1);
      expect(updatedBlogs.body[updatedBlogs.body.length - 1].title).toBe('Test Blog');
    });
  });
  ```

### 4.11: Blog List Tests, Step 4

- **Objective:** Verify that if the `likes` property is missing from the request, it defaults to the value 0.

- **Implementation:**
  - Added a test to check that `likes` defaults to 0 if not provided.
  - Modified the POST request handler in `routes/blogs.js` to set `likes` to 0 if it is not included in the request.

  **Code Changes:**
  ```javascript
  router.post('/', async (req, res) => {
    const { title, author, url, likes = 0 } = req.body;

    if (!title || !url) {
      return res.status(400).json({ error: 'Title and URL are required' });
    }

    const blog = new Blog({
      title,
      author,
      url,
      likes
    });

    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  });
  ```

  **Test Code:**
  ```javascript
  describe('POST /api/blogs', () => {
    test('should default likes to 0 if missing', async () => {
      const newBlog = {
        title: 'Blog Without Likes',
        author: 'Test Author',
        url: 'https://test.com'
      };

      const response = await supertest(app).post('/api/blogs').send(newBlog).expect(201);
      expect(response.body.likes).toBe(0);
    });
  });
  ```

### 4.12: Blog List Tests, Step 5

- **Objective:** Verify that if the `title` or `url` properties are missing from the request data, the backend responds with a 400 Bad Request.

- **Implementation:**
  - Added tests to check that missing `title` or `url` results in a 400 Bad Request response.
  - Updated the POST request handler to validate the presence of `title` and `url`.

  **Test Code:**
  ```javascript
  describe('POST /api/blogs', () => {
    test('should return 400 if title is missing', async () => {
      const newBlog = {
        author: 'Test Author',
        url: 'https://test.com',
        likes: 5
      };

      await supertest(app).post('/api/blogs').send(newBlog).expect(400);
    });

    test('should return 400 if url is missing', async () => {
      const newBlog = {
        title: 'Test Blog',
        author: 'Test Author',
        likes: 5
      };

      await supertest(app).post('/api/blogs').send(newBlog).expect(400);
    });
  });
  ```

## Running Tests

To run the tests, use the following command:
```bash
npm test
```
Ensure that the test database is properly set up and configured to avoid affecting your production data.
