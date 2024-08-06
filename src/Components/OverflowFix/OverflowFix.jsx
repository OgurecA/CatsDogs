import React from 'react';
import './OverflowFix.css';
import ImageContainer from '../ImageContainer/ImageContainer';

const OverflowFix = ({ harrisImage, trumpImage, onHarrisClick, onTrumpClick, isSelectedHarris, isSelectedTrump }) => {
    return (
        <div className="overflow-fix-container">
            <ImageContainer
                src={harrisImage}
                className={`image-container no-select harris-image ${isSelectedHarris ? 'selected' : ''}`}
                disable={isSelectedTrump}
                onClick={onHarrisClick}
            />
            <ImageContainer
                src={trumpImage}
                className={`image-container no-select trump-image ${isSelectedTrump ? 'selected' : ''}`}
                disable={isSelectedHarris}
                onClick={onTrumpClick}
            />
        </div>
    );
}

export default OverflowFix;
