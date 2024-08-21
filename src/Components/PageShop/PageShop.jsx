import React, { useState, useEffect } from 'react';
import './PageShop.css';
import DarkWolfBack from '../Photoes/FonWolfWarm1.png';
import WolfBackCold from '../Photoes/FonWolfCold1.png';

const PageShop = ({ className, title, votesA, votesB, personalCount, contribution, updateCounts, setPersonalPoints }) => {
    const [displayedVotes, setDisplayedVotes] = useState("Choose Your Team!");
    const [displayedVotesOpponent, setDisplayedVotesOpponent] = useState("Who will be your enemy?");
    const [titleName, setTitleName] = useState("none");
    const [promoInput, setPromoInput] = useState('');
    const [donateInput, setDonateInput] = useState('');
    const [backgroundImage, setBackgroundImage] = useState('');

    const updatedContribution = contribution;
    const playersFavorite = title;

    const [showPromoModal, setShowPromoModal] = useState(false);
    const [showDonateModal, setShowDonateModal] = useState(false);
    
    const [isButtonShaking, setIsButtonShaking] = useState(false);

    const promoCodes = [
        { code: "PROMO2024", points: 1000, expiry: new Date('2024-12-31') },
        { code: "WINTER2024", points: 500, expiry: new Date('2024-08-21') },
        { code: "SUMMER2024", points: 2000, expiry: new Date('2024-08-20') },
        // Добавьте больше промокодов по необходимости
    ];

    const handlePromoClick = () => {
        setShowPromoModal(true);
    };

    const handleDonateClick = () => {
        setShowDonateModal(true);
    };

    const closePromoModal = () => {
        setShowPromoModal(false);
    };

    const closeDonateModal = () => {
        setShowDonateModal(false);
    };

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


    const handlePromoInputChange = (event) => {
        setPromoInput(event.target.value);
    };
    const handlePromoSubmit = () => {
        const currentDate = new Date();

        const matchedPromo = promoCodes.find(promo => 
            promo.code === promoInput && promo.expiry >= currentDate
        );
        // Проверяем, соответствует ли введенный код правильному промокоду
        if (matchedPromo) {
            const updatedPoints = personalCount + matchedPromo.points;
            updateCounts(updatedPoints, playersFavorite, updatedContribution);
            closeModal(); // Закрываем модальное окно
            setPromoInput(""); // Очищаем поле ввода
        } else {
            setIsButtonShaking(true);
            setTimeout(() => setIsButtonShaking(false), 300);
        }
    };

    const handleDonateInputChange = (event) => {
        setDonateInput(event.target.value);
    };


    return (
        <div className={`page-shop ${className}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className={`shop-title ${titleName}`}>
                {title}
            </div>
            <ul className="shop-list">
                <li className="list-item">
                    Comrades: {displayedVotes}
                </li>
                <li className="list-item">
                    Enemy: {displayedVotesOpponent}
                </li>
                <li className="list-item">
                    Personal: {Math.abs(personalCount)}
                </li>
                <li className="list-item">
                    Contribution: {contribution}
                </li>
            </ul>
            <div className="button-container">
                <button className="promo-button" onClick={handlePromoClick}>Promo</button>
                <button className="donate-button" onClick={handleDonateClick}>Donate</button>
            </div>

            {showPromoModal && (
                <div className="modal-overlay promo" onClick={closePromoModal}>
                    <div className="modal-content promo" onClick={(e) => e.stopPropagation()}>
                        <h2>GIFT CODE</h2>
                        <input
                            type="text"
                            value={promoInput}
                            onChange={handlePromoInputChange}
                            className="modal-input"
                        />
                        <button className={`modal-button promo ${isButtonShaking ? 'vibrate' : ''}`} onClick={handlePromoSubmit}>Submit</button>
                    </div>
                </div>
            )}

            {showDonateModal && (
                <div className="modal-overlay donate" onClick={closeDonateModal}>
                    <div className="modal-content donate" onClick={(e) => e.stopPropagation()}>
                        <h2>Donate</h2>
                        <p>Please enter the donation amount:</p>
                        <input
                            type="text"
                            value={donateInput}
                            onChange={handleDonateInputChange}
                            className="modal-input"
                        />
                        <button className="modal-button donate">Submit</button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default PageShop;
