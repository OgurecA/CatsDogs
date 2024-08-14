import React, { useState, useEffect } from 'react';
import './ButtonBar.css';

const ButtonBar = ({ onOpenShop, onShowSocialPage, onShowInventoryPage, onShowExchangePage, isDisabled }) => {
    const [chosenButton, setChosenButton] = useState(null);
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    // Установите целевую дату и время
    const targetDate = new Date('2024-08-20T12:00:00'); // 20 августа 2024 года в 12:00

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const calculateTimeLeft = () => {
        const now = new Date();
        const difference = targetDate - now;

        if (difference <= 0) {
            return "00:00:00"; // Если время прошло, показываем нули
        }

        const hours = Math.floor(difference / 1000 / 60 / 60);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

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
            <button className={`button-bar-button ${chosenButton === 3 ? 'chosen' : ''}`} onClick={() => handleButtonClick(3, onShowExchangePage)} disabled={true} >
                {timeLeft}
            </button>
        </div>
    );
};

export default ButtonBar;