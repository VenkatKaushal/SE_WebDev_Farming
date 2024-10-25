// controllers/cropController.js

// const crops = require('../models/crops');
const crops = require('../models/crops'); // Adjust the path based on your structure

// @desc Get all crops
// @route GET /api/crops
// @access Public
exports.getMultipleCrops = async (req, res) => {
        // console.log("yes");
    try {
        // Fetch all crops from the database
        const crops1 = await crops.find(); 
     // This returns all documents in the crops collection
     console.log("Crops Retrieved:", crops1); 
     
        res.status(200).json(crops1);
     // Send the crops data as JSON
    } catch (error) {
        // Handle any errors during the fetching process
        res.status(500).json({ message: 'Error fetching crops', error });
    }
};

// Export the function to use it in your routes
// module.exports = {
//    getMultipleCrops,
// };
