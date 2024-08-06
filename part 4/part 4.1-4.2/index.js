const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./routes/blogs')

const app = express()
const mongoUrl = 'mongodb://localhost/bloglist'

mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
