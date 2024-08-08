import React from 'react';
import './PageSocial.css';

const PageSocial = ({ className }) => {
    return (
        <div className={`page-social ${className}`}>
            <a className="social-item" href="tg://resolve?domain=telegram" target="_blank" rel="noopener noreferrer">
                Telegram
            </a>
            <a className="social-item" href="medium://medium.com" target="_blank" rel="noopener noreferrer">
                Medium
            </a>
            <a className="social-item" href="vnd.youtube://www.youtube.com" target="_blank" rel="noopener noreferrer">
                Youtube
            </a>
            <a className="social-item" href="web3://web3.com" target="_blank" rel="noopener noreferrer">
                Web3
            </a>
            <a className="social-item" href="tiktok://tiktok.com" target="_blank" rel="noopener noreferrer">
                TikTok
            </a>
            <a className="social-item" href="twitter://twitter.com" target="_blank" rel="noopener noreferrer">
                X
            </a>
            <a className="social-item" href="instagram://instagram.com" target="_blank" rel="noopener noreferrer">
                Instagram
            </a>
        </div>
    );
};

export default PageSocial;
