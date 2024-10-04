import React from 'react';
import { useDrag } from 'react-dnd';
import cropData from '../utils/cropData';
import './CropPanel.css';

function CropItem({ crop }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CROP',
    item: { type: 'CROP', id: crop.id, name: crop.name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className={`crop-item ${isDragging ? 'dragging' : ''}`}>
      <img src={crop.image} alt={crop.name} className="crop-icon" />
      <span className="crop-name">{crop.name}</span>
    </div>
  );
}

export default function CropPanel() {
  return (
    <div className="crop-panel">
      <h2 className="crop-panel-title">Crop Types</h2>
      <div className="crop-grid">
        {cropData.map((crop) => (
          <CropItem key={crop.id} crop={crop} />
        ))}
      </div>
    </div>
  );
}
