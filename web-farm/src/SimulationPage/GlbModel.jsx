// GlbModel.js
import React from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { TextureLoader } from 'three';

function ObjModel({ modelPath, texturePath }) {
  const obj = useLoader(OBJLoader, modelPath);

  return <primitive object={obj} scale={0.01} />;
}

export default ObjModel;
