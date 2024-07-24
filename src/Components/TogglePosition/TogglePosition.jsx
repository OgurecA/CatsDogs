import { useEffect, useState } from 'react';

function useTogglePosition(length) {
    const [position, setPosition] = useState(0);
    const [direction, setDirection] = useState('right'); // начальное направление движения

    useEffect(() => {
        const intervalId = setInterval(() => {
            setPosition(prev => {
                if (prev === (length - 1) * -100 && direction === 'right') {
                    setDirection('left'); // Поменять направление на влево, если достигнут последний элемент
                    return prev + 100;
                } else if (prev === 0 && direction === 'left') {
                    setDirection('right'); // Поменять направление на вправо, если достигнут первый элемент
                    return prev - 100;
                } else {
                    return direction === 'right' ? prev - 100 : prev + 100;
                }
            });
        }, 5000); // Переключение каждые 5 секунд

        return () => clearInterval(intervalId);
    }, [direction, length]);

    return position;
}

export default useTogglePosition;
