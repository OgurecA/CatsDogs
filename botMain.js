const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');


const app = express();

// Ваш токен
const token = '6792138113:AAEDXdQf1WkJ5MtNB2SX3ZHnfSlYwJyL02E';

// Создаем экземпляр бота
const bot = new TelegramBot(token, { polling: true });

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name;  
  const languageCode = msg.from.language_code; // Получаем язык пользователя

  // Определяем текст на основе языка пользователя

  const welcomeText = languageCode === 'ru'
    ? `Добро пожаловать, ${firstName}! Выберите один из вариантов ниже:`
    : `Welcome, ${firstName}! Choose one of the options below:`;

  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: languageCode === 'ru' ? "Играть" : "Play", url: 'https://t.me/DireAnimals_bot/DireAnimals' }],
        [
          { text: languageCode === 'ru' ? "Подписаться" : "Subscribe", url: 'https://t.me/direanimalsnews' },
          { text: languageCode === 'ru' ? "Поделиться" : "Share", switch_inline_query: '' }
        ],
        [{ text: languageCode === 'ru' ? "Техподдержка" : "Tech Support", callback_data: 'button2' }]
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
  } 
  
  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: languageCode === 'ru' ? "Играть" : "Play", url: 'https://t.me/DireAnimals_bot/DireAnimals' }],
        [
          { text: languageCode === 'ru' ? "Подписаться" : "Subscribe", url: 'https://t.me/direanimalsnews' },
          { text: languageCode === 'ru' ? "Поделиться" : "Share", switch_inline_query: '' }
        ],
        [{ text: languageCode === 'ru' ? "Техподдержка" : "Tech Support", callback_data: 'button2' }]      
      ]
    }
  };

  const photo = fs.readFileSync(imagePath);
  bot.sendPhoto(chatId, photo, { caption: responseText, ...options });
});

console.log("Бот запущен...");
