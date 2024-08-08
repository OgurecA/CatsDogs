import React from 'react';
import './PageSocial.css';

const PageSocial = ({ className }) => {
    return (
        <div className={`page-social ${className}`}>
            <div className="social-item">
                Telegram
            </div>
            <div className="social-item">
                Medium
            </div>
            <div className="social-item">
                Youtube
            </div>
            <div className="social-item">
                Web3
            </div>
            <div className="social-item">
                TikTok
            </div>
            <div className="social-item">
                Instagram
            </div>
        </div>
    );
};

export default PageSocial;
