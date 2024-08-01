// Count.jsx
import React from 'react';
import './Count.css'; // Убедитесь, что подключили CSS файл для стилизации

function Count({ count, className, label }) {
    return (
        <div className={`count-container ${className}`}>
            <h1>{label}</h1>
            {count}%
        </div>
    );
}

export default Count;