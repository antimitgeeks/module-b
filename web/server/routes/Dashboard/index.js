const express = require("express");

// Controllers for handling the language-related requests
const dashboardController = require("../../controllers/Dashboard/index"); 

// Initialize the router for handling the routes
const router = express.Router();

// Route to fetch a list of languages
router.post('/setup-guide', dashboardController.setupGuide);

// Export the router to be used in the main application
module.exports = router;
