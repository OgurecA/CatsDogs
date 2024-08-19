import React, { useState, useEffect } from 'react';
import './PageShop.css';

const PageShop = ({ className, title, votesA, votesB, personalCount, checkedLinks }) => {
    const [displayedVotes, setDisplayedVotes] = useState("Choose Your Team!");
    const [titleName, setTitleName] = useState("none");
    const [showModal, setShowModal] = useState(false);
    const [inputText, setInputText] = useState("");

    useEffect(() => {
        if (title === 'Dire Warriors') {
            setTitleName("DireWarriors")
            setDisplayedVotes(votesA);
        } else if (title === 'Wild Hearts') {
            setDisplayedVotes(votesB);
            setTitleName("WildHearts")
        }
    }, [title, votesA, votesB]); // Добавляем зависимости

    const handleBuyClick = () => {
        setShowModal(true); // Показываем модальное окно при нажатии на кнопку "Buy"
    };

    const closeModal = () => {
        setShowModal(false); // Закрываем модальное окно
    };

    const handleInputChange = (e) => {
        setInputText(e.target.value); // Обновляем состояние inputText при изменении текста в поле ввода
    };

    const handleSubmit = () => {
        // Логика обработки данных из модального окна
        console.log("Submitted text:", inputText);
        closeModal(); // Закрываем модальное окно после отправки данных
    };

    return (
        <div className={`page-shop ${className}`}>
            <div className={`shop-title ${titleName}`}>
                {title}
            </div>
            <ul className="shop-list">
                <li className="list-item">
                <span className="WH">WH</span> Score: {votesB}
                </li>
                <li className="list-item">
                <span className="DW">DW</span> Score: {votesA}
                </li>
                <li className="list-item">
                    Personal Score: {Math.abs(personalCount)}
                </li>
            </ul>
            <button className="buy-button" onClick={handleBuyClick}>
                Buy
            </button>
            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Purchase Item</h2>
                        <p>Please enter the amount you wish to spend:</p>
                        <input
                            type="text"
                            value={inputText}
                            onChange={handleInputChange}
                            className="modal-input"
                        />
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PageShop;
