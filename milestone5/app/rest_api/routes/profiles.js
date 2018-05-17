const express = require("express");
const router = express.Router();

const ProfilesController = require("../controllers/profiles");
const MedsController = require("../controllers/medicine");

const checkAuth = require('../middleware/check-auth');


// Get list of all of user's profiles (ex. localhost:3000/profiles)
router.get('/', checkAuth, ProfilesController.getAllProfiles);


// Create new profile (ex. localhost:3000/profiles/new)
router.post('/new', checkAuth, ProfilesController.newProfile);


// GEt default profile (ex. localhost:3000/profiles/default)
router.get('/default', checkAuth, 
	        ProfilesController.getDefault, MedsController.getAllMedicine);


router.get('/current', checkAuth,
			ProfilesController.getCurrent, MedsController.getAllMedicine);

// Get specific profile data (ex. localhost:3000/profiles/johnnytest/1)
router.get('/:profile_id', checkAuth, 
	        ProfilesController.getProfile, MedsController.getAllMedicine);


// Edit specific profile (ex. localhost:3000/profiles/edit/2)
router.patch('/edit/:profile_id', checkAuth, ProfilesController.editProfile);


// Delete specific profile (ex. localhost:3000/profiles/delete/2)
router.delete('/delete/:profile_id', checkAuth, ProfilesController.deleteProfile);

// Get all profile's medicine (ex. localhost:3000/medicine)
router.get('/:profile_id/medicine', checkAuth, MedsController.getAllMedicine);



module.exports = router;
