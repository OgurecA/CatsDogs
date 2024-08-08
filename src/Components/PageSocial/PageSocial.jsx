import React from 'react';
import './PageSocial.css';

const PageSocial = ({ className }) => {
    const handleButtonClick = (url) => {
        window.location.href = url;
    };
    return (
        <div className={`page-social ${className}`}>
            <button className="social-item" onClick={() => handleButtonClick('tg://resolve?domain=telegram')}>
                Telegram
            </button>
            <button className="social-item" onClick={() => handleButtonClick('medium://medium.com')}>
                Medium
            </button>
            <button className="social-item" onClick={() => handleButtonClick('vnd.youtube://www.youtube.com')}>
                Youtube
            </button>
            <button className="social-item" onClick={() => handleButtonClick('web3://web3.com')}>
                Web3
            </button>
            <button className="social-item" onClick={() => handleButtonClick('tiktok://tiktok.com')}>
                TikTok
            </button>
            <button className="social-item" onClick={() => handleButtonClick('twitter://twitter.com')}>
                X
            </button>
        </div>
    );
};

export default PageSocial;
