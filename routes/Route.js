const express = require("express")
const router = express.Router();
const fs = require('fs');
const medicineRoute = require('./center.js') 

router.use(medicineRoute) 

module.exports = router;