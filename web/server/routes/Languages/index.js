const express = require("express");

// Controllers for handling the language-related requests
const languageControllers = require("../../controllers/Language/index.js"); 

// Initialize the router for handling the routes
const router = express.Router();

// Route to fetch a list of languages
router.post('/list', languageControllers.languageList);

// Export the router to be used in the main application
module.exports = router;
