import React from 'react';
import './PersonalCount.css';

function PersonalCount({ favorite, personalCount }) {

    return (
        <div className="personal-count">
            <p>Your Votes: {Math.abs(personalCount)}
            Favorite: {favorite}</p>
        </div>
    );
}

export default PersonalCount;
