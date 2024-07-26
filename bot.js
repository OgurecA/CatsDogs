const { Telegraf, Markup } = require('telegraf');

const apiId = '25827801'; // Замените на ваш api_id
const apiHash = '0d1a57becebd4d6bb7b3863e2090c32c'; // Замените на ваш api_hash
const bot = new Telegraf('7491271001:AAEOiriYnXp_fFXVS_Iqvekzga6wSH0NxhU'); // Замените на токен вашего Telegram бота

bot.start((ctx) => {
    ctx.reply(
        'Привет! Я ваш Telegram бот. Авторизуйтесь через Telegram для доступа к вашему профилю',
        Markup.inlineKeyboard([
            Markup.button.url('Авторизоваться', 'https://yourwebsite.com')
        ])
    );
});

bot.launch().then(() => {
    console.log('Бот успешно запущен');
}).catch(error => {
    console.error('Ошибка запуска бота:', error);
});

// Для корректного завершения работы бота по сигналам
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));