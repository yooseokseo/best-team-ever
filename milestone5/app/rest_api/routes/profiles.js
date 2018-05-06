const express = require("express");
const router = express.Router();

const ProfilesController = require("../controllers/profiles");
const checkAuth = require('../middleware/check-auth');


// Get list of all of user's profiles (ex. localhost:3000/accounts/mrpeem/profiles)
router.get('/', checkAuth, ProfilesController.getAllProfiles);

// Create new profile (ex. localhost:3000/accounts/mrpeem/profiles/new)
router.post('/new', checkAuth, ProfilesController.newProfile);

// Get specific profile data (ex. localhost:3000/accounts/mrpeem/peem)
router.get('/:profilename', checkAuth, ProfilesController.getProfile);



module.exports = router;
