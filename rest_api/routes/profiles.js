const express = require("express");
const router = express.Router();

const ProfilesController = require('../controllers/profiles');
const MedsController = require('../controllers/medicine');
const HistoryController = require('../controllers/history');


const checkAuth = require('../middleware/check-auth');


// Get list of all of user's profiles
router.get('/', checkAuth, ProfilesController.getAllProfiles);


// Create new profile
router.post('/new', checkAuth, ProfilesController.newProfile);



router.get('/current', checkAuth,
			ProfilesController.getCurrent, HistoryController.getProfileHistory);

// Get specific profile data
router.get('/:profile_id', checkAuth, 
	        ProfilesController.getProfile, HistoryController.getProfileHistory);


// Edit specific profile
router.patch('/edit/:profile_id', checkAuth, ProfilesController.editProfile);


// Delete specific profile
router.delete('/delete/:profile_id', checkAuth, ProfilesController.deleteProfile);


// Get all profile's medicine
router.get('/:profile_id/medicine', checkAuth, MedsController.getAllMedicine);

// Get a profile's medicine history 
router.get('/:profile_id/history', checkAuth, HistoryController.getProfileHistory);


module.exports = router;
