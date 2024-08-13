import React from 'react';
import './PageShop.css';

const PageShop = ({ className, title }) => {
    return (
        <div className={`page-shop ${className}`}>
            <div className="shop-title">
                {title}
            </div>
        </div>
    );
};

export default PageShop;
