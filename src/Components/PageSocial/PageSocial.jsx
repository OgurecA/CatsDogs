import React, { useState, useEffect } from 'react';
import './PageSocial.css';

const PageSocial = ({ className }) => {
    const [checkingLinks, setCheckingLinks] = useState([]);
    const [checkedLinks, setCheckedLinks] = useState([]);

    useEffect(() => {
        const savedCheckedLinks = JSON.parse(localStorage.getItem('checkedLinks')) || [];
        setCheckedLinks(savedCheckedLinks);
    }, []);

    const handleLinkClick = (index, event) => {
        event.preventDefault();

        // Открываем ссылку сразу
        window.open(event.target.href, '_blank');

        if (checkedLinks.includes(index)) {
            return; // Если класс checked уже есть, выходим из функции
        }

        // Добавляем класс checking
        if (!checkingLinks.includes(index)) {
            setCheckingLinks(prevCheckingLinks => [...prevCheckingLinks, index]);
        }

        // Через 10 секунд удаляем класс checking и добавляем класс checked
        setTimeout(() => {
            setCheckingLinks(prevCheckingLinks => prevCheckingLinks.filter(i => i !== index));
            setCheckedLinks(prevCheckedLinks => {
                const newCheckedLinks = [...prevCheckedLinks, index];
                localStorage.setItem('checkedLinks', JSON.stringify(newCheckedLinks));
                return newCheckedLinks;
            });
        }, 5000); // 10000 миллисекунд = 10 секунд
    };


    return (
        <div className={`page-social ${className}`}>
            <a
                className={`social-item ${checkingLinks.includes(0) ? 'checking' : ''} ${checkedLinks.includes(0) ? 'checked' : ''}`}
                href="tg://resolve?domain=telegram"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(0, e)}
            >
                Telegram
            </a>
            <a
                className={`social-item ${checkingLinks.includes(1) ? 'checking' : ''} ${checkedLinks.includes(1) ? 'checked' : ''}`}
                href="https://medium.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(1, e)}
            >
                Medium
            </a>
            <a
                className={`social-item ${checkingLinks.includes(2) ? 'checking' : ''} ${checkedLinks.includes(2) ? 'checked' : ''}`}
                href="https://www.youtube.com/watch?v=H8t5uq-DRJk&list=RDEogFdxEzNcQ&index=12"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(2, e)}
            >
                Youtube
            </a>
            <a
                className={`social-item ${checkingLinks.includes(3) ? 'checking' : ''} ${checkedLinks.includes(3) ? 'checked' : ''}`}
                href="https://web3.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(3, e)}
            >
                Web
            </a>
            <a
                className={`social-item ${checkingLinks.includes(4) ? 'checking' : ''} ${checkedLinks.includes(4) ? 'checked' : ''}`}
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(4, e)}
            >
                TikTok
            </a>
            <a
                className={`social-item ${checkingLinks.includes(5) ? 'checking' : ''} ${checkedLinks.includes(5) ? 'checked' : ''}`}
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(5, e)}
            >
                X
            </a>
            <a
                className={`social-item ${checkingLinks.includes(6) ? 'checking' : ''} ${checkedLinks.includes(6) ? 'checked' : ''}`}
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
