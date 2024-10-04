import { useState } from 'react';

export function useSimulationData() {
  const [simulationData, setSimulationData] = useState([]);

  const addToSimulation = (item, position) => {
    setSimulationData((prev) => [
      ...prev,
      { ...item, position }
    ]);
  };

  return [simulationData, addToSimulation];
}
