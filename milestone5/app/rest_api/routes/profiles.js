const express = require("express");
const router = express.Router();

const ProfilesController = require("../controllers/profiles");
const checkAuth = require('../middleware/check-auth');


// Get list of all of user's profiles (ex. localhost:3000/profiles)
router.get('/', checkAuth, ProfilesController.getAllProfiles);

// Create new profile (ex. localhost:3000/profiles/new)
router.post('/new', checkAuth, ProfilesController.newProfile);

// Get specific profile data (ex. localhost:3000/profiles/johnnytest/1)
router.get('/:profilename/:profile_id', checkAuth, ProfilesController.getProfile);



module.exports = router;
