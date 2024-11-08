import React, { useState, useEffect } from 'react';
import { Play, Pause, Droplets, Sun, Wind, Cloud, Thermometer} from 'lucide-react';

const CROP_DATABASE = {
  rice: {
    name: 'Rice (Paddy)',
    color: '#90EE90',
    flowerColor: '#f4d03f',
    stages: [
      { 
        name: 'Seed',
        description: 'Initial germination phase',
        idealConditions: {
          temperature: 25,
          humidity: 90,
          waterLevel: 90,
          soilHealth: 80,
          sunlight: 70
        }
      },
      {
        name: 'Seedling',
        description: 'Early growth and root development',
        idealConditions: {
          temperature: 28,
          humidity: 85,
          waterLevel: 85,
          soilHealth: 75,
          sunlight: 80
        }
      },
      {
        name: 'Tillering',
        description: 'Multiple shoots development',
        idealConditions: {
          temperature: 30,
          humidity: 80,
          waterLevel: 80,
          soilHealth: 70,
          sunlight: 90
        }
      },
      {
        name: 'Panicle',
        description: 'Reproductive stage begins',
        idealConditions: {
          temperature: 27,
          humidity: 75,
          waterLevel: 75,
          soilHealth: 75,
          sunlight: 95
        }
      },
      {
        name: 'Flowering',
        description: 'Grain formation stage',
        idealConditions: {
          temperature: 25,
          humidity: 70,
          waterLevel: 70,
          soilHealth: 70,
          sunlight: 100
        }
      },
      {
        name: 'Mature',
        description: 'Ready for harvest',
        idealConditions: {
          temperature: 23,
          humidity: 60,
          waterLevel: 50,
          soilHealth: 65,
          sunlight: 90
        }
      }
    ]
  },
  wheat: {
    name: 'Wheat',
    color: '#DAA520',
    flowerColor: '#FFD700',
    stages: [
      {
        name: 'Germination',
        description: 'Seed absorbs water and begins to sprout',
        idealConditions: {
          temperature: 20,
          humidity: 70,
          waterLevel: 65,
          soilHealth: 75,
          sunlight: 60
        }
      },
      {
        name: 'Seedling',
        description: 'First leaves emerge and develop',
        idealConditions: {
          temperature: 18,
          humidity: 65,
          waterLevel: 60,
          soilHealth: 75,
          sunlight: 70
        }
      },
      {
        name: 'Tillering',
        description: 'Multiple stems develop from the base',
        idealConditions: {
          temperature: 22,
          humidity: 60,
          waterLevel: 55,
          soilHealth: 70,
          sunlight: 80
        }
      },
      {
        name: 'Stem Extension',
        description: 'Rapid vertical growth begins',
        idealConditions: {
          temperature: 25,
          humidity: 55,
          waterLevel: 50,
          soilHealth: 70,
          sunlight: 85
        }
      },
      {
        name: 'Heading',
        description: 'Grain heads emerge from the stem',
        idealConditions: {
          temperature: 23,
          humidity: 50,
          waterLevel: 45,
          soilHealth: 65,
          sunlight: 90
        }
      },
      {
        name: 'Ripening',
        description: 'Grains mature and dry',
        idealConditions: {
          temperature: 21,
          humidity: 45,
          waterLevel: 40,
          soilHealth: 60,
          sunlight: 95
        }
      }
    ]
  },
  corn: {
    name: 'Corn (Maize)',
    color: '#FFE4B5',
    flowerColor: '#FFD700',
    stages: [
      {
        name: 'Emergence',
        description: 'Seed germinates and first leaf appears',
        idealConditions: {
          temperature: 25,
          humidity: 75,
          waterLevel: 70,
          soilHealth: 80,
          sunlight: 75
        }
      },
      {
        name: 'Vegetative',
        description: 'Rapid leaf and stem growth',
        idealConditions: {
          temperature: 28,
          humidity: 70,
          waterLevel: 65,
          soilHealth: 75,
          sunlight: 85
        }
      },
      {
        name: 'Tasseling',
        description: 'Male flowers (tassels) develop',
        idealConditions: {
          temperature: 30,
          humidity: 65,
          waterLevel: 60,
          soilHealth: 70,
          sunlight: 90
        }
      },
      {
        name: 'Silking',
        description: 'Female flowers (silks) emerge',
        idealConditions: {
          temperature: 28,
          humidity: 70,
          waterLevel: 65,
          soilHealth: 75,
          sunlight: 95
        }
      },
      {
        name: 'Kernel Development',
        description: 'Kernels fill with starch',
        idealConditions: {
          temperature: 26,
          humidity: 65,
          waterLevel: 60,
          soilHealth: 70,
          sunlight: 90
        }
      },
      {
        name: 'Maturity',
        description: 'Kernels reach full size and harden',
        idealConditions: {
          temperature: 24,
          humidity: 60,
          waterLevel: 50,
          soilHealth: 65,
          sunlight: 85
        }
      }
    ]
  },
  soybean: {
    name: 'Soybean',
    color: '#90EE90',
    flowerColor: '#FFFFFF',
    stages: [
      {
        name: 'Emergence',
        description: 'Cotyledons push through soil surface',
        idealConditions: {
          temperature: 25,
          humidity: 70,
          waterLevel: 65,
          soilHealth: 75,
          sunlight: 70
        }
      },
      {
        name: 'Vegetative',
        description: 'Leaf development and node formation',
        idealConditions: {
          temperature: 27,
          humidity: 65,
          waterLevel: 60,
          soilHealth: 70,
          sunlight: 80
        }
      },
      {
        name: 'Flowering',
        description: 'Blooms appear and pollination occurs',
        idealConditions: {
          temperature: 28,
          humidity: 60,
          waterLevel: 55,
          soilHealth: 70,
          sunlight: 85
        }
      },
      {
        name: 'Pod Development',
        description: 'Pods form and begin filling',
        idealConditions: {
          temperature: 26,
          humidity: 65,
          waterLevel: 60,
          soilHealth: 75,
          sunlight: 90
        }
      },
      {
        name: 'Seed Fill',
        description: 'Seeds develop within pods',
        idealConditions: {
          temperature: 25,
          humidity: 60,
          waterLevel: 55,
          soilHealth: 70,
          sunlight: 85
        }
      },
      {
        name: 'Maturity',
        description: 'Pods and seeds reach full maturity',
        idealConditions: {
          temperature: 23,
          humidity: 55,
          waterLevel: 45,
          soilHealth: 65,
          sunlight: 80
        }
      }
    ]
  },
  cotton: {
    name: 'Cotton',
    color: '#F0F8FF',
    flowerColor: '#FFFAF0',
    stages: [
      {
        name: 'Emergence',
        description: 'Seedling breaks through soil',
        idealConditions: {
          temperature: 28,
          humidity: 65,
          waterLevel: 60,
          soilHealth: 75,
          sunlight: 80
        }
      },
      {
        name: 'Vegetative',
        description: 'Leaf and branch development',
        idealConditions: {
          temperature: 30,
          humidity: 60,
          waterLevel: 55,
          soilHealth: 70,
          sunlight: 85
        }
      },
      {
        name: 'Square Formation',
        description: 'Flower buds (squares) develop',
        idealConditions: {
          temperature: 32,
          humidity: 55,
          waterLevel: 50,
          soilHealth: 70,
          sunlight: 90
        }
      },
      {
        name: 'Flowering',
        description: 'Blooms open and pollination occurs',
        idealConditions: {
          temperature: 30,
          humidity: 60,
          waterLevel: 55,
          soilHealth: 75,
          sunlight: 95
        }
      },
      {
        name: 'Boll Development',
        description: 'Cotton bolls form and expand',
        idealConditions: {
          temperature: 28,
          humidity: 55,
          waterLevel: 50,
          soilHealth: 70,
          sunlight: 90
        }
      },
      {
        name: 'Boll Opening',
        description: 'Bolls split and cotton fibers exposed',
        idealConditions: {
          temperature: 25,
          humidity: 45,
          waterLevel: 40,
          soilHealth: 65,
          sunlight: 95
        }
      }
    ]
  },
  tomato: {
    name: 'Tomato',
    color: '#FF6347',
    flowerColor: '#FFFF00',
    stages: [
      {
        name: 'Germination',
        description: 'Seed sprouts and first leaves emerge',
        idealConditions: {
          temperature: 24,
          humidity: 75,
          waterLevel: 70,
          soilHealth: 80,
          sunlight: 70
        }
      },
      {
        name: 'Vegetative',
        description: 'Rapid leaf and stem growth',
        idealConditions: {
          temperature: 26,
          humidity: 70,
          waterLevel: 65,
          soilHealth: 75,
          sunlight: 80
        }
      },
      {
        name: 'Flowering',
        description: 'Flowers bloom and pollination occurs',
        idealConditions: {
          temperature: 25,
          humidity: 65,
          waterLevel: 60,
          soilHealth: 70,
          sunlight: 85
        }
      },
      {
        name: 'Fruit Set',
        description: 'Small green fruits begin to form',
        idealConditions: {
          temperature: 24,
          humidity: 70,
          waterLevel: 65,
          soilHealth: 75,
          sunlight: 90
        }
      },
      {
        name: 'Fruit Development',
        description: 'Fruits enlarge and begin to ripen',
        idealConditions: {
          temperature: 25,
          humidity: 65,
          waterLevel: 60,
          soilHealth: 70,
          sunlight: 85
        }
      },
      {
        name: 'Ripening',
        description: 'Fruits reach full size and color',
        idealConditions: {
          temperature: 23,
          humidity: 60,
          waterLevel: 55,
          soilHealth: 65,
          sunlight: 80
        }
      }
    ]
  }
};

const InteractiveCropSimulator = () => {
  const [selectedCrop, setSelectedCrop] = useState('rice');
  const [currentStage, setCurrentStage] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [environment, setEnvironment] = useState({
    temperature: 25,
    humidity: 70,
    waterLevel: 80,
    soilHealth: 75,
    sunlight: 85,
    wind: 10
  });
  const [healthStatus, setHealthStatus] = useState(100);

  const cropConfig = CROP_DATABASE[selectedCrop];
  const currentStageConfig = cropConfig.stages[currentStage];

  // Calculate plant health based on environmental conditions
  useEffect(() => {
    const idealConditions = currentStageConfig.idealConditions;
    const healthFactors = {
      temperature: 1 - Math.abs(environment.temperature - idealConditions.temperature) / 50,
      humidity: 1 - Math.abs(environment.humidity - idealConditions.humidity) / 100,
      waterLevel: 1 - Math.abs(environment.waterLevel - idealConditions.waterLevel) / 100,
      soilHealth: 1 - Math.abs(environment.soilHealth - idealConditions.soilHealth) / 100,
      sunlight: 1 - Math.abs(environment.sunlight - idealConditions.sunlight) / 100
    };

    const overallHealth = Object.values(healthFactors).reduce((a, b) => a + b, 0) / 5 * 100;
    setHealthStatus(Math.max(0, Math.min(100, overallHealth)));
  }, [environment, currentStageConfig]);

  // Auto-play functionality
  useEffect(() => {
    let interval;
    if (isAutoPlay && currentStage < cropConfig.stages.length - 1) {
      interval = setInterval(() => {
        if (healthStatus > 60) {  // Only progress if plant is healthy
          setCurrentStage(prev => Math.min(prev + 1, cropConfig.stages.length - 1));
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, currentStage, healthStatus, cropConfig.stages.length]);

  const EnvironmentControl = ({ 
    name, 
    icon: Icon, 
    value, 
    onChange, 
    min = 0, 
    max = 100,
    idealValue 
  }) => (
    <div className="flex flex-col gap-1 p-2 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon size={20} />
          <span className="text-sm font-medium">{name}</span>
        </div>
        <span className="text-sm font-medium">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="text-xs text-gray-500">
        Ideal: {idealValue}
      </div>
    </div>
  );

  // SVG Plant visualization
  const PlantVisualization = () => {
    const heightScale = (currentStage + 1) / cropConfig.stages.length;
    const stemHeight = 200 * heightScale;
    const healthScale = healthStatus / 100;
    
    return (
      <svg viewBox="0 0 400 400" className="w-full h-full">
        {/* Background with water level */}
        <defs>
          <linearGradient id="soilGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#8B4513" />
            <stop offset="100%" stopColor="#654321" />
          </linearGradient>
          <linearGradient id="waterGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#4FA4DE" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#4FA4DE" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Sky background */}
        <rect x="0" y="0" width="400" height="300" 
          fill={`hsl(200, ${environment.humidity}%, ${50 + environment.sunlight/3}%)`} />

        {/* Soil */}
        <rect x="0" y="300" width="400" height="100" fill="url(#soilGradient)" />
        
        {/* Water level */}
        <rect
          x="0"
          y={400 - environment.waterLevel * 2}
          width="400"
          height={environment.waterLevel * 2}
          fill="url(#waterGradient)"
        />

        {/* Plant */}
        <g transform={`translate(200, 300) rotate(${Math.sin(Date.now() / 1000) * environment.wind / 5})`}>
          {/* Stem */}
          <rect
            x="-2"
            y={-stemHeight}
            width="4"
            height={stemHeight}
            fill={`hsl(120, ${healthStatus}%, 30%)`}
          />

          {/* Leaves */}
          {[...Array(currentStage + 1)].map((_, i) => {
            const leafHeight = (stemHeight / (currentStage + 1)) * (i + 1);
            return (
              <g key={i} transform={`translate(0, ${-leafHeight})`}>
                <path
                  d={`M 0,0 C -20,-10 -40,-10 -50,0 C -40,10 -20,10 0,0`}
                  fill={`hsl(120, ${healthStatus}%, 40%)`}
                  transform={`scale(${healthScale})`}
                />
                <path
                  d={`M 0,0 C 20,-10 40,-10 50,0 C 40,10 20,10 0,0`}
                  fill={`hsl(120, ${healthStatus}%, 40%)`}
                  transform={`scale(${healthScale})`}
                />
              </g>
            );
          })}

          {/* Flower/Grain */}
          {currentStage >= 3 && (
            <g transform={`translate(0, ${-stemHeight})`}>
              <circle
                r={15}
                fill={cropConfig.flowerColor}
                opacity={healthScale}
              />
            </g>
          )}
        </g>
      </svg>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">{cropConfig.name} Simulator</h2>
          <p className="text-sm text-gray-600">Stage: {currentStageConfig.name}</p>
        </div>
        <div className="flex gap-4">
          <select 
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            {Object.keys(CROP_DATABASE).map(crop => (
              <option key={crop} value={crop}>{CROP_DATABASE[crop].name}</option>
            ))}
          </select>
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="p-2 rounded-lg bg-green-100 hover:bg-green-200"
          >
            {isAutoPlay ? <Pause size={24} /> : <Play size={24} />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Left panel - Environment Controls */}
        <div className="space-y-4">
          <h3 className="font-semibold">Environmental Controls</h3>
          <EnvironmentControl
            name="Temperature"
            icon={Thermometer}
            value={environment.temperature}
            onChange={temp => setEnvironment(prev => ({ ...prev, temperature: temp }))}
            min={10}
            max={40}
            idealValue={currentStageConfig.idealConditions.temperature}
          />
          <EnvironmentControl
            name="Humidity"
            icon={Droplets}
            value={environment.humidity}
            onChange={hum => setEnvironment(prev => ({ ...prev, humidity: hum }))}
            idealValue={currentStageConfig.idealConditions.humidity}
          />
          <EnvironmentControl
            name="Water Level"
            icon={Cloud}
            value={environment.waterLevel}
            onChange={water => setEnvironment(prev => ({ ...prev, waterLevel: water }))}
            idealValue={currentStageConfig.idealConditions.waterLevel}
          />
          <EnvironmentControl
            name="Sunlight"
            icon={Sun}
            value={environment.sunlight}
            onChange={sun => setEnvironment(prev => ({ ...prev, sunlight: sun }))}
            idealValue={currentStageConfig.idealConditions.sunlight}
          />
          <EnvironmentControl
            name="Wind"
            icon={Wind}
            value={environment.wind}
            onChange={wind => setEnvironment(prev => ({ ...prev, wind: wind }))}
            min={0}
            max={30}
          />
        </div>

        {/* Center panel - Visualization */}
        <div className="col-span-2">
          <div className="aspect-video bg-gradient-to-b from-sky-200 to-sky-400 rounded-lg overflow-hidden mb-4">
            <PlantVisualization />
          </div>

          {/* Stage Controls */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Growth Stages</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm">Plant Health:</span>
                <div className="w-32 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${healthStatus}%`,
                      backgroundColor: `hsl(${healthStatus * 1.2}, 70%, 50%)`
                    }}
                  />
                </div>
                <span className="text-sm font-medium">{Math.round(healthStatus)}%</span>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-2">
              {cropConfig.stages.map((stage, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStage(index)}
                  className={`p-2 rounded-lg text-sm ${
                    currentStage === index
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {stage.name}
                </button>
              ))}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Current Stage: {currentStageConfig.name}</h4>
              <p className="text-sm text-gray-600">{currentStageConfig.description}</p>
              <div className="mt-2 text-sm">
                <strong>Ideal Conditions:</strong>
                <ul className="mt-1 space-y-1">
                  <li>Temperature: {currentStageConfig.idealConditions.temperature}°C</li>
                  <li>Humidity: {currentStageConfig.idealConditions.humidity}%</li>
                  <li>Water Level: {currentStageConfig.idealConditions.waterLevel}%</li>
                  <li>Soil Health: {currentStageConfig.idealConditions.soilHealth}%</li>
                  <li>Sunlight: {currentStageConfig.idealConditions.sunlight}%</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCropSimulator;