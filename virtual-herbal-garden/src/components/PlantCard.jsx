import React from 'react';
import { Link } from 'react-router-dom';
import './PlantCard.css';

function PlantCard({ plant }) {
  return (
    <div className="plant-card">
      <img src={plant.image} alt={plant.name} />
      <h3>{plant.name}</h3>
      <Link to={`/plant/${plant.id}`}>Learn More</Link>
    </div>
  );
}

export default PlantCard;
