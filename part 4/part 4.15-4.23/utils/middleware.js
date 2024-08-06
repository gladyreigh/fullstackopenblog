const jwt = require('jsonwebtoken');

// Middleware to extract token from the request headers
const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '');
  } else {
    req.token = null;
  }
  next();
};

// Middleware to extract user from token
const userExtractor = async (req, res, next) => {
  if (req.token) {
    try {
      // Ensure SECRET environment variable is set
      if (!process.env.SECRET) {
        throw new Error('SECRET environment variable is not set');
      }
      
      // Verify the token and attach the user to the request
      const decodedToken = jwt.verify(req.token, process.env.SECRET);
      req.user = decodedToken;
    } catch (error) {
      return res.status(401).json({ error: 'token invalid' });
    }
  } else {
    req.user = null;
  }
  next();
};

module.exports = {
  tokenExtractor,
  userExtractor
};
