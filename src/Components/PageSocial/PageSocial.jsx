import React, { useState } from 'react';
import './ButtonBar.css';

const PageSocial = ({ className }) => {
    const [checkedLinks, setCheckedLinks] = useState([]);

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
                onClick={(e) => {
                    e.preventDefault();
                    handleButtonClick(0);
                }}
            >
                Telegram
            </a>
            <a
                className={`social-item ${checkedLinks.includes(1) ? 'checked' : ''}`}
                href="medium://medium.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                    e.preventDefault();
                    handleButtonClick(1);
                }}
            >
                Medium
            </a>
            <a
                className={`social-item ${checkedLinks.includes(2) ? 'checked' : ''}`}
                href="vnd.youtube://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                    e.preventDefault();
                    handleButtonClick(2);
                }}
            >
                Youtube
            </a>
            <a
                className={`social-item ${checkedLinks.includes(3) ? 'checked' : ''}`}
                href="web3://web3.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                    e.preventDefault();
                    handleButtonClick(3);
                }}
            >
                Web3
            </a>
            <a
                className={`social-item ${checkedLinks.includes(4) ? 'checked' : ''}`}
                href="tiktok://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                    e.preventDefault();
                    handleButtonClick(4);
                }}
            >
                TikTok
            </a>
            <a
                className={`social-item ${checkedLinks.includes(5) ? 'checked' : ''}`}
                href="twitter://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                    e.preventDefault();
                    handleButtonClick(5);
                }}
            >
                X
            </a>
            <a
                className={`social-item ${checkedLinks.includes(6) ? 'checked' : ''}`}
                href="instagram://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                    e.preventDefault();
                    handleButtonClick(6);
                }}
            >
                Instagram
            </a>
        </div>
    );
};

export default PageSocial;
