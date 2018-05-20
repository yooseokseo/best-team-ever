const express = require("express");
const router = express.Router();

const AccountsController = require("../controllers/accounts");
const checkAuth = require('../middleware/check-auth');


// Get list of all usernames (ex. localhost:3000/accounts)
router.get('/', AccountsController.getAllAccounts);

// Signup (ex. localhost:3000/accounts/signup)
router.post('/signup', AccountsController.signup);

// Login (ex. localhost:3000/accounts/login)
router.post('/login', AccountsController.login);

// Get user's account info (ex. localhost:3000/accounts/info)
router.get('/info', checkAuth, AccountsController.getAccountInfo);

// Edit specific account (ex. localhost:3000/accounts/edit)
router.patch('/edit/', checkAuth, AccountsController.editAccount);

// Delete specific account (ex. localhost:3000/profiles/delete)
router.delete('/delete/', checkAuth, AccountsController.deleteAccount);




module.exports = router;
