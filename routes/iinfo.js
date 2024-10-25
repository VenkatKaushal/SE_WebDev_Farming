const express = require('express');
const router = express.Router();
const {getMultipleCrops}  = require('../controller/cropController');

// console.log("In the route filr");
router.get('/crops', getMultipleCrops);

module.exports = router;