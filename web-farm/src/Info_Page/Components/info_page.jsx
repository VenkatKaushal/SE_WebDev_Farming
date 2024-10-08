import React from 'react';
import { Link } from 'react-router-dom';
import './info_page.css'; 
// Adjust path based on your file structure

const InfoPage = () => {
    return (
        <div className="info-page">
            <h1>Welcome to Agricultural Information</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/crop_info">Crop Information</Link>
                    </li>
                    <li>
                        <Link to="/fertilizer_info">Pesticides and Fertilizers</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default InfoPage;
