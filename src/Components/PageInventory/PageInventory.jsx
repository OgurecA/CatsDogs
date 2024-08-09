// src/pages/Inventory/PageInventory.js

import React from 'react';
import './PageInventory.css';

const PageInventory = () => {
    const items = [
        {
            image: '/images/item1.png',
            title: 'Item 1',
            description: 'This is a description of item 1. It is a useful item.',
        },
        {
            image: '/images/item2.png',
            title: 'Item 2',
            description: 'This is a description of item 2. Another useful item.',
        },
        {
            image: '/images/item3.png',
            title: 'Item 3',
            description: 'This is a description of item 3. Another useful item.',
        },
        {
            image: '/images/item4.png',
            title: 'Item 4',
            description: 'This is a description of item 4. Another useful item.',
        },
        {
            image: '/images/item5.png',
            title: 'Item 5',
            description: 'This is a description of item 5. Another useful item.',
        }
    ];

    const handleUseItem = (itemTitle) => {
        alert(`You used ${itemTitle}`);
    };

    const Cart = ({ image, title, description, onUse }) => (
        <div className="card">
            <img src={image} alt={title} className="card-image" />
            <h3 className="card-title">{title}</h3>
            <p className="card-description">{description}</p>
            <button className="card-button" onClick={onUse}>Использовать</button>
        </div>
    );

    return (
        <div className="page-inventory">
            {items.map((item, index) => (
                <Cart
                    key={index}
                    image={item.image}
                    title={item.title}
                    description={item.description}
                    onUse={() => handleUseItem(item.title)}
                />
            ))}
        </div>
    );
};

export default PageInventory;
