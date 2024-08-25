import React, { useState, useEffect } from 'react';
import './PageShop.css';
import DarkWolfBack from '../Photoes/FonWolfWarm1.png';
import WolfBackCold from '../Photoes/FonWolfCold1.png';
import PromoIceBack from '../Photoes/PromoIce.png'
import PromoLavaBack from '../Photoes/PromoFire.jpg'

const PageShop = ({ className, title, votesA, votesB, personalCount, contribution, updateCounts, setPersonalPoints, userId, topPlayerName, topPlayerUserName, lang }) => {
    const [displayedVotes, setDisplayedVotes] = useState("Choose Your Team!");
    const [displayedVotesOpponent, setDisplayedVotesOpponent] = useState("Who will be your enemy?");
    const [titleName, setTitleName] = useState("none");
    const [promoInput, setPromoInput] = useState('');
    const [donateInputId, setDonateInputId] = useState('');
    const [donateInputAmount, setDonateInputAmount] = useState('');
    const [backgroundImage, setBackgroundImage] = useState('');
    const [backgroundPromoImage, setBackgroundPromoImage] = useState('');
    
    const displayedTopName = topPlayerUserName && topPlayerUserName.trim() !== "" ? topPlayerUserName : topPlayerName;

    const translations = {
        en: {
            comrades: "Comrades",
            enemy: "Enemy",
            personal: "Personal",
            contribution: "Contribution",
            alphaPredator: "Alpha Predator",
            giftCode: "Gift Code",
            donate: "Donate",
            giftCodeTitle: "GIFT CODE",
            donateTitle: "DONATE",
            promoCodeInputPlaceholder: "Enter promo code",
            donateIdPlaceholder: "Receiver's ID",
            donationAmountPlaceholder: "Donation amount",
            submit: "Submit"
        },
        ru: {
            comrades: "Соратники",
            enemy: "Враги",
            personal: "Личный",
            contribution: "Вклад",
            alphaPredator: "Альфа Хищник",
            giftCode: "Подарочный Код",
            donate: "Пожертвовать",
            giftCodeTitle: "ПОДАРОЧНЫЙ КОД",
            donateTitle: "ПОЖЕРТВОВАНИЕ",
            promoCodeInputPlaceholder: "Введите промокод",
            donateIdPlaceholder: "ID получателя",
            donationAmountPlaceholder: "Сумма пожертвования",
            submit: "Подтвердить"
        }
    };
    

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
        //localStorage.clear();
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
                return;
            }
            if (String(promoInput) === String(userId)) {
                setIsButtonShaking(true);
                setTimeout(() => setIsButtonShaking(false), 300);
                return;
            }
    
            fetch(`https://btc24news.online/check-user?id=${promoInput}`)
                .then(response => response.json())
                .then(data => {
                    if (data.exists) {
                        const updatedPoints = personalCount + 1000; // Например, начисляем 1000 очков за использование ID
                        setPersonalPoints(updatedPoints);
                        updateCounts(updatedPoints, playersFavorite, updatedContribution);
                        
                        fetch('https://btc24news.online/add-points-promo-id', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                id: promoInput,
                                points: 1000
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data.message === 'Points added successfully') {
                                // Закрываем модальное окно после успешного начисления очков обоим пользователям
                                closePromoModal();
                                setPromoInput("");
        
                                // Сохраняем использованный ID и обновляем состояние
                                setUsedUserId(promoInput);
                                localStorage.setItem('usedUserId', promoInput);
                            } else {
                                alert('Error during points update.');
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            alert('An error occurred while updating points for the target user.');
                        });
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
                    {lang === 'ru' ? 'Товарищи' : 'Comrades'}: {displayedVotes}
                </li>
                <li className="list-item">
                    {lang === 'ru' ? 'Враги' : 'Enemy'}: {displayedVotesOpponent}
                </li>
                <li className="list-item">
                    {lang === 'ru' ? 'Личные очки' : 'Personal'}: {Math.abs(personalCount)}
                </li>
                <li className="list-item">
                    {lang === 'ru' ? 'Вклад' : 'Contribution'}: {contribution}
                </li>
                <li className="list-item">
                    {lang === 'ru' ? 'Альфа Хищник' : 'Alpha Predator'}: {displayedTopName}
                </li>
            </ul>
            <div className="button-container">
                <button className="promo-button" onClick={handlePromoClick}>{lang === 'ru' ? 'Промокод' : 'Gift Code'}</button>
                <button className="donate-button" onClick={handleDonateClick}>{lang === 'ru' ? 'Пожертвовать' : 'Donate'}</button>
            </div>

            {showPromoModal && (
                <div className="modal-overlay promo" onClick={closePromoModal}>
                    <div className="modal-content promo" onClick={(e) => e.stopPropagation()} style={{ backgroundImage: `url(${backgroundPromoImage})` }} >
                        <h2>{lang === 'ru' ? 'Промокод' : 'GIFT CODE'}</h2>
                        <input
                            type="text"
                            value={promoInput}
                            onChange={handlePromoInputChange}
                            className="modal-input"
                        />
                        <button className={`modal-button promo ${isButtonShaking ? 'vibrate' : ''}`} onClick={handlePromoSubmit}>{lang === 'ru' ? 'Подтвердить' : 'Submit'}</button>
                    </div>
                </div>
            )}

            {showDonateModal && (
                <div className="modal-overlay donate" onClick={closeDonateModal}>
                    <div className="modal-content donate" onClick={(e) => e.stopPropagation()} style={{ backgroundImage: `url(${backgroundPromoImage})` }} >
                        <h2>{lang === 'ru' ? 'Пожертвование' : 'DONATE'}</h2>
                        <p>{lang === 'ru' ? 'Ваш ID для получения пожертвований:' : 'Your ID to receive donations:'} {userId}</p>
                        <input
                            type="text"
                            value={donateInputId}
                            onChange={handleDonateInputChangeId}
                            className="modal-input"
                            placeholder={lang === 'ru' ? 'ID получателя' : 'Receiver\'s ID'}
                        />
                        <input
                            type="text"
                            value={donateInputAmount}
                            onChange={handleDonateInputChangeAmount}
                            className="modal-input"
                            placeholder={lang === 'ru' ? 'Сумма пожертвования' : 'Donation amount'}
                        />
                        <button className={`modal-button donate ${isButtonShaking ? 'vibrate' : ''}`} onClick={handleSubmitDonation}>{lang === 'ru' ? 'Подтвердить' : 'Submit'}</button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default PageShop;
