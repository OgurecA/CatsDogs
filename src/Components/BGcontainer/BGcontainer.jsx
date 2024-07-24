// BGcontainer.js
import React, { useEffect, useState } from 'react';
import './BGcontainer.css';

function BGcontainer({ src }) {
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        if (src) {
            setOpacity(0); // Сбросить прозрачность при получении нового URL
            setTimeout(() => {
                setOpacity(1); // Плавно увеличиваем прозрачность
            }, 10);
        }
    }, [src]);

    return (
        <div className="BGcontainer" style={{ backgroundImage: `url(${src})`, opacity: opacity }}>
            <div className="darkening-layer"></div>
        </div>
        
    );
}

export default BGcontainer;
