import React from 'react'
import './Stats.css';
import Count from '../Count/Count';
import ProgressBar from '../Bar/Bar';

function Stats({ harrisPercentage, trumpPercentage }) {
    return (
      <div className="stats-container">
        <ProgressBar harrisPercentage={harrisPercentage} trumpPercentage={trumpPercentage} />
        <div className="head-bar">
          <Count count={trumpPercentage} className="TR" label={"Team B"} />
        </div>
        <div className="head-bar">
          <Count count={harrisPercentage} className="HS" label={"Team A"} />
        </div>
      </div>
    );
  }
  
  export default Stats;