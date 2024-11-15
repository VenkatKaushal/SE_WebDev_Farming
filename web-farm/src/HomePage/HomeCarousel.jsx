import React from 'react';
import { Link } from 'react-router-dom';
import './HomeCarousel.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const HomeCarousel = () => {
    return (
        <>
            {/* Carousel Sections */}
            <div className="container my-4">
                <div className="row mb-2">
                    {/* Crop Simulation Card */}
                    <div className="col-md-6">
                        <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col p-4 d-flex flex-column position-static">
                                <strong className="d-inline-block mb-2 text-success">Crop Simulation</strong>
                                <h3 className="mb-0">Crop Simulation</h3>
                                <p className="card-text mb-auto">You can see the simulation of the crop from here.</p>
                                <Link to="/simulate" className="nav-link-custom">
                                    <button className="btn btn-primary">Simulate</button>
                                </Link>
                            </div>
                            <div className="col-auto d-none d-lg-block">
                                <img className="bd-placeholder-img" width="200" height="250" src="Simulate-Card.jpg" alt="Crop Simulation" />
                            </div>
                        </div>
                    </div>
                    {/* Know Your Crop Card */}
                    <div className="col-md-6">
                        <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col p-4 d-flex flex-column position-static">
                                <strong className="d-inline-block mb-2 text-success">Know Your Crop</strong>
                                <h3 className="mb-0">Know Your Crop</h3>
                                <p className="mb-auto">From here you get to know information about your crop.</p>
                                <Link to="/Info" className="nav-link-custom">
                                    <button className="btn btn-primary">Your Crop Info</button>
                                </Link>
                            </div>
                            <div className="col-auto d-none d-lg-block">
                                <img className="bd-placeholder-img" width="200" height="250" src="KnowYourCrop-Card.jpg" alt="Know Your Crop" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container my-4">
                <div className="row mb-2">
                    {/* Prediction Card */}
                    <div className="col-md-6">
                        <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col p-4 d-flex flex-column position-static">
                                <strong className="d-inline-block mb-2 text-success">Prediction</strong>
                                <h3 className="mb-0">Prediction</h3>
                                <p className="card-text mb-auto">Get detailed predictions and insights for your crop.</p>
                                <Link to="/prediction" className="nav-link-custom">
                                    <button className="btn btn-primary">View Prediction</button>
                                </Link>
                            </div>
                            <div className="col-auto d-none d-lg-block">
                                <img className="bd-placeholder-img" width="200" height="250" src="ViewYourCrop.jpg" alt="Prediction" />
                            </div>
                        </div>
                    </div>
                    {/* Stats Card */}
                    <div className="col-md-6">
                        <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col p-4 d-flex flex-column position-static">
                                <strong className="d-inline-block mb-2 text-success">Stats</strong>
                                <h3 className="mb-0">Stats</h3>
                                <p className="mb-auto">Access detailed statistical information.</p>
                                <Link to="" className="nav-link-custom">
                                    <button className="btn btn-primary">View Stats</button>
                                </Link>
                            </div>
                            <div className="col-auto d-none d-lg-block">
                                <img className="bd-placeholder-img" width="200" height="250" src="Stats-Card.jpg" alt="Stats" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeCarousel;
