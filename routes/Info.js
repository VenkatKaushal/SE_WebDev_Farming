const express = require('express');
const router = express.Router();
const{
    getAllCrops,
    getCropById,
    addCrop,
    updateCrop,
    deleteCrop,
}  = require('../controller/cropController');
router.post('/crops', getAllCrops);

module.exports = router;