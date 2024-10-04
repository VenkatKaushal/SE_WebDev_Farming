import React from 'react';
import { useDrag } from 'react-dnd';
import soilData from '../utils/soilData';
import './SoilPanel.css';

function SoilItem({ soil }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'SOIL',
    item: { type: 'SOIL', id: soil.id, name: soil.name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className={`soil-item ${isDragging ? 'dragging' : ''}`}>
      <img src={soil.image} alt={soil.name} className="soil-icon" />
      <span className="soil-name">{soil.name}</span>
    </div>
  );
}


export default function SoilPanel() {
  return (
    <div className="soil-panel">
      <h2 className="soil-panel-title">Soil Types</h2>
      <div className="soil-grid">
        {soilData.map((soil) => (
          <SoilItem key={soil.id} soil={soil} />
        ))}
      </div>
    </div>
  );
}
