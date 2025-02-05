const express = require('express');
const app = express();
const projectRoutes = require('./routes/projectRoutes');
const PORT = 3000;

// Middleware to allow cross-origin requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Use the project routes
app.use('/projects', projectRoutes);

// Export the app instead of listening here, so that it can be tested
module.exports = app;

// Start the server only if the script is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}