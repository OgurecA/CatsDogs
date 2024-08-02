import React from 'react';
import './PersonalCount.css';

function PersonalCount({ personalTrumpCount, personalHarrisCount }) {
    return (
        <div className="personal-count">
            <h2>Your Personal Count</h2>
            <p>Trump Count: {personalTrumpCount}</p>
            <p>Harris Count: {personalHarrisCount}</p>
        </div>
    );
}

export default PersonalCount;
