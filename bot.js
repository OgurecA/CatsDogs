const TelegramBot = require('node-telegram-bot-api');

// Замените 'YOUR_TELEGRAM_BOT_TOKEN' на токен вашего бота
const token = '7491271001:AAEOiriYnXp_fFXVS_Iqvekzga6wSH0NxhU';
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    
    if (text === '/start') {
        // Приветствие и запрос ID
        bot.sendMessage(chatId, "Please enter your custom ID:");
    } else {
        // Построение URL Mini App с пользовательским ID
        const miniAppUrl = `https://t.me/PumpOrDump_bot/PumpOrDump?startapp=${text}`;
        const opts = {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Open Mini App', // Текст на кнопке
                            url: miniAppUrl       // URL, который откроется при нажатии
                        }
                    ]
                ]
            }
        };
        bot.sendMessage(chatId, 'Click the button to open your Mini App with your custom ID:', opts);
    }
});