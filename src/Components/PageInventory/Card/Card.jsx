import React from 'react';
import './Card.css';

const Card = ({ image, title, description, onUse }) => {
    return (
        <div className="card">
            <img src={image} alt={title} className="card-image" />
            <h3 className="card-title">{title}</h3>
            <p className="card-description">{description}</p>
            <button className="card-button" onClick={onUse}>Использовать</button>
        </div>
    );
};

export default Card;
