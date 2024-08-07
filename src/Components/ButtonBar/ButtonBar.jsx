import React from 'react';
import './ButtonBar.css';

const ButtonBar = ({ onOpenShop }) => {
    return (
        <div className="button-bar">
            <button className="button-bar-button" onClick={onOpenShop}>
                Магазин
            </button>
            <button className="button-bar-button">
                Опция 2
            </button>
            <button className="button-bar-button">
                Опция 3
            </button>
        </div>
    );
};

export default ButtonBar;