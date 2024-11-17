import React from 'react';
import { Link } from 'react-router-dom';
import './info_page.css';

const InfoPage = () => {
    return (
        <div className="info-page">
              <div className="info-title-box">
                <h1>Welcome to Agricultural Information</h1>
            </div>
            <nav className="info-grid">
                <Link to="/crop_info" className="info-card">
                    <img src="wheat_bg.jpeg" alt="Crop Information" />
                    <div className="info-text">Crop Information</div>
                </Link>
                <Link to="/fertilizer_info" className="info-card">
                    <img src="fertilizer_bg.jpg" alt="Pesticides and Fertilizers" />
                    <div className="info-text">Pesticides and Fertilizers</div>
                </Link>
            </nav>
        </div>
    );
};

export default InfoPage;
