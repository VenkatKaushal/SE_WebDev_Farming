import React from 'react';
import './crop_info.css'; // Adjust path based on your file structure

// Importing images
import riceImg from '../images/Rice.jpg';
import wheatImg from '../images/wheat.jpg';
import sugarcaneImg from '../images/Sugarcane.jpg';
import maizeImg from '../images/maize.jpg';
import pigeonPeasImg from '../images/Pigeon Peas.jpg';
import chickpeasImg from '../images/chickpeas.jpg';
import mungBeansImg from '../images/Mung beans.jpg';
import cottonImg from '../images/Cotton.jpg';
import groundnutImg from '../images/Peanut.jpg';
import mustardImg from '../images/Mustard.jpg';
import jowarImg from '../images/Jowar.jpg';
import bajraImg from '../images/Bajra.jpg';
import barleyImg from '../images/barley.jpg';
import teaImg from '../images/Tea.jpg';

const CropInfo = () => {
    return (
        <div className="crop-infopage">
            <h1>Crop Information</h1>
            <div className="crops-grid">

                {/* Rice */}
                <div className="crop-card">
                    <img src={riceImg} alt="Rice" />
                    <div className="crop-details">
                        <h3>Rice</h3>
                        <ul>
                            <li><strong>Type:</strong> Kharif Crop (Monsoon crop)</li>
                            <li><strong>Climate:</strong> Hot and humid, temperatures 20°C to 35°C, requires ample water.</li>
                            <li><strong>Regions:</strong> West Bengal, Uttar Pradesh, Punjab, Tamil Nadu, Andhra Pradesh, Bihar, Assam.</li>
                            <li><strong>Uses:</strong> Staple food in many forms such as boiled rice, biryani, dosa.</li>
                        </ul>
                        {/* <a href="#" className="more-info-btn">More Info</a> */}
                    </div>
                </div>

                {/* Wheat */}
                <div className="crop-card">
                    <img src={wheatImg} alt="Wheat" />
                    <div className="crop-details">
                        <h3>Wheat</h3>
                        <ul>
                            <li><strong>Type:</strong> Rabi Crop (Winter crop)</li>
                            <li><strong>Climate:</strong> Cool weather, temperatures 10°C to 25°C.</li>
                            <li><strong>Regions:</strong> Punjab, Haryana, Uttar Pradesh, Madhya Pradesh, Rajasthan, Bihar.</li>
                            <li><strong>Uses:</strong> Wheat is ground into flour and used for making chapati, bread, pasta.</li>
                        </ul>
                        {/* <a href="#" className="more-info-btn">More Info</a> */}
                    </div>
                </div>

                {/* Sugarcane */}
                <div className="crop-card">
                    <img src={sugarcaneImg} alt="Sugarcane" />
                    <div className="crop-details">
                        <h3>Sugarcane</h3>
                        <ul>
                            <li><strong>Type:</strong> Perennial Crop</li>
                            <li><strong>Climate:</strong> Tropical to subtropical, temperatures 21°C to 27°C, needs abundant water.</li>
                            <li><strong>Regions:</strong> Uttar Pradesh, Maharashtra, Karnataka, Tamil Nadu, Andhra Pradesh.</li>
                            <li><strong>Uses:</strong> Produces sugar, jaggery, ethanol, and molasses, also used in biofuel.</li>
                        </ul>
                        {/* <a href="#" className="more-info-btn">More Info</a> */}
                    </div>
                </div>

                {/* Maize */}
                <div className="crop-card">
                    <img src={maizeImg} alt="Maize" />
                    <div className="crop-details">
                        <h3>Maize (Corn)</h3>
                        <ul>
                            <li><strong>Type:</strong> Kharif and Rabi Crop</li>
                            <li><strong>Climate:</strong> Grows in diverse conditions, optimal temperatures 21°C to 27°C.</li>
                            <li><strong>Regions:</strong> Andhra Pradesh, Karnataka, Madhya Pradesh, Bihar, Rajasthan.</li>
                            <li><strong>Uses:</strong> Used for food, animal feed, industrial starch, and biofuels.</li>
                        </ul>
                        {/* <a href="#" className="more-info-btn">More Info</a> */}
                    </div>
                </div>

                {/* Pigeon Peas */}
                <div className="crop-card">
                    <img src={pigeonPeasImg} alt="Pigeon Peas" />
                    <div className="crop-details">
                        <h3>Pigeon Peas (Arhar/Tur)</h3>
                        <ul>
                            <li><strong>Type:</strong> Kharif Crop</li>
                            <li><strong>Climate:</strong> Thrives in warm climates, temperatures around 20°C to 30°C.</li>
                            <li><strong>Regions:</strong> Maharashtra, Uttar Pradesh, Madhya Pradesh, Karnataka.</li>
                            <li><strong>Uses:</strong> Widely used in Indian dal recipes, an important source of protein.</li>
                        </ul>
                        {/* <a href="#" className="more-info-btn">More Info</a> */}
                    </div>
                </div>

                {/* Chickpeas */}
                <div className="crop-card">
                    <img src={chickpeasImg} alt="Chickpeas" />
                    <div className="crop-details">
                        <h3>Chickpeas (Chana)</h3>
                        <ul>
                            <li><strong>Type:</strong> Rabi Crop</li>
                            <li><strong>Climate:</strong> Grows well in cool, dry conditions, temperatures between 10°C to 25°C.</li>
                            <li><strong>Regions:</strong> Madhya Pradesh, Rajasthan, Maharashtra, Uttar Pradesh.</li>
                            <li><strong>Uses:</strong> Used to make dishes like hummus, curries, and flour (besan).</li>
                        </ul>
                        {/* <a href="#" className="more-info-btn">More Info</a> */}
                    </div>
                </div>

                {/* Mung Beans */}
                <div className="crop-card">
                    <img src={mungBeansImg} alt="Mung Beans" />
                    <div className="crop-details">
                        <h3>Mung Beans (Moong)</h3>
                        <ul>
                            <li><strong>Type:</strong> Kharif Crop</li>
                            <li><strong>Climate:</strong> Requires warm weather, temperatures between 25°C to 35°C.</li>
                            <li><strong>Regions:</strong> Rajasthan, Maharashtra, Karnataka, Andhra Pradesh.</li>
                            <li><strong>Uses:</strong> Sprouts, dals, and desserts like moong dal halwa.</li>
                        </ul>
                        {/* <a href="#" className="more-info-btn">More Info</a> */}
                    </div>
                </div>

                {/* Cotton */}
                <div className="crop-card">
                    <img src={cottonImg} alt="Cotton" />
                    <div className="crop-details">
                        <h3>Cotton</h3>
                        <ul>
                            <li><strong>Type:</strong> Kharif Crop</li>
                            <li><strong>Climate:</strong> Requires warm temperatures between 21°C to 30°C.</li>
                            <li><strong>Regions:</strong> Gujarat, Maharashtra, Telangana, Andhra Pradesh.</li>
                            <li><strong>Uses:</strong> Primarily for textile production, cottonseed oil.</li>
                        </ul>
                        {/* <a href="#" className="more-info-btn">More Info</a> */}
                    </div>
                </div>

                {/* Groundnut */}
                <div className="crop-card">
                    <img src={groundnutImg} alt="Groundnut" />
                    <div className="crop-details">
                        <h3>Groundnut (Peanut)</h3>
                        <ul>
                            <li><strong>Type:</strong> Kharif Crop</li>
                            <li><strong>Climate:</strong> Warm, temperatures between 20°C to 30°C.</li>
                            <li><strong>Regions:</strong> Gujarat, Andhra Pradesh, Tamil Nadu, Karnataka.</li>
                            <li><strong>Uses:</strong> Peanut oil, roasted peanuts, and confectionery products.</li>
                        </ul>
                        {/* <a href="#" className="more-info-btn">More Info</a> */}
                    </div>
                </div>

                {/* Mustard */}
                <div className="crop-card">
                    <img src={mustardImg} alt="Mustard" />
                    <div className="crop-details">
                        <h3>Mustard</h3>
                        <ul>
                            <li><strong>Type:</strong> Rabi Crop</li>
                            <li><strong>Climate:</strong> Grows best in cool climates, temperatures between 10°C to 25°C.</li>
                            <li><strong>Regions:</strong> Rajasthan, Haryana, Madhya Pradesh, Uttar Pradesh.</li>
                            <li><strong>Uses:</strong> Mustard oil, seeds used as spices, mustard greens.</li>
                        </ul>
                        {/* <a href="#" className="more-info-btn">More Info</a> */}
                    </div>
                </div>

                {/* Jowar */}
                <div className="crop-card">
                    <img src={jowarImg} alt="Jowar" />
                    <div className="crop-details">
                        <h3>Jowar (Sorghum)</h3>
                        <ul>
                            <li><strong>Type:</strong> Kharif Crop</li>
                            <li><strong>Climate:</strong> Thrives in dry conditions, temperatures between 20°C to 30°C.</li>
                            <li><strong>Regions:</strong> Maharashtra, Karnataka, Gujarat, Rajasthan.</li>
                            <li><strong>Uses:</strong> Jowar flour is used in making bhakri, porridge, and fermented beverages.</li>
                        </ul>
                        {/* <a href="#" className="more-info-btn">More Info</a> */}
                    </div>
                </div>

                {/* Bajra */}
                <div className="crop-card">
                    <img src={bajraImg} alt="Bajra" />
                    <div className="crop-details">
                        <h3>Bajra (Pearl Millet)</h3>
                        <ul>
                            <li><strong>Type:</strong> Kharif Crop</li>
                            <li><strong>Climate:</strong> Requires warm weather, drought-resistant.</li>
                            <li><strong>Regions:</strong> Rajasthan, Uttar Pradesh, Maharashtra.</li>
                            <li><strong>Uses:</strong> Used for flatbreads, porridge, and as animal fodder.</li>
                        </ul>
                        {/* <a href="#" className="more-info-btn">More Info</a> */}
                    </div>
                </div>

                {/* Barley */}
                <div className="crop-card">
                    <img src={barleyImg} alt="Barley" />
                    <div className="crop-details">
                        <h3>Barley</h3>
                        <ul>
                            <li><strong>Type:</strong> Rabi Crop</li>
                            <li><strong>Climate:</strong> Cool temperatures, requires around 10°C to 20°C.</li>
                            <li><strong>Regions:</strong> Rajasthan, Haryana, Uttar Pradesh.</li>
                            <li><strong>Uses:</strong> Used in soups, salads, and as animal feed; also in brewing beer.</li>
                        </ul>
                        {/* <a href="#" className="more-info-btn">More Info</a> */}
                    </div>
                </div>

                {/* Tea */}
                <div className="crop-card">
                    <img src={teaImg} alt="Tea" />
                    <div className="crop-details">
                        <h3>Tea</h3>
                        <ul>
                            <li><strong>Type:</strong> Perennial Crop</li>
                            <li><strong>Climate:</strong> Requires warm and humid conditions, optimal temperatures 15°C to 30°C.</li>
                            <li><strong>Regions:</strong> Assam, West Bengal, Tamil Nadu, Kerala.</li>
                            <li><strong>Uses:</strong> Used for making tea, a popular beverage worldwide.</li>
                        </ul>
                        {/* <a href="#" className="more-info-btn">More Info</a> */}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CropInfo;
