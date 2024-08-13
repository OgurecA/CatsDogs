import React, {useState} from 'react';
import './PageShop.css';

const PageShop = ({ className, title, votesA, votesB }) => {
    const [displayedVotes, setDisplayedVotes] = useState("Calculating...")
    if (title === 'Dire Warriors') {
        setDisplayedVotes(votesA);
      } else if (title === 'Wild Hearts') {
        setDisplayedVotes(votesB);
      }
    return (
        <div className={`page-shop ${className}`}>
            <div className="shop-title">
                {title}
            </div>
            <ul className="shop-list">
                <li className="list-item">
                    <span>Team Score: {displayedVotes}</span>
                </li>
                <li className="list-item">
                    <span>Item 2</span>
                </li>
                <li className="list-item">
                    <span>Item 3</span>
                </li>
            </ul>
        </div>
    );
};

export default PageShop;
