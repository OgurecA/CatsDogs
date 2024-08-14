import React, { useState, useEffect } from 'react';
import './PageShop.css';

const PageShop = ({ className, title, votesA, votesB, personalCount, checkedLinks }) => {
    const [displayedVotes, setDisplayedVotes] = useState("Calculating...");

    useEffect(() => {
        if (title === 'Dire Warriors') {
            setDisplayedVotes(votesA);
        } else if (title === 'Wild Hearts') {
            setDisplayedVotes(votesB);
        }
    }, [title, votesA, votesB]); // Добавляем зависимости

    return (
        <div className={`page-shop ${className}`}>
            <div className="shop-title">
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
        </div>
    );
};

export default PageShop;
