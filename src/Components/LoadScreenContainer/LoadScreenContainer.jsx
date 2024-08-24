import React, { useEffect } from 'react';
import './LoadScreenContainer.css'
import LoadScreen from '../LoadScreen/LoadScreen';
import { SkullFon } from '../Pictures/Pictures';

function LoadScreenContainer() {
    useEffect(() => {
        const timer = setTimeout(() => {
          const loadScreenContainer = document.querySelector('.load-screen-container');
          if (loadScreenContainer) {
            loadScreenContainer.classList.add('hidden');
          }
        }, 6300);
    
        return () => clearTimeout(timer); // Очистка таймера при размонтировании компонента
      }, []);
  return (
    <div className='load-screen-container'>
        <LoadScreen src={SkullFon}/>
    </div>
  )
}

export default LoadScreenContainer;