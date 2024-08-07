import React from 'react'
import './LoadScreenContainer.css'
import LoadScreen from '../LoadScreen/LoadScreen';

function LoadScreenContainer({ CatBack }) {
  return (
    <div className='load-screen-container'>
        <LoadScreen src={CatBack}/>
    </div>
  )
}

export default LoadScreenContainer;