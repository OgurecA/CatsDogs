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
          <div className="name">Trump</div>
          <Count count={trumpPercentage} className="TR"/>
        </div>
        <div className="head-bar">
          <div className="name">Harris</div>
          <Count count={harrisPercentage} className="HS"/>
        </div>
      </div>
    );
  }
  
  export default Stats;