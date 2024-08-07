// src/Components/BottomSheet/BottomSheet.jsx
import React from 'react';
import { SwipeableBottomSheet } from 'react-swipeable-bottom-sheet';
import './BottomSheet.css'; // Создайте файл для стилей

const ShopSheet = ({ isOpen, onClose }) => {
    return (
        <SwipeableBottomSheet
            open={isOpen}
            onChange={onClose}
            overflowHeight={70}
        >
            <div className="bottom-sheet-content">
                <h2>Магазин Звезд</h2>
                <p>Здесь вы можете купить звезды для поддержки своих любимых авторов.</p>
                <button onClick={() => alert('Куплено 10 звезд!')}>Купить 10 звезд</button>
                <button onClick={() => alert('Куплено 50 звезд!')}>Купить 50 звезд</button>
                <button onClick={() => alert('Куплено 100 звезд!')}>Купить 100 звезд</button>
            </div>
        </SwipeableBottomSheet>
    );
};

export default ShopSheet;
