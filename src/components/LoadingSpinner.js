import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading map data...</p>
    </div>
  );
};

export default LoadingSpinner;