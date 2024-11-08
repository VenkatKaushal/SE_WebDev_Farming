import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { SketchfabViewer } from './2';
import { DragDropArea } from './3';
import { CropInfo } from './CropInfo';

const FarmCropSimulator = () => {
  const [currentModel, setCurrentModel] = useState(null);
  const [cropInfo, setCropInfo] = useState({
    name: 'Select a crop',
    stages: '',
    methods: '',
  });
  const [language, setLanguage] = useState('en');

  const audioRef = useRef(null);

  useEffect(() => {
    updateCropInfo(currentModel?.url);
  }, [currentModel, language]);

  const handleCropDrop = async (url) => {
    try {
      const cropModel = await SketchfabViewer.loadModel(url);
      setCurrentModel(cropModel);
    } catch (err) {
      console.error('Error loading Sketchfab model:', err);
    }
  };

  const updateCropInfo = async (url) => {
    if (!url) return;

    try {
      const { data } = await axios.get(`/api/crop-info?url=${url}&language=${language}`);
      setCropInfo(data);

      audioRef.current.src = `/audio/${language}/${data.name.toLowerCase()}.mp3`;
    } catch (err) {
      console.error('Error fetching crop information:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Farm Crop Simulator</h1>
      <div className="grid grid-cols-2 gap-8">
        <div className="relative">
          <SketchfabViewer className="bg-white rounded-lg shadow-lg" model={currentModel} style={{ height: '500px' }} />
          <DragDropArea onDrop={handleCropDrop} className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4" />
        </div>
        <CropInfo
          name={cropInfo.name}
          stages={cropInfo.stages}
          methods={cropInfo.methods}
          language={language}
          onLanguageChange={setLanguage}
          audioRef={audioRef}
        />
      </div>
    </div>
  );
};

export default FarmCropSimulator;