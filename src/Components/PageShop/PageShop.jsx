import React, { useState, useEffect } from 'react';
import './PageShop.css';

const PageShop = ({ className, title, votesA, votesB, personalCount, checkedLinks }) => {
    const [displayedVotes, setDisplayedVotes] = useState("Choose Your Team!");
    const [titleName, setTitleName] = useState("none");

    useEffect(() => {
        if (title === 'Dire Warriors') {
            setTitleName("DireWarriors")
            setDisplayedVotes(votesA);
        } else if (title === 'Wild Hearts') {
            setDisplayedVotes(votesB);
            setTitleName("WildHearts")
        }
    }, [title, votesA, votesB]); // Добавляем зависимости

    return (
        <div className={`page-shop ${className}`}>
            <div className={`shop-title ${titleName}`}>
                {title}
            </div>
            <ul className="shop-list">
                <li className="list-item">
                    Team Score: {displayedVotes}
                </li>
                <li className="list-item">
                    Personal Score: {Math.abs(personalCount)}
                </li>
                <li className="list-item">
                    Daily Tasks: {checkedLinks}/7
                </li>
            </ul>
            <button className="buy-button">
                Buy
            </button>
        </div>
    );
};

export default PageShop;
