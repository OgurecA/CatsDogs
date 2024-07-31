const TelegramBot = require('node-telegram-bot-api');

// Замените 'YOUR_TELEGRAM_BOT_TOKEN' на токен вашего бота
const token = '7491271001:AAEOiriYnXp_fFXVS_Iqvekzga6wSH0NxhU';
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;  // Получаем ID пользователя
  // Создаем URL с параметром startapp, который включает user_id пользователя
  const miniAppUrl = `https://t.me/PumpOrDump_bot/PupmOrDump`;

  const opts = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Open Mini App',
            url: miniAppUrl  // Используем URL для mini app с параметром user_id
          }
        ]
      ]
    }
  };

  bot.sendMessage(chatId, 'Click to open Mini App with your user ID!', opts);
});
