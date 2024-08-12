import React, { useState } from 'react';
import './PageInventory.css';
import {Snake, Gorilla, Croc, Elephant, Tiger} from '../Pictures/Pictures';

const PageInventory = ({ className }) => {
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const items = [
        {
            title: 'Snake',
            image: Snake
        },
        {
            title: 'Gorilla',
            image: Gorilla
        },
        {
            title: 'Croc',
            image: Croc
        },
        {
            title: 'Elephant',
            image: Elephant
        },
        {
            title: 'Tiger',
            image: Tiger
        }
    ];

    useEffect(() => {
        const savedIndex = localStorage.getItem('selectedCardIndex');
        if (savedIndex !== null) {
            setSelectedCardIndex(Number(savedIndex));
        }
    }, []);

    const handleCardClick = (index) => {
        setSelectedCardIndex(index);
        localStorage.setItem('selectedCardIndex', index);
    };

    return (
        <div className={`page-inventory ${className}`}>
            {items.map((item, index) => (
                <div
                    className={`card ${selectedCardIndex === index ? 'chosen' : ''}`}
                    key={index}
                    onClick={() => handleCardClick(index)}
                >
                    <img src={item.image} alt={item.title} className="card-image" />
                    <h3 className="card-title">{item.title}</h3>
                </div>
            ))}
        </div>
    );
};

export default PageInventory;
