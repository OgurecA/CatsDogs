const { Telegraf } = require('telegraf');

const apiId = '25827801'; // Замените на ваш api_id
const apiHash = '0d1a57becebd4d6bb7b3863e2090c32c'; // Замените на ваш api_hash
const bot = new Telegraf('7491271001:AAEOiriYnXp_fFXVS_Iqvekzga6wSH0NxhU'); // Замените на токен вашего Telegram бота

bot.start((ctx) => ctx.reply('Привет! Я ваш Telegram бот.'));
bot.help((ctx) => ctx.reply('Отправьте мне что-нибудь!'));
bot.on('text', (ctx) => {
  // Пример обработки текстового сообщения
  ctx.reply(`Вы написали: ${ctx.message.text}`);
});
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
