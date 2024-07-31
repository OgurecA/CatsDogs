const TelegramBot = require('node-telegram-bot-api');

// Замените 'YOUR_TELEGRAM_BOT_TOKEN' на токен вашего бота
const token = '7491271001:AAEOiriYnXp_fFXVS_Iqvekzga6wSH0NxhU';
const bot = new TelegramBot(token, {polling: true});

// Этот объект будет хранить временно ID для каждого пользователя
const userSessions = {};

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    
    // Проверяем, если пользователь уже отправил ID
    if (userSessions[chatId]) {
        // Строим и отправляем ссылку с ID
        const miniAppUrl = `https://t.me/PumpOrDump_bot/PumpOrDump?startapp=${text}`;
        bot.sendMessage(chatId, `Вот ваша ссылка: ${miniAppUrl}`);
        delete userSessions[chatId]; // Очищаем сессию после отправки ссылки
    } else {
        // Спрашиваем ID пользователя
        bot.sendMessage(chatId, "Пожалуйста, введите ваш ID:");
        userSessions[chatId] = true; // Сохраняем, что пользователь начал сессию
    }
});

