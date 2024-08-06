const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {}
  
  return blogs.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  })
}

module.exports = {
  dummy: () => 1,
  totalLikes: (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0),
  favoriteBlog,
  mostBlogs: (blogs) => {
    // Implement mostBlogs
  },
  mostLikes: (blogs) => {
    // Implement mostLikes
  }
}
