// src/pages/PredictionPage/utils/api.js
import axios from 'axios';

const API_BASE_URL = 'https://se-webdev-farming-1.onrender.com';

export const predictCropYield = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/predict`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Prediction failed');
  }
};

export const batchPredictCropYield = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${API_BASE_URL}/batch_predict`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Batch prediction failed');
  }
};