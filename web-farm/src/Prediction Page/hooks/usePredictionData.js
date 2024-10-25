import { useState } from 'react';

export function usePredictionData() {
  const [PredictionData, setPredictionData] = useState([]);

  const addToPrediction = (item, position) => {
    setPredictionData((prev) => [
      ...prev,
      { ...item, position }
    ]);
  };

  return [PredictionData, addToPrediction];
}
