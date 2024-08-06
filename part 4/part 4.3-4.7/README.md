
# Blog List Backend

This project is a backend application for a blog list. It includes basic CRUD operations for blog entries and utility functions for analyzing blog data. The project is built using Node.js, Express, and MongoDB.

## Table of Contents

- [Project Overview](#project-overview)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Exercises](#exercises)
- [License](#license)

## Project Overview

This application allows users to:
- Get a list of all blogs
- Add new blogs

The backend is built using Express and connected to a MongoDB database. Helper functions are provided to analyze blog data, such as calculating total likes and identifying the most liked blogs.

## Installation

### Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### Install Dependencies

```bash
npm install
```

### Setup MongoDB

Ensure that MongoDB is running on your local machine or use a MongoDB Atlas cluster. Update the MongoDB connection URL in `index.js` if necessary.

## Usage

### Start the Server

```bash
npm start
```

The server will run on http://localhost:3003.

### API Endpoints

- **GET /api/blogs** - Get a list of all blogs.
- **POST /api/blogs** - Add a new blog.

### Example Request

To add a new blog, use the following JSON format:

```json
{
  "title": "Blog Title",
  "author": "Author Name",
  "url": "https://example.com",
  "likes": 10
}
```

## Testing

To run the tests, use the following command:

```bash
npm test
```

## Exercises

### 4.3: Helper Functions and Unit Tests, Step 1

**Task:** Implement a dummy function that returns the value 1.
**Implementation:** Created the dummy function in `utils/list_helper.js` and verified it with a test.

### 4.4: Helper Functions and Unit Tests, Step 2

**Task:** Implement a totalLikes function that returns the total sum of likes from a list of blogs.
**Implementation:** Added the totalLikes function and wrote tests to ensure its correctness.

### 4.5: Helper Functions and Unit Tests, Step 3

**Task:** Implement a favoriteBlog function that returns the blog with the most likes.
**Implementation:** Created the favoriteBlog function and tested its functionality.

### 4.6: Helper Functions and Unit Tests, Step 4

**Task:** Implement a mostBlogs function that identifies the author with the most blogs.
**Implementation:** Added the mostBlogs function and confirmed its correctness through tests.

### 4.7: Helper Functions and Unit Tests, Step 5

**Task:** Implement a mostLikes function that identifies the author with the most total likes.
**Implementation:** Created the mostLikes function and validated it with tests.

## License

This project is licensed under the ISC License - see the LICENSE file for details.

### Additional Notes:

- **Repository URL:** Replace `<repository-url>` with the actual URL of your GitHub repository.
- **Repository Directory:** Replace `<repository-directory>` with the name of your project directory.
