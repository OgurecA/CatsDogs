import React, { useState, useEffect } from 'react';
import './PageShop.css';
import DarkWolfBack from '../Photoes/FonWolfWarm1.png';
import WolfBackCold from '../Photoes/FonWolfCold1.png';

const PageShop = ({ className, title, votesA, votesB, personalCount, contribution }) => {
    const [displayedVotes, setDisplayedVotes] = useState("Choose Your Team!");
    const [displayedVotesOpponent, setDisplayedVotesOpponent] = useState("Who will be your enemy?");
    const [titleName, setTitleName] = useState("none");
    const [showModal, setShowModal] = useState(false);
    const [inputText, setInputText] = useState("");
    const [backgroundImage, setBackgroundImage] = useState('');

    useEffect(() => {
        if (title === 'Dire Warriors') {
            setTitleName("DireWarriors");
            setDisplayedVotes(votesA);
            setDisplayedVotesOpponent(votesB);
            setBackgroundImage(WolfBackCold)
        } else if (title === 'Wild Hearts') {
            setTitleName("WildHearts");
            setDisplayedVotes(votesB);
            setDisplayedVotesOpponent(votesA);
            setBackgroundImage(DarkWolfBack)
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
        <div className={`page-shop ${className}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className={`shop-title ${titleName}`}>
                {title}
            </div>
            <ul className="shop-list">
                <li className="list-item">
                    Team: {displayedVotes}
                </li>
                <li className="list-item">
                    Opponents: {displayedVotesOpponent}
                </li>
                <li className="list-item">
                    Personal: {Math.abs(personalCount)}
                </li>
                <li className="list-item">
                    Contribution: {contribution}
                </li>
            </ul>
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
