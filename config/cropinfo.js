// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Crop = require('../models/crops.js');

// Connect to MongoDB
mongoose.connect(process.env.CROP_DB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Seed Data for Crops
const seedCrops = async () => {
    const crops = [
        {
            name: "Rice",
            type: "Kharif Crop (Monsoon crop)",
            climate: "Hot and humid, temperatures 20°C to 35°C, requires ample water.",
            regions: ["West Bengal", "Uttar Pradesh", "Punjab", "Tamil Nadu", "Andhra Pradesh", "Bihar", "Assam"],
            uses: "Staple food in many forms such as boiled rice, biryani, dosa.",
            imageUrl: "Rice.jpg"
        },
        {
            name: "Wheat",
            type: "Rabi Crop (Winter crop)",
            climate: "Cool weather, temperatures 10°C to 25°C.",
            regions: ["Punjab", "Haryana", "Uttar Pradesh", "Madhya Pradesh", "Rajasthan", "Bihar"],
            uses: "Ground into flour to make chapati, bread, and pasta.",
            imageUrl: "wheat.jpg"
        },
        {
            name: "Sugarcane",
            type: "Perennial Crop",
            climate: "Tropical to subtropical, temperatures 21°C to 27°C, needs abundant water.",
            regions: ["Uttar Pradesh", "Maharashtra", "Karnataka", "Tamil Nadu", "Andhra Pradesh"],
            uses: "Produces sugar, jaggery, ethanol, and molasses, also used in biofuel.",
            imageUrl: "Sugarcane.jpg"
        },
        {
            name: "Maize (Corn)",
            type: "Kharif and Rabi Crop",
            climate: "Optimal temperatures 21°C to 27°C, grows in diverse conditions.",
            regions: ["Andhra Pradesh", "Karnataka", "Madhya Pradesh", "Bihar", "Rajasthan"],
            uses: "Used for food, animal feed, industrial starch, and biofuels.",
            imageUrl: "maize.jpg"
        },
        {
            name: "Pigeon Peas (Arhar/Tur)",
            type: "Kharif Crop",
            climate: "Thrives in warm climates, temperatures around 20°C to 30°C.",
            regions: ["Maharashtra", "Uttar Pradesh", "Madhya Pradesh", "Karnataka"],
            uses: "Used in Indian dal recipes, an important source of protein.",
            imageUrl: "Pigeon Peas.jpg"
        },
        {
            name: "Chickpeas (Chana)",
            type: "Rabi Crop",
            climate: "Grows well in cool, dry conditions, temperatures between 10°C to 25°C.",
            regions: ["Madhya Pradesh", "Rajasthan", "Maharashtra", "Uttar Pradesh"],
            uses: "Used in curries, hummus, and ground into flour (besan).",
            imageUrl: "chickpeas.jpg"
        },
        {
            name: "Mung Beans (Moong)",
            type: "Kharif Crop",
            climate: "Requires warm weather, temperatures between 25°C to 35°C.",
            regions: ["Rajasthan", "Maharashtra", "Karnataka", "Andhra Pradesh"],
            uses: "Used in sprouts, dals, and desserts like moong dal halwa.",
            imageUrl: "Mung beans.jpg"
        },
        {
            name: "Cotton",
            type: "Kharif Crop",
            climate: "Requires warm temperatures between 21°C to 30°C.",
            regions: ["Gujarat", "Maharashtra", "Telangana", "Andhra Pradesh"],
            uses: "Primarily for textile production and cottonseed oil.",
            imageUrl: "Cotton.jpg"
        },
        {
            name: "Groundnut (Peanut)",
            type: "Kharif Crop",
            climate: "Warm temperatures between 20°C to 30°C.",
            regions: ["Gujarat", "Andhra Pradesh", "Tamil Nadu", "Karnataka"],
            uses: "Peanut oil, roasted peanuts, and confectionery products.",
            imageUrl: "Peanut.jpg"
        },
        {
            name: "Mustard",
            type: "Rabi Crop",
            climate: "Grows best in cool climates, temperatures between 10°C to 25°C.",
            regions: ["Rajasthan", "Haryana", "Madhya Pradesh", "Uttar Pradesh"],
            uses: "Mustard oil, seeds used as spices, mustard greens.",
            imageUrl: "Mustard.jpg"
        },
        {
            name: "Jowar (Sorghum)",
            type: "Kharif Crop",
            climate: "Thrives in dry conditions, temperatures between 20°C to 30°C.",
            regions: ["Maharashtra", "Karnataka", "Gujarat", "Rajasthan"],
            uses: "Used in bhakri, porridge, and fermented beverages.",
            imageUrl: "Jowar.jpg"
        },
        {
            name: "Bajra (Pearl Millet)",
            type: "Kharif Crop",
            climate: "Requires warm weather, drought-resistant.",
            regions: ["Rajasthan", "Uttar Pradesh", "Maharashtra"],
            uses: "Used for flatbreads, porridge, and animal fodder.",
            imageUrl: "Bajra.jpg"
        },
        {
            name: "Barley",
            type: "Rabi Crop",
            climate: "Requires cool temperatures, around 10°C to 20°C.",
            regions: ["Rajasthan", "Haryana", "Uttar Pradesh"],
            uses: "Used in soups, salads, brewing beer, and animal feed.",
            imageUrl: "barley.jpg"
        },
        {
            name: "Tea",
            type: "Perennial Crop",
            climate: "Requires warm and humid conditions, optimal temperatures 15°C to 30°C.",
            regions: ["Assam", "West Bengal", "Tamil Nadu", "Kerala"],
            uses: "Used for making tea, a popular beverage worldwide.",
            imageUrl: "Tea.jpg"
        }
    ];

    await Crop.insertMany(crops);
    console.log('Data seeded successfully');
    mongoose.connection.close();
};

// Seed the database
seedCrops();
