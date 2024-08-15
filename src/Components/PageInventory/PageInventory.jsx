import React, { useState, useEffect } from 'react';
import './PageInventory.css';
import { Snake, Gorilla, Croc, Elephant, Tiger, Cage } from '../Pictures/Pictures';

const PageInventory = ({ className, onCardSelect }) => {
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [showModal, setShowModal] = useState(false); // Состояние для отображения модального окна
    const [cardToUnlock, setCardToUnlock] = useState(null); // Состояние для карточки, которую нужно разблокировать
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

    // Состояние, указывающее на то, какие карточки заблокированы
    const [lockedCards, setLockedCards] = useState(items.map(() => true));

    // Загрузка состояния заблокированных карточек при монтировании компонента
    useEffect(() => {
        const savedLockedCards = JSON.parse(localStorage.getItem('lockedCards'));
        if (savedLockedCards) {
            setLockedCards(savedLockedCards);
        }

        const savedIndex = localStorage.getItem('selectedCardIndex');
        if (savedIndex !== null && !savedLockedCards[savedIndex]) {
            setSelectedCardIndex(Number(savedIndex));
            onCardSelect(Number(savedIndex)); // Передаем индекс при загрузке
        }
    }, [onCardSelect]);

    const handleCardClick = (index) => {
        if (!lockedCards[index]) { // Проверяем, не заблокирована ли карточка
            setSelectedCardIndex(index);
            localStorage.setItem('selectedCardIndex', index);
            onCardSelect(index); // Передаем индекс выбранной карточки
        } else {
            setCardToUnlock(index); // Запоминаем, какую карточку нужно разблокировать
            setShowModal(true); // Показать модальное окно, если карточка заблокирована
        }
    };

    const closeModal = () => {
        setShowModal(false); // Закрыть модальное окно
    };

    const unlockCard = () => {
        if (cardToUnlock !== null) {
            setLockedCards(prevState => {
                const newLockedCards = [...prevState];
                newLockedCards[cardToUnlock] = false; // Разблокируем карточку
                localStorage.setItem('lockedCards', JSON.stringify(newLockedCards)); // Сохраняем новое состояние в localStorage
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
