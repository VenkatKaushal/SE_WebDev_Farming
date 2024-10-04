import React, { useState } from 'react';
import CropPanel from './CropPanel'; 
import SoilPanel from './SoilPanel';
import './SidePanel.css';

export default function SidePanel() {
  const [temperature, setTemperature] = useState(20);
  const [rainfall, setRainfall] = useState(100);
  const [nutrients, setNutrients] = useState({ N: 10, P: 5, K: 8 });

  return (
    <div className="side-panel">
      <h3>Prediction Controls</h3>

      <div className="mb-4">
        <label>Temperature (°C)</label>
        <input
          type="range"
          min="0"
          max="50"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          className="w-full"
        />
        <span>{temperature}°C</span>
      </div>

      <div className="mb-4">
        <label>Rainfall (mm)</label>
        <input
          type="range"
          min="0"
          max="500"
          value={rainfall}
          onChange={(e) => setRainfall(e.target.value)}
          className="w-full"
        />
        <span>{rainfall}mm</span>
      </div>

      <div className="mb-4">
        <label>Nutrients (N, P, K)</label>
        <div className="flex gap-2">
          {['N', 'P', 'K'].map((nutrient) => (
            <div key={nutrient}>
              <label>{nutrient}</label>
              <input
                type="number"
                value={nutrients[nutrient]}
                onChange={(e) =>
                  setNutrients({ ...nutrients, [nutrient]: e.target.value })
                }
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>
      <CropPanel />
      <SoilPanel />
    </div>
  );
}
