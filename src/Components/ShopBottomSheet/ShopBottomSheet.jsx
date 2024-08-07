import React from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import './ShopBottomSheet.css'; // Создайте файл для стилей

const ShopBottomSheet = ({ isOpen, onClose }) => {
    return (
        <BottomSheet
            open={isOpen}
            onDismiss={onClose}
        >
            <div className="bottom-sheet-content">
                <h2>Магазин Звезд</h2>
                <p>Здесь вы можете купить звезды для поддержки своих любимых авторов.</p>
                <button onClick={() => alert('Куплено 10 звезд!')}>Купить 10 звезд</button>
                <button onClick={() => alert('Куплено 50 звезд!')}>Купить 50 звезд</button>
                <button onClick={() => alert('Куплено 100 звезд!')}>Купить 100 звезд</button>
            </div>
        </BottomSheet>
    );
};

export default ShopBottomSheet;
