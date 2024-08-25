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
  const welcomeText = "Добро пожаловать! Выберите один из вариантов ниже:";
  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Кнопка 1", callback_data: 'button1' }],
        [{ text: "Кнопка 2", callback_data: 'button2' }],
        [{ text: "Кнопка 3", callback_data: 'button3' }]
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
  bot.sendMessage(msg.chat.id, `Вы нажали: ${data}`);
});


console.log("Бот запущен...");

