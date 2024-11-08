import React, { useState } from 'react';
import { Droplets, Sun, Wind } from 'lucide-react';

const CROP_DATABASE = {
    rice: {
        name: 'Rice (Paddy)',
        color: '#90EE90',
        flowerColor: '#f4d03f',
        stages: [
            { 
                name: 'Seed',
                description: 'Initial germination phase',
                idealConditions: { temperature: 25, humidity: 90, waterLevel: 90, soilHealth: 80, sunlight: 70 }
            },
            { name: 'Seedling', description: 'Early growth and root development', idealConditions: { temperature: 28, humidity: 85, waterLevel: 85, soilHealth: 75, sunlight: 80 }},
            { name: 'Tillering', description: 'Multiple shoots development', idealConditions: { temperature: 30, humidity: 80, waterLevel: 80, soilHealth: 70, sunlight: 90 }},
            { name: 'Panicle', description: 'Reproductive stage begins', idealConditions: { temperature: 27, humidity: 75, waterLevel: 75, soilHealth: 75, sunlight: 95 }},
            { name: 'Flowering', description: 'Grain formation stage', idealConditions: { temperature: 25, humidity: 70, waterLevel: 70, soilHealth: 70, sunlight: 100 }},
            { name: 'Mature', description: 'Ready for harvest', idealConditions: { temperature: 23, humidity: 60, waterLevel: 50, soilHealth: 65, sunlight: 90 }}
        ]
    },
    wheat: {
        name: 'Wheat',
        color: '#e2c16e',
        flowerColor: '#f4d03f',
        stages: [
            { name: 'Seed', description: 'Germination and root establishment', idealConditions: { temperature: 15, humidity: 70, waterLevel: 60, soilHealth: 75, sunlight: 50 }},
            { name: 'Tillering', description: 'Formation of side shoots', idealConditions: { temperature: 20, humidity: 65, waterLevel: 55, soilHealth: 70, sunlight: 60 }},
            { name: 'Jointing', description: 'Stem elongation begins', idealConditions: { temperature: 22, humidity: 60, waterLevel: 50, soilHealth: 70, sunlight: 70 }},
            { name: 'Heading', description: 'Head formation', idealConditions: { temperature: 25, humidity: 55, waterLevel: 50, soilHealth: 75, sunlight: 80 }},
            { name: 'Flowering', description: 'Pollination occurs', idealConditions: { temperature: 28, humidity: 50, waterLevel: 45, soilHealth: 75, sunlight: 90 }},
            { name: 'Mature', description: 'Ready for harvest', idealConditions: { temperature: 30, humidity: 45, waterLevel: 40, soilHealth: 75, sunlight: 90 }}
        ]
    },
    corn: {
        name: 'Corn',
        color: '#ffcc00',
        flowerColor: '#ffcc00',
        stages: [
            { name: 'Seed', description: 'Initial germination phase', idealConditions: { temperature: 18, humidity: 80, waterLevel: 75, soilHealth: 80, sunlight: 70 }},
            { name: 'Seedling', description: 'Development of leaves and roots', idealConditions: { temperature: 20, humidity: 75, waterLevel: 80, soilHealth: 75, sunlight: 80 }},
            { name: 'Vegetative', description: 'Leaf development continues', idealConditions: { temperature: 25, humidity: 70, waterLevel: 75, soilHealth: 70, sunlight: 90 }},
            { name: 'Tasseling', description: 'Tassels emerge', idealConditions: { temperature: 28, humidity: 65, waterLevel: 70, soilHealth: 75, sunlight: 95 }},
            { name: 'Silking', description: 'Silks appear for pollination', idealConditions: { temperature: 30, humidity: 60, waterLevel: 65, soilHealth: 75, sunlight: 100 }},
            { name: 'Mature', description: 'Ready for harvest', idealConditions: { temperature: 27, humidity: 55, waterLevel: 60, soilHealth: 70, sunlight: 90 }}
        ]
    },
    soybean: {
        name: 'Soybean',
        color: '#8fbc8f',
        flowerColor: '#ff69b4',
        stages: [
            { name: 'Seed', description: 'Initial germination phase', idealConditions: { temperature: 20, humidity: 80, waterLevel: 75, soilHealth: 80, sunlight: 70 }},
            { name: 'Vegetative', description: 'Leaf and root development', idealConditions: { temperature: 25, humidity: 75, waterLevel: 80, soilHealth: 75, sunlight: 80 }},
            { name: 'Flowering', description: 'Flower development', idealConditions: { temperature: 27, humidity: 70, waterLevel: 70, soilHealth: 75, sunlight: 90 }},
            { name: 'Pod Formation', description: 'Pods begin to develop', idealConditions: { temperature: 28, humidity: 65, waterLevel: 65, soilHealth: 75, sunlight: 95 }},
            { name: 'Mature', description: 'Ready for harvest', idealConditions: { temperature: 25, humidity: 60, waterLevel: 60, soilHealth: 70, sunlight: 90 }}
        ]
    },
    cotton: {
        name: 'Cotton',
        color: '#d2b48c',
        flowerColor: '#ffb6c1',
        stages: [
            { name: 'Seed', description: 'Initial germination phase', idealConditions: { temperature: 21, humidity: 80, waterLevel: 75, soilHealth: 80, sunlight: 70 }},
            { name: 'Vegetative', description: 'Leaf and stem development', idealConditions: { temperature: 26, humidity: 75, waterLevel: 80, soilHealth: 75, sunlight: 80 }},
            { name: 'Flowering', description: 'Flower development', idealConditions: { temperature: 28, humidity: 70, waterLevel: 70, soilHealth: 75, sunlight: 90 }},
            { name: 'Boll Formation', description: 'Bolls begin to develop', idealConditions: { temperature: 30, humidity: 65, waterLevel: 65, soilHealth: 75, sunlight: 95 }},
            { name: 'Mature', description: 'Ready for harvest', idealConditions: { temperature: 25, humidity: 60, waterLevel: 60, soilHealth: 70, sunlight: 90 }}
        ]
    },
    potato: {
        name: 'Potato',
        color: '#deb887',
        flowerColor: '#ff1493',
        stages: [
            { name: 'Seed', description: 'Initial germination phase', idealConditions: { temperature: 15, humidity: 80, waterLevel: 75, soilHealth: 80, sunlight: 70 }},
            { name: 'Sprouting', description: 'Sprouts begin to develop', idealConditions: { temperature: 18, humidity: 75, waterLevel: 80, soilHealth: 75, sunlight: 75 }},
            { name: 'Flowering', description: 'Flowers bloom on the plant', idealConditions: { temperature: 20, humidity: 70, waterLevel: 70, soilHealth: 75, sunlight: 80 }},
            { name: 'Tuber Formation', description: 'Tuber development begins', idealConditions: { temperature: 22, humidity: 65, waterLevel: 65, soilHealth: 75, sunlight: 85 }},
            { name: 'Mature', description: 'Ready for harvest', idealConditions: { temperature: 20, humidity: 60, waterLevel: 60, soilHealth: 70, sunlight: 90 }}
        ]
    },
    sunflower: {
        name: 'Sunflower',
        color: '#ffcc00',
        flowerColor: '#ffeb3b',
        stages: [
            { name: 'Seed', description: 'Initial germination phase', idealConditions: { temperature: 15, humidity: 80, waterLevel: 70, soilHealth: 80, sunlight: 70 }},
            { name: 'Seedling', description: 'Young plant starts to grow', idealConditions: { temperature: 20, humidity: 70, waterLevel: 75, soilHealth: 75, sunlight: 80 }},
            { name: 'Vegetative', description: 'Leaf development continues', idealConditions: { temperature: 25, humidity: 65, waterLevel: 75, soilHealth: 70, sunlight: 90 }},
            { name: 'Bud Formation', description: 'Flower bud begins to form', idealConditions: { temperature: 28, humidity: 60, waterLevel: 70, soilHealth: 70, sunlight: 95 }},
            { name: 'Flowering', description: 'Flower fully blooms', idealConditions: { temperature: 30, humidity: 50, waterLevel: 65, soilHealth: 75, sunlight: 100 }},
            { name: 'Mature', description: 'Ready for harvest', idealConditions: { temperature: 25, humidity: 40, waterLevel: 50, soilHealth: 65, sunlight: 90 }}
        ]
    }
};

const PlantVisualization = ({ cropConfig, currentStage, environment, healthStatus }) => {
    const heightScale = (currentStage + 1) / cropConfig.stages.length;
    const stemHeight = 200 * heightScale;
    const healthScale = healthStatus / 100;

    const renderCropPlant = () => {
        switch (cropConfig.name) {
            case 'Rice (Paddy)':
                return RicePlant();
            case 'Wheat':
                return renderWheatPlant();
            case 'Corn':
                return renderCornPlant();
            case 'Soybean':
                return renderSoybeanPlant();
            case 'Cotton':
                return renderCottonPlant();
            case 'Potato':
                return renderPotatoPlant();
            case 'Sunflower':
                return renderSunflowerPlant();
            default:
                return null;
        }
    };

    // const renderRicePlant = () => (
    //     <g transform={`translate(200, 300) rotate(${Math.sin(Date.now() / 1000) * environment.wind / 5})`}>
    //         {/* Main stem */}
    //         <rect
    //             x="-2"
    //             y={-stemHeight}
    //             width="4"
    //             height={stemHeight}
    //             fill={`hsl(120, ${healthStatus}%, 30%)`}
    //         />
    //         {[...Array(currentStage + 1)].map((_, i) => {
    //             const leafHeight = (stemHeight / (currentStage + 1)) * (i + 1);
    //             return (
    //                 <g key={i} transform={`translate(0, ${-leafHeight})`}>
    //                     <path
    //                         d={`M 0,0 C -30,-5 -60,-5 -70,10 C -60,25 -30,25 0,0`}
    //                         fill={`hsl(120, ${healthStatus}%, 40%)`}
    //                         transform={`scale(${healthScale})`}
    //                     />
    //                     <path
    //                         d={`M 0,0 C 30,-5 60,-5 70,10 C 60,25 30,25 0,0`}
    //                         fill={`hsl(120, ${healthStatus}%, 40%)`}
    //                         transform={`scale(${healthScale})`}
    //                     />
    //                 </g>
    //             );
    //         })}
    //         {currentStage >= 4 && (
    //             <g transform={`translate(0, ${-stemHeight})`}>
    //                 <circle cx="0" cy="0" r="5" fill={cropConfig.flowerColor} />
    //             </g>
    //         )}
    //     </g>
    // );

    const RicePlant = ({ currentStage, healthStatus, healthScale, environment }) => {
        const stemHeight = 100; 
        const leafCount = Math.min(currentStage + 2, 5); 
        const leafWidth = 8; 
        const leafLength = 60; 
        const grainCount = 5; 
    
        return (
            <g transform={`translate(200, 300) rotate(${Math.sin(Date.now() / 1000) * environment.wind / 5})`}>
                {/* Main stem */}
                <rect
                    x="-2"
                    y={-stemHeight}
                    width="4"
                    height={stemHeight}
                    fill={`hsl(120, ${healthStatus}%, 30%)`}
                />
    
                {/* Rice leaves */}
                {[...Array(leafCount)].map((_, i) => {
                    const angle = (i - leafCount / 2) * (Math.PI / 10); // stagger the leaves
                    return (
                        <g key={i} transform={`translate(0, ${-stemHeight}) rotate(${angle * (180 / Math.PI)})`}>
                            {/* Rice leaf */}
                            <path
                                d={`M 0,0 C 0,-${leafLength * 0.5} ${leafWidth},-${leafLength} ${leafWidth},0 C ${leafWidth},${leafLength} 0,${leafLength * 0.5} 0,0`}
                                fill={`hsl(120, ${healthStatus}%, 40%)`}
                                transform={`scale(${healthScale})`}
                            />
                            {/* Rice grains */}
                            {[...Array(grainCount)].map((_, j) => {
                                const grainX = (Math.random() * leafWidth - leafWidth / 2) * healthScale; // random x position for grains
                                const grainY = -leafLength * 0.2 + Math.random() * (leafLength * 0.4); // random y position for grains
                                return (
                                    <circle
                                        key={j}
                                        cx={grainX}
                                        cy={grainY}
                                        r={2}
                                        fill="gold" // color of the rice grains
                                    />
                                );
                            })}
                        </g>
                    );
                })}
    
                {/* Optional: flower head for mature plants */}
                {currentStage >= 4 && (
                    <g transform={`translate(0, ${-stemHeight})`}>
                        <circle cx="0" cy="0" r="5" fill="pink" />
                    </g>
                )}
            </g>
        );
    };

    const renderWheatPlant = () => (
        <g transform={`translate(200, 300) rotate(${Math.sin(Date.now() / 1000) * environment.wind / 5})`}>
            <rect
                x="-2"
                y={-stemHeight}
                width="4"
                height={stemHeight}
                fill={`hsl(45, ${healthStatus}%, 30%)`}
            />
            {[...Array(currentStage + 1)].map((_, i) => {
                const leafHeight = (stemHeight / (currentStage + 1)) * (i + 1);
                return (
                    <g key={i} transform={`translate(0, ${-leafHeight})`}>
                        <path
                            d={`M 0,0 C -20,-10 -40,-10 -50,5 C -40,20 -20,20 0,0`}
                            fill={`hsl(45, ${healthStatus}%, 40%)`}
                            transform={`scale(${healthScale})`}
                        />
                        <path
                            d={`M 0,0 C 20,-10 40,-10 50,5 C 40,20 20,20 0,0`}
                            fill={`hsl(45, ${healthStatus}%, 40%)`}
                            transform={`scale(${healthScale})`}
                        />
                    </g>
                );
            })}
            {currentStage >= 4 && (
                <g transform={`translate(0, ${-stemHeight})`}>
                    <circle cx="0" cy="0" r="5" fill={cropConfig.flowerColor} />
                </g>
            )}
        </g>
    );

    const renderCornPlant = () => (
        <g transform={`translate(200, 300) rotate(${Math.sin(Date.now() / 1000) * environment.wind / 5})`}>
            <rect
                x="-2"
                y={-stemHeight}
                width="4"
                height={stemHeight}
                fill={`hsl(40, ${healthStatus}%, 30%)`}
            />
            {[...Array(currentStage + 1)].map((_, i) => {
                const leafHeight = (stemHeight / (currentStage + 1)) * (i + 1);
                return (
                    <g key={i} transform={`translate(0, ${-leafHeight})`}>
                        <path
                            d={`M 0,0 C -30,-5 -60,-5 -70,10 C -60,25 -30,25 0,0`}
                            fill={`hsl(40, ${healthStatus}%, 40%)`}
                            transform={`scale(${healthScale})`}
                        />
                        <path
                            d={`M 0,0 C 30,-5 60,-5 70,10 C 60,25 30,25 0,0`}
                            fill={`hsl(40, ${healthStatus}%, 40%)`}
                            transform={`scale(${healthScale})`}
                        />
                    </g>
                );
            })}
            {currentStage >= 4 && (
                <g transform={`translate(0, ${-stemHeight})`}>
                    <circle cx="0" cy="0" r="5" fill={cropConfig.flowerColor} />
                </g>
            )}
        </g>
    );

    const renderSoybeanPlant = () => (
        <g transform={`translate(200, 300) rotate(${Math.sin(Date.now() / 1000) * environment.wind / 5})`}>
            <rect
                x="-2"
                y={-stemHeight}
                width="4"
                height={stemHeight}
                fill={`hsl(120, ${healthStatus}%, 30%)`}
            />
            {[...Array(currentStage + 1)].map((_, i) => {
                const leafHeight = (stemHeight / (currentStage + 1)) * (i + 1);
                return (
                    <g key={i} transform={`translate(0, ${-leafHeight})`}>
                        <path
                            d={`M 0,0 C -30,-5 -60,-5 -70,10 C -60,25 -30,25 0,0`}
                            fill={`hsl(120, ${healthStatus}%, 40%)`}
                            transform={`scale(${healthScale})`}
                        />
                        <path
                            d={`M 0,0 C 30,-5 60,-5 70,10 C 60,25 30,25 0,0`}
                            fill={`hsl(120, ${healthStatus}%, 40%)`}
                            transform={`scale(${healthScale})`}
                        />
                    </g>
                );
            })}
            {currentStage >= 4 && (
                <g transform={`translate(0, ${-stemHeight})`}>
                    <circle cx="0" cy="0" r="5" fill={cropConfig.flowerColor} />
                </g>
            )}
        </g>
    );

    const renderCottonPlant = () => (
        <g transform={`translate(200, 300) rotate(${Math.sin(Date.now() / 1000) * environment.wind / 5})`}>
            <rect
                x="-2"
                y={-stemHeight}
                width="4"
                height={stemHeight}
                fill={`hsl(30, ${healthStatus}%, 30%)`}
            />
            {[...Array(currentStage + 1)].map((_, i) => {
                const leafHeight = (stemHeight / (currentStage + 1)) * (i + 1);
                return (
                    <g key={i} transform={`translate(0, ${-leafHeight})`}>
                        <path
                            d={`M 0,0 C -30,-5 -60,-5 -70,10 C -60,25 -30,25 0,0`}
                            fill={`hsl(30, ${healthStatus}%, 40%)`}
                            transform={`scale(${healthScale})`}
                        />
                        <path
                            d={`M 0,0 C 30,-5 60,-5 70,10 C 60,25 30,25 0,0`}
                            fill={`hsl(30, ${healthStatus}%, 40%)`}
                            transform={`scale(${healthScale})`}
                        />
                    </g>
                );
            })}
            {currentStage >= 4 && (
                <g transform={`translate(0, ${-stemHeight})`}>
                    <circle cx="0" cy="0" r="5" fill={cropConfig.flowerColor} />
                </g>
            )}
        </g>
    );

    const renderPotatoPlant = () => (
        <g transform={`translate(200, 300) rotate(${Math.sin(Date.now() / 1000) * environment.wind / 5})`}>
            <rect
                x="-2"
                y={-stemHeight}
                width="4"
                height={stemHeight}
                fill={`hsl(30, ${healthStatus}%, 30%)`}
            />
            {[...Array(currentStage + 1)].map((_, i) => {
                const leafHeight = (stemHeight / (currentStage + 1)) * (i + 1);
                return (
                    <g key={i} transform={`translate(0, ${-leafHeight})`}>
                        <path
                            d={`M 0,0 C -20,-5 -40,-5 -50,10 C -40,25 -20,25 0,0`}
                            fill={`hsl(30, ${healthStatus}%, 40%)`}
                            transform={`scale(${healthScale})`}
                        />
                        <path
                            d={`M 0,0 C 20,-5 40,-5 50,10 C 40,25 20,25 0,0`}
                            fill={`hsl(30, ${healthStatus}%, 40%)`}
                            transform={`scale(${healthScale})`}
                        />
                    </g>
                );
            })}
            {currentStage >= 4 && (
                <g transform={`translate(0, ${-stemHeight})`}>
                    <circle cx="0" cy="0" r="5" fill={cropConfig.flowerColor} />
                </g>
            )}
        </g>
    );

    const renderSunflowerPlant = () => (
        <g transform={`translate(200, 300) rotate(${Math.sin(Date.now() / 1000) * environment.wind / 5})`}>
            <rect
                x="-2"
                y={-stemHeight}
                width="4"
                height={stemHeight}
                fill={`hsl(60, ${healthStatus}%, 30%)`}
            />
            {[...Array(currentStage + 1)].map((_, i) => {
                const leafHeight = (stemHeight / (currentStage + 1)) * (i + 1);
                return (
                    <g key={i} transform={`translate(0, ${-leafHeight})`}>
                        <path
                            d={`M 0,0 C -30,-5 -60,-5 -70,10 C -60,25 -30,25 0,0`}
                            fill={`hsl(60, ${healthStatus}%, 40%)`}
                            transform={`scale(${healthScale})`}
                        />
                        <path
                            d={`M 0,0 C 30,-5 60,-5 70,10 C 60,25 30,25 0,0`}
                            fill={`hsl(60, ${healthStatus}%, 40%)`}
                            transform={`scale(${healthScale})`}
                        />
                    </g>
                );
            })}
            {currentStage >= 4 && (
                <g transform={`translate(0, ${-stemHeight})`}>
                    <circle cx="0" cy="0" r="10" fill={cropConfig.flowerColor} />
                </g>
            )}
        </g>
    );

    return <svg width="400" height="400">{renderCropPlant()}</svg>;
};

const CropGrowthVisualizer = () => {
    const [currentCrop, setCurrentCrop] = useState('rice');
    const [currentStage, setCurrentStage] = useState(0);
    const [healthStatus, setHealthStatus] = useState(100);
    const [environment, setEnvironment] = useState({ sunlight: 80, humidity: 70, wind: 5 });

    const cropConfig = CROP_DATABASE[currentCrop];

    const handleNextStage = () => {
        if (currentStage < cropConfig.stages.length - 1) {
            setCurrentStage(currentStage + 1);
        }
    };

    const handleCropChange = (e) => {
        setCurrentCrop(e.target.value);
        setCurrentStage(0); // Reset stage on crop change
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Crop Growth Visualizer</h1>
            <div>
                <label htmlFor="crop-select">Choose a crop: </label>
                <select id="crop-select" value={currentCrop} onChange={handleCropChange}>
                    {Object.keys(CROP_DATABASE).map((crop) => (
                        <option key={crop} value={crop}>
                            {CROP_DATABASE[crop].name}
                        </option>
                    ))}
                </select>
                <button onClick={handleNextStage}>Next Stage</button>
            </div>
            <div>
                <h2>{cropConfig.name} - Stage: {cropConfig.stages[currentStage].name}</h2>
                <p>{cropConfig.stages[currentStage].description}</p>
                <p>Ideal Conditions:</p>
                <ul>
                    <li>Temperature: {cropConfig.stages[currentStage].idealConditions.temperature} °C</li>
                    <li>Humidity: {cropConfig.stages[currentStage].idealConditions.humidity} %</li>
                    <li>Water Level: {cropConfig.stages[currentStage].idealConditions.waterLevel} %</li>
                    <li>Soil Health: {cropConfig.stages[currentStage].idealConditions.soilHealth} %</li>
                    <li>Sunlight: {cropConfig.stages[currentStage].idealConditions.sunlight} %</li>
                </ul>
            </div>
            <PlantVisualization cropConfig={cropConfig} currentStage={currentStage} environment={environment} healthStatus={healthStatus} />
        </div>
    );
};

export default CropGrowthVisualizer;
