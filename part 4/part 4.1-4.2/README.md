
# Blog List Application

This is a simple blog list application built with **Express**, **MongoDB**, and **Mongoose**. It allows users to add and view blogs through a RESTful API.

## Features

- **Add a Blog**: Create a new blog entry with a title, author, URL, and number of likes.
- **List Blogs**: Retrieve all blog entries from the database.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing blog data.
- **Mongoose**: MongoDB object modeling tool for Node.js.
- **Nodemon**: Development utility that automatically restarts the server on file changes.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/try/download/community) (either local installation or an account on MongoDB Atlas)

### Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/bloglist.git
   cd bloglist
   ```

2. **Install Dependencies**

   Install the required Node.js modules:

   ```bash
   npm install
   ```

3. **Set Up MongoDB**

   Ensure MongoDB is running. You can use a local MongoDB instance or connect to MongoDB Atlas. Update the `mongoUrl` in `index.js` if using MongoDB Atlas.

4. **Run the Application**

   Start the server with Nodemon:

   ```bash
   npm start
   ```

   The server will run on port 3003 by default.

## How It Was Achieved

### 4.1 Blog List, Step 1

**Project Initialization:**

- Initialized the project as an npm project with `npm init -y`.
- Installed the necessary dependencies:

   ```bash
   npm install express cors mongoose
   npm install --save-dev nodemon
   ```

**Code Implementation:**

- Created an `index.js` file and set up an Express server.
- Connected to a MongoDB database using Mongoose with the URL `mongodb://localhost/bloglist`.
- Defined a Mongoose schema and model for blogs in `index.js`:

   ```js
   const express = require('express')
   const cors = require('cors')
   const mongoose = require('mongoose')

   const blogSchema = new mongoose.Schema({
     title: String,
     author: String,
     url: String,
     likes: Number
   })

   const Blog = mongoose.model('Blog', blogSchema)

   const mongoUrl = 'mongodb://localhost/bloglist'
   mongoose.connect(mongoUrl)

   const app = express()
   app.use(cors())
   app.use(express.json())

   app.get('/api/blogs', (request, response) => {
     Blog
       .find({})
       .then(blogs => {
         response.json(blogs)
       })
   })

   app.post('/api/blogs', (request, response) => {
     const blog = new Blog(request.body)

     blog
       .save()
       .then(result => {
         response.status(201).json(result)
       })
   })

   const PORT = 3003
   app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`)
   })
   ```

- Implemented API endpoints:
  - `GET /api/blogs`: Retrieve all blog entries.
  - `POST /api/blogs`: Add a new blog entry.

**Testing:**

- Verified functionality using Postman or VS Code REST client to ensure that blogs could be added and retrieved correctly.

### 4.2 Blog List, Step 2

**Refactoring:**

- Refactored the code into a modular structure:
  - Created a `models` directory with `blog.js`:

    ```js
    const mongoose = require('mongoose')

    const blogSchema = new mongoose.Schema({
      title: String,
      author: String,
      url: String,
      likes: Number
    })

    module.exports = mongoose.model('Blog', blogSchema)
    ```

  - Created a `routes` directory with `blogs.js`:

    ```js
    const express = require('express')
    const Blog = require('../models/blog')
    const router = express.Router()

    router.get('/', (req, res) => {
      Blog.find({})
        .then(blogs => res.json(blogs))
    })

    router.post('/', (req, res) => {
      const blog = new Blog(req.body)
      blog.save()
        .then(result => res.status(201).json(result))
    })

    module.exports = router
    ```

  - Updated `index.js` to use the modular routes:

    ```js
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
    ```

**Testing After Refactor:**

- Ensured that all functionalities (adding and retrieving blogs) still worked after refactoring.
- Verified that the application ran without errors and that the API endpoints functioned as expected.

**Commit Changes:**

- Used version control to commit changes incrementally:

   ```bash
   git init
   git add .
   git commit -m "Initial commit with basic functionality"
   ```

## API Endpoints

### `GET /api/blogs`

Retrieve a list of all blogs.

**Response:**

- `200 OK` with a JSON array of blog objects.

### `POST /api/blogs`

Add a new blog entry.

**Request Body:**

- `title` (String): The title of the blog.
- `author` (String): The author of the blog.
- `url` (String): The URL of the blog.
- `likes` (Number): The number of likes.

**Response:**

- `201 Created` with the newly created blog object.

## Example

To add a new blog, use Postman or a similar tool:

- **POST /api/blogs**
- Body (JSON):

   ```json
   {
     "title": "My First Blog",
     "author": "John Doe",
     "url": "http://example.com",
     "likes": 10
   }
   ```

To retrieve blogs:

- **GET /api/blogs**

## Running Tests

This project does not currently include tests. You can add your own using testing frameworks like Mocha or Jest.

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

If you have any questions or feedback, please reach out to `grey@phonesale.org`.
