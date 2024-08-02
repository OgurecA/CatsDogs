import React from 'react';
import './PersonalCount.css';

function PersonalCount({ favorite, personalCount }) {

    return (
        <div className="personal-count">
            <p>Votes: {Math.abs(personalCount)}</p>
            <p>Favorite: {favorite}</p>
        </div>
    );
}

export default PersonalCount;
