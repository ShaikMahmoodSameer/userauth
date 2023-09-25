const db = require('../config/db');

// Get user data (protected route)
const getUserData = (req, res) => {
  const user_id = req.user_id;

  // Fetch user data from the database
  const sql = 'SELECT user_id, name, email FROM users WHERE user_id = ?';
  db.query(sql, [user_id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error fetching user data from the database' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return user data
    const userData = results[0];
    return res.json(userData);
  });
};

module.exports = {
  getUserData,
};
