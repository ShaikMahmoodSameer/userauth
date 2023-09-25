const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Logout
router.get('/logout', authController.logout);

// User data (protected route)
router.get('/user', authMiddleware.verifyUser, userController.getUserData);

module.exports = router;



// const db = require('../config/db');

// // Example query
// db.query('SELECT * FROM users', (error, results) => {
//   if (error) {
//     console.error('Database error:', error);
//     // Handle the error appropriately
//   } else {
//     // Process the results
//     console.log('Query results:', results);
//   }
// });

