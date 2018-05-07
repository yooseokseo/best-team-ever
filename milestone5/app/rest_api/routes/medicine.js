const express = require("express");
const router = express.Router();

const MedsController = require("../controllers/medicine");
const checkAuth = require('../middleware/check-auth');


// Get all profile's medicine (ex. localhost:3000/medicine)
router.get('/', checkAuth, MedsController.getAllMedicine);

// Create new medicine (ex. localhost:3000/medicine/new)
router.post('/new', checkAuth, MedsController.newMedicine);

// Get specific medicine data (ex. localhost:3000/medicine/vitaminC/2)
router.get('/:medicinename/:medicine_id', checkAuth, MedsController.getMedicine);


router.patch('/edit/:medicinename/:medicine_id', checkAuth, MedsController.editMedicine);



module.exports = router;
