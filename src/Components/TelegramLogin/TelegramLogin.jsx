import React, { useEffect, useRef } from 'react';

const TelegramLogin = () => {
  const telegramScript = useRef(null);

  useEffect(() => {
    if (!telegramScript.current) {
      const script = document.createElement('script');
      script.src = "https://telegram.org/js/telegram-widget.js?7";
      script.setAttribute("data-telegram-login", "PumpOrDump_bot");
      script.setAttribute("data-size", "large");
      script.setAttribute("data-auth-url", "https://btc24news.online/telegramauth");
      script.setAttribute("data-request-access", "write");
      script.async = true;

      document.body.appendChild(script);
      telegramScript.current = script; // Запомним скрипт, чтобы избежать повторной вставки
    }

    // Очистка при размонтировании компонента
    return () => {
      if (telegramScript.current) {
        document.body.removeChild(telegramScript.current);
        telegramScript.current = null;
      }
    };
  }, []);

  // Функция для инициации авторизации через Telegram
  const handleLogin = () => {
    const telegramButton = document.querySelector('iframe[title="Telegram Login Widget"]');
    if (telegramButton) {
      telegramButton.contentWindow.postMessage({ event: 'click' }, '*');
    }
  };

  return (
    <div>
      <button onClick={handleLogin} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Login with Telegram
      </button>
    </div>
  );
};

export default TelegramLogin;
