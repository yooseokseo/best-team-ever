const express = require("express");
const router = express.Router();

const ProfilesController = require("../controllers/profiles");
const checkAuth = require('../middleware/check-auth');


// Get list of all of user's profiles (ex. localhost:3000/profiles)
router.get('/', checkAuth, ProfilesController.getAllProfiles);

// Create new profile (ex. localhost:3000/profiles/new)
router.post('/new', checkAuth, ProfilesController.newProfile);

// Get specific profile data (ex. localhost:3000/profiles/johnnytest/1)
router.get('/:profile_id', checkAuth, ProfilesController.getProfile);

// Same as above; use token as ID params (ex. localhost:3000/profiles/info)
router.get('/info', checkAuth, ProfilesController.getProfile);

// Edit specific profile (ex. localhost:3000/profiles/edit/2)
router.patch('/edit/:profile_id', checkAuth, ProfilesController.editProfile);

// Delete specific profile (ex. localhost:3000/profiles/delete/2)
router.delete('/delete/:profile_id', checkAuth, ProfilesController.deleteProfile);



module.exports = router;
