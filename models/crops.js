// models/Crop.js
const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    climate: { type: String, required: true },
    regions: [String], // Array of strings
    uses: { type: String, required: true },
    imageUrl: { type: String, required: true }
});

module.exports = mongoose.model('crops', cropSchema);
