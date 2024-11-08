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
    //     {/* <SidePanel /> */}
    //     {/* <FarmCropSimulator /> */}
    //   </div>
    // </DndProvider>
  );
}


import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useTransition, animated } from '@react-spring/web';
import ObjModel from './GlbModel'; // Use GlbModel now
import Chatbot from './Chatbot';
import './SimulationPage.css';

// Crop data array
const crops = [
  {
    name: "Seed Germination Process",
    imgSrc: "path/to/corn-image.jpg",
    sketchfabLink: "https://sketchfab.com/models/7e9031c2810c44fe8a0ffd3bf7864874/embed",
    texturePath: "",
    infoSlides: [
      "Wheat is a staple grain used globally.",
      "It grows best in temperate climates.",
      "Harvested primarily for bread and pasta."
    ],
    isFbx: false,
  },
  {
    name: "Wheat",
    imgSrc: "path/to/wheat-image.jpg",
    sketchfabLink: "https://sketchfab.com/models/859b3117ef8341529e86f7fc2c02cb01/embed",
    infoSlides: [
      "Wheat is a staple grain used globally.",
      "It grows best in temperate climates.",
      "Harvested primarily for bread and pasta."
    ],
    backgroundColor: "#FDEBD0",
    texturePath: "",
    isFbx: false,
  },
  {
    name: "Corn",
    imgSrc: "path/to/corn-image.jpg",
    sketchfabLink: "https://sketchfab.com/models/3ce02a9b2d34499188a337681d84fb1b/embed",
    backgroundColor: "#FFF3CD",
    infoSlides: [
      "Corn is a versatile crop.",
      "It is used for food, fuel, and feed.",
      "Corn is native to the Americas."
    ],
    texturePath: "",
    isFbx: false,
  },
  {
    name: "Potato",
    imgSrc: "path/to/corn-image.jpg",
    sketchfabLink: "https://sketchfab.com/models/59868a9df1e14a8caa62c0b536885103/embed",
    texturePath: "",
    infoSlides: [
      "Wheat is a staple grain used globally.",
      "It grows best in temperate climates.",
      "Harvested primarily for bread and pasta."
    ],
    isFbx: false,
  },
  {
    name: "Rice",
    imgSrc: "path/to/corn-image.jpg",
    sketchfabLink: "https://sketchfab.com/models/02849731fe31486ca2eff1243455a6e9/embed",
    texturePath: "",
    infoSlides: [
      "Wheat is a staple grain used globally.",
      "It grows best in temperate climates.",
      "Harvested primarily for bread and pasta."
    ],
    isFbx: false,
  },
  {
    name: "Red Onion",
    imgSrc: "path/to/corn-image.jpg",
    sketchfabLink: "https://sketchfab.com/models/cfb0032cf8aa4bf496857033d45ce783/embed",
    texturePath: "",
    infoSlides: [
      "Wheat is a staple grain used globally.",
      "It grows best in temperate climates.",
      "Harvested primarily for bread and pasta."
    ],
    isFbx: false,
  },
  {
    name: "Peas",
    imgSrc: "path/to/corn-image.jpg",
    sketchfabLink: "https://sketchfab.com/models/76e54f38c2b14c4ab6d01f19600a0906/embed",
    texturePath: "",
    infoSlides: [
      "Wheat is a staple grain used globally.",
      "It grows best in temperate climates.",
      "Harvested primarily for bread and pasta."
    ],
    isFbx: false,
  },
  {
    name: "Tomato",
    imgSrc: "path/to/corn-image.jpg",
    sketchfabLink: "https://sketchfab.com/models/3e5b6208a9cb403d8a2cd041a09ee856/embed",
    texturePath: "",
    infoSlides: [
      "Wheat is a staple grain used globally.",
      "It grows best in temperate climates.",
      "Harvested primarily for bread and pasta."
    ],
    isFbx: false,
  },
  {
    name: "Lettue",
    imgSrc: "path/to/corn-image.jpg",
    sketchfabLink: "https://sketchfab.com/models/cdbab6b20d3e4bb3b025c3f1c87d153c/embed",
    texturePath: "",
    infoSlides: [
      "Wheat is a staple grain used globally.",
      "It grows best in temperate climates.",
      "Harvested primarily for bread and pasta."
    ],
    isFbx: false,
  },
  {
    name: "Garlic",
    imgSrc: "path/to/corn-image.jpg",
    sketchfabLink: "https://sketchfab.com/models/cdbab6b20d3e4bb3b025c3f1c87d153c/embed",
    modelPath: "garlic.obj",
    texturePath: "texture.png",
    isFbx: true,
    infoSlides: [
      "Wheat is a staple grain used globally.",
      "It grows best in temperate climates.",
      "Harvested primarily for bread and pasta."
    ],
    backgroundColor: "#FDEBD0",
  },
  

  // Add more crops as needed
];

// Main App Component
function App() {
  const [infoIndex, setInfoIndex] = useState(0);
  const [currentCrop, setCurrentCrop] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);

  // Function to toggle the chatbot visibility
  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
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
    setInfoIndex(0); // Reset info slide index when a new crop is selected
  };

  return (
    <div className="app-container">
      {/* Side Panel */}
      <aside className="side-panel">
        <h2>Side Panel</h2>
        {crops.map((crop, index) => (
          <div
            key={index}
            className="crop-box"
            draggable
            onDragStart={(e) => handleDragStart(e, crop)}
          >
            <img src={crop.imgSrc} alt={crop.name} className="crop-image" />
            <p>{crop.name}</p>
          </div>
        ))}
      </aside>

      {/* 3D Model Display */}
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

      {/* Information Display Panel */}
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
      {/* Chatbot icon */}
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

      {/* Conditionally render the chatbot */}
      {showChatbot && <Chatbot toggleChatbot={toggleChatbot} />}
    </div>
      </section>
    </div>
  );
}


