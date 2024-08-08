import React from 'react';
import './PageShop.css';

const PageShop = ({ className }) => {
    return (
        <div className={`page-shop ${className}`}>
            <div className="shop-item">
                Социальная сеть 1 <button>Перейти</button>
            </div>
            <div className="shop-item">
                Социальная сеть 2 <button>Перейти</button>
            </div>
            <div className="shop-item">
                Социальная сеть 3 <button>Перейти</button>
            </div>
            <div className="shop-item">
                Социальная сеть 4 <button>Перейти</button>
            </div>
        </div>
    );
};

export default PageShop;
