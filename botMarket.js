const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();  // Подключение к sqlite3
require('dotenv').config();


const app = express();

// Ваш токен
const token = process.env.BOT_MARKET_TOKEN;

// Создаем экземпляр бота
const bot = new TelegramBot(token, { polling: true });

let db = new sqlite3.Database('./election.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('Ошибка при подключении к базе данных:', err.message);
  } else {
    console.log('Подключено к базе данных.');
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS promocodes (
      code TEXT NOT NULL,
      value TEXT NOT NULL
  )
`);


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
  const firstName = msg.from.first_name;
  const languageCode = msg.from.language_code; // Получаем язык пользователя

  // Определяем текст на основе языка пользователя

  const welcomeText = languageCode === 'ru'
    ? `Добро пожаловать, ${firstName}! Выберите один из вариантов ниже:`
    : `Welcome, ${firstName}! Choose one of the options below:`;

  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: languageCode === 'ru' ? "Магазин" : "Shop", callback_data: 'gifts' }],
        [{ text: languageCode === 'ru' ? "Условия" : "Terms", callback_data: 'button2' }]
      ]
    }
  };
  const photo = fs.readFileSync('./src/Components/Photoes/Barsuk.jpg');
  bot.sendPhoto(chatId, photo, { caption: welcomeText, ...options });
});

// Обработчик нажатия на кнопки
bot.on('callback_query', (callbackQuery) => {
  const msg = callbackQuery.message;
  const data = callbackQuery.data;
  const chatId = msg.chat.id;
  const messageId = msg.message_id;
  const languageCode = callbackQuery.from.language_code;

  let responseText;
  let imagePath;

  if (data === 'button2') {
    responseText = languageCode === 'ru' ? "Правила игры и их описание" : "Rules and their description";
    const options = {
        reply_markup: {
          inline_keyboard: [
            [{ text: languageCode === 'ru' ? "Магазин" : "Shop", callback_data: 'gifts' }],
            [{ text: languageCode === 'ru' ? "Назад" : "Back", callback_data: 'back_to_start' }]
          ]
        }
    };
    const photo = fs.readFileSync('./src/Components/Photoes/BotTech.jpg');
    bot.sendPhoto(chatId, photo, { caption: responseText, ...options });
    return;

} else if (data === 'back_to_start') {
    // Удаление текущего сообщения
    bot.deleteMessage(chatId, messageId).then(() => {
      const welcomeText = languageCode === 'ru'
        ? `Добро пожаловать! Выберите один из вариантов ниже:`
        : `Welcome! Choose one of the options below:`;

      const options = {
        reply_markup: {
          inline_keyboard: [
            [{ text: languageCode === 'ru' ? "Магазин" : "Shop", callback_data: 'gifts' }],
            [{ text: languageCode === 'ru' ? "Условия" : "Terms", callback_data: 'button2' }]
          ]
        }
      }
      const photo = fs.readFileSync('./src/Components/Photoes/Zir3.jpeg');
      bot.sendPhoto(chatId, photo, { caption: welcomeText, ...options });
    });
    return;




  } else if (data === 'Bik') {
    const invoice = {
        title: languageCode === 'ru' ? "Получите Дракона за 35000 Telegram Stars (~$749.99)" : "Get a Dragon for 1 Telegram Star (~$749.99)",
        description: languageCode === 'ru' ? "Покупка не подлежит возврату. Совершая покупку, вы соглашаетесь с условиями использования." : "Purchase is non-refundable. By making a purchase, you agree to the terms of service.",
        payload: "Bik",
        provider_token: "", // Пустой токен для Telegram Stars
        currency: "XTR", // Валюта для Telegram Stars
        prices: [{ label: languageCode === 'ru' ? "BERNARD" : "BERNARD", amount: 1 }] // 100 единиц Telegram Stars
      };
    
      // Отправляем инвойс
      bot.sendInvoice(
        chatId, 
        invoice.title, 
        invoice.description, 
        invoice.payload, 
        invoice.provider_token, 
        invoice.currency, 
        invoice.prices
      ).catch(err => console.error('Ошибка при отправке инвойса:', err.message));
      
      console.log('Отправлен инвойс для Drake.');
      return;

    } else if (data === 'Rat') {
      const invoice = {
          title: languageCode === 'ru' ? "Получите Крысу за 250 Telegram Stars (~$4.99)" : "Get a Rat for 250 Telegram Star (~$4.99)",
          description: languageCode === 'ru' ? "Покупка не подлежит возврату. Совершая покупку, вы соглашаетесь с условиями использования." : "Purchase is non-refundable. By making a purchase, you agree to the terms of service.",
          payload: "Rat",
          provider_token: "", // Пустой токен для Telegram Stars
          currency: "XTR", // Валюта для Telegram Stars
          prices: [{ label: languageCode === 'ru' ? "Крыса" : "Rat", amount: 1 }] // 100 единиц Telegram Stars
        };
      
        // Отправляем инвойс
        bot.sendInvoice(
          chatId, 
          invoice.title, 
          invoice.description, 
          invoice.payload, 
          invoice.provider_token, 
          invoice.currency, 
          invoice.prices
        ).catch(err => console.error('Ошибка при отправке инвойса:', err.message));
        
        console.log('Отправлен инвойс для Rat.');
        return;
        
    } else if (data === 'X2') {
      const invoice = {
          title: languageCode === 'ru' ? "Получите X2 за 50 Telegram Stars (~$0.99)" : "Get X2 for 50 Telegram Stars (~$0.99)",
          description: languageCode === 'ru' ? "Покупка не подлежит возврату. Совершая покупку, вы соглашаетесь с условиями использования." : "Purchase is non-refundable. By making a purchase, you agree to the terms of service.",
          payload: "X2",
          provider_token: "", // Пустой токен для Telegram Stars
          currency: "XTR", // Валюта для Telegram Stars
          prices: [{ label: languageCode === 'ru' ? "X2" : "X2", amount: 1 }] // 100 единиц Telegram Stars
        };
      
        // Отправляем инвойс
        bot.sendInvoice(
          chatId, 
          invoice.title, 
          invoice.description, 
          invoice.payload, 
          invoice.provider_token, 
          invoice.currency, 
          invoice.prices
        ).catch(err => console.error('Ошибка при отправке инвойса:', err.message));
        
        console.log('Отправлен инвойс для X2.');
        return;

    } else if (data === 'X5') {
      const invoice = {
          title: languageCode === 'ru' ? "Получите X5 за 250 Telegram Stars (~$2.99)" : "Get X10 for 250 Telegram Star (~$2.99)",
          description: languageCode === 'ru' ? "Покупка не подлежит возврату. Совершая покупку, вы соглашаетесь с условиями использования." : "Purchase is non-refundable. By making a purchase, you agree to the terms of service.",
          payload: "X5",
          provider_token: "", // Пустой токен для Telegram Stars
          currency: "XTR", // Валюта для Telegram Stars
          prices: [{ label: languageCode === 'ru' ? "X5" : "X5", amount: 1 }] // 100 единиц Telegram Stars
        };
      
        // Отправляем инвойс
        bot.sendInvoice(
          chatId, 
          invoice.title, 
          invoice.description, 
          invoice.payload, 
          invoice.provider_token, 
          invoice.currency, 
          invoice.prices
        ).catch(err => console.error('Ошибка при отправке инвойса:', err.message));
        
        console.log('Отправлен инвойс для X5.');
        return;

    } else if (data === 'X10') {
      const invoice = {
          title: languageCode === 'ru' ? "Получите X10 за 250 Telegram Stars (~$4.99)" : "Get X10 for 250 Telegram Star (~$4.99)",
          description: languageCode === 'ru' ? "Покупка не подлежит возврату. Совершая покупку, вы соглашаетесь с условиями использования." : "Purchase is non-refundable. By making a purchase, you agree to the terms of service.",
          payload: "X10",
          provider_token: "", // Пустой токен для Telegram Stars
          currency: "XTR", // Валюта для Telegram Stars
          prices: [{ label: languageCode === 'ru' ? "X10" : "X10", amount: 1 }] // 100 единиц Telegram Stars
        };
      
        // Отправляем инвойс
        bot.sendInvoice(
          chatId, 
          invoice.title, 
          invoice.description, 
          invoice.payload, 
          invoice.provider_token, 
          invoice.currency, 
          invoice.prices
        ).catch(err => console.error('Ошибка при отправке инвойса:', err.message));
        
        console.log('Отправлен инвойс для X10.');
        return;


      } else if (data === 'gifts') {
        // Отправка сообщения с кнопками подарков
        const options = {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: languageCode === 'ru' ? "BERNARD" : "BERNARD", callback_data: 'Bik' },
                        { text: languageCode === 'ru' ? "olev" : "olev", callback_data: 'Rat' }
                    ],
                    [
                        { text: languageCode === 'ru' ? "Ярость X2" : "Rage X2", callback_data: 'X2' },
                        { text: languageCode === 'ru' ? "Ярость X5" : "Rage X5", callback_data: 'X5' }
                    ],
                    [
                        { text: languageCode === 'ru' ? "Ярость X10" : "Rage X10", callback_data: 'X10' }
                    ],
                    [
                        { text: languageCode === 'ru' ? "Назад" : "Back", callback_data: 'back_to_start' }
                    ]
                ]
            }
        };
    
        responseText = languageCode === 'ru' ? "Выберите подарок:" : "Choose a gift:";
        bot.sendMessage(chatId, responseText, options);
        return;
    }
    

});

bot.on('pre_checkout_query', (query) => {
    bot.answerPreCheckoutQuery(query.id, true)  // Подтверждаем готовность принять оплату
      .catch(err => console.error('Ошибка при подтверждении предоплаты:', err.message));
  });
  bot.on('successful_payment', (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id; // Получаем ID пользователя
    const languageCode = msg.from.language_code;
    const amount = msg.successful_payment.total_amount; // Получаем количество потраченных звезд
    const purchaseDate = new Date().toISOString(); // Текущая дата в формате ISO
  
    let promoCode, promoValue, responseText;
  
    // Определяем товар в зависимости от payload
    switch (msg.successful_payment.invoice_payload) {
      case 'Bik':
        promoCode = generatePromoCode();
        promoValue = "Bik";
        responseText = languageCode === 'ru'
          ? `Ваш промокод для BERNARD: ${promoCode}`
          : `Your promo code for BERNARD: ${promoCode}`;
        break;
      case 'Rat':
        promoCode = generatePromoCode();
        promoValue = "Rat";
        responseText = languageCode === 'ru'
          ? `Ваш промокод для olev: ${promoCode}`
          : `Your promo code for olev: ${promoCode}`;
        break;
      case 'X2':
        promoCode = generatePromoCode();
        promoValue = "X2";
        responseText = languageCode === 'ru'
          ? `Ваш промокод для Ярости X2: ${promoCode}`
          : `Your promo code for Rage X2: ${promoCode}`;
        break;
      case 'X5':
        promoCode = generatePromoCode();
        promoValue = "X5";
        responseText = languageCode === 'ru'
          ? `Ваш промокод для Ярости X5: ${promoCode}`
          : `Your promo code for Rage X5: ${promoCode}`;
        break;
      case 'X10':
        promoCode = generatePromoCode();
        promoValue = "X10";
        responseText = languageCode === 'ru'
          ? `Ваш промокод для Ярости X10: ${promoCode}`
          : `Your promo code for Rage X10: ${promoCode}`;
        break;
    }
  
    // Сохраняем промокод
    savePromoCode(promoCode, promoValue);
  
    // Сохраняем информацию о покупке в базу данных
    db.run(`INSERT INTO market (user_id, amount, item, date) VALUES (?, ?, ?, ?)`,
      [userId, amount, promoValue, purchaseDate],
      (err) => {
        if (err) {
          console.error('Ошибка при сохранении покупки:', err.message);
        } else {
          console.log('Покупка успешно сохранена.');
          bot.sendMessage(chatId, responseText);
        }
      }
    );
  });
  

console.log("Бот запущен...");
