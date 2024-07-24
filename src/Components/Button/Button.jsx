import React from "react";
import "./Button.css";

function Button({ title, disable, onClick, isSelected, className, isActive }) {
  const activeClass = isSelected ? 'selected' : '';
  return (
    <button
      className={`btn president ${className} ${isActive ? 'btn-move active' : 'btn-move'} ${activeClass}`}
      onClick={onClick}
      disabled={disable}
    >
      {title}
    </button>
  );
}

export default Button;
