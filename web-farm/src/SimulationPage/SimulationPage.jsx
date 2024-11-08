import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SidePanel from './components/SidePanel';
import './SimulationPage.css';
import FarmCropSimulator from './1';

export default function SimulationPage() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        {/* <SidePanel /> */}
        <FarmCropSimulator />
      </div>
    </DndProvider>
  );
}
