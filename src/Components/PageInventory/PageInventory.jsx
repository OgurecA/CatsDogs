import React, { useState, useEffect } from 'react';
import './PageInventory.css';
import { Snake, Gorilla, Croc, Elephant, Tiger, Cage } from '../Pictures/Pictures';

const PageInventory = ({ className, onCardSelect }) => {
    const items = [
        { title: 'Snake', image: Snake },
        { title: 'Gorilla', image: Gorilla },
        { title: 'Croc', image: Croc },
        { title: 'Elephant', image: Elephant },
        { title: 'Tiger', image: Tiger }
    ];

    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [cardToUnlock, setCardToUnlock] = useState(null);

    // Инициализация состояния заблокированных карточек: первая карточка (Snake) всегда разблокирована
    const [lockedCards, setLockedCards] = useState(
        items.map((_, index) => index !== 0)
    );

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
            setLockedCards(prevState => {
                const newLockedCards = [...prevState];
                newLockedCards[cardToUnlock] = false;
                newLockedCards[0] = false; // Всегда оставляем первую карточку разблокированной
                localStorage.setItem('lockedCards', JSON.stringify(newLockedCards));
                return newLockedCards;
            });
            closeModal();
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

            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Персонаж заблокирован</h2>
                        <p>Этот персонаж в настоящее время недоступен. Разблокируйте его, чтобы выбрать.</p>
                        <button onClick={unlockCard}>Открыть</button>
                        <button onClick={closeModal}>Закрыть</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PageInventory;
