const db = require('../config/db');

// Create a new user in the database
const createUser = (name, email, password, callback) => {
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, password], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
};

// Find a user by email
const findUserByEmail = (email, callback) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    if (results.length === 0) {
      return callback(null, null); // User not found
    }
    return callback(null, results[0]);
  });
};

module.exports = {
  createUser,
  findUserByEmail,
};
