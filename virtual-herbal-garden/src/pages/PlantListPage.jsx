import React from 'react';
import plantData from '../data/plantsData.json';
import PlantCard from '../components/PlantCard';
import './PlantListPage.css';

const PlantListPage = () => {
  const sortedPlants = [...plantData].sort((a, b) => a.common_name.localeCompare(b.common_name));

  return (
    <div className="plant-list-page">
      <h2 className="page-title">All Plants (A-Z)</h2>
      <div className="plant-grid">
        {sortedPlants.map(plant => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </div>
    </div>
  );
};

export default PlantListPage;
