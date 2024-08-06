import React from 'react';
import './Energy.css';

function Energy({ energy }) {

    return (
        <div className="energy">
            <p>Energy:</p>
            <p>{energy}</p>
        </div>
    );
}

export default Energy;
