
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SidePanel from './components/SidePanel';
import PredictionCanvas from './components/PredictionCanvas';
import './PredictionPage.css';

export default function PredictionPage() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        <SidePanel />
        <PredictionCanvas />
      </div>
    </DndProvider>
  );
}



