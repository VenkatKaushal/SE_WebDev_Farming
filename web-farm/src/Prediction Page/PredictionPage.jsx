import React, { useState } from 'react';
import axios from 'axios';
import './PredictionPage.css';

const BACKEND_URL = 'https://se-webdev-farming-1.onrender.com'; // Your Flask backend URL

const PredictionPage = () => {
    const [formData, setFormData] = useState({
        crop: '',
        season: '',
        state: '',
        production: '',
        rainfall: '',
        fertilizer: '',
        pesticide: '',
    });
    const [errors, setErrors] = useState({});
    const [predictionResult, setPredictionResult] = useState(null);

    const validateFields = () => {
        const newErrors = {};
        Object.entries(formData).forEach(([key, value]) => {
            if (!value) newErrors[key] = 'This field is required';
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateFields()) return;

        try {
            // Retrieve temperature and rainfall from the Weather API
            const weatherResponse = await axios.get('https://api.weatherapi.com/v1/forecast.json', {
                params: {
                    key: '52222cec90736fcd551231f1080d5190',
                    q: formData.state,
                },
            });
            const temperature = weatherResponse.data.current.temp_c;
            const avgRainfall = weatherResponse.data.forecast.forecastday[0].day.totalprecip_mm;

            // Prepare data to send to backend
            const payload = {
                Crop: formData.crop,
                Season: formData.season,
                State: formData.state,
                Production: parseFloat(formData.production),
                Annual_Rainfall: parseFloat(formData.rainfall || avgRainfall),
                Fertilizer: parseFloat(formData.fertilizer),
                Pesticide: parseFloat(formData.pesticide),
                Temperature: temperature,
            };

            // Send data to Flask backend
            const response = await axios.post(`${BACKEND_URL}/predict`, payload);  // Use the backend URL
            if (response.data.success) {
                setPredictionResult(response.data.predicted_yield);
            } else {
                alert(response.data.error || 'An error occurred during prediction');
            }
        } catch (error) {
            console.error('Error fetching weather data or submitting prediction:', error);
            alert('Failed to get prediction or weather data.');
        }
    };

    return (
        <div className="bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-6 text-center">Crop Yield Prediction</h1>
                <form className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 space-y-4" onSubmit={handleSubmit}>
                    
                    {/* Crop Dropdown */}
                    <div className="field-container">
                        <label className="block text-sm font-medium text-gray-700">
                            Crop
                            <span className="tooltip-icon" data-tooltip="The type of crop you are predicting for.">i</span>
                        </label>
                        <select
                            name="crop"
                            value={formData.crop}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        >
                            <option value="">Select Crop</option>
                            <option value="Wheat">Wheat</option>
                            <option value="Rice">Rice</option>
                            <option value="Maize">Maize</option>
                            <option value="Cotton">Cotton</option>
                            <option value="Sugarcane">Sugarcane</option>
                        </select>
                        {errors.crop && <p className="text-red-500 text-xs italic">{errors.crop}</p>}
                    </div>

                    {/* Season Dropdown */}
                    <div className="field-container">
                        <label className="block text-sm font-medium text-gray-700">
                            Season
                            <span className="tooltip-icon" data-tooltip="The season in which the crop is grown.">i</span>
                        </label>
                        <select
                            name="season"
                            value={formData.season}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        >
                            <option value="">Select Season</option>
                            <option value="Kharif">Kharif</option>
                            <option value="Rabi">Rabi</option>
                            <option value="Whole Year">Whole Year</option>
                            <option value="Summer">Summer</option>
                            <option value="Winter">Winter</option>
                            <option value="Autumn">Autumn</option>
                        </select>
                        {errors.season && <p className="text-red-500 text-xs italic">{errors.season}</p>}
                    </div>

                    {/* State Dropdown */}
                    <div className="field-container">
                        <label className="block text-sm font-medium text-gray-700">
                            State
                            <span className="tooltip-icon" data-tooltip="The state where the crop is being grown.">i</span>
                        </label>
                        <select
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        >
                            <option value="">Select State</option>
                            <option value="Assam">Assam</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Meghalaya">Meghalaya</option>
                        </select>
                        {errors.state && <p className="text-red-500 text-xs italic">{errors.state}</p>}
                    </div>

                    {/* Numeric Inputs */}
                    {['production', 'rainfall', 'fertilizer', 'pesticide'].map((field) => (
                        <div key={field} className="field-container">
                            <label className="block text-sm font-medium text-gray-700">
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                                <span className="tooltip-icon" data-tooltip={`Enter the amount of ${field}`}>i</span>
                            </label>
                            <input
                                type="number"
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                step="0.01"
                                required
                            />
                            {errors[field] && <p className="text-red-500 text-xs italic">{errors[field]}</p>}
                        </div>
                    ))}

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
                        >
                            Predict Yield
                        </button>
                    </div>
                </form>

                {predictionResult && (
                    <div className="mt-8 bg-white p-6 rounded-lg shadow-md text-center">
                        <h2 className="text-2xl font-bold text-indigo-600">Predicted Yield</h2>
                        <p className="text-3xl font-semibold mt-4">{predictionResult} units per area</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PredictionPage;
