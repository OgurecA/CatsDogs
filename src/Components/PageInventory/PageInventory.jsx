import React, { useState } from 'react';
import './PageInventory.css';
import {Snake, Gorilla, Croc, Elephant} from '../Pictures/Pictures';

const PageInventory = ({ className }) => {
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
            description: 'CON +10',
            image: Croc
        },
        {
            title: 'Elephant',
            description: 'INT +5',
            image: Elephant
        }
    ];

    const handleUseItem = (itemTitle) => {
        alert(`You selected ${itemTitle}`);
    };

    return (
        <div className={`page-inventory ${className}`}>
            {items.map((item, index) => (
                <div className={`card`} key={index}>
                    <img src={item.image} alt={item.title} className="card-image" />
                    <h3 className="card-title">{item.title}</h3>
                </div>
            ))}
        </div>
    );
};

export default PageInventory;
