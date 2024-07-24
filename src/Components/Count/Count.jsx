// Count.jsx
import React from 'react';
import './Count.css'; // Убедитесь, что подключили CSS файл для стилизации

function Count({ count, className }) {
    return (
        <div className={`count-container ${className}`}>
            {count}%
        </div>
    );
}

export default Count;