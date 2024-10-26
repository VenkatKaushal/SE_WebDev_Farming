const express = require('express');
const router = express.Router();
const uploads = require('../middleware/upload'); 
const {getMultipleCrops}  = require('../controller/cropController');

// console.log("In the route filr");
router.get('/crops',uploads.single('image'), getMultipleCrops);

module.exports = router;