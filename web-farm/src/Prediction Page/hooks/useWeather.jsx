// src/pages/PredictionPage/hooks/useWeather.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const WEATHER_API_KEY = '52222cec90736fcd551231f1080d519'; // Replace with your API key

export const useWeather = (location) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!location) return;
      
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location},IN&units=metric&appid=${WEATHER_API_KEY}`
        );
        
        const { main: { temp }, rain } = response.data;
        setWeatherData({
          temperature: temp,
          rainfall: rain?.['1h'] || 0, // rainfall in last hour
        });
      } catch (err) {
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  return { weatherData, loading, error };
};