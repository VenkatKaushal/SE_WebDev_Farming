// import React from 'react';
import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import SidePanel from './components/SidePanel';
// import './SimulationPage.css';
// // import FarmCropSimulator from './1';

export default function SimulationPage() {
  return (
    <App/>
    // <DndProvider backend={HTML5Backend}>
    //   <div className="app-container">
    //     <App/>
    //     {}
    //     {}
    //   </div>
    // </DndProvider>
  );
}


import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useTransition, animated } from '@react-spring/web';
import ObjModel from './GlbModel'; 
import Chatbot from './Chatbot';
import './SimulationPage.css';

const crops = [
  {
    name: "Seed Germination Process",
    imgSrc: "Germination.jpg",
    sketchfabLink: "https://sketchfab.com/models/7e9031c2810c44fe8a0ffd3bf7864874/embed",
    texturePath: "",
    infoSlides: [
      "Germination starts with water absorption (imbibition), triggering seed growth.",
      "Key stages: Imbibition, Radicle Emergence (root growth), Shoot Growth, and Seedling Establishment.",
      "Ensure soil moisture is consistent but avoid waterlogging to prevent rot.",
      "Optimal temperature varies by crop but generally falls between 15-30°C.",
      "Soil should be well-aerated, loose, and nutrient-rich to support root growth.",
      "Protect seedlings from pests and diseases using organic treatments or seed coatings.",
      "Avoid sowing seeds too deep, as this may delay or prevent emergence.",
      "Use pre-germination treatments like soaking or scarification for hard-coated seeds.",
      "Ensure good soil contact with seeds to facilitate water and nutrient absorption.",
      "Monitor seedling progress, as early stress can impact growth and yield."
    ],    
    isFbx: false,
  },
  {
    name: "Wheat",
    imgSrc: "Wheat.jpg",
    sketchfabLink: "https://sketchfab.com/models/859b3117ef8341529e86f7fc2c02cb01/embed",
    infoSlides: [
      "Wheat thrives in temperate climates with well-drained soil.",
      "Important stages: Germination, Tillering, Stem Elongation, Heading, and Ripening.",
      "Critical tasks: Fertilization at tillering, regular irrigation, and weed control.",
      "Temperature between 12-25°C and rainfall of 300-500 mm are ideal.",
      "Harvest when grains are hard and moisture is around 20% for best yield."
    ],    
    backgroundColor: "#FDEBD0",
    texturePath: "",
    isFbx: false,
  },
  {
    name: "Corn",
    imgSrc: "Corn.jpg",
    sketchfabLink: "https://sketchfab.com/models/3ce02a9b2d34499188a337681d84fb1b/embed",
    backgroundColor: "#FFF3CD",
    infoSlides: [
      "Corn requires warm climates with deep, fertile soil.",
      "Key stages: Germination, V6 (sixth leaf), Tasseling, and Kernel Development.",
      "Ensure consistent soil moisture, especially during pollination.",
      "Apply nitrogen-rich fertilizers; avoid drought stress.",
      "Harvest when husks are dry, and kernels are hard and glossy."
    ],    
    texturePath: "",
    isFbx: false,
  },
  {
    name: "Potato",
    imgSrc: "Potato.jpg",
    sketchfabLink: "https://sketchfab.com/models/59868a9df1e14a8caa62c0b536885103/embed",
    texturePath: "",
    infoSlides: [
      "Potatoes grow best in cool climates with loose, well-drained soil.",
      "Stages include Sprouting, Vegetative Growth, Tuber Initiation, Tuber Bulking, and Maturation.",
      "Essential tasks: Hill soil around plants for tuber protection and manage pests.",
      "Ideal conditions: Temperature 15-20°C and regular watering during tuber formation.",
      "Harvest when foliage dies back and skins of tubers are firm."
    ],    
    isFbx: false,
  },
  {
    name: "Rice",
    imgSrc: "Rice.jpg",
    sketchfabLink: "https://sketchfab.com/models/02849731fe31486ca2eff1243455a6e9/embed",
    texturePath: "",
    infoSlides: [
      "Rice grows best in warm, submerged fields with clayey soil.",
      "Key stages: Seedling, Tillering, Panicle Initiation, Flowering, and Grain Filling.",
      "Maintain flooded fields during growth stages for best yield.",
      "Apply phosphorus-rich fertilizers at seeding and nitrogen at tillering.",
      "Harvest when grains are golden and firm for optimal quality."
    ],    
    isFbx: false,
  },
  {
    name: "Red Onion",
    imgSrc: "Red Onion.jpg",
    sketchfabLink: "https://sketchfab.com/models/cfb0032cf8aa4bf496857033d45ce783/embed",
    texturePath: "",
    infoSlides: [
      "Red onions thrive in well-drained, fertile soil with high organic matter.",
      "Important stages: Germination, Leaf Development, Bulb Formation, and Maturation.",
      "Weed regularly, water consistently, and avoid waterlogging.",
      "Apply nitrogen-rich fertilizer during early growth stages.",
      "Harvest when tops fall over and outer skins are dry."
    ],    
    isFbx: false,
  },
  {
    name: "Peas",
    imgSrc: "Peas.jpg",
    sketchfabLink: "https://sketchfab.com/models/76e54f38c2b14c4ab6d01f19600a0906/embed",
    texturePath: "",
    infoSlides: [
      "Peas prefer cooler temperatures and moderately fertile, well-drained soil.",
      "Stages: Germination, Vegetative Growth, Flowering, Pod Formation, and Maturity.",
      "Ensure adequate water supply, especially during flowering.",
      "Apply a balanced fertilizer at seeding; phosphorus is beneficial.",
      "Harvest when pods are plump but still green for best quality."
    ],    
    isFbx: false,
  },
  {
    name: "Tomato",
    imgSrc: "Tomato.jpg",
    sketchfabLink: "https://sketchfab.com/models/3e5b6208a9cb403d8a2cd041a09ee856/embed",
    texturePath: "",
    infoSlides: [
      "Tomatoes grow well in warm, sunny locations with well-drained soil.",
      "Stages: Germination, Vegetative Growth, Flowering, Fruit Setting, and Ripening.",
      "Key tasks: Stake plants, apply nitrogen-rich fertilizer, and prune for airflow.",
      "Ideal conditions: Temperature 20-30°C and regular watering.",
      "Harvest when tomatoes are fully colored and firm for best flavor."
    ],    
    isFbx: false,
  },
  {
    name: "Lettuce",
    imgSrc: "Lettuce.jpg",
    sketchfabLink: "https://sketchfab.com/models/cdbab6b20d3e4bb3b025c3f1c87d153c/embed",
    texturePath: "",
    infoSlides: [
      "Lettuce grows best in cool, moist conditions and well-drained soil.",
      "Stages: Germination, Leaf Development, Heading (for certain types), and Maturity.",
      "Water consistently, avoid heat stress, and use shade if needed.",
      "Apply nitrogen during early stages for healthy leaf development.",
      "Harvest when leaves or heads reach full size and are crisp."
    ],    
    isFbx: false,
  },
];


function App() {
  const [infoIndex, setInfoIndex] = useState(0);
  const [currentCrop, setCurrentCrop] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);


  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const handleCropSelect = (crop) => {
    setCurrentCrop(crop);
    setInfoIndex(0);
  };

  const transitions = useTransition(infoIndex, {
    key: infoIndex,
    from: { opacity: 0, transform: 'translateX(20px)' },
    enter: { opacity: 1, transform: 'translateX(0px)' },
    leave: { opacity: 0, transform: 'translateX(-20px)' },
    config: { duration: 500 },
  });

  useEffect(() => {
    if (currentCrop) {
      const interval = setInterval(() => {
        setInfoIndex((prevIndex) => (prevIndex + 1) % currentCrop.infoSlides.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [currentCrop]);

  const handleDragStart = (e, crop) => {
    e.dataTransfer.setData("cropName", crop.name);
  };

  const handleDrop = (e) => {
    const cropName = e.dataTransfer.getData("cropName");
    const selectedCrop = crops.find((crop) => crop.name === cropName);
    setCurrentCrop(selectedCrop);
    setInfoIndex(0); 
  };

  return (
    <div className="app-container">
      <aside className="side-panel">
        <h2>Side Panel</h2>
        {crops.map((crop, index) => (
          <div
            key={index}
            className="crop-box"
            draggable
            onDragStart={(e) => handleDragStart(e, crop)}
            onClick={() => handleCropSelect(crop)}
          >
            <img src={crop.imgSrc} alt={crop.name} className="crop-image" />
            <p>{crop.name}</p>
          </div>
        ))}
      </aside>

      <main className="main-display" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        {currentCrop ? (
          currentCrop.isFbx ? (
            <Canvas style={{ width: "80%", height: "80%" }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <ObjModel modelPath={currentCrop.modelPath} texturePath={currentCrop.texturePath} />
          </Canvas>
          ) : (
            <iframe
              title={currentCrop.name}
              src={currentCrop.sketchfabLink}
              frameBorder="0"
              allowFullScreen
              className="model-iframe"
            ></iframe>
          )
        ) : (
          <p>Drag and drop a crop here to view its model.</p>
        )}
      </main>

      {}
      <section
        className="info-panel"
        style={{ backgroundColor: currentCrop ? currentCrop.backgroundColor : "#e9e9e9" }}
      >
        <div className="info-content">
          {currentCrop ? (
            transitions((style, index) => (
              <animated.div style={style} key={index}>
                {currentCrop.infoSlides[index]}
              </animated.div>
            ))
          ) : (
            <p>Select a crop to see information</p>
          )}
        </div>
        <div style={{ padding: '20px' }}>
      {}
      <div
        className="chatbot-icon"
        onClick={toggleChatbot}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          borderRadius: '50%',
          padding: '15px',
          cursor: 'pointer',
          fontSize: '24px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)', // Slight shadow for better visibility
        }}
      >
        💬
      </div>

      {}
      {showChatbot && <Chatbot toggleChatbot={toggleChatbot} />}
    </div>
      </section>
    </div>
  );
}


