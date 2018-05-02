const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");
const ProfilesController = require("../controllers/profiles");
const MedsController = require("../controllers/medicine");

const checkAuth = require('../middleware/check-auth');


//-------------------------------
//-----user related requests-----
//-------------------------------

// Get list of all usernames (ex. localhost:3000/users)
router.get('/', UsersController.getAllUsers);

// Signup (ex. clocalhost:3000/users/signup)
router.post('/signup', UsersController.signup);

// Login (ex. localhost:3000/users/login)
router.post('/login', UsersController.login);

// Get user's account info (ex. localhost:3000/users/mrpeem)
router.get('/:username', checkAuth, UsersController.getUserInfo);

//router.delete("/:username", checkAuth, UserController.user_delete);



//-------------------------------
//---profile related requests----
//-------------------------------

// Get list of all of user's profiles (ex. localhost:3000/users/mrpeem/profiles)
router.get('/:username/profiles', checkAuth, ProfilesController.getAllProfiles);

// Create new profile (ex. localhost:3000/users/mrpeem/profiles/new)
router.post('/:username/profiles/new', checkAuth, ProfilesController.newProfile);

// Get specific profile data (ex. localhost:3000/users/mrpeem/peem)
router.get('/:username/:profilename', checkAuth, ProfilesController.getProfile);



//-------------------------------
//---medicine related requests---
//-------------------------------

// Get all profile's medicine (ex. localhost:3000/users/mrpeem/peem/medicine)
router.get('/:username/:profilename/medicine', checkAuth, MedsController.getAllMedicine);

// Create new medicine (ex. localhost:3000/users/mrpeem/peem/medicine/new)
router.post('/:username/:profilename/medicine/new', checkAuth, MedsController.newMedicine);

// Get specific medicine data (ex. localhost:3000/users/mrpeem/peem/nyquil)
router.get('/:username/:profilename/:medicinename', checkAuth, MedsController.getMedicine);



module.exports = router;
