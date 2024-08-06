const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('list helper functions', () => {
  test('dummy returns one', () => {
    const blogs = []
    assert.strictEqual(listHelper.dummy(blogs), 1)
  })

  // Example blog list for testing
  const listWithMultipleBlogs = [
    {
      _id: '5a422b3a1b54a676234d17f10',
      title: 'The Art of War',
      author: 'Sun Tzu',
      url: 'https://example.com',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f11',
      title: 'The Art of Peace',
      author: 'Sun Tzu',
      url: 'https://example.com/peace',
      likes: 8,
      __v: 0
    }
  ]

  test('when list has multiple blogs, returns the blog with the most likes', () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    const expected = {
      _id: '5a422b3a1b54a676234d17f10',
      title: 'The Art of War',
      author: 'Sun Tzu',
      url: 'https://example.com',
      likes: 10,
      __v: 0
    }
    assert.deepStrictEqual(result, expected)
  })

  // Add more tests here for other helper functions
})
