import React from "react";
import "./Head.css"; // Импорт стилей для контейнера

function Head({ src, className }) {

  return (
    <div className={`head ${className}`}
    >
    <img src={src} alt="Head" />
    </div>
  );
}

export default Head;
