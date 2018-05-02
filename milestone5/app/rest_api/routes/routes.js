const express = require("express");
const router = express.Router();

const AccountsController = require("../controllers/accounts");
const ProfilesController = require("../controllers/profiles");
const MedsController = require("../controllers/medicine");

const checkAuth = require('../middleware/check-auth');


//-------------------------------
//----account related requests---
//-------------------------------

// Get list of all usernames (ex. localhost:3000/users)
router.get('/', AccountsController.getAllAccounts);

// Signup (ex. clocalhost:3000/accounts/signup)
router.post('/signup', AccountsController.signup);

// Login (ex. localhost:3000/accounts/login)
router.post('/login', AccountsController.login);

// Get user's account info (ex. localhost:3000/accounts/mrpeem)
router.get('/:username', checkAuth, AccountsController.getAccountInfo);

//router.delete("/:username", checkAuth, UserController.user_delete);



//-------------------------------
//---profile related requests----
//-------------------------------

// Get list of all of user's profiles (ex. localhost:3000/accounts/mrpeem/profiles)
router.get('/:username/profiles', checkAuth, ProfilesController.getAllProfiles);

// Create new profile (ex. localhost:3000/accounts/mrpeem/profiles/new)
router.post('/:username/profiles/new', checkAuth, ProfilesController.newProfile);

// Get specific profile data (ex. localhost:3000/accounts/mrpeem/peem)
router.get('/:username/:profilename', checkAuth, ProfilesController.getProfile);



//-------------------------------
//---medicine related requests---
//-------------------------------

// Get all profile's medicine (ex. localhost:3000/accounts/mrpeem/peem/medicine)
router.get('/:username/:profilename/medicine', checkAuth, MedsController.getAllMedicine);

// Create new medicine (ex. localhost:3000/accounts/mrpeem/peem/medicine/new)
router.post('/:username/:profilename/medicine/new', checkAuth, MedsController.newMedicine);

// Get specific medicine data (ex. localhost:3000/accounts/mrpeem/peem/nyquil)
router.get('/:username/:profilename/:medicinename', checkAuth, MedsController.getMedicine);



module.exports = router;
