import React from "react";
import "./AddContainer.css"; // Импорт стилей для контейнера
import useTogglePosition from '../TogglePosition/TogglePosition';

function AddContainer({ ads, className }) {
    const position = useTogglePosition(ads.length); // Передаем количество слайдов
    return (
        <div className={`add-container ${className}`} >
            {ads.map((ad, index) => (
                <a key={index} href={ad.link} target="_blank" rel="noopener noreferrer">
                    <img src={ad.src} alt={`Ad ${index + 1}`} style={{ transform: `translateX(${position}vw)` }} />
                </a>
            ))}
        </div>
    );
}

export default AddContainer;
