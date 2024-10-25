// controllers/cropController.js

const Crop = require('../models/crops');

// @desc Get all crops
// @route GET /api/crops
// @access Public
const getAllCrops = async (req, res) => {
    try {
        const crops = await Crop.find();
        res.status(200).json(crops);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching crops', error });
    }
};

// @desc Get a single crop by ID
// @route GET /api/crops/:id
// @access Public
const getCropById = async (req, res) => {
    try {
        const crop = await Crop.findById(req.params.id);
        if (!crop) {
            return res.status(404).json({ message: 'Crop not found' });
        }
        res.status(200).json(crop);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching crop', error });
    }
};

// @desc Add a new crop
// @route POST /api/crops
// @access Private (If authentication required, add middleware)
// Note: Validation should be handled before saving data.
const addCrop = async (req, res) => {
    try {
        const newCrop = new Crop(req.body);
        await newCrop.save();
        res.status(201).json(newCrop);
    } catch (error) {
        res.status(400).json({ message: 'Error adding crop', error });
    }
};

// @desc Update a crop by ID
// @route PUT /api/crops/:id
// @access Private
const updateCrop = async (req, res) => {
    try {
        const updatedCrop = await Crop.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedCrop) {
            return res.status(404).json({ message: 'Crop not found' });
        }
        res.status(200).json(updatedCrop);
    } catch (error) {
        res.status(400).json({ message: 'Error updating crop', error });
    }
};

// @desc Delete a crop by ID
// @route DELETE /api/crops/:id
// @access Private
const deleteCrop = async (req, res) => {
    try {
        const deletedCrop = await Crop.findByIdAndDelete(req.params.id);
        if (!deletedCrop) {
            return res.status(404).json({ message: 'Crop not found' });
        }
        res.status(200).json({ message: 'Crop deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting crop', error });
    }
};

module.exports = {
    getAllCrops,
    getCropById,
    addCrop,
    updateCrop,
    deleteCrop,
};
