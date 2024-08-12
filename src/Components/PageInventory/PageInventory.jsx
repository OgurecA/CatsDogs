import React, { useState } from 'react';
import './PageInventory.css';

const PageInventory = ({ className }) => {
    const items = [
        {
            title: 'Snake',
            description: 'This is a description of OKX. It is a popular exchange.',
            image: '../Photoes/Snake.png',
        },
        {
            title: 'Gorilla',
            description: 'This is a description of Binance. Another popular exchange.',
            image: '../Photoes/Gorilla.png',
        },
        {
            title: 'Croc',
            description: 'This is a description of Coinbase. Another useful exchange.',
            image: '../Photoes/Croc.png',
        },
        {
            title: 'Elephant',
            description: 'This is a description of Kraken. A widely used exchange.',
            image: '../Photoes/Elephant.png',
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
