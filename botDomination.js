const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const app = express();

// Ваш токен
const token = '7491271001:AAEOiriYnXp_fFXVS_Iqvekzga6wSH0NxhU';

// Создаем экземпляр бота
const bot = new TelegramBot(token, { polling: true });

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name;  // Имя пользователя
  const lastName = msg.from.last_name;    // Фамилия пользователя
  const username = msg.from.username; 
  const languageCode = msg.from.language_code; // Получаем язык пользователя

  // Определяем текст на основе языка пользователя
  let welcomeText, playText, subscribeText, shareText, giftsText, rulesText;

  if (languageCode === 'ru') {
    welcomeText = `Добро пожаловать, ${firstName}! Выберите один из вариантов ниже:`;
    playText = "Играть";
    subscribeText = "Подписаться";
    shareText = "Поделиться ботом";
    giftsText = "Подарки";
    rulesText = "Правила";
    rulesTextDescription = "Инфо о том как использовать бота";
  } else {
    welcomeText = `Welcome, ${firstName}! Choose one of the options below:`;
    playText = "Play";
    subscribeText = "Subscribe";
    shareText = "Share bot";
    giftsText = "Gifts";
    rulesText = "Rules";
    rulesTextDescription = "Info about how to use this bot";
  }

  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: playText, url: 'https://t.me/PumpOrDump_bot/PumpOrDump' }],
        [{ text: subscribeText, url: 'https://t.me/hamster24news' }],
        [{ text: shareText, switch_inline_query: '' }],
        [{ text: giftsText, switch_inline_query: '' }],
        [{ text: rulesText, callback_data: 'button2' }]
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

  let responseText;
  let imagePath;

  if (data === 'button2') {
    responseText = rulesTextDescription;
    imagePath = './src/Components/Photoes/FonSkull.jpeg'; // Укажите путь к изображению для кнопки 2
  } else if (data === 'button3') {
    responseText = "Вы выбрали третий вариант!";
    imagePath = './src/Components/Photoes/Svin.png'; // Укажите путь к изображению для кнопки 3
  } else if (data === 'button4') {
    responseText = "Вы выбрали четвертый вариант!";
    imagePath = './src/Components/Photoes/Bik.png'; // Укажите путь к изображению для кнопки 3
  }

  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: playText, url: 'https://t.me/PumpOrDump_bot/PumpOrDump' }],
        [{ text: subscribeText, url: 'https://t.me/hamster24news' }],
        [{ text: shareText, switch_inline_query: '' }],
        [{ text: giftsText, switch_inline_query: '' }],
        [{ text: rulesText, callback_data: 'button2' }]
      ]
    }
  };

  const photo = fs.readFileSync(imagePath);
  bot.sendPhoto(chatId, photo, { caption: responseText, ...options });
});

console.log("Бот запущен...");
