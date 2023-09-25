const mysql = require('mysql');
require('dotenv').config(); // Load environment variables from .env file

// Create a MySQL database connection pool
const pool = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: '',
  database: process.env.DB_DATABASE,
  connectionLimit: 10, // Adjust this based on your needs
});

// Export the database pool to be used in other modules
module.exports = pool;
