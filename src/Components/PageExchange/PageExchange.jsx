import React from 'react';
import './PageExchange.css';

const PageExchange = ({ className }) => {
    return (
        <div className={`page-exchange ${className}`}>
            <div className="exchange-item">
                Социальная сеть 1 <button>Перейти</button>
            </div>
            <div className="exchange-item">
                Социальная сеть 2 <button>Перейти</button>
            </div>
            <div className="exchange-item">
                Социальная сеть 3 <button>Перейти</button>
            </div>
            <div className="exchange-item">
                Социальная сеть 4 <button>Перейти</button>
            </div>
        </div>
    );
};

export default PageExchange;
