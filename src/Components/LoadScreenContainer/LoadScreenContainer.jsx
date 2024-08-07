import React from 'react'
import './LoadScreenContainer.css'
import LoadScreen from '../LoadScreen/LoadScreen';

function LoadScreenContainer({ CatBack }) {
    useEffect(() => {
        const timer = setTimeout(() => {
          const loadScreenContainer = document.querySelector('.load-screen-container');
          if (loadScreenContainer) {
            loadScreenContainer.classList.add('hidden');
          }
        }, 5300);
    
        return () => clearTimeout(timer); // Очистка таймера при размонтировании компонента
      }, []);
  return (
    <div className='load-screen-container'>
        <LoadScreen src={CatBack}/>
    </div>
  )
}

export default LoadScreenContainer;