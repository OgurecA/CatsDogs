import React, { useState } from 'react';
import './ButtonBar.css';

const ButtonBar = ({ onOpenShop, onShowSocialPage, onShowInventoryPage, onShowExchangePage, isDisabled }) => {
    const [chosenButton, setChosenButton] = useState(null);

    const handleButtonClick = (index, callback) => {
        setChosenButton(prevIndex => (prevIndex === index ? null : index));
        if (callback) callback();
    };
    return (
        <div className={`button-bar ${isDisabled ? 'disabled' : ''}`}>
            <button className={`button-bar-button ${chosenButton === 0 ? 'chosen' : ''}`} onClick={() => handleButtonClick(0, onOpenShop)} disabled={isDisabled} >
                Office
            </button>
            <button className={`button-bar-button ${chosenButton === 1 ? 'chosen' : ''}`} onClick={() => handleButtonClick(1, onShowSocialPage)} disabled={isDisabled} >
                Media
            </button>
            <button className={`button-bar-button ${chosenButton === 2 ? 'chosen' : ''}`} onClick={() => handleButtonClick(2, onShowInventoryPage)} disabled={isDisabled} >
                Hideout
            </button>
            <button className={`button-bar-button ${chosenButton === 3 ? 'chosen' : ''}`} onClick={() => handleButtonClick(3, onShowExchangePage)} disabled={isDisabled} >
                Exchange
            </button>
        </div>
    );
};

export default ButtonBar;