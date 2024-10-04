import React, { useState } from 'react';
import SimulationCanvas from './SimulationCanvas';
import {useSimulationData} from  '../hooks/useSimulationData';


export default function CropSimulator() {
  const [simulationData, addToSimulation] = useSimulationData();

  return (
    <div className="crop-simulator">
      <SimulationCanvas addToSimulation={addToSimulation} />
      {
      console.log("growing plant")
      }
    </div>
  );
}
