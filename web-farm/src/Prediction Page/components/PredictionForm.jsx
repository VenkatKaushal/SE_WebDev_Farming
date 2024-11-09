// src/pages/PredictionPage/components/PredictionForm.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TextInput } from '@tremor/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../@/components/ui/select';
import { Button } from '../../../@/components/ui/button';
import { predictCropYield } from '../utils/api';

const PredictionForm = ({ onStateChange, weatherData, onPredictionResult, setIsLoading }) => {
  const [formData, setFormData] = useState({
    Crop: '',
    Season: '',
    State: '',
    Production: '',
    Annual_Rainfall: '',
    Fertilizer: '',
    Pesticide: ''
  });

  const crops = ['Rice', 'Wheat', 'Sugarcane', 'Cotton', 'Maize'];
  const seasons = ['Kharif', 'Rabi', 'Whole Year'];
  const states = ['Maharashtra', 'Karnataka', 'Madhya Pradesh', 'Punjab', 'Uttar Pradesh'];

  useEffect(() => {
    if (weatherData) {
      setFormData(prev => ({
        ...prev,
        Annual_Rainfall: weatherData.rainfall || prev.Annual_Rainfall
      }));
    }
  }, [weatherData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await predictCropYield(formData);
      onPredictionResult(result);
    } catch (error) {
      onPredictionResult({ success: false, error: error.message });
    }
    setIsLoading(false);
  };

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'State') {
      onStateChange(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Select 
          onValueChange={(value) => handleChange('Crop', value)}
          value={formData.Crop}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Crop" />
          </SelectTrigger>
          <SelectContent>
            {crops.map(crop => (
              <SelectItem key={crop} value={crop}>{crop}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => handleChange('Season', value)}
          value={formData.Season}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Season" />
          </SelectTrigger>
          <SelectContent>
            {seasons.map(season => (
              <SelectItem key={season} value={season}>{season}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Select
        onValueChange={(value) => handleChange('State', value)}
        value={formData.State}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select State" />
        </SelectTrigger>
        <SelectContent>
          {states.map(state => (
            <SelectItem key={state} value={state}>{state}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="grid grid-cols-2 gap-4">
        <TextInput
          type="number"
          placeholder="Production"
          value={formData.Production}
          onChange={(e) => handleChange('Production', e.target.value)}
        />
        <TextInput
          type="number"
          placeholder="Fertilizer (kg/ha)"
          value={formData.Fertilizer}
          onChange={(e) => handleChange('Fertilizer', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TextInput
          type="number"
          placeholder="Pesticide (kg/ha)"
          value={formData.Pesticide}
          onChange={(e) => handleChange('Pesticide', e.target.value)}
        />
        <TextInput
          type="number"
          placeholder="Annual Rainfall (mm)"
          value={formData.Annual_Rainfall}
          onChange={(e) => handleChange('Annual_Rainfall', e.target.value)}
          disabled={!!weatherData}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white"
      >
        Predict Yield
      </Button>
    </form>
  );
};

export default PredictionForm;