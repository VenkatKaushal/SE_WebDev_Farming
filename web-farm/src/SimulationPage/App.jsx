import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SidePanel from './components/SidePanel';
import SimulationCanvas from './components/SimulationCanvas';
import './App.css';

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        <SidePanel />
        <SimulationCanvas />
      </div>
    </DndProvider>
  );
}
