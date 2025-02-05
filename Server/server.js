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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
