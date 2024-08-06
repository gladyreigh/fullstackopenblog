const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const blogRouter = require('./routes/blogs');
const userRouter = require('./routes/users');
const loginRouter = require('./routes/login'); 
const middleware = require('./utils/middleware');

const app = express();
const mongoUrl = 'mongodb://localhost/bloglist';

mongoose.connect(mongoUrl)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

app.use(cors()); // Enables CORS
app.use(express.json()); // Parses incoming JSON requests
app.use('/api/blogs', blogRouter); // Routes requests to /api/blogs
app.use('/api/users', userRouter); // Routes requests to /api/users
app.use('/api/login', loginRouter); // Routes requests to /api/login

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
