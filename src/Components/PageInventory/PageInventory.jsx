import React, { useState, useEffect } from 'react';
import './PageInventory.css';
import { Gorilla, Cage, Krisa, Bik } from '../Pictures/Pictures';

const PageInventory = ({ className, onCardSelect, personalPoints, setPersonalPoints, updateCounts, updateAnimalStatus, playersFavorite, updatedContribution, userId, lang }) => {
    const items = [
        { 
            title: 'Anatoly', 
            image: Gorilla, 
            price: 0, 
            description: lang === 'ru' ? "Придерживается правил: сначала поешь сам, потом накорми семью" : "He follows the rule: first, feed yourself, then take care of your family." 
        },
        { 
            title: 'Olev', 
            image: Krisa, 
            price: 100, 
            description: lang === 'ru' ? "Пытался быть юристом, но его сущность взяла верх." : "Tried to be a lawyer, but his true nature took over." 
        },
        { 
            title: 'Bernard', 
            image: Bik, 
            price: 40, 
            description: lang === 'ru' ? "Верит в труд и общее благо. Его мечта — единое стадо, где каждый пашет до изнеможения." : "Believes in hard work and the common good. His dream is a united herd where everyone works tirelessly to the point of exhaustion." 
        }
    ];

    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showSelectedCardModal, setShowSelectedCardModal] = useState(false);
    const [cardToUnlock, setCardToUnlock] = useState(null);
    const [isButtonShaking, setIsButtonShaking] = useState(false);

    const [lockedCards, setLockedCards] = useState(items.map((_, index) => index !== 0)); // Первая карточка открыта

    useEffect(() => {
        // Запрос к серверу для получения данных о разблокированных животных
        fetch(`https://btc24news.online/get-animal-status?id=${userId}`)
            .then(response => response.json())
            .then(data => {
                // Здесь предполагается, что данные с сервера возвращаются в виде объекта,
                // где ключи это animal0, animal1, ..., animalN, а значения - boolean (true/false)
                
                const updatedLockedCards = items.map((_, index) => !data[`animal${index}`]); 
                setLockedCards(updatedLockedCards);
                
                // Загрузка последнего выбранного животного, если оно разблокировано
                const savedIndex = localStorage.getItem('selectedCardIndex');
                if (savedIndex !== null && !updatedLockedCards[savedIndex]) {
                    setSelectedCardIndex(Number(savedIndex));
                    onCardSelect(Number(savedIndex));
                }
            })
            .catch(error => {
                console.error('Error fetching animal status:', error);
            });
    }, [onCardSelect, userId]);

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
                <div className="modal-overlay locked no-select" onClick={closeModal}>
                <div className="modal-content locked no-select" onClick={(e) => e.stopPropagation()}>
                    <h2>{items[cardToUnlock].title} is imprisoned</h2>
                <div className={`card locked no-select`}>
                    <img src={items[cardToUnlock].image} alt={items[cardToUnlock].title} className="card-image" />
                    <div className="lock-overlay">
                    <img src={Cage} alt="Locked" className="lock-icon" />
                    </div>
                </div>
                    <p className="modal-price">Rescue for: {items[cardToUnlock].price}</p>
                <button onClick={unlockCard} className={isButtonShaking ? 'vibrate' : ''}>
                    SET FREE
                </button>
                </div>
                </div>
            )}
            {showSelectedCardModal && (
                <div className="modal-overlay selected no-select" onClick={closeSelectedCardModal}>
                    <div className="modal-content selected no-select" onClick={(e) => e.stopPropagation()}>
                        <h2>{items[selectedCardIndex].title}</h2>
                        <div className={`card no-select`}>
                            <img src={items[selectedCardIndex].image} alt={items[selectedCardIndex].title} className="card-image" />
                        </div>
                        <p className="modal-description">{items[selectedCardIndex].description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PageInventory;
