import React, { useState } from 'react'; 
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

import { useDrop } from 'react-dnd';

const GLBModel = ({ url, position }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} position={position} />;
};

const OBJModel = ({ url, position }) => {
  const obj = useLoader(OBJLoader, url);
  return <primitive object={obj} position={position} />;
};


export default function PredictionCanvas() {
  const [models, setModels] = useState([]); 

  const addToPrediction = (item, offset) => {
    console.log('Dropped item:', item);
    console.log('Client offset:', offset); 
    console.log('Dropped item.type:', item.type);

    const position = [
      (offset.x / window.innerWidth) * 20 - 10, 
      0, 
      (offset.y / window.innerHeight) * 20 - 10,
    ];

   
    console.log('Calculated position:', position);

    
    setModels((prevModels) => [
      ...prevModels,
      {
        type: item.type,
        url: item.type === 'SOIL' ? 'soil.obj' : item.type === 'CROP' ? 'crop.glb' : '',
        position,
      },
    ]);
    
  };

  const clearPrediction = () => {
    setModels([]); 
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['SOIL', 'CROP'],
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      addToPrediction(item, offset);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }} ref={drop}>
      <Canvas className={`canvas ${isOver ? 'highlight' : ''}`} style={{ width: '100%', height: '100%' }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        
        
        {models.map((model, index) => {
          const fileExtension = model.url.split('.').pop();
          if (fileExtension === 'glb') {
            return <GLBModel key={index} url={model.url} position={model.position} />;
          } else if (fileExtension === 'obj') {
            return <OBJModel key={index} url={model.url} position={model.position} />;
          }
          return null;
        })}

        <OrbitControls />
      </Canvas>
      <button onClick={clearPrediction} style={clearButtonStyle}>
        Clear Prediction
      </button>
    </div>
  );
}

// Styles for the clear button
const clearButtonStyle = {
  position: 'absolute',
  top: '20px',
  right: '20px',
  padding: '10px 20px',
  backgroundColor: '#f44336', // Red color for clear button
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  zIndex: 10,
};
