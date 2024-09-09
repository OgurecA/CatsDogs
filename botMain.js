const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
require('dotenv').config();



const app = express();

// Ваш токен
const token = process.env.BOT_TOKEN;

// Создаем экземпляр бота
const bot = new TelegramBot(token, { polling: true });

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name;  
  const languageCode = msg.from.language_code; // Получаем язык пользователя
  const userId = msg.from.id;

  // Определяем текст на основе языка пользователя

  const welcomeText = languageCode === 'ru'
    ? `А, ${firstName}, отлично, ты тут! Я — Vince, и нам как раз нужна свежая кровь. Давай, погнали!`
    : `Oi, ${firstName}, where you've been, mate? Name’s Vince, and we could use some fresh blood around here! Let’s get moving!`;

  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: languageCode === 'ru' ? "Играть" : "Play", url: 'https://t.me/DireAnimals_bot/DireAnimals' }],
        [
          { text: languageCode === 'ru' ? "Подписаться" : "Subscribe", url: 'https://t.me/direanimalsnews' },
          { text: languageCode === 'ru' ? "Поделиться" : "Share", switch_inline_query: languageCode === 'ru' ? `\nЗаходи, введи мой код ${userId} и забери свою награду!` : `\nJoin, enter my code ${userId}, and claim your reward!` }
        ],
        [{ text: languageCode === 'ru' ? "Магазин" : "Market", url: 'https://t.me/DireAnimalsMarket_bot' }],
        [{ text: languageCode === 'ru' ? "Техподдержка" : "Tech Support", callback_data: 'button2' }]
      ]
    }
  };
  const photo = fs.readFileSync('./src/Components/Photoes/BarsukNew.jpg');
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
    responseText = languageCode === 'ru' 
    ? "Возникли проблемы?\n\nПопробуйте перезапустить приложение или очистить кэш браузера. Это часто решает многие технические трудности и помогает восстановить нормальную работу приложения.\n\nЕсли проблемы продолжаются, загляните в наш Telegram-канал для получения обновлений, поддержки и ответов на часто задаваемые вопросы.\nt.me/direanimalsnews" 
    : "Having issues?\n\nTry restarting the app or clearing your browser cache. This often resolves many technical difficulties and restores normal operation.\n\nIf the problems persist, check out our Telegram channel for updates, support, and answers to frequently asked questions.\nt.me/direanimalsnews";
  } 
  
  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: languageCode === 'ru' ? "Играть" : "Play", url: 'https://t.me/DireAnimals_bot/DireAnimals' }],
        [
          { text: languageCode === 'ru' ? "Подписаться" : "Subscribe", url: 'https://t.me/direanimalsnews' },
          { text: languageCode === 'ru' ? "Поделиться" : "Share", switch_inline_query: '' }
        ],
        [{ text: languageCode === 'ru' ? "Магазин" : "Market", url: 'https://t.me/DireAnimalsMarket_bot' }],
        [{ text: languageCode === 'ru' ? "Техподдержка" : "Tech Support", callback_data: 'button2' }]      
      ]
    }
  };

  bot.sendMessage(chatId, responseText, options);
});

console.log("Бот запущен...");
