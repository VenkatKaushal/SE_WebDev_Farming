import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PredictionPage.css';
import SeasonSelector from './SeasonSelector';

const BACKEND_URL = 'https://se-webdev-farming-1.onrender.com';

const PredictionPage = () => {
    const navigate = useNavigate();
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
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState(null);

    // Validate all form fields
    const validateFields = () => {
        const newErrors = {};
        
        // Check for empty fields
        Object.entries(formData).forEach(([key, value]) => {
            if (!value || value.trim() === '') {
                newErrors[key] = 'This field is required';
            }
        });

        // Validate numeric fields
        const numericFields = ['production', 'rainfall', 'fertilizer', 'pesticide'];
        numericFields.forEach(field => {
            if (formData[field] && !isNaN(formData[field])) {
                const value = parseFloat(formData[field]);
                if (value < 0) {
                    newErrors[field] = 'Value cannot be negative';
                }
            } else if (formData[field]) {
                newErrors[field] = 'Please enter a valid number';
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Clear error when field is modified
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));

        // Update form data
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear general form error
        setFormError(null);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate fields before submission
        if (!validateFields()) {
            setFormError('Please correct the errors before submitting.');
            return;
        }

        setIsLoading(true);
        setFormError(null);

        try {
            // Prepare payload with proper type conversion
            const payload = {
                Crop: formData.crop,
                Season: formData.season,
                State: formData.state,
                Annual_Rainfall: parseFloat(formData.rainfall),
                Production: parseFloat(formData.production),
                Fertilizer: parseFloat(formData.fertilizer),
                Pesticide: parseFloat(formData.pesticide),
            };

            // Make API request
            const response = await axios.post(`${BACKEND_URL}/predict`, payload);
            
            if (response.data.success) {
                // Navigate to results page with prediction and input data
                navigate('/results', {
                    state: {
                        prediction: response.data.predicted_yield,
                        input_data: formData
                    }
                });
            } else {
                setFormError(response.data.error || 'An error occurred while processing your request.');
            }
        } catch (error) {
            console.error('Prediction error:', error);
            
            // Handle different types of errors
            if (error.response) {
                // Server responded with an error
                setFormError(error.response.data.error || 'Server error occurred. Please try again.');
            } else if (error.request) {
                // Request made but no response received
                setFormError('Unable to reach the server. Please check your internet connection.');
            } else {
                // Something else went wrong
                setFormError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Handle reset form
    const handleReset = () => {
        setFormData({
            crop: '',
            season: '',
            state: '',
            production: '',
            rainfall: '',
            fertilizer: '',
            pesticide: '',
        });
        setErrors({});
        setFormError(null);
    };

    return (
        <div className="bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-6 text-center">Crop Yield Prediction</h1>
                {formError && (
                    <div className="max-w-md mx-auto mb-4">
                        <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{formError}</p>
                    </div>
                )}
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
                            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                                errors.crop ? 'border-red-500' : 'border-gray-300'
                            }`}
                            required
                        >
                            <option value="">Select Crop</option>
                            <option value="Wheat">Wheat</option>
                            <option value="Rice">Rice</option>
                            <option value="Maize">Maize</option>
                            <option value="Cotton">Cotton</option>
                            <option value="Sugarcane">Sugarcane</option>
                        </select>
                        {errors.crop && <p className="text-red-500 text-xs italic mt-1">{errors.crop}</p>}
                    </div>

                    {/* Season Selector */}
                    <SeasonSelector
                        selectedSeason={formData.season}
                        onChange={handleChange}
                    />
                    {errors.season && <p className="text-red-500 text-xs italic mt-1">{errors.season}</p>}

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
                            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                                errors.state ? 'border-red-500' : 'border-gray-300'
                            }`}
                            required
                        >
                            <option value="">Select State</option>
                            <option value="Assam">Assam</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Meghalaya">Meghalaya</option>
                        </select>
                        {errors.state && <p className="text-red-500 text-xs italic mt-1">{errors.state}</p>}
                    </div>

                    {/* Numeric Inputs */}
                    {['production', 'moisture', 'fertilizer', 'pesticide'].map((field) => (
                        <div key={field} className="field-container">
                            <label className="block text-sm font-medium text-gray-700">
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                                <span className="tooltip-icon" data-tooltip={`Enter the amount of ${field}`}>i</span>
                            </label>
                            <input
                                type="number"
                                name={field=='moisture' ? 'rainfall' : field}
                                value={formData[field]}
                                onChange={handleChange}
                                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                                    errors[field] ? 'border-red-500' : 'border-gray-300'
                                }`}
                                step="0.01"
                                required
                            />
                            {errors[field] && <p className="text-red-500 text-xs italic mt-1">{errors[field]}</p>}
                        </div>
                    ))}

                    <div className="flex justify-between space-x-4">
                        <button
                            type="button"
                            onClick={handleReset}
                            className="py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                            Reset
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            onClick={handleSubmit}
                            className={`py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
                            }`}
                        >
                            {isLoading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Predicting...
                                </span>
                            ) : (
                                'Predict Yield'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PredictionPage;