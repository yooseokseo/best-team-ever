const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

// Guo's code lists out the different types of requests and how to handle each one.
// Ex. app.get('/users/:userid', (req, res) => { ... });
//
// In this file, I listed ONLY the different of requests the file will handle and where
// to find the code for how to handle requests, but the actual code for handling requests
// is not in this file. 
//
// This approach allows you to quickly glance at requests that the file handles. The code for
// how to handle requests can be found in the corresponding functions (ex. "getAll" and "getUser")
// in rest_api/controllers/users.js


//GET a list of all usernames
router.get('/', UsersController.getAll);

// GET profile data for a user
router.get('/:userID', UsersController.getUser);

module.exports = router;
