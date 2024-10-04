import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS (includes Popper.js)

const HomeCarousel = () => {
    

    return (
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
    );
};

export default HomeCarousel;
