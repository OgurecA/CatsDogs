import React from 'react';
import './Energy.css';

function Energy({ energy }) {

    return (
        <div className="energy">
            <p>{energy}/100</p>
            <p>Energy</p>
        </div>
    );
}

export default Energy;
