import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomeCarousel.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS (includes Popper.js)

const HomeCarousel = () => {


    return (
        <>
            <div className="content">
                <div id="carouselExampleCaptions" className="carousel slide carousel-fade" data-bs-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active"></li>
                        <li data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"></li>
                        <li data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="Home_slide1.jpg" className="d-block w-100" alt="Slide 1" style={{ width: '1400px', height: '600px' }} />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Welcome to Farming 3D</h5>
                                <p>Welcome to Our Website where you can take valuable experience of Farming.</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="Home-Slide2.jpg" className="d-block w-100" alt="Slide 2" style={{ width: '1400px', height: '600px' }} />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Simulation</h5>
                                <p>You can also use Drag and Drop simulation and know your crop properly.</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="Home-Slide3.jpg" className="d-block w-100" alt="Slide 3" style={{ width: '1400px', height: '600px' }} />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Prediction and Know your crop</h5>
                                <p>Enter Details and your soil report card to know the prediction of your crop based on different elements.</p>
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </a>
                </div>
            </div>
            <div class="container my-4">
                <div class="row mb-2">
                    <div class="col-md-6">
                        <div
                            class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div class="col p-4 d-flex flex-column position-static">
                                <strong class="d-inline-block mb-2 text-success">Crop Simulation</strong>
                                <h3 class="mb-0">Crop Simulation</h3>
                                <div class="mb-1 text-muted"></div>
                                <p class="card-text mb-auto">You can see the simulation of the crop from here.</p>
                                <Link to="/simulate" className="nav-link-custom">
                                    <button className="btn btn-primary">Simulate</button>
                                </Link>
                            </div>
                            <div class="col-auto d-none d-lg-block">
                                <img class="bd-placeholder-img" width="200" height="250" src="Simulate-Card.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div
                            class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div class="col p-4 d-flex flex-column position-static">
                                <strong class="d-inline-block mb-2 text-success">Know Your Crop</strong>
                                <h3 class="mb-0">Know Your Crop</h3>
                                <div class="mb-1 text-muted"></div>
                                <p class="mb-auto">From here you get to know the information about you crop.</p>
                                <Link to="/Info" className="nav-link-custom">    
                                    <button className="btn btn-primary">Your Crop info</button>
                                </Link>
                            </div>
                            <div class="col-auto d-none d-lg-block">
                                <img class="bd-placeholder-img" width="200" height="250" src="KnowYourCrop-Card.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container my-4">
                <div class="row mb-2">
                    <div class="col-md-6">
                        <div
                            class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div class="col p-4 d-flex flex-column position-static">
                                <strong class="d-inline-block mb-2 text-success">Prediction</strong>
                                <h3 class="mb-0">Prediction</h3>
                                <div class="mb-1 text-muted"></div>
                                <p class="card-text mb-auto">Get the Proper information and Prediction of the crop.</p>
                                <Link to="/prediction" className="nav-link-custom">
                                    <button className="btn btn-primary">View Prediction</button>
                                </Link>
                            </div>
                            <div class="col-auto d-none d-lg-block">
                                <img class="bd-placeholder-img" width="200" height="250" src="ViewYourCrop.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div
                            class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div class="col p-4 d-flex flex-column position-static">
                                <strong class="d-inline-block mb-2 text-success">Stats</strong>
                                <h3 class="mb-0">Stats</h3>
                                <div class="mb-1 text-muted"></div>
                                <p class="mb-auto">You can get the information on the based of stats.</p>
                                <Link to="" className="nav-link-custom">                                
                                <button className="btn btn-primary">View Stats</button>
                                </Link>
                            </div>
                            <div class="col-auto d-none d-lg-block">
                                <img class="bd-placeholder-img" width="200" height="250" src="Stats-Card.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeCarousel;
