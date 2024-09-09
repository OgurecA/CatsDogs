import React, { useState, useEffect } from 'react';
import './PageSocial.css';

const PageSocial = ({ className, updateCheckedCount }) => {
    const [checkingLinks, setCheckingLinks] = useState([]);
    const [checkedLinks, setCheckedLinks] = useState([]);

    useEffect(() => {
        const savedCheckedLinks = JSON.parse(localStorage.getItem('checkedLinks')) || [];
        setCheckedLinks(savedCheckedLinks);
        updateCheckedCount(savedCheckedLinks.length);

        const resetCheckedLinksIfNeeded = () => {
            const now = new Date();
            const lastReset = parseInt(localStorage.getItem('lastReset'), 10) || 0;

            // Устанавливаем целевое время сброса (14:30 UTC)
            const targetHour = 0;
            const targetMinute = 0;
            const targetDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), targetHour, targetMinute));

            if (now >= targetDate && lastReset < targetDate.getTime()) {
                // Если текущее время прошло 14:30 UTC и сброс еще не происходил, сбрасываем checkedLinks
                setCheckedLinks([]);
                localStorage.setItem('checkedLinks', JSON.stringify([]));
                localStorage.setItem('lastReset', targetDate.getTime());
                updateCheckedCount(0);
            }
        };

        resetCheckedLinksIfNeeded();

        // Устанавливаем таймер, который будет проверять необходимость сброса каждый час
        const interval = setInterval(() => {
            resetCheckedLinksIfNeeded();
        }, 1000 * 60 * 60); // Проверяем каждый час

        return () => clearInterval(interval);
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

        // Через 5 секунд удаляем класс checking и добавляем класс checked
        setTimeout(() => {
            setCheckingLinks(prevCheckingLinks => prevCheckingLinks.filter(i => i !== index));
            setCheckedLinks(prevCheckedLinks => {
                const newCheckedLinks = [...prevCheckedLinks, index];
                localStorage.setItem('checkedLinks', JSON.stringify(newCheckedLinks));
                updateCheckedCount(newCheckedLinks.length);
                return newCheckedLinks;
            });
        }, 5000);
    };

    return (
        <div className={`page-social ${className}`}>
            <a
                className={`social-item ${checkingLinks.includes(0) ? 'checking' : ''} ${checkedLinks.includes(0) ? 'checked' : ''}`}
                href="https://t.me/direanimalsnews"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(0, e)}
            >
                Telegram
            </a>
            <a
                className={`social-item ${checkingLinks.includes(1) ? 'checking' : ''} ${checkedLinks.includes(1) ? 'checked' : ''}`}
                href="https://x.com/dominator24news?s=21"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(1, e)}
            >
                X
            </a>
            <a
                className={`social-item ${checkingLinks.includes(2) ? 'checking' : ''} ${checkedLinks.includes(2) ? 'checked' : ''}`}
                href="https://dominators.website"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(2, e)}
            >
                Web
            </a>
            <a
                className={`social-item ${checkingLinks.includes(3) ? 'checking' : ''} ${checkedLinks.includes(3) ? 'checked' : ''}`}
                href="https://www.tiktok.com/@dire.animals"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(3, e)}
            >
                TikTok
            </a>
        </div>
    );
};

export default PageSocial;
