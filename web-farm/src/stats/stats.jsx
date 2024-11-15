import React from 'react';
import { Line } from 'react-chartjs-2'; // Chart.js for graphing
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './stats.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Stats = () => {
  
  const cropProductionData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Crop Yield (kg/ha)',
        data: [1500, 1700, 1800, 2000, 2200, 2300, 2500, 2700, 3000, 2800, 2600, 2400],
        borderColor: '#22C55E', // Line color
        backgroundColor: 'rgba(34, 197, 94, 0.2)', // Area fill color
        fill: true,
        tension: 0.4, // Smooth curve
      },
    ],
  };

  return (
    <div className="stats-container p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Crop Production Statistics</h1>

      {/* Statistics Summary Section */}
      <section className="statistics-summary mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="stat-card bg-green-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Total Crop Yield</h3>
            <p className="text-2xl font-bold">15,000 tons</p>
          </div>
          <div className="stat-card bg-blue-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Average Yield per Hectare</h3>
            <p className="text-2xl font-bold">2,500 kg/ha</p>
          </div>
          <div className="stat-card bg-yellow-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Top Producing Region</h3>
            <p className="text-2xl font-bold">Southern Plains</p>
          </div>
        </div>
      </section>

      {/* Crop Production Growth Chart */}
      <section className="crop-production-chart mb-8">
        <h2 className="text-2xl font-semibold text-center mb-4">Monthly Crop Yield Growth</h2>
        <Line data={cropProductionData} options={{ responsive: true, plugins: { title: { display: true, text: 'Monthly Crop Yield Growth' } } }} />
      </section>

      {/* General Agricultural Stats */}
      <section className="general-stats mb-8">
        <h2 className="text-2xl font-semibold text-center mb-4">General Agricultural Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="stat-card bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Total Land Area (ha)</h3>
            <p className="text-2xl font-bold">50,000 ha</p>
          </div>
          <div className="stat-card bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Water Usage (m³)</h3>
            <p className="text-2xl font-bold">1,000,000 m³</p>
          </div>
          <div className="stat-card bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Total Harvest (tons)</h3>
            <p className="text-2xl font-bold">30,000 tons</p>
          </div>
        </div>
      </section>

      {/* Farming Insights */}
      <section className="farming-insights mb-8">
        <h2 className="text-2xl font-semibold text-center mb-4">Farming Insights</h2>
        <ul className="list-disc list-inside">
          <li><span className="font-semibold">Crop rotation practices</span> improve soil fertility and boost yields.</li>
          <li><span className="font-semibold">Precision farming</span> helps optimize water and fertilizer use.</li>
          <li><span className="font-semibold">Climate change</span> is affecting crop patterns and production rates.</li>
          <li><span className="font-semibold">Sustainable farming techniques</span> are increasing adoption for higher yield and environmental protection.</li>
        </ul>
      </section>
    </div>
  );
};

export default Stats;
