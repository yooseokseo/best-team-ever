const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const UsersController = require("../controllers/users");

//GET a list of all usernames
router.get('/', UsersController.getAll);

// GET profile data for a user
router.get('/:userID', UsersController.getUser);

module.exports = router;
