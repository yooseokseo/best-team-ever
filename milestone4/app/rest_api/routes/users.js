const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");
const checkAuth = require('../middleware/check-auth');

//GET a list of all usernames
router.get('/', UsersController.getAll);

// GET a certain user's info (ex. username, password, etc.)
router.get('/:username', UsersController.getUserInfo);

// GET a list all of a user's profile
router.get('/:username/profiles', UsersController.getAllProfiles);

// GET profile data for a user
router.get('/:username/:profilename', UsersController.getProfile);


router.post('/signup', UsersController.signUp);

router.post('/testauth', checkAuth, UsersController.testauth);

//how to use auth
//router.delete("/:userId", checkAuth, UserController.user_delete);

module.exports = router;
