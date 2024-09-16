import React from 'react';
import { useParams } from 'react-router-dom';
import plantsData from '../data/plantsData';
import './PlantDetailPage.css'

const PlantDetails = () => {
  const { id } = useParams();
  const plant = plantsData.find(p => p.id === parseInt(id));

  if (!plant) {
    return <h2>Plant not found!</h2>;
  }

  return (
    <div className="plant-details">
      <img src={plant.image_url} alt={plant.common_name} className="plant-detail-image" />
      <h2>{plant.common_name}</h2>
      <p><strong>Scientific Name:</strong> {plant.scientific_name}</p>
      <p>{plant.description}</p>
    </div>
  );
};

export default PlantDetails;
