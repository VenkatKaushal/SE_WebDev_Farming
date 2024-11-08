import React from 'react';

const SketchfabViewer = ({ modelUrl }) => (
  <div className="sketchfab-embed-wrapper">
    <iframe
      title="Sketchfab Model"
      frameBorder="0"
      allowFullScreen
      allow="autoplay; fullscreen; xr-spatial-tracking"
      src={modelUrl}
      style={{ width: '100%', height: '100%' }}
    />
  </div>
);

export default SketchfabViewer;
