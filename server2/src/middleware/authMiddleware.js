const jwt = require('jsonwebtoken');
const db = require('../config/db');
const privateKey = process.env.PRIVATEKEY;

// Middleware to verify user authentication
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ TokenError: 'Not authenticated, please login' });
  }

  jwt.verify(token, privateKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ TokenIncorrectError: 'Token is not correct' });
    } else {
      // If verification is successful, store the user_id in the request object
      req.user_id = decoded.user_id;
      next();
    }
  });
};

module.exports = {
  verifyUser,
};
