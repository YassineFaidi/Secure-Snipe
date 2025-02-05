const express = require('express');
const { getProjects } = require('../controllers/projectController');

const router = express.Router();

// Route to get projects
router.get('/', getProjects);

module.exports = router;
