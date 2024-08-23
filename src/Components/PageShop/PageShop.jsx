import React, { useState, useEffect } from 'react';
import './PageShop.css';
import DarkWolfBack from '../Photoes/FonWolfWarm1.png';
import WolfBackCold from '../Photoes/FonWolfCold1.png';
import PromoIceBack from '../Photoes/PromoIce.png'
import PromoLavaBack from '../Photoes/PromoFire.jpg'

const PageShop = ({ className, title, votesA, votesB, personalCount, contribution, updateCounts, setPersonalPoints, userId, topPlayerName, topPlayerUserName }) => {
    const [displayedVotes, setDisplayedVotes] = useState("Choose Your Team!");
    const [displayedVotesOpponent, setDisplayedVotesOpponent] = useState("Who will be your enemy?");
    const [titleName, setTitleName] = useState("none");
    const [promoInput, setPromoInput] = useState('');
    const [donateInputId, setDonateInputId] = useState('');
    const [donateInputAmount, setDonateInputAmount] = useState('');
    const [backgroundImage, setBackgroundImage] = useState('');
    const [backgroundPromoImage, setBackgroundPromoImage] = useState('');
    
    const displayedTopName = topPlayerUserName && topPlayerUserName.trim() !== "" ? topPlayerUserName : topPlayerName;


    const updatedContribution = contribution;
    const playersFavorite = title;

    const [showPromoModal, setShowPromoModal] = useState(false);
    const [showDonateModal, setShowDonateModal] = useState(false);
    
    const [isButtonShaking, setIsButtonShaking] = useState(false);

    const [usedUserId, setUsedUserId] = useState(null);


    const promoCodes = [
        { code: "PROMO2024", points: 1000, start: new Date('2024-01-01'), expiry: new Date('2024-12-31') },
        { code: "WINTER2024", points: 500, start: new Date('2024-01-01'), expiry: new Date('2024-02-28') },
        { code: "SUMMER2024", points: 2000, start: new Date('2024-06-01'), expiry: new Date('2024-08-31') },
        // Добавьте больше промокодов по необходимости
    ];
    const [usedPromoCodes, setUsedPromoCodes] = useState([]);

    useEffect(() => {
        localStorage.clear();
        const storedUsedUserId = localStorage.getItem('usedUserId');
        if (storedUsedUserId) {
            setUsedUserId(storedUsedUserId);
        }
    
        const storedUsedPromoCodes = JSON.parse(localStorage.getItem('usedPromoCodes')) || [];
        setUsedPromoCodes(storedUsedPromoCodes);
    }, []);
    

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
            setBackgroundImage(WolfBackCold);
            setBackgroundPromoImage(PromoIceBack);
        } else if (title === 'Wild Hearts') {
            setTitleName("WildHearts");
            setDisplayedVotes(votesB);
            setDisplayedVotesOpponent(votesA);
            setBackgroundImage(DarkWolfBack);
            setBackgroundPromoImage(PromoLavaBack);
        }
    }, [title, votesA, votesB]); // Добавляем зависимости


    const handlePromoInputChange = (event) => {
        setPromoInput(event.target.value);
    };
    const handlePromoSubmit = () => {
        const currentDate = new Date();

        const matchedPromo = promoCodes.find(promo => 
            promo.code === promoInput && 
            promo.start <= currentDate && 
            promo.expiry >= currentDate
        );
        // Проверяем, соответствует ли введенный код правильному промокоду
        if (matchedPromo) {
            if (usedPromoCodes.includes(matchedPromo.code)) {
                setIsButtonShaking(true);
                setTimeout(() => setIsButtonShaking(false), 300);
            } else {
                const updatedPoints = personalCount + 1000;
                setPersonalPoints(updatedPoints);
                updateCounts(updatedPoints, playersFavorite, updatedContribution);
                closePromoModal();
                setPromoInput("");

                const newUsedPromoCodes = [...usedPromoCodes, matchedPromo.code];
                setUsedPromoCodes(newUsedPromoCodes);
                localStorage.setItem('usedPromoCodes', JSON.stringify(newUsedPromoCodes));
            }
        } else {
            // Если это не промокод, проверяем, является ли это ID пользователя
            if (usedUserId) {
                setIsButtonShaking(true);
                setTimeout(() => setIsButtonShaking(false), 300);
                alert('You have already used a user ID as a promo code.');
                return;
            }
            if (String(promoInput) === String(userId)) {
                setIsButtonShaking(true);
                setTimeout(() => setIsButtonShaking(false), 300);
                alert('You cannot use your own ID as a promo code.');
                return;
            }
    
            fetch(`https://btc24news.online/check-user?id=${promoInput}`)
                .then(response => response.json())
                .then(data => {
                    if (data.exists) {
                        const updatedPoints = personalCount + 1000; // Например, начисляем 1000 очков за использование ID
                        setPersonalPoints(updatedPoints);
                        updateCounts(updatedPoints, playersFavorite, updatedContribution);
                        closePromoModal();
                        setPromoInput("");
    
                        // Сохраняем использованный ID и обновляем состояние
                        setUsedUserId(promoInput);
                        localStorage.setItem('usedUserId', promoInput);
                    } else {
                        setIsButtonShaking(true);
                        setTimeout(() => setIsButtonShaking(false), 300);
                    }
                })
                .catch(error => {
                    setIsButtonShaking(true);
                    setTimeout(() => setIsButtonShaking(false), 300);
                });
        }
    };

    const handleDonateInputChangeId = (event) => {
        setDonateInputId(event.target.value);
    };
    const handleDonateInputChangeAmount = (event) => {
        setDonateInputAmount(event.target.value);
    };

    const handleSubmitDonation = () => {

    const donationAmount = parseInt(donateInputAmount, 10);

    // Проверяем, что сумма доната - это целое положительное число и оно не содержит букв
    if (isNaN(donationAmount) || donationAmount <= 0 || donationAmount.toString() !== donateInputAmount.trim()) {
        setIsButtonShaking(true);
        setTimeout(() => setIsButtonShaking(false), 300);
        return;
    }
    if (donationAmount > personalCount) {
        setIsButtonShaking(true);
        setTimeout(() => setIsButtonShaking(false), 300);
        return;
    }

    fetch(`https://btc24news.online/check-user?id=${donateInputId}`)
        .then(response => response.json())
        .then(data => {
            if (data.exists) {
                // Пользователь существует, отправляем запрос на перевод доната
                fetch('https://btc24news.online/donate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id_from: userId,
                        id: donateInputId,
                        amount: donateInputAmount
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.message === 'Donation successful') {
                        const updatedPoints = personalCount - donateInputAmount;
                        setPersonalPoints(updatedPoints);
                        updateCounts(updatedPoints, playersFavorite, updatedContribution);
                        setDonateInputId("");
                        setDonateInputAmount("");
                        closeDonateModal();
                    } else {
                        alert('Error during donation.');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('An error occurred while processing the donation.');
                });
            } else {
                setIsButtonShaking(true);
                setTimeout(() => setIsButtonShaking(false), 300);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred while checking the user.');
        });
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
                <li className="list-item">
                    Alpha Predator: {displayedTopName}
                </li>
            </ul>
            <div className="button-container">
                <button className="promo-button" onClick={handlePromoClick}>Gift Code</button>
                <button className="donate-button" onClick={handleDonateClick}>Donate</button>
            </div>

            {showPromoModal && (
                <div className="modal-overlay promo" onClick={closePromoModal}>
                    <div className="modal-content promo" onClick={(e) => e.stopPropagation()} style={{ backgroundImage: `url(${backgroundPromoImage})` }} >
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
                    <div className="modal-content donate" onClick={(e) => e.stopPropagation()} style={{ backgroundImage: `url(${backgroundPromoImage})` }} >
                        <h2>DONATE</h2>
                        <p>Your ID to recieve donations: {userId}</p>
                        <input
                            type="text"
                            value={donateInputId}
                            onChange={handleDonateInputChangeId}
                            className="modal-input"
                            placeholder="Recievers ID"
                        />
                        <input
                            type="text"
                            value={donateInputAmount}
                            onChange={handleDonateInputChangeAmount}
                            className="modal-input"
                            placeholder="Donation amount" 
                        />
                        <button className={`modal-button donate ${isButtonShaking ? 'vibrate' : ''}`} onClick={handleSubmitDonation}>Submit</button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default PageShop;
