const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");
const checkAuth = require('../middleware/check-auth');

//GET a list of all usernames
router.get('/', UsersController.getAllUsers);

// POST request to signup
router.post('/signup', UsersController.signup);

// POST request to login
router.post('/login', UsersController.login);

// GET a certain user's info (ex. username, password, etc.)
router.get('/:username', checkAuth, UsersController.getUserInfo);

// GET a list all of a user's profile
router.get('/:username/profiles', checkAuth, UsersController.getAllProfiles);

// GET profile data for a user
router.get('/:username/:profilename', checkAuth, UsersController.getProfile);



router.post('/testauth', checkAuth, UsersController.testauth);

//how to use auth
//router.delete("/:userId", checkAuth, UserController.user_delete);

module.exports = router;
