import React from 'react';
import './Bar.css';

function ProgressBar({ harrisPercentage, trumpPercentage }) {
    return (
      <div className="progress-bar-container">
        <div className="progress-bar harris" style={{
          width: `${harrisPercentage}%`
        }}></div>
        <div className="progress-bar trump" style={{
          width: `${trumpPercentage}%`
        }}></div>
      </div>
    );
  }

export default ProgressBar;
