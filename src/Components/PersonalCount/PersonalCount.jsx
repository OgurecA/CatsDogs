import React from 'react';
import './PersonalCount.css';

function PersonalCount({ name, personalCount }) {

    return (
        <div className="personal-count">
            <p>Score: {Math.abs(personalCount)}</p>
            <p>Character: {name}</p>
        </div>
    );
}

export default PersonalCount;
