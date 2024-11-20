import React from 'react';
import './SeasonSelector.css';

const SeasonSelector = ({ selectedSeason, onChange }) => {
  const seasons = [
    {
      name: 'Summer',
      icon: (
        <svg viewBox="0 0 24 24" className="w-10 h-10">
          <circle cx="12" cy="12" r="5" fill="#F97316" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
            <line
              key={angle}
              x1="12"
              y1="12"
              x2={12 + 4 * Math.cos((angle * Math.PI) / 180)}
              y2={12 + 4 * Math.sin((angle * Math.PI) / 180)}
              stroke="#F97316"
              strokeWidth="2"
              transform={`rotate(${angle}, 12, 12)`}
            />
          ))}
        </svg>
      ),
    },
    {
      name: 'Winter',
      icon: (
        <svg viewBox="0 0 24 24" className="w-10 h-10">
          <path
            d="M12,3 L13,7 L12,8 L11,7 Z M12,21 L13,17 L12,16 L11,17 Z M3,12 L7,13 L8,12 L7,11 Z M21,12 L17,13 L16,12 L17,11 Z"
            fill="#94A3B8"
          />
          <path
            d="M5.6,5.6 L8.5,8.5 L8.5,7.5 L7.5,7.5 Z M18.4,18.4 L15.5,15.5 L15.5,16.5 L16.5,16.5 Z M5.6,18.4 L8.5,15.5 L7.5,15.5 L7.5,16.5 Z M18.4,5.6 L15.5,8.5 L16.5,8.5 L16.5,7.5 Z"
            fill="#94A3B8"
          />
          <circle cx="12" cy="12" r="2" fill="#94A3B8" />
        </svg>
      ),
    },
    {
      name: 'Kharif',
      icon: (
        <svg viewBox="0 0 24 24" className="w-10 h-10">
          <path
            d="M12,3 C7,3 3,7 3,12 C3,17 7,21 12,21 C17,21 21,17 21,12 C21,7 17,3 12,3 Z"
            fill="none"
            stroke="#22C55E"
            strokeWidth="1.5"
          />
          <path
            d="M12,7 C12,7 8,10 8,14 C8,16 10,18 12,18 C14,18 16,16 16,14 C16,10 12,7 12,7 Z"
            fill="#22C55E"
          />
        </svg>
      ),
    },
    {
      name: 'Rabi',
      icon: (
        <svg viewBox="0 0 24 24" className="w-10 h-10">
          <path
            d="M12,4 L13,7 L15,5 L14,8 L17,7 L15,9 L18,10 L15,11 L17,13 L14,12 L15,15 L12,13 L13,16 L11,14 L11,17 L10,14 L8,16 L9,13 L6,14 L8,12 L5,11 L8,10 L6,8 L9,9 L8,6 L10,8 L11,5 Z"
            fill="#EAB308"
          />
          <circle cx="12" cy="12" r="2" fill="#CA8A04" />
        </svg>
      ),
    },
    {
      name: 'Autumn',
      icon: (
        <svg viewBox="0 0 24 24" className="w-10 h-10">
          <path
            d="M12,3 C7,3 3,7 3,12 C3,17 7,21 12,21 C17,21 21,17 21,12 C21,7 17,3 12,3 Z"
            fill="none"
            stroke="#EA580C"
            strokeWidth="1.5"
          />
          {[1, 2, 3].map((i) => (
            <path
              key={i}
              d={`M${10 + i * 2},8 Q${12},10 ${14 - i * 2},12 T${10 + i * 2},16`}
              fill="none"
              stroke="#EA580C"
              strokeWidth="1.5"
            />
          ))}
        </svg>
      ),
    },
    {
      name: 'Whole Year',
      icon: (
        <svg viewBox="0 0 24 24" className="w-10 h-10">
          <circle cx="12" cy="12" r="8" fill="none" stroke="#475569" strokeWidth="2" />
          <path
            d="M12,4 C8,4 4,8 4,12 C4,16 8,20 12,20"
            fill="none"
            stroke="#64748B"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="2" fill="#64748B" />
        </svg>
      ),
    },
  ];

  return (
    <div className="">
      <label className="">
        Season
        <span className="tooltip-icon" data-tooltip="The season in which the crop is grown.">i</span>
      </label>
      <div className="grid">
        {seasons.map((season) => (
          <button
            key={season.name}
            type="button"
            onClick={() => onChange({ target: { name: 'season', value: season.name } })}
            className={selectedSeason === season.name ? 'selected' : ''}
          >
            {season.icon}
            <span>{season.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeasonSelector;
