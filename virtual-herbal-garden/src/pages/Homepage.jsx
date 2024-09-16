import React from "react";
import './HomePage.css';  
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="homepage">
      {}
      <header className="hero-section" style={{ backgroundImage: `url(/background.jpg)` }}>
        <div className="hero-overlay">
          <h1 className="hero-title">Explore the World of Herbal Plants</h1>
          <p className="hero-subtitle">Your virtual guide to nature’s medicine</p>
          <Link to="/plants">
            <button className="explore-btn">Explore Plants (A-Z)</button>
          </Link>
          <div className="down-arrow" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
            ↓
          </div>
        </div>  
      </header>

      {}
      <section className="categories-section">
        <h2 className="section-title">Explore by Categories</h2>
        <div className="category-grid">
          <div className="category-item">
            <a href="/category/Medicinal-Uses">
              <div className="category-content">
                <img src={`Medicaluses.png`} alt="Medical Uses" className="category-img" />
                <div className="category-text">
                  <h3>Medicinal Uses</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Medicinal herbs are used in healing.</p>
                </div>
              </div>
            </a>
          </div>
          <div className="category-item">
            <a href="/category/Plant-Parts-Used">
              <div className="category-content">
                <img src={`PlantParts.jpg`} alt="Plant Parts Used" className="category-img" />
                <div className="category-text">
                  <h3>Plant Parts Used</h3>
                  <p>Various parts of plants, including roots, leaves, and flowers, are utilized for different purposes.</p>
                </div>
              </div>
            </a>
          </div>
          <div className="category-item">
            <a href="/category/Habitat">
              <div className="category-content">
                <img src={`Habitat.jpg`} alt="Habitat" className="category-img" />
                <div className="category-text">
                  <h3>Habitat</h3>
                  <p>Herbal plants thrive in diverse habitats, including forests, mountains, and wetlands.</p>
                </div>
              </div>
            </a>
          </div>
          <div className="category-item">
            <a href="/category/Growth-Requirements">
              <div className="category-content">
                <img src={`Plant growth requirement.jpg`} alt="Growth Requirements" className="category-img" />
                <div className="category-text">
                  <h3>Growth Requirements</h3>
                  <p>Each plant has unique needs for sunlight, water, and soil to flourish.</p>
                </div>
              </div>
            </a>
          </div>
          <div className="category-item">
            <a href="/category/Traditional">
              <div className="category-content">
                <img src={`Traditional.jpg`} alt="Traditional" className="category-img" />
                <div className="category-text">
                  <h3>Traditional</h3>
                  <p>Many plants have been used for centuries in traditional medicines and rituals.</p>
                </div>
              </div>
            </a>
          </div>
          <div className="category-item">
            <a href="/category/Culinary-Uses">
              <div className="category-content">
                <img src={`CulinaryUses.jpg`} alt="Culinary Uses" className="category-img" />
                <div className="category-text">
                  <h3>Culinary Uses</h3>
                  <p>Herbal plants are commonly used to enhance flavors in various dishes around the world.</p>
                </div>
              </div>
            </a>
          </div>
          <div className="category-item">
            <a href="/category/Plant-Types">
              <div className="category-content">
                <img src={`Plant Types.png`} alt="Plant Types" className="category-img" />
                <div className="category-text">
                  <h3>Plant Types</h3>
                  <p>There are many types of plants, including shrubs, trees, and vines, each with distinct properties.</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>


      {}
      <footer className="footer-section">
        <div className="footer-content">
          <p>© 2024 Virtual Herbal Garden | All Rights Reserved</p>
          <div className="social-icons">
            <a href="#"><i className="fa fa-facebook"></i></a>
            <a href="#"><i className="fa fa-twitter"></i></a>
            <a href="#"><i className="fa fa-instagram"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
