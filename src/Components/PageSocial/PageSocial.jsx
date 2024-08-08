import React from 'react';
import './PageSocial.css';

const PageSocial = ({ className }) => {
    return (
        <div className={`page-social ${className}`}>
            <button className="social-item">
                Telegram
            </button>
            <button className="social-item">
                Medium
            </button>
            <button className="social-item">
                Youtube
            </button>
            <button className="social-item">
                Web3
            </button>
            <button className="social-item">
                TikTok
            </button>
            <button className="social-item">
                X
            </button>
            <button className="social-item">
                Instagram
            </button>
        </div>
    );
};

export default PageSocial;
