import React, { useState, useEffect } from 'react';
import './LoadScreen.css';

function LoadScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 10000);

    return () => clearTimeout(timer); // Очистка таймера при размонтировании компонента
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="load-screen">LoadScreen</div>
  );
}

export default LoadScreen;
