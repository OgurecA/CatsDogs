import React from 'react'
import './Stats.css';
import Count from '../Count/Count';
import ProgressBar from '../Bar/Bar';

function Stats({ harrisPercentage, trumpPercentage }) {
    return (
      <div className="stats-container">
        <ProgressBar harrisPercentage={harrisPercentage} trumpPercentage={trumpPercentage} />
        <div className="head-bar">
          <Count count={trumpPercentage} className="TR" label={"Wild Hearts"} />
        </div>
        <div className="head-bar">
          <Count count={harrisPercentage} className="HS" label={"Dire Warriors"} />
        </div>
      </div>
    );
  }
  
  export default Stats;