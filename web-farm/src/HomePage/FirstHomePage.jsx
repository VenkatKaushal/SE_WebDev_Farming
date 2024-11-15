import React from 'react';
import './FirstHomePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const LandingPage = () => {
    return (
        <>
            {/* Story Section - Conversation between Farmer and Crop */}
            <div className="container my-4">
                <div className="row mb-4">

                    {/* Farmer's Side - Title, SVG, and Text (Left Corner) */}
                    <div className="col-12 d-flex justify-content-start align-items-center mb-4">
                        <div className="farmer-title">
                            <h3 className="farmer-title-text">Farmer</h3>
                        </div>
                        <div className="farmer-illustration">
                            {/* Farmer SVG */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" width="200" height="300">
                                
                                <circle cx="100" cy="60" r="30" fill="#FFD700" />
                                
                                <rect x="70" y="35" width="60" height="10" fill="#8B4513" />
                                <rect x="60" y="45" width="80" height="10" fill="#8B4513" />

                                <circle cx="90" cy="55" r="5" fill="#000" />
                                <circle cx="110" cy="55" r="5" fill="#000" />
                                
                                <path d="M100,65 Q95,70 100,75" stroke="#000" fill="transparent" />
                                
                                <path d="M90,80 Q100,85 110,80" stroke="#000" fill="transparent" />
                                
                                <rect x="85" y="90" width="30" height="60" fill="#8B4513" />
                                
                                <line x1="85" y1="100" x2="60" y2="120" stroke="#8B4513" stroke-width="6" />
                                <line x1="115" y1="100" x2="140" y2="120" stroke="#8B4513" stroke-width="6" />
                                
                                <line x1="90" y1="150" x2="90" y2="180" stroke="#3e2723" stroke-width="8" />
                                <line x1="110" y1="150" x2="110" y2="180" stroke="#3e2723" stroke-width="8" />
                                
                                <ellipse cx="90" cy="190" rx="10" ry="5" fill="#3e2723" />
                                <ellipse cx="110" cy="190" rx="10" ry="5" fill="#3e2723" />
                            </svg>
                        </div>
                        <div className="speech-text">
                            <div className="speech-bubble farmer-speech-bubble">
                                <p className="farmer-speech">
                                    "I can simulate your crops, predict their growth, and give you insights into their health!"
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Crop's Side - Title, Text First, SVG Second (Right Corner) */}
                    <div className="col-12 d-flex justify-content-end align-items-center">
                        <div className="speech-text">
                            <div className="speech-bubble crop-speech-bubble">
                                <p className="crop-speech">
                                    "I can provide details about myself, predict outcomes, and track my progress in real-time!"
                                </p>
                            </div>
                        </div>
                        <div className="crop-title">
                            <h3 className="crop-title-text">Crop</h3>
                        </div>
                        <div className="crop-illustration">
                            {/* Crop SVG */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="150" height="150" className="crop-svg">
                                {/* Crop Leaves */}
                                <ellipse cx="100" cy="50" rx="30" ry="40" fill="#4caf50" />
                                <ellipse cx="90" cy="40" rx="20" ry="30" fill="#8bc34a" />
                                <ellipse cx="110" cy="40" rx="20" ry="30" fill="#8bc34a" />
                                {/* Crop Stem */}
                                <rect x="95" y="80" width="10" height="60" fill="#3e2723" />
                            </svg>
                        </div>
                    </div>

                </div>
            </div>
            {/* Homepage Section */}
            <div className="container my-4">
                <div className="row mb-4">
                    {/* Crop Simulation Section */}
                    <div className="col-md-6 d-flex align-items-center">
                        <div className="farmer-illustration">
                            {/* Crop Simulation SVG */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="150" height="150" className="farmer-svg">
                                <rect x="50" y="80" width="100" height="40" fill="#2e8b57" />
                                <circle cx="100" cy="70" r="20" fill="#4caf50" />
                                <rect x="60" y="120" width="20" height="50" fill="#3e2723" />
                                <rect x="120" y="120" width="20" height="50" fill="#3e2723" />
                            </svg>
                        </div>
                        <div className="farmer-text ml-4">
                            <h3 className="text-success">Crop Simulation</h3>
                            <p className="text-muted">Visualize and simulate your crop growth with real-time data for better planning.</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Crop Simulation</h5>
                                <p className="card-text">Use our crop simulation tool to predict the future growth of your crops.</p>
                                <a href="/simulate" className="btn btn-primary">Start Simulation</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Crop Information Section */}
                <div className="row mb-4">
                    <div className="col-md-6 d-flex align-items-center">
                        <div className="farmer-illustration">
                            {/* Crop Info SVG */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="150" height="150" className="farmer-svg">
                                <circle cx="100" cy="50" r="40" fill="#ffa726" />
                                <rect x="70" y="90" width="60" height="80" fill="#8bc34a" />
                                <rect x="85" y="120" width="10" height="50" fill="#3e2723" />
                                <rect x="105" y="120" width="10" height="50" fill="#3e2723" />
                            </svg>
                        </div>
                        <div className="farmer-text ml-4">
                            <h3 className="text-success">Know Your Crop</h3>
                            <p className="text-muted">Get to know everything about your crop, from health to ideal conditions for growth.</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Crop Information</h5>
                                <p className="card-text">Learn the key factors influencing your crop's health and growth stages.</p>
                                <a href="/info" className="btn btn-primary">View Crop Info</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Prediction Section */}
                <div className="row mb-4">
                    <div className="col-md-6 d-flex align-items-center">
                        <div className="farmer-illustration">
                            {/* Prediction SVG */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="150" height="150" className="farmer-svg">
                                <circle cx="100" cy="60" r="40" fill="#0288d1" />
                                <path d="M50 130 Q 100 100, 150 130" stroke="#0277bd" strokeWidth="3" fill="none" />
                                <circle cx="100" cy="130" r="10" fill="#c62828" />
                            </svg>
                        </div>
                        <div className="farmer-text ml-4">
                            <h3 className="text-success">Prediction</h3>
                            <p className="text-muted">Get accurate crop predictions based on weather data and other critical factors.</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Crop Prediction</h5>
                                <p className="card-text">Use our prediction tool to forecast crop outcomes based on different scenarios.</p>
                                <a href="/prediction" className="btn btn-primary">View Prediction</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="row mb-4">
                    <div className="col-md-6 d-flex align-items-center">
                        <div className="farmer-illustration">
                            {/* Stats SVG */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="150" height="150" className="farmer-svg">
                                <rect x="30" y="50" width="40" height="100" fill="#4caf50" />
                                <rect x="80" y="70" width="40" height="80" fill="#ff9800" />
                                <rect x="130" y="90" width="40" height="60" fill="#f44336" />
                                <line x1="30" y1="50" x2="30" y2="150" stroke="#000" strokeWidth="2" />
                                <line x1="80" y1="70" x2="80" y2="150" stroke="#000" strokeWidth="2" />
                                <line x1="130" y1="90" x2="130" y2="150" stroke="#000" strokeWidth="2" />
                            </svg>
                        </div>
                        <div className="farmer-text ml-4">
                            <h3 className="text-success">Stats</h3>
                            <p className="text-muted">View essential statistics on crop performance, health, and yield potential.</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Crop Stats</h5>
                                <p className="card-text">Analyze data-driven insights to improve farm productivity with detailed stats.</p>
                                <a href="/stats" className="btn btn-primary">View Stats</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LandingPage;
