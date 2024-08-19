import React, { useState, useEffect } from 'react';
import './PageInventory.css';
import { Snake, Gorilla, Croc, Elephant, Tiger, Cage } from '../Pictures/Pictures';

const PageInventory = ({ className, onCardSelect, personalPoints, setPersonalPoints, updateCounts, updateAnimalStatus, playersFavorite, updatedContribution }) => {
    const items = [
        { title: 'Snake', image: Snake, price: 0, description: "ohotnik na mishej" }
    ];

    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showSelectedCardModal, setShowSelectedCardModal] = useState(false);
    const [cardToUnlock, setCardToUnlock] = useState(null);
    const [isButtonShaking, setIsButtonShaking] = useState(false);

    const [lockedCards, setLockedCards] = useState(items.map((_, index) => index !== 0)); // Первая карточка открыта

    useEffect(() => {

        localStorage.clear();

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
            if (selectedCardIndex === index) {
                // Если нажали на выбранную карточку, показываем новое модальное окно
                setShowSelectedCardModal(true);
            } else {
                setSelectedCardIndex(index);
                localStorage.setItem('selectedCardIndex', index);
                onCardSelect(index);
            }
        } else {
            setCardToUnlock(index);
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setIsButtonShaking(false);
    };
    const closeSelectedCardModal = () => {
        setShowSelectedCardModal(false);
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
                updateCounts(updatedPoints, playersFavorite, updatedContribution);
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
                    <p className="modal-description">*{items[cardToUnlock].description}</p>
                    <p className="modal-price">Цена свободы: {items[cardToUnlock].price}</p>
                <button onClick={unlockCard} className={isButtonShaking ? 'vibrate' : ''}>
                    Освободить
                </button>
                </div>
                </div>
            )}
            {showSelectedCardModal && (
                <div className="modal-overlay selected no-select" onClick={closeSelectedCardModal}>
                    <div className="modal-content selected no-select" onClick={(e) => e.stopPropagation()}>
                        <h2>Вы выбрали {items[selectedCardIndex].title}</h2>
                        <div className={`card no-select`}>
                            <img src={items[selectedCardIndex].image} alt={items[selectedCardIndex].title} className="card-image" />
                        </div>
                        <p className="modal-description">Описание: {items[selectedCardIndex].description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PageInventory;
