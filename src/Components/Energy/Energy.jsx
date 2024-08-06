import React from 'react';
import './Energy.css';

function Energy({ energy, maxEnergy }) {

    return (
        <div className="energy">
            <p>{energy}/{maxEnergy}</p>
            <p>Energy</p>
        </div>
    );
}

export default Energy;
