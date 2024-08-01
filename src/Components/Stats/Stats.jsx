import React from 'react'
import './Stats.css';
import Count from '../Count/Count';
import ProgressBar from '../Bar/Bar';
import Head from '../Head/Head';

import { HarrisH, TrumpH } from '../Pictures/Pictures';

function Stats({ harrisPercentage, trumpPercentage }) {
    return (
      <div className="stats-container">
        <ProgressBar harrisPercentage={harrisPercentage} trumpPercentage={trumpPercentage} />
        <div className="head-bar">
          <Count count={trumpPercentage} className="TR"/>
        </div>
        <div className="head-bar">
          <Count count={harrisPercentage} className="HS"/>
        </div>
      </div>
    );
  }
  
  export default Stats;