import React from 'react';
import './PersonalCount.css';

function PersonalCount({ name, personalCount }) {

    return (
        <div className="personal-count">
            <p>{name}</p>
            <p>Score: {Math.abs(personalCount)}</p>
        </div>
    );
}

export default PersonalCount;
