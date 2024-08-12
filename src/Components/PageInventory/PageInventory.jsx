import React, { useState } from 'react';
import './PageInventory.css';

const PageInventory = ({ className }) => {
    const items = [
        {
            title: 'OKX',
            description: 'This is a description of OKX. It is a popular exchange.',
            image: '/images/okx.png',
        },
        {
            title: 'Binance',
            description: 'This is a description of Binance. Another popular exchange.',
            image: '/images/binance.png',
        },
        {
            title: 'Coinbase',
            description: 'This is a description of Coinbase. Another useful exchange.',
            image: '/images/coinbase.png',
        },
        {
            title: 'Kraken',
            description: 'This is a description of Kraken. A widely used exchange.',
            image: '/images/kraken.png',
        },
        {
            title: 'Bitfinex',
            description: 'This is a description of Bitfinex. A well-known exchange.',
            image: '/images/bitfinex.png',
        },
        {
            title: 'Huobi',
            description: 'This is a description of Huobi. A prominent exchange.',
            image: '/images/huobi.png',
        },
        {
            title: 'MexC',
            description: 'This is a description of MexC. A rapidly growing exchange.',
            image: '/images/mexc.png',
        },
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
