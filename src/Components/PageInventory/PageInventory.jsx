import React, { useState, useEffect } from 'react';
import './PageInventory.css';
import { Snake, Gorilla, Croc, Elephant, Tiger, Cage } from '../Pictures/Pictures';

const PageInventory = ({ className, onCardSelect, personalPoints, setPersonalPoints }) => {
    const items = [
        { title: 'Snake', image: Snake, price: 0 }, // Змея открыта по умолчанию и бесплатна
        { title: 'Gorilla', image: Gorilla, price: 10 },
        { title: 'Croc', image: Croc, price: 20 },
        { title: 'Elephant', image: Elephant, price: 30 },
        { title: 'Tiger', image: Tiger, price: 40 }
    ];

    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [cardToUnlock, setCardToUnlock] = useState(null);

    const [lockedCards, setLockedCards] = useState(items.map((_, index) => index !== 0)); // Первая карточка открыта

    useEffect(() => {
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
    };

    const unlockCard = () => {
        if (cardToUnlock !== null) {
            const cardPrice = items[cardToUnlock].price;
            if (personalPoints >= cardPrice) {
                setLockedCards(prevState => {
                    const newLockedCards = [...prevState];
                    newLockedCards[cardToUnlock] = false;
                    newLockedCards[0] = false; // Всегда оставляем первую карточку разблокированной
                    localStorage.setItem('lockedCards', JSON.stringify(newLockedCards));
                    return newLockedCards;
                });
                setPersonalPoints(prevPoints => prevPoints - cardPrice); // Вычитаем очки
                closeModal();
            } else {
                alert('Недостаточно очков для разблокировки этой карточки.');
            }
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
                    <h3 className="card-title">{item.title} {lockedCards[index]}</h3>
                    {lockedCards[index] && (
                        <div className="lock-overlay">
                            <img src={Cage} alt="Locked" className="lock-icon" />
                        </div>
                    )}
                </div>
            ))}

            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Персонаж заблокирован</h2>
                        <p>Для разблокировки персонажа потребуется {items[cardToUnlock].price} очков. Ваши текущие очки: {personalPoints}.</p>
                        <button onClick={unlockCard}>Освободить</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PageInventory;
