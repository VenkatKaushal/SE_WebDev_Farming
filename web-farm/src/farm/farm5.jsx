import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Droplets, Sun, Wind, Cloud, Thermometer } from 'lucide-react';

// Database remains the same as before...
const CROP_DATABASE = {
  // ... (previous crop database content)
};

const CropGrowthSimulator = () => {
  const [selectedCrop, setSelectedCrop] = useState('rice');
  const [growth, setGrowth] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [rotation, setRotation] = useState({ x: 20, y: 45 });
  const [environment, setEnvironment] = useState({
    temperature: 28,
    humidity: 70,
    waterLevel: 80,
    sunlight: 100,
    wind: 10
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const cropConfig = CROP_DATABASE[selectedCrop];

  // Environment effects and mouse handlers remain the same...

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
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">{cropConfig.name} Simulator</h2>
          <p className="text-gray-600">Season: {cropConfig.seasons.join(', ')}</p>
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

      {/* 3D Visualization Container */}
      <div className="relative h-96 mb-6 border rounded-lg overflow-hidden bg-gradient-to-b from-sky-200 to-sky-400">
        <div 
          className="absolute inset-0"
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Scene Container */}
          <div
            className="absolute inset-0"
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.1s ease-out'
            }}
          >
            {/* Ground */}
            <div 
              className="absolute bottom-0 w-full h-32"
              style={{ transform: 'translateZ(0)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-800 to-yellow-600" />
              {cropConfig.environment.waterNeeds === 'very high' && (
                <div 
                  className="absolute inset-0 bg-blue-400 opacity-30"
                  style={{ height: `${environment.waterLevel}%` }}
                />
              )}
            </div>

            {/* Plant Container */}
            <div 
              className="absolute left-1/2 bottom-32 w-4"
              style={{
                height: `${(growth / 100) * 200}px`,
                transform: 'translateX(-50%) translateZ(0)',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Stem */}
              <div 
                className="absolute inset-0 bg-green-600"
                style={{ transform: 'translateZ(2px)' }}
              />

              {/* Leaves */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-16 h-8 transition-all duration-300"
                  style={{
                    bottom: `${i * 20}%`,
                    left: i % 2 ? '100%' : '-100%',
                    transform: `
                      translateZ(4px)
                      rotate(${i % 2 ? -45 : 45}deg)
                      ${environment.wind > 20 ? `rotateY(${Math.sin(Date.now() / 1000 + i) * (environment.wind / 20)}deg)` : ''}
                    `,
                    backgroundColor: cropConfig.baseColor,
                    opacity: growth > i * 15 ? 1 : 0,
                    transformOrigin: i % 2 ? 'left' : 'right'
                  }}
                />
              ))}

              {/* Crop Head */}
              {growth > 50 && (
                <div 
                  className="absolute -top-8 left-1/2 w-16 h-16 rounded-full transition-all duration-300"
                  style={{
                    transform: `
                      translateX(-50%)
                      translateZ(4px)
                      scale(${(growth - 50) / 50})
                      ${environment.wind > 20 ? `rotateY(${Math.sin(Date.now() / 1000) * (environment.wind / 20)}deg)` : ''}
                    `,
                    backgroundColor: 
                      selectedCrop === 'cotton' ? '#fff' : 
                      selectedCrop === 'wheat' ? '#daa520' : 
                      selectedCrop === 'rice' ? '#f4d03f' : '#32CD32'
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Growth Progress and Controls */}
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
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${growth}%` }}
          />
        </div>

        {/* Stage Markers */}
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

export default CropGrowthSimulator;