import React from 'react';
import './PageShop.css';

const PageShop = ({ className, title }) => {
    return (
        <div className={`page-shop ${className}`}>
            <div className="shop-title">
                {title}
            </div>
            <ul className="shop-list">
                <li className="shop-item">
                    <span>Item 1</span>
                </li>
                <li className="shop-item">
                    <span>Item 2</span>
                </li>
                <li className="shop-item">
                    <span>Item 3</span>
                </li>
            </ul>
        </div>
    );
};

export default PageShop;
