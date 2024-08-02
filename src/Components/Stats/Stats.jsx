import React from 'react'
import './Stats.css';
import Count from '../Count/Count';
import ProgressBar from '../Bar/Bar';

function Stats({ harrisPercentage, trumpPercentage }) {
    return (
      <div className="stats-container">
        <ProgressBar harrisPercentage={harrisPercentage} trumpPercentage={trumpPercentage} />
        <div className="head-bar right-align">
          <Count count={trumpPercentage} className="TR" label={"Donald Trump"} />
        </div>
        <div className="head-bar  left-align">
          <Count count={harrisPercentage} className="HS" label={"Kamilla Harris"} />
        </div>
      </div>
    );
  }
  
  export default Stats;