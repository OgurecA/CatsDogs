import React from 'react';
import './ButtonBar.css';

const ButtonBar = ({ onOpenShop, onShowSocialPage }) => {
    const [chosenButton, setChosenButton] = useState(null);

    const handleButtonClick = (index, callback) => {
        setChosenButton(prevIndex => (prevIndex === index ? null : index));
        if (callback) callback();
    };
    return (
        <div className="button-bar">
            <button className={`button-bar-button ${chosenButton === 0 ? 'chosen' : ''}`} onClick={() => handleButtonClick(0, null)}>
                Магазин
            </button>
            <button className={`button-bar-button ${chosenButton === 1 ? 'chosen' : ''}`} onClick={() => handleButtonClick(1, onShowSocialPage)}>
                Социальные сети
            </button>
            <button className={`button-bar-button ${chosenButton === 2 ? 'chosen' : ''}`} onClick={() => handleButtonClick(2, null)}>
                Опция 3
            </button>
            <button className={`button-bar-button ${chosenButton === 3 ? 'chosen' : ''}`} onClick={() => handleButtonClick(3, null)}>
                Опция 4
            </button>
        </div>
    );
};

export default ButtonBar;