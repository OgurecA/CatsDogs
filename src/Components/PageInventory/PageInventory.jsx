import React from 'react';
import './PageInventory.css';

const PageInventory = ({ className }) => {
    return (
        <div className={`page-inventory ${className}`}>
            <div className="inventory-item">
                Социальная сеть 1 <button>Перейти</button>
            </div>
            <div className="inventory-item">
                Социальная сеть 2 <button>Перейти</button>
            </div>
            <div className="inventory-item">
                Социальная сеть 3 <button>Перейти</button>
            </div>
            <div className="inventory-item">
                Социальная сеть 4 <button>Перейти</button>
            </div>
        </div>
    );
};

export default PageInventory;
