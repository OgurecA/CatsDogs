import React, { useState } from 'react';
import './PageInventory.css';
import {Snake, Gorilla, Croc, Elephant} from '../Pictures/Pictures';

const PageInventory = ({ className }) => {
    const items = [
        {
            title: 'Snake',
            description: 'This is a description of OKX. It is a popular exchange.',
            image: Snake,
        },
        {
            title: 'Gorilla',
            description: 'This is a description of Binance. Another popular exchange.',
            image: Gorilla,
        },
        {
            title: 'Croc',
            description: 'This is a description of Coinbase. Another useful exchange.',
            image: Croc,
        },
        {
            title: 'Elephant',
            description: 'This is a description of Kraken. A widely used exchange.',
            image: Elephant,
        }
    ];

    const handleUseItem = (itemTitle) => {
        alert(`You selected ${itemTitle}`);
    };

    return (
        <div className={`page-inventory ${className}`}>
            {items.map((item, index) => (
                <div className={`card`} key={index}>
                    <img src={item.image} alt={item.title} className="card-image" />
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-description">{item.description}</p>
                    <button className="card-button" onClick={() => handleUseItem(item.title)}>Использовать</button>
                </div>
            ))}
        </div>
    );
};

export default PageInventory;
