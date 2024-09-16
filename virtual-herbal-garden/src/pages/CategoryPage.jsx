import React from 'react';
import { useParams } from 'react-router-dom';
import plantData from '../data/plantsData.json';
import PlantCard from '../components/PlantCard';
import './CategoryPage.css'

const CategoryPage = () => {
  const { category } = useParams();
  const filteredPlants = plantData.filter(plant => plant.category.includes(category.replace('-', ' ')));
  const sortedPlants = [...filteredPlants].sort((a, b) => a.common_name.localeCompare(b.common_name));

  return (
    <div className="category-page">
      <h2 className="page-title">Plants in Category: {category.replace('-', ' ')}</h2>
      <div className="plant-grid">
        {sortedPlants.map(plant => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
