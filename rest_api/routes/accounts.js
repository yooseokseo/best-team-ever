const express = require("express");
const router = express.Router();

const AccountsController = require("../controllers/accounts");
const HistoryController = require('../controllers/history');
const checkAuth = require('../middleware/check-auth');


// Get list of all usernames
router.get('/', AccountsController.getAllAccounts);

// Signup
router.post('/signup', AccountsController.signup);

// Login
router.post('/login', AccountsController.login);

// Get user's account info
router.get('/info', checkAuth, AccountsController.getAccountInfo);

// Edit specific account
router.patch('/edit/', checkAuth, AccountsController.editAccount);

// Delete specific account
router.delete('/delete/', checkAuth, AccountsController.deleteAccount);

// Get an account's entire medicine history 
router.get('/history', checkAuth, HistoryController.getAccountHistory);



module.exports = router;
