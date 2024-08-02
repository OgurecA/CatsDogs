import React from 'react';
import './PersonalCount.css';

function PersonalCount({ favorite, personalCount }) {

    return (
        <div className="personal-count">
            <h2>Your Votes</h2>
            <p>{personalCount}</p>
            <p>Favorite: {favorite}</p>
        </div>
    );
}

export default PersonalCount;
