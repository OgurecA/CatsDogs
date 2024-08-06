import React, { useEffect } from 'react';
import './LoadScreen.css';

function LoadScreen( src ) {
  useEffect(() => {
    const timer = setTimeout(() => {
      const loadScreen = document.querySelector('.load-screen');
      if (loadScreen) {
        loadScreen.classList.add('hidden');
      }
    }, 5000);

    return () => clearTimeout(timer); // Очистка таймера при размонтировании компонента
  }, []);

  return (
    <div className="load-screen">
      <div className="load-screen-content">
        <img src={src} alt="Loading" className="loading-image" />
      </div>
    </div>
  );
}

export default LoadScreen;
