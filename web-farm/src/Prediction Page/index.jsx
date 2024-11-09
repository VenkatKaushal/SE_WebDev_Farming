// src/pages/PredictionPage/index.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, LineChart, Title, Text } from '@tremor/react';
import { Leaf, Cloud, FileSpreadsheet, Loader2 } from 'lucide-react';
import PredictionForm from './components/PredictionForm';
import BatchUpload from './components/BatchUpload';
import WeatherInfo from './components/WeatherInfo';
import ResultsDisplay from './components/ResultsDisplay';
import { useWeather } from './hooks/useWeather';

const PredictionPage = () => {
  const [selectedState, setSelectedState] = useState('');
  const { weatherData, loading: weatherLoading } = useWeather(selectedState);
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStateChange = (state) => {
    setSelectedState(state);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex items-center justify-center space-x-4 mb-8">
          <Leaf className="h-12 w-12 text-green-600 animate-bounce" />
          <h1 className="text-4xl font-bold text-gray-800">Crop Yield Predictor</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <WeatherInfo 
              weatherData={weatherData} 
              loading={weatherLoading} 
            />
            <PredictionForm 
              onStateChange={handleStateChange}
              weatherData={weatherData}
              onPredictionResult={setPredictionResult}
              setIsLoading={setIsLoading}
            />
          </Card>

          <Card className="p-6">
            <BatchUpload 
              onPredictionResult={setPredictionResult}
              setIsLoading={setIsLoading}
            />
          </Card>
        </div>

        {predictionResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <ResultsDisplay result={predictionResult} />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default PredictionPage;