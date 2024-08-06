// In tests/blog_api.test.js
const request = require('supertest');
const app = require('../index'); // Adjust the path if necessary
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
});

describe('POST /api/blogs', () => {
  test('should create a new blog and increase the total number of blogs', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://test.com',
      likes: 10
    };

    // Perform POST request to create a new blog
    await request(app)
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    // Verify that the total number of blogs increased by 1
    const blogsAtEnd = await Blog.find({});
    expect(blogsAtEnd).toHaveLength(1);

    // Verify that the content of the new blog is correct
    const titles = blogsAtEnd.map(blog => blog.title);
    expect(titles).toContain('Test Blog');
  });

  test('should default likes to 0 if not provided', async () => {
    const newBlog = {
      title: 'Test Blog with No Likes',
      author: 'Test Author',
      url: 'http://test.com'
    };

    const response = await request(app)
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(response.body.likes).toBe(0);
  });

  test('should return 400 if title or url is missing', async () => {
    const newBlogWithoutTitle = {
      author: 'Test Author',
      url: 'http://test.com'
    };

    const newBlogWithoutUrl = {
      title: 'Test Blog',
      author: 'Test Author'
    };

    await request(app)
      .post('/api/blogs')
      .send(newBlogWithoutTitle)
      .expect(400);

    await request(app)
      .post('/api/blogs')
      .send(newBlogWithoutUrl)
      .expect(400);
  });
});

describe('DELETE /api/blogs/:id', () => {
  let blogId;

  beforeEach(async () => {
    const newBlog = new Blog({
      title: 'Blog to Delete',
      author: 'Test Author',
      url: 'http://test.com',
      likes: 5
    });

    const savedBlog = await newBlog.save();
    blogId = savedBlog._id.toString();
  });

  test('should delete a blog by id', async () => {
    await request(app)
      .delete(`/api/blogs/${blogId}`)
      .expect(204);

    const blogsAtEnd = await Blog.find({});
    expect(blogsAtEnd).toHaveLength(0);
  });

  test('should return 404 if blog with the given id does not exist', async () => {
    const invalidId = 'invalidid123';

    await request(app)
      .delete(`/api/blogs/${invalidId}`)
      .expect(400);
  });
});

describe('PUT /api/blogs/:id', () => {
  let blogId;

  beforeEach(async () => {
    const newBlog = new Blog({
      title: 'Blog to Update',
      author: 'Test Author',
      url: 'http://test.com',
      likes: 5
    });

    const savedBlog = await newBlog.save();
    blogId = savedBlog._id.toString();
  });

  test('should update the number of likes for a blog by id', async () => {
    const updatedBlog = {
      title: 'Blog to Update',
      author: 'Test Author',
      url: 'http://test.com',
      likes: 20
    };

    const response = await request(app)
      .put(`/api/blogs/${blogId}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.likes).toBe(20);
  });

  test('should return 404 if blog with the given id does not exist', async () => {
    const invalidId = 'invalidid123';
    const updatedBlog = {
      title: 'Blog to Update',
      author: 'Test Author',
      url: 'http://test.com',
      likes: 20
    };

    await request(app)
      .put(`/api/blogs/${invalidId}`)
      .send(updatedBlog)
      .expect(400);
  });
});
