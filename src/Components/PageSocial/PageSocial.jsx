import React, { useState } from 'react';
import './PageSocial.css';

const PageSocial = ({ className }) => {
    const [checkedLinks, setCheckedLinks] = useState(null);

    const handleButtonClick = (index) => {
        setCheckedLinks(prevCheckedLinks => {
            if (prevCheckedLinks.includes(index)) {
                return prevCheckedLinks.filter(i => i !== index);
            } else {
                return [...prevCheckedLinks, index];
            }
        });
    };

    return (
        <div className={`page-social ${className}`}>
            <a
                className={`social-item ${checkedLinks.includes(0) ? 'checked' : ''}`}
                href="tg://resolve?domain=telegram"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleButtonClick(0)}
            >
                Telegram
            </a>
            <a
                className={`social-item ${checkedLinks.includes(1) ? 'checked' : ''}`}
                href="medium://medium.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleButtonClick(1)}
            >
                Medium
            </a>
            <a
                className={`social-item ${checkedLinks.includes(2) ? 'checked' : ''}`}
                href="vnd.youtube://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleButtonClick(2)}
            >
                Youtube
            </a>
            <a
                className={`social-item ${checkedLinks.includes(3) ? 'checked' : ''}`}
                href="web3://web3.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleButtonClick(3)}
            >
                Web
            </a>
            <a
                className={`social-item ${checkedLinks.includes(4) ? 'checked' : ''}`}
                href="tiktok://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleButtonClick(4)}
            >
                TikTok
            </a>
            <a
                className={`social-item ${checkedLinks.includes(5) ? 'checked' : ''}`}
                href="twitter://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleButtonClick(5)}
            >
                X
            </a>
            <a
                className={`social-item ${checkedLinks.includes(6) ? 'checked' : ''}`}
                href="instagram://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleButtonClick(6)}
            >
                Instagram
            </a>
        </div>
    );
};

export default PageSocial;
