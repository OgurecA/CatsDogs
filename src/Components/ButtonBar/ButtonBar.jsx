import React, { useState, useEffect } from 'react';
import './ButtonBar.css';

const ButtonBar = ({ onOpenShop, onShowSocialPage, onShowInventoryPage, onShowExchangePage, isDisabled }) => {
    const [chosenButton, setChosenButton] = useState(null);
    const [timeLeft, setTimeLeft] = useState('');

    const handleButtonClick = (index, callback) => {
        setChosenButton(prevIndex => (prevIndex === index ? null : index));
        if (callback) callback();
    };

    const targetDate = new Date('2024-12-21T12:00:00'); // 20 августа 2024 года в 12:00

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const difference = targetDate - now;

            if (difference <= 0) {
                return "00:00:00"; // Если время прошло, показываем нули
            }

            const hours = String(Math.floor(difference / 1000 / 60 / 60)).padStart(2, '0');
            const minutes = String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0');
            const seconds = String(Math.floor((difference / 1000) % 60)).padStart(2, '0');

            return `${hours}:${minutes}:${seconds}`;
        };

        setTimeLeft(calculateTimeLeft()); // Обновляем состояние сразу при загрузке

        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft()); // Обновляем состояние каждую секунду
        }, 1000);

        return () => clearInterval(interval); // Очищаем интервал при размонтировании компонента
    }, [targetDate]);

    return (
        <div className={`button-bar ${isDisabled ? 'disabled' : ''}`}>
            <button className={`button-bar-button ${chosenButton === 0 ? 'chosen' : ''}`} onClick={() => handleButtonClick(0, onOpenShop)} disabled={isDisabled} >
                LAIR
            </button>
            <button className={`button-bar-button ${chosenButton === 1 ? 'chosen' : ''}`} onClick={() => handleButtonClick(1, onShowSocialPage)} disabled={isDisabled} >
                TRIBE
            </button>
            <button className={`button-bar-button ${chosenButton === 2 ? 'chosen' : ''}`} onClick={() => handleButtonClick(2, onShowInventoryPage)} disabled={isDisabled} >
                PIT
            </button>
            <button className={`button-bar-button ${chosenButton === 3 ? 'chosen' : ''}`} onClick={() => handleButtonClick(3, onShowExchangePage)} disabled={true} >
                {timeLeft}
            </button>
        </div>
    );
};

export default ButtonBar;
