import React from 'react';
import './Energy.css';

function Energy({ energy, maxEnergy }) {

    return (
        <div className="energy">
            <p>Energy</p>
            <p>{energy}/{maxEnergy}</p>
        </div>
    );
}

export default Energy;
