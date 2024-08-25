const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const app = express();

// Ваш токен
const token = '7491271001:AAEOiriYnXp_fFXVS_Iqvekzga6wSH0NxhU';

// Создаем экземпляр бота
const bot = new TelegramBot(token, { polling: true });

function generatePromoCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let promoCode = '';
  for (let i = 0; i < 8; i++) {
    promoCode += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return promoCode;
}

function savePromoCode(code, value) {
  db.run(`INSERT INTO promocodes (code, value) VALUES (?, ?)`, [code, value], function(err) {
    if (err) {
      return console.error('Ошибка при сохранении промокода:', err.message);
    }
    console.log(`Промокод сохранен: ${code} с значением: ${value}`);
  });
}


// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name;  // Имя пользователя
  const lastName = msg.from.last_name;    // Фамилия пользователя
  const username = msg.from.username; 
  const languageCode = msg.from.language_code; // Получаем язык пользователя

  // Определяем текст на основе языка пользователя

  const welcomeText = languageCode === 'ru'
    ? `Добро пожаловать, ${firstName}! Выберите один из вариантов ниже:`
    : `Welcome, ${firstName}! Choose one of the options below:`;

  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: languageCode === 'ru' ? "Играц" : "Play", url: 'https://t.me/PumpOrDump_bot/PumpOrDump' }],
        [{ text: languageCode === 'ru' ? "Подписаться" : "Subscribe", url: 'https://t.me/hamster24news' }],
        [{ text: languageCode === 'ru' ? "Поделиться ботом" : "Share bot", switch_inline_query: '' }],
        [{ text: languageCode === 'ru' ? "Подарки" : "Gifts", callback_data: 'gifts' }],
        [{ text: languageCode === 'ru' ? "Правила" : "Rules", callback_data: 'button2' }]
      ]
    }
  };
  const photo = fs.readFileSync('./src/Components/Photoes/Zir3.jpeg');
  bot.sendPhoto(chatId, photo, { caption: welcomeText, ...options });
});

// Обработчик нажатия на кнопки
bot.on('callback_query', (callbackQuery) => {
  const msg = callbackQuery.message;
  const data = callbackQuery.data;
  const chatId = msg.chat.id;
  const languageCode = callbackQuery.from.language_code;

  let responseText;
  let imagePath;

  if (data === 'button2') {
    responseText = languageCode === 'ru' ? "Правила игры и их описание" : "Rules and their description";
    imagePath = './src/Components/Photoes/FonSkull.jpeg'; // Укажите путь к изображению для кнопки 2
  } else if (data === 'gifts') {
    const promoCode = generatePromoCode();
    const promoValue = "1000";

    savePromoCode(promoCode, promoValue);  
    responseText = languageCode === 'ru' 
      ? `Ваш промокод: ${promoCode}` 
      : `Your promo code: ${promoCode}`;
    bot.sendMessage(chatId, responseText);
    return; // Укажите путь к изображению для кнопки 3
  } else if (data === 'button4') {
    responseText = "Вы выбрали четвертый вариант!";
    imagePath = './src/Components/Photoes/Bik.png'; // Укажите путь к изображению для кнопки 3
  }

  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: languageCode === 'ru' ? "Играть" : "Play", url: 'https://t.me/PumpOrDump_bot/PumpOrDump' }],
        [{ text: languageCode === 'ru' ? "Подписаться" : "Subscribe", url: 'https://t.me/hamster24news' }],
        [{ text: languageCode === 'ru' ? "Поделиться ботом" : "Share bot", switch_inline_query: '' }],
        [{ text: languageCode === 'ru' ? "Подарки" : "Gifts", callback_data: 'gifts' }],
        [{ text: languageCode === 'ru' ? "Правила" : "Rules", callback_data: 'button2' }]
      ]
    }
  };

  const photo = fs.readFileSync(imagePath);
  bot.sendPhoto(chatId, photo, { caption: responseText, ...options });
});

console.log("Бот запущен...");
