// src/pages/Inventory/Inventory.js

import React from 'react';
import Card from '../../components/Card/Card';
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
        // Добавьте другие элементы
    ];

    const handleUseItem = (itemTitle) => {
        alert(`You used ${itemTitle}`);
    };

    return (
        <div className="inventory">
            {items.map((item, index) => (
                <Card
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
