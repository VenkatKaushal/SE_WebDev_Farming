// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlantListPage from './pages/PlantListPage';
import CategoryPage from './pages/CategoryPage';
import PlantDetailPage from './pages/PlantDetailPage';
import HomePage from './pages/Homepage';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/plants" element={<PlantListPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/plant/:id" element={<PlantDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
