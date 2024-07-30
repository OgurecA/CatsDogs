const TelegramBot = require('node-telegram-bot-api');

// Замените 'YOUR_TELEGRAM_BOT_TOKEN' на токен вашего бота
const token = '7491271001:AAEOiriYnXp_fFXVS_Iqvekzga6wSH0NxhU';
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const loginUrl = 'https://t.me/PumpOrDump_bot/PumpOrDump'; // URL для авторизации

  const opts = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Login',
            login_url: {
              url: loginUrl,
              forward_text: 'Login (forwarded)' // Опционально: текст, который будет показан, когда ссылка будет переслана
            }
          },
          {
            text: 'Open Website',
            url: 'https://btc24news.online'
          }
        ]
      ]
    }
  };

  bot.sendMessage(chatId, 'Go to BTC24news', opts);
});

