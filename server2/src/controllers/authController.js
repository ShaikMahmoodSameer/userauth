const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const privateKey = process.env.PRIVATEKEY;
const saltRounds = 10;

// Register a new user
const register = (req, res) => {
  const { name, email, password } = req.body;

  // Hash the user's password
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: 'Error hashing password' });
    }

    // Insert the user into the database
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, hash], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Error inserting user into the database' });
      }
      return res.json({ status: 'Success' });
    });
  });
};

// Login a user
const login = (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (error, data) => {
    if (error) {
      return res.status(500).json({ error: 'Login Error in Server' });
    }

    if (data.length === 0) {
      return res.status(401).json({ error: `User with email ${email} doesn't exist` });
    }

    // Compare passwords
    bcrypt.compare(password, data[0].password, (err, response) => {
      if (err || !response) {
        return res.status(401).json({ error: 'Password mismatch. Try again' });
      }

      // Generate and send a JWT token
      const user_id = data[0].user_id;
      const token = jwt.sign({ user_id }, privateKey, { expiresIn: '1h' });
      res.cookie('token', token);
      return res.json({ status: 'Success', user_id: user_id });
    });
  });
};

// Logout a user
const logout = (req, res) => {
  res.clearCookie('token');
  return res.json({ status: 'Success' });
};

module.exports = {
  register,
  login,
  logout,
};
