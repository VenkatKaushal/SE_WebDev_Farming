import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AnimationSummary from '../components/AnimationSummary';
import './PlantDetailPage.css';

function PlantDetailPage() {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/api/plants/${id}`); // Replace with your API endpoint
      setPlant(response.data);
    }
    fetchData();
  }, [id]);

  if (!plant) return <div>Loading...</div>;

  return (
    <div className="plant-detail-page">
      <img src={plant.image} alt={plant.name} />
      <h1>{plant.name}</h1>
      <p>{plant.description}</p>
      <AnimationSummary />
    </div>
  );
}

export default PlantDetailPage;
