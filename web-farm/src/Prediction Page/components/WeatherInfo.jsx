// src/pages/PredictionPage/components/WeatherInfo.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Card, Text, Metric, AreaChart } from '@tremor/react';
import { Cloud, Droplet, Thermometer, Loader2 } from 'lucide-react';

const WeatherInfo = ({ weatherData, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!weatherData) {
    return (
      <Card className="bg-blue-50 p-4 mb-6">
        <Text className="text-center text-gray-600">
          Select a state to view weather information
        </Text>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <Card className="bg-gradient-to-br from-blue-50 to-green-50">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Thermometer className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <Text>Temperature</Text>
              <Metric>{weatherData.temperature}°C</Metric>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Droplet className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <Text>Rainfall</Text>
              <Metric>{weatherData.rainfall} mm</Metric>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default WeatherInfo;