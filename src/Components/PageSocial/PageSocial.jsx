import React, { useState } from 'react';
import './PageSocial.css';

const PageSocial = ({ className }) => {
    const [checkingLinks, setCheckingLinks] = useState([]);
    const [checkedLinks, setCheckedLinks] = useState([]);

    const handleLinkClick = (index, event) => {
        event.preventDefault();

        // Открываем ссылку сразу
        window.open(event.target.href, '_blank');

        // Сначала добавляем класс checking
        setCheckingLinks(prevCheckingLinks => {
            if (!prevCheckingLinks.includes(index)) {
                return [...prevCheckingLinks, index];
            }
            return prevCheckingLinks;
        });

        // Используем setTimeout для задержки перед удалением класса checking и добавлением класса checked
        setTimeout(() => {
            setCheckingLinks(prevCheckingLinks => prevCheckingLinks.filter(i => i !== index));
            setCheckedLinks(prevCheckedLinks => {
                if (!prevCheckedLinks.includes(index)) {
                    return [...prevCheckedLinks, index];
                }
                return prevCheckedLinks;
            });
        }, 5000); // 10000 миллисекунд = 10 секунд
    };


    return (
        <div className={`page-social ${className}`}>
            <a
                className={`social-item ${checkedLinks.includes(0) ? 'checked' : ''}`}
                href="tg://resolve?domain=telegram"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(0, e)}
            >
                Telegram
            </a>
            <a
                className={`social-item ${checkedLinks.includes(1) ? 'checked' : ''}`}
                href="https://medium.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(1, e)}
            >
                Medium
            </a>
            <a
                className={`social-item ${checkedLinks.includes(2) ? 'checked' : ''}`}
                href="https://www.youtube.com/watch?v=H8t5uq-DRJk&list=RDEogFdxEzNcQ&index=12"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(2, e)}
            >
                Youtube
            </a>
            <a
                className={`social-item ${checkedLinks.includes(3) ? 'checked' : ''}`}
                href="https://web3.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(3, e)}
            >
                Web
            </a>
            <a
                className={`social-item ${checkedLinks.includes(4) ? 'checked' : ''}`}
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(4, e)}
            >
                TikTok
            </a>
            <a
                className={`social-item ${checkedLinks.includes(5) ? 'checked' : ''}`}
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(5, e)}
            >
                X
            </a>
            <a
                className={`social-item ${checkedLinks.includes(6) ? 'checked' : ''}`}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(6, e)}
            >
                Instagram
            </a>
        </div>
    );
};

export default PageSocial;
