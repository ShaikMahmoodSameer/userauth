const app = require('./app'); // Import the Express app from app.js
const port = process.env.PORT || 8081;

// Start the server
app.listen(port, () => {
    console.log(`Server app running on port ${port}`);
});
