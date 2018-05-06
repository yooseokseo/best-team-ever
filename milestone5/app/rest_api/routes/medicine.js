const express = require("express");
const router = express.Router();

const MedsController = require("../controllers/medicine");
const checkAuth = require('../middleware/check-auth');



// Get all profile's medicine (ex. localhost:3000/accounts/mrpeem/peem/medicine)
router.get('/', checkAuth, MedsController.getAllMedicine);

// Create new medicine (ex. localhost:3000/accounts/mrpeem/peem/medicine/new)
router.post('/new', checkAuth, MedsController.newMedicine);

// Get specific medicine data (ex. localhost:3000/accounts/mrpeem/peem/nyquil)
router.get('/:medicinename/:medicine_id', checkAuth, MedsController.getMedicine);



module.exports = router;
