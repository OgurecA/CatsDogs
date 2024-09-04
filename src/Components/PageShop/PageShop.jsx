import React, { useState, useEffect } from 'react';
import './PageShop.css';
import DarkWolfBack from '../Photoes/FonWolfWarm1.png';
import WolfBackCold from '../Photoes/FonWolfCold1.png';
import xssFilters from 'xss-filters';


const PageShop = ({ className, title, votesA, votesB, personalCount, contribution, updateCounts, setPersonalPoints, userId, topPlayerName, topPlayerUserName, lang, playerName, playerUserName }) => {
    const [displayedVotes, setDisplayedVotes] = useState("Choose Your Team!");
    const [displayedVotesOpponent, setDisplayedVotesOpponent] = useState("Who will be your enemy?");
    const [titleName, setTitleName] = useState("none");
    const [promoInput, setPromoInput] = useState('');
    const [donateInputId, setDonateInputId] = useState('');
    const [donateInputAmount, setDonateInputAmount] = useState('');
    const [backgroundImage, setBackgroundImage] = useState('');
    
    const displayedTopName = topPlayerUserName && topPlayerUserName.trim() !== "" ? topPlayerUserName : topPlayerName;
    const displayedName = playerUserName && playerUserName.trim() !== "" ? playerUserName : playerName;
    

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
        } else if (title === 'Wild Hearts') {
            setTitleName("WildHearts");
            setDisplayedVotes(votesB);
            setDisplayedVotesOpponent(votesA);
            setBackgroundImage(DarkWolfBack);
        }
    }, [title, votesA, votesB]); // Добавляем зависимости


    const handlePromoInputChange = (event) => {
        setPromoInput(event.target.value);
    };

    const handlePromoSubmit = () => {
        const sanitizedPromoInput = xssFilters.inHTMLData(promoInput);

        const currentDate = new Date();

        const matchedPromo = promoCodes.find(promo => 
            promo.code === sanitizedPromoInput && 
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
        } 
        else {
            fetch(`https://btc24news.online/api/check-promo?promoCode=${sanitizedPromoInput}`)
            .then(response => response.json())
            .then(data => {
                if (data.exists) {
                    if (data.value === "Drake") {
                        updateAnimalStatus(4, true); // Разблокировка животного с индексом 4
                        closePromoModal();
                        setPromoInput("");
                        return;
                    } else if (data.value === "Rat") {
                        updateAnimalStatus(1, true); // Разблокировка животного с индексом 4
                        closePromoModal();
                        setPromoInput("");
                        return;
                    } 
                    const updatedPoints = personalCount + parseInt(data.value, 10); // Используем значение промокода из базы
                    setPersonalPoints(updatedPoints);
                    updateCounts(updatedPoints, playersFavorite, updatedContribution);
                    closePromoModal();
                    setPromoInput("");

            } else {
            // Если это не промокод, проверяем, является ли это ID пользователя
            if (usedUserId) {
                setIsButtonShaking(true);
                setTimeout(() => setIsButtonShaking(false), 300);
                return;
            }
            if (String(sanitizedPromoInput) === String(userId)) {
                setIsButtonShaking(true);
                setTimeout(() => setIsButtonShaking(false), 300);
                return;
            }
    
            fetch(`https://btc24news.online/api/check-user?id=${sanitizedPromoInput}`)
                .then(response => response.json())
                .then(data => {
                    if (data.exists) {
                        const updatedPoints = personalCount + 1000; // Например, начисляем 1000 очков за использование ID
                        setPersonalPoints(updatedPoints);
                        updateCounts(updatedPoints, playersFavorite, updatedContribution);
                        
                        fetch('https://btc24news.online/api/add-points-promo-id', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                id: sanitizedPromoInput,
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
                                setUsedUserId(sanitizedPromoInput);
                                localStorage.setItem('usedUserId', sanitizedPromoInput);
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
    })
    .catch(error => {
        console.error('Error:', error);
        setIsButtonShaking(true);
        setTimeout(() => setIsButtonShaking(false), 300);
    });
}
}

const updateAnimalStatus = (animalIndex, status) => {
    const data = {
        id: userId, 
        animalIndex, 
        status: status ? 1 : 0 
    };

    fetch('/update-animal-status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Animal status updated successfully:', data);
    })
    .catch(error => {
        console.error('Error updating animal status:', error);
    });
};


    const handleDonateInputChangeId = (event) => {
        setDonateInputId(event.target.value);
    };
    const handleDonateInputChangeAmount = (event) => {
        setDonateInputAmount(event.target.value);
    };

    const handleSubmitDonation = () => {

    const sanitizedDonateInputId = xssFilters.inHTMLData(donateInputId.trim());
    const sanitizedDonateInputAmount = xssFilters.inHTMLData(donateInputAmount.trim());

    const donationAmount = parseInt(sanitizedDonateInputAmount, 10);

    // Проверяем, что сумма доната - это целое положительное число и оно не содержит букв
    if (isNaN(donationAmount) || donationAmount <= 0 || donationAmount.toString() !== sanitizedDonateInputAmount.trim()) {
        setIsButtonShaking(true);
        setTimeout(() => setIsButtonShaking(false), 300);
        return;
    }
    if (donationAmount > personalCount) {
        setIsButtonShaking(true);
        setTimeout(() => setIsButtonShaking(false), 300);
        return;
    }

    fetch(`https://btc24news.online/api/check-user?id=${sanitizedDonateInputId}`)
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
                        id: sanitizedDonateInputId,
                        amount: sanitizedDonateInputAmount
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.message === 'Donation successful') {
                        const updatedPoints = personalCount - sanitizedDonateInputAmount;
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
                    Welcome back, {displayedName}
                </li>
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
                    <div className="modal-content promo" onClick={(e) => e.stopPropagation()} style={{ backgroundImage: `url(${backgroundImage})` }} >
                        <h2>GIFT CODE</h2>
                        <p>Follow us and discover hidden gift codes to get rewards.</p>
                        <input
                            type="text"
                            value={promoInput}
                            onChange={handlePromoInputChange}
                            className="modal-input"
                            placeholder="Enter gift code"
                        />
                        <button className={`modal-button promo ${isButtonShaking ? 'vibrate' : ''}`} onClick={handlePromoSubmit}>Submit</button>
                    </div>
                </div>
            )}

            {showDonateModal && (
                <div className="modal-overlay donate" onClick={closeDonateModal}>
                    <div className="modal-content donate" onClick={(e) => e.stopPropagation()} style={{ backgroundImage: `url(${backgroundImage})` }} >
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
