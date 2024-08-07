import React from 'react';
import './ButtonBar.css';
import { Link } from 'react-router-dom';

const ButtonBar = ({ onOpenShop }) => {
    return (
        <div className="button-bar">
            <button className="button-bar-button" onClick={onOpenShop}>
                Магазин
            </button>
            <Link to="/social">
                <button className="button-bar-button">
                    Социальные сети
                </button>
            </Link>
            <button className="button-bar-button">
                Опция 3
            </button>
        </div>
    );
};

export default ButtonBar;
