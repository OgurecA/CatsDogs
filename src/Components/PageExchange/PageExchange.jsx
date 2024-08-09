import React, { useState, useEffect } from 'react';
import './PageExchange.css';

const PageExchange = ({ className }) => {
    const [checkingLinks, setCheckingLinks] = useState([]);
    const [checkedLinks, setCheckedLinks] = useState([]);

    // Загрузка состояния из LocalStorage при загрузке страницы
    useEffect(() => {
        const savedCheckedLinks = JSON.parse(localStorage.getItem('checkedLinks')) || [];
        setCheckedLinks(savedCheckedLinks);
    }, []);

    // Функция для обработки клика по кнопке
    const handleLinkClick = (index, event) => {
        event.preventDefault();

        // Проверяем, есть ли уже класс checked
        if (checkedLinks.includes(index)) {
            return; // Если класс checked уже есть, выходим из функции
        }

        // Добавляем класс checking
        if (!checkingLinks.includes(index)) {
            setCheckingLinks(prevCheckingLinks => [...prevCheckingLinks, index]);
        }

        // Через 15 секунд удаляем класс checking и добавляем класс checked
        setTimeout(() => {
            setCheckingLinks(prevCheckingLinks => prevCheckingLinks.filter(i => i !== index));
            if (!checkedLinks.includes(index)) {
                const newCheckedLinks = [...checkedLinks, index];
                setCheckedLinks(newCheckedLinks);

                // Сохраняем состояние в LocalStorage
                localStorage.setItem('checkedLinks', JSON.stringify(newCheckedLinks));
            }
        }, 5000); // 15000 миллисекунд = 15 секунд
    };


    return (
        <div className={`page-exchange ${className}`}>
            <a
                className={`exchange-item ${checkingLinks.includes(0) ? 'checking' : ''} ${checkedLinks.includes(0) ? 'checked' : ''}`}
                href="tg://resolve?domain=telegram"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(0, e)}
            >
                OKX
            </a>
            <a
                className={`exchange-item ${checkingLinks.includes(1) ? 'checking' : ''} ${checkedLinks.includes(1) ? 'checked' : ''}`}
                href="https://medium.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(1, e)}
            >
                Binance
            </a>
            <a
                className={`exchange-item ${checkingLinks.includes(2) ? 'checking' : ''} ${checkedLinks.includes(2) ? 'checked' : ''}`}
                href="https://www.youtube.com/watch?v=H8t5uq-DRJk&list=RDEogFdxEzNcQ&index=12"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(2, e)}
            >
                Coinbase
            </a>
            <a
                className={`exchange-item ${checkingLinks.includes(3) ? 'checking' : ''} ${checkedLinks.includes(3) ? 'checked' : ''}`}
                href="https://web3.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(3, e)}
            >
                Kraken
            </a>
            <a
                className={`exchange-item ${checkingLinks.includes(4) ? 'checking' : ''} ${checkedLinks.includes(4) ? 'checked' : ''}`}
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(4, e)}
            >
                Bitfinex
            </a>
            <a
                className={`exchange-item ${checkingLinks.includes(5) ? 'checking' : ''} ${checkedLinks.includes(5) ? 'checked' : ''}`}
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(5, e)}
            >
                Huobi
            </a>
            <a
                className={`exchange-item ${checkingLinks.includes(6) ? 'checking' : ''} ${checkedLinks.includes(6) ? 'checked' : ''}`}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(6, e)}
            >
                MexC
            </a>
        </div>
    );
};

export default PageExchange;
