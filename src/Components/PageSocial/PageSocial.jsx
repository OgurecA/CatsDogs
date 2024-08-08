import React from 'react';
import './PageSocial.css';

const PageSocial = ({ className }) => {
    const handleButtonClick = (url) => {
        window.location.href = url;
    };
    return (
        <div className={`page-social ${className}`}>
            <button className="social-item" onClick={() => handleButtonClick('https://example.com')}>
                Telegram
            </button>
            <button className="social-item" onClick={() => handleButtonClick('https://example.com')}>
                Medium
            </button>
            <button className="social-item" onClick={() => handleButtonClick('https://youtube.com')}>
                Youtube
            </button>
            <button className="social-item" onClick={() => handleButtonClick('https://youtube.com')}>
                Web
            </button>
            <button className="social-item" onClick={() => handleButtonClick('https://example.com')}>
                TikTok
            </button>
            <button className="social-item" onClick={() => handleButtonClick('https://example.com')}>
                X
            </button>
            <button className="social-item" onClick={() => handleButtonClick('https://example.com')}>
                Instagram
            </button>
        </div>
    );
};

export default PageSocial;
