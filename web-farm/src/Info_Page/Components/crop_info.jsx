// CropInfo.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './crop_info.css'; // Adjust path based on your file structure

const CropInfo = () => {
    const [crops, setCrops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch crop data from the backend
    useEffect(() => {
        const fetchCrops = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/info/crops');
                setCrops(response.data); // Assuming the response is an array of crops
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch crop data.');
                setLoading(false);
            }
        };

        fetchCrops();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="crop-infopage">
            <h1>Crop Information</h1>
            <div className="crops-grid">
                {crops.map((crop) => (
                    <div key={crop._id} className="crop-card">
                        <img src={`http://localhost:3000/services/${crop.imageUrl}`} alt={crop.name} />
                        <div className="crop-details">
                            <h3>{crop.name}</h3>
                            <ul>
                                <li><strong>Type:</strong> {crop.type}</li>
                                <li><strong>Climate:</strong> {crop.climate}</li>
                                <li><strong>Regions:</strong> {crop.regions.join(', ')}</li>
                                <li><strong>Uses:</strong> {crop.uses}</li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CropInfo;
