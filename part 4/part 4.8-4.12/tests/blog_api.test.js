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
});
