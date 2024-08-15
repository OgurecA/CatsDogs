import React, { useState, useEffect } from 'react';
import './PageInventory.css';
import { Snake, Gorilla, Croc, Elephant, Tiger, Cage } from '../Pictures/Pictures';

const PageInventory = ({ className, onCardSelect }) => {
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const items = [
        {
            title: 'Snake',
            image: Snake
        },
        {
            title: 'Gorilla',
            image: Gorilla
        },
        {
            title: 'Croc',
            image: Croc
        },
        {
            title: 'Elephant',
            image: Elephant
        },
        {
            title: 'Tiger',
            image: Tiger
        }
    ];

    // Состояние, указывающее на то, какие карточки заблокированы (по умолчанию все заблокированы)
    const [lockedCards, setLockedCards] = useState(items.map(() => true));

    useEffect(() => {
        const savedIndex = localStorage.getItem('selectedCardIndex');
        if (savedIndex !== null && !lockedCards[savedIndex]) {
            setSelectedCardIndex(Number(savedIndex));
            onCardSelect(Number(savedIndex)); // Передаем индекс при загрузке
        }
    }, [onCardSelect, lockedCards]);

    const handleCardClick = (index) => {
        if (!lockedCards[index]) { // Проверяем, не заблокирована ли карточка
            setSelectedCardIndex(index);
            localStorage.setItem('selectedCardIndex', index);
            onCardSelect(index); // Передаем индекс выбранной карточки
        }
    };

    return (
        <div className={`page-inventory ${className}`}>
            {items.map((item, index) => (
                <div
                    className={`card ${selectedCardIndex === index ? 'chosen' : ''} ${lockedCards[index] ? 'locked' : ''}`}
                    key={index}
                    onClick={() => handleCardClick(index)}
                >
                    <img src={item.image} alt={item.title} className="card-image" />
                    <h3 className="card-title">{item.title}</h3>
                    {lockedCards[index] && (
                        <div className="lock-overlay">
                            <img src={Cage} alt="Locked" className="lock-icon" />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PageInventory;
