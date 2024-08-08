import React, { useState } from 'react';
import './ButtonBar.css';

const ButtonBar = ({ onOpenShop, onShowSocialPage, onShowInventoryPage, onShowExchangePage }) => {
    const [chosenButton, setChosenButton] = useState(null);

    const handleButtonClick = (index, callback) => {
        setChosenButton(prevIndex => (prevIndex === index ? null : index));
        if (callback) callback();
    };
    return (
        <div className="button-bar">
            <button className={`button-bar-button ${chosenButton === 0 ? 'chosen' : ''}`} onClick={() => handleButtonClick(0, onOpenShop)}>
                
            </button>
            <button className={`button-bar-button ${chosenButton === 1 ? 'chosen' : ''}`} onClick={() => handleButtonClick(1, onShowSocialPage)}>
                
            </button>
            <button className={`button-bar-button ${chosenButton === 2 ? 'chosen' : ''}`} onClick={() => handleButtonClick(2, onShowInventoryPage)}>
                
            </button>
            <button className={`button-bar-button ${chosenButton === 3 ? 'chosen' : ''}`} onClick={() => handleButtonClick(3, onShowExchangePage)}>
                
            </button>
        </div>
    );
};

export default ButtonBar;