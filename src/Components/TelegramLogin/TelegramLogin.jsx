import React, { useEffect } from 'react';

const TelegramLogin = () => {
  useEffect(() => {
    // Добавление скрипта Telegram Widget
    const script = document.createElement('script');
    script.src = "https://telegram.org/js/telegram-widget.js?7";
    script.setAttribute("data-telegram-login", "PumpOrDump_bot");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-auth-url", "https://btc24news.online/telegramauth");
    script.setAttribute("data-request-access", "write");
    script.async = true;

    document.body.appendChild(script);

    return () => {
      // Удаление скрипта при размонтировании компонента
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div id="telegram-button"></div>
    </div>
  );
};

export default TelegramLogin;
