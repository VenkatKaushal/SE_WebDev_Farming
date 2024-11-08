import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Droplets, Sun, Wind, Cloud, Thermometer } from 'lucide-react';

const CROP_DATABASE = {
  rice: {
    name: 'Rice (Paddy)',
    color: '#90EE90',
    flowerColor: '#f4d03f',
    stages: [
      { at: 0, name: 'Seed', description: 'Germination phase' },
      { at: 20, name: 'Seedling', description: 'Initial growth' },
      { at: 40, name: 'Tillering', description: 'Multiple shoots develop' },
      { at: 60, name: 'Panicle', description: 'Reproductive stage begins' },
      { at: 80, name: 'Flowering', description: 'Grain formation starts' },
      { at: 100, name: 'Mature', description: 'Ready for harvest' }
    ],
    environment: {
      idealTemp: { min: 22, max: 32 },
      waterNeeds: 'very high',
    }
  },
  wheat: {
    name: 'Wheat',
    color: '#DAA520',
    flowerColor: '#FFD700',
    stages: [
      { at: 0, name: 'Germination', description: 'Seed sprouting' },
      { at: 20, name: 'Seedling', description: 'Leaf development' },
      { at: 40, name: 'Tillering', description: 'Shoot multiplication' },
      { at: 60, name: 'Stem Extension', description: 'Height increase' },
      { at: 80, name: 'Heading', description: 'Grain head forms' },
      { at: 100, name: 'Ripening', description: 'Golden mature stage' }
    ],
    environment: {
      idealTemp: { min: 15, max: 25 },
      waterNeeds: 'moderate',
    }
  }
};

const CropVisualization = () => {
  const [selectedCrop, setSelectedCrop] = useState('rice');
  const [growth, setGrowth] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [environment, setEnvironment] = useState({
    temperature: 28,
    humidity: 70,
    waterLevel: 80,
    sunlight: 100,
    wind: 10
  });

  const animationRef = useRef(null);
  const cropConfig = CROP_DATABASE[selectedCrop];

  useEffect(() => {
    if (isPlaying && growth < 100) {
      animationRef.current = requestAnimationFrame(() => {
        setGrowth(prev => Math.min(prev + 0.2, 100));
      });
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, growth]);

  // Simulate wind effect
  useEffect(() => {
    const windInterval = setInterval(() => {
      setRotation(prev => (Math.sin(Date.now() / 1000) * environment.wind / 5));
    }, 50);
    return () => clearInterval(windInterval);
  }, [environment.wind]);

  const Plant = ({ growth, rotation }) => {
    const heightScale = growth / 100;
    const stemHeight = 200 * heightScale;
    const leafCount = 6;

    return (
      <g transform={`translate(200, 300) rotate(${rotation})`}>
        {/* Stem */}
        <rect
          x="-2"
          y={-stemHeight}
          width="4"
          height={stemHeight}
          fill="#2F4F2F"
        />

        {/* Leaves */}
        {[...Array(leafCount)].map((_, i) => {
          const leafHeight = (stemHeight / leafCount) * (i + 1);
          const leafScale = Math.min(1, (growth - (i * 15)) / 30);
          if (leafScale <= 0) return null;

          return (
            <g key={i} transform={`translate(0, ${-leafHeight})`}>
              {/* Left leaf */}
              <path
                d={`M 0,0 C -20,-10 -40,-10 -50,0 C -40,10 -20,10 0,0`}
                fill={cropConfig.color}
                transform={`scale(${leafScale})`}
                style={{ transformOrigin: 'center' }}
              />
              {/* Right leaf */}
              <path
                d={`M 0,0 C 20,-10 40,-10 50,0 C 40,10 20,10 0,0`}
                fill={cropConfig.color}
                transform={`scale(${leafScale})`}
                style={{ transformOrigin: 'center' }}
              />
            </g>
          );
        })}

        {/* Flower/Grain */}
        {growth > 60 && (
          <g transform={`translate(0, ${-stemHeight})`}>
            <circle
              r={15}
              fill={cropConfig.flowerColor}
              style={{
                transform: `scale(${(growth - 60) / 40})`,
                transformOrigin: 'center',
              }}
            />
          </g>
        )}
      </g>
    );
  };

  const EnvironmentControl = ({ name, icon: Icon, value, onChange, min = 0, max = 100 }) => (
    <div className="flex items-center gap-2">
      <Icon size={20} />
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <span className="w-12 text-sm">{value}</span>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">{cropConfig.name} Growth</h2>
        </div>
        
        <select 
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          {Object.keys(CROP_DATABASE).map(crop => (
            <option key={crop} value={crop}>
              {CROP_DATABASE[crop].name}
            </option>
          ))}
        </select>
      </div>

      {/* Environment Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <EnvironmentControl
          name="Temperature"
          icon={Thermometer}
          value={environment.temperature}
          onChange={temp => setEnvironment(prev => ({ ...prev, temperature: temp }))}
          min={10}
          max={40}
        />
        <EnvironmentControl
          name="Humidity"
          icon={Droplets}
          value={environment.humidity}
          onChange={hum => setEnvironment(prev => ({ ...prev, humidity: hum }))}
        />
        <EnvironmentControl
          name="Water Level"
          icon={Cloud}
          value={environment.waterLevel}
          onChange={water => setEnvironment(prev => ({ ...prev, waterLevel: water }))}
        />
        <EnvironmentControl
          name="Wind"
          icon={Wind}
          value={environment.wind}
          onChange={wind => setEnvironment(prev => ({ ...prev, wind: wind }))}
        />
      </div>

      {/* SVG Visualization */}
      <div className="relative aspect-video bg-gradient-to-b from-sky-200 to-sky-400 rounded-lg overflow-hidden mb-6">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          {/* Background with water level */}
          <rect x="0" y="300" width="400" height="100" fill="#8B4513" />
          {cropConfig.environment.waterNeeds === 'very high' && (
            <rect
              x="0"
              y={400 - environment.waterLevel}
              width="400"
              height={environment.waterLevel}
              fill="#4FA4DE"
              opacity="0.3"
            />
          )}
          
          {/* Plant Visualization */}
          <Plant growth={growth} rotation={rotation} />
        </svg>

        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
      </div>

      {/* Growth Progress */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">
              {cropConfig.stages.find(stage => stage.at <= growth)?.name}
            </h3>
            <p className="text-sm text-gray-600">
              {cropConfig.stages.find(stage => stage.at <= growth)?.description}
            </p>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${growth}%` }}
          />
        </div>

        {/* Growth Stage Markers */}
        <div className="relative h-8">
          {cropConfig.stages.map((stage, index) => (
            <div
              key={index}
              className="absolute top-0 transform -translate-x-1/2"
              style={{ left: `${stage.at}%` }}
            >
              <div className="w-1 h-3 bg-gray-400" />
              <span className="text-xs text-gray-600 rotate-45 inline-block mt-1">
                {stage.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CropVisualization;