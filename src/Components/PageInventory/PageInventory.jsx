import React, { useState, useEffect } from 'react';
import './PageInventory.css';
import { Snake, Gorilla, Croc, Elephant, Tiger, Cage } from '../Pictures/Pictures';

const PageInventory = ({ className, onCardSelect, personalPoints, setPersonalPoints, updateCounts, updateAnimalStatus }) => {
    const items = [
        { title: 'Snake', image: Snake, price: 0 }, // Змея открыта по умолчанию и бесплатна
        { title: 'Gorilla', image: Gorilla, price: 100 },
        { title: 'Croc', image: Croc, price: 40 },
        { title: 'Elephant', image: Elephant, price: 30 },
        { title: 'Tiger', image: Tiger, price: 40 }
    ];

    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [cardToUnlock, setCardToUnlock] = useState(null);
    const [isButtonShaking, setIsButtonShaking] = useState(false);

    const [lockedCards, setLockedCards] = useState(items.map((_, index) => index !== 0)); // Первая карточка открыта

    useEffect(() => {

        //localStorage.clear();

        const savedLockedCards = JSON.parse(localStorage.getItem('lockedCards'));
        if (savedLockedCards) {
            savedLockedCards[0] = false; // Всегда оставляем первую карточку (Snake) разблокированной
            setLockedCards(savedLockedCards);
        }

        const savedIndex = localStorage.getItem('selectedCardIndex');
        if (savedIndex !== null && !savedLockedCards?.[savedIndex]) {
            setSelectedCardIndex(Number(savedIndex));
            onCardSelect(Number(savedIndex));
        }
    }, [onCardSelect]);

    const handleCardClick = (index) => {
        if (!lockedCards[index]) {
            setSelectedCardIndex(index);
            localStorage.setItem('selectedCardIndex', index);
            onCardSelect(index);
        } else {
            setCardToUnlock(index);
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setIsButtonShaking(false);
    };

    const unlockCard = () => {
        if (cardToUnlock !== null) {
            const cardPrice = items[cardToUnlock].price;
            if (personalPoints >= cardPrice) {

                const updatedPoints = personalPoints - cardPrice;

                setLockedCards(prevState => {
                    const newLockedCards = [...prevState];
                    newLockedCards[cardToUnlock] = false;
                    newLockedCards[0] = false; // Всегда оставляем первую карточку разблокированной
                    localStorage.setItem('lockedCards', JSON.stringify(newLockedCards));
                    return newLockedCards;
                });
                updateAnimalStatus(cardToUnlock, true);
                setPersonalPoints(updatedPoints);
                updateCounts(updatedPoints);
                closeModal();
            } else {
                setIsButtonShaking(true); // Активируем эффект вибрации
                setTimeout(() => setIsButtonShaking(false), 300); 
            }
        }
    };

    return (
        <div className={`page-inventory no-select ${className}`}>
            {items.map((item, index) => (
                <div
                    className={`card ${selectedCardIndex === index ? 'chosen' : ''} ${lockedCards[index] ? 'locked' : ''}`}
                    key={index}
                    onClick={() => handleCardClick(index)}
                >
                    <img src={item.image} alt={item.title} className="card-image" />
                    <h3 className="card-title">{item.title} {lockedCards[index]}</h3>
                    {lockedCards[index] && (
                        <div className="lock-overlay">
                            <img src={Cage} alt="Locked" className="lock-icon" />
                        </div>
                    )}
                </div>
            ))}

            {showModal && (
                <div className="modal-overlay no-select" onClick={closeModal}>
                <div className="modal-content no-select" onClick={(e) => e.stopPropagation()}>
                    <h2>{items[cardToUnlock].title} заперт</h2>
                <div className={`card locked no-select`}>
                    <img src={items[cardToUnlock].image} alt={items[cardToUnlock].title} className="card-image" />
                    <div className="lock-overlay">
                    <img src={Cage} alt="Locked" className="lock-icon" />
                    </div>
                </div>
                <p>Цена свободы: {items[cardToUnlock].price}.</p>
                <button onClick={unlockCard} className={isButtonShaking ? 'vibrate' : ''}>
                    Освободить
                </button>
                </div>
                </div>
            )}
        </div>
    );
};

export default PageInventory;
