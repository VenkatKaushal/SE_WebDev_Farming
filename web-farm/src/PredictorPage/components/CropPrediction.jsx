import React, { useState } from 'react';
import PredictionCanvas from './PredictionCanvas';
import {usePredictionData} from  '../hooks/usePredictionData';


export default function CropSimulator() {
  const [PredictionData, addToPrediction] = usePredictionData();

  return (
    <div className="crop-simulator">
      <PredictionCanvas addToPrediction={addToPrediction} />
      {
      console.log("growing plant")
      }
    </div>
  );
}
