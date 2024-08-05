import React from 'react';
import './OverflowFix.css';
import ImageContainer from '../ImageContainer/ImageContainer';

const OverflowFix = ({ harrisImage, trumpImage, onHarrisClick, onTrumpClick, isSelectedHarris, isSelectedTrump }) => {
    return (
        <div className="overflow-fix-container">
            {(isSelectedHarris || isSelectedTrump) && (
                <>
                    <ImageContainer
                        src={harrisImage}
                        className={`image-container no-select harris-image ${isSelectedHarris ? 'selected' : ''}`}
                        disable={false}
                        onClick={onHarrisClick}
                    />
                    <ImageContainer
                        src={trumpImage}
                        className={`image-container no-select trump-image ${isSelectedTrump ? 'selected' : ''}`}
                        disable={false}
                        onClick={onTrumpClick}
                    />
                </>
            )}
        </div>
    );
}

export default OverflowFix;
