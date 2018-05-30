const express = require("express");
const router = express.Router();

const ProfilesController = require('../controllers/profiles');
const MedsController = require('../controllers/medicine');
const HistoryController = require('../controllers/history');


const checkAuth = require('../middleware/check-auth');


// Get list of all of user's profiles (ex. localhost:3000/profiles)
router.get('/', checkAuth, ProfilesController.getAllProfiles);


// Create new profile (ex. localhost:3000/profiles/new)
router.post('/new', checkAuth, ProfilesController.newProfile);



router.get('/current', checkAuth,
			ProfilesController.getCurrent, HistoryController.getProfileHistory);

// Get specific profile data (ex. localhost:3000/profiles/1)
router.get('/:profile_id', checkAuth, 
	        ProfilesController.getProfile, HistoryController.getProfileHistory);


// Edit specific profile (ex. localhost:3000/profiles/edit/2)
router.patch('/edit/:profile_id', checkAuth, ProfilesController.editProfile);


// Delete specific profile (ex. localhost:3000/profiles/delete/2)
router.delete('/delete/:profile_id', checkAuth, ProfilesController.deleteProfile);


// Get all profile's medicine (ex. localhost:3000/medicine)
router.get('/:profile_id/medicine', checkAuth, MedsController.getAllMedicine);


module.exports = router;
