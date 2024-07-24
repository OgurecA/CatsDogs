import React from "react";
import "./ImageContainer.css"; // Импорт стилей для контейнера

function ImageContainer({ src, onClick, isSelected, disable, className }) {
  const activeClass = isSelected ? 'selected' : '';

  return (
    <button className={`image-container ${className} ${activeClass}`}
    onClick={onClick}
    disabled={disable}
    >
    <img src={src} alt="President" />
    </button>
  );
}

export default ImageContainer;
