import React, { useState } from 'react';
import './PageInventory.css';

const PageInventory = ({ className }) => {

    return (
        <div className={`page-inventory ${className}`}>
            <a
                className={`exchange-item ${checkingLinks.includes(0) ? 'checking' : ''} ${checkedLinks.includes(0) ? 'checked' : ''}`}
                href="tg://resolve?domain=telegram"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(0, e)}
            >
                OKX
            </a>
            <a
                className={`exchange-item ${checkingLinks.includes(1) ? 'checking' : ''} ${checkedLinks.includes(1) ? 'checked' : ''}`}
                href="https://medium.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(1, e)}
            >
                Binance
            </a>
            <a
                className={`exchange-item ${checkingLinks.includes(2) ? 'checking' : ''} ${checkedLinks.includes(2) ? 'checked' : ''}`}
                href="https://www.youtube.com/watch?v=H8t5uq-DRJk&list=RDEogFdxEzNcQ&index=12"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(2, e)}
            >
                Coinbase
            </a>
            <a
                className={`exchange-item ${checkingLinks.includes(3) ? 'checking' : ''} ${checkedLinks.includes(3) ? 'checked' : ''}`}
                href="https://web3.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(3, e)}
            >
                Kraken
            </a>
            <a
                className={`exchange-item ${checkingLinks.includes(4) ? 'checking' : ''} ${checkedLinks.includes(4) ? 'checked' : ''}`}
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(4, e)}
            >
                Bitfinex
            </a>
            <a
                className={`exchange-item ${checkingLinks.includes(5) ? 'checking' : ''} ${checkedLinks.includes(5) ? 'checked' : ''}`}
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(5, e)}
            >
                Huobi
            </a>
            <a
                className={`inventory-item ${checkingLinks.includes(6) ? 'checking' : ''} ${checkedLinks.includes(6) ? 'checked' : ''}`}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(6, e)}
            >
                MexC
            </a>
        </div>
    );
};

export default PageInventory;
