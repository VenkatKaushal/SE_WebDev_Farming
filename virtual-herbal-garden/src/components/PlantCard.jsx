import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PlantCard.css';

const PlantCard = ({ plant }) => {
  const navigate = useNavigate();  

  const handleClick = () => {
    navigate(`/plant/${plant.id}`);  
  };

  return (
    <div className="plant-card" onClick={handleClick}>
      <div className="plant-card-img-container">
        <img src={plant.image_url} alt={plant.common_name} className="plant-card-img" />
        <div className="plant-card-overlay">
          <p className="plant-card-description">{plant.description}</p>
        </div>
      </div>
      <div className="plant-card-info">
        <h3 className="plant-card-name">{plant.common_name} ({plant.scientific_name})</h3>
      </div>
    </div>
  );
};

export default PlantCard;
