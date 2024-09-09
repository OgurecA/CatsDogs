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
    ? `Ты же ${firstName}? Рад встрече. Меня зовут Эллиот. Если надо что-то устроить, ты по адресу.`
    : `You must be ${firstName}, right? Good to meet you. Name's Elliot. If you need something sorted out, you've come to the right place.`;

  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: languageCode === 'ru' ? "Магазин" : "Shop", callback_data: 'gifts' }],
        [{ text: languageCode === 'ru' ? "Условия" : "Terms", callback_data: 'button2' }]
      ]
    }
  };
  const photo = fs.readFileSync('./src/Components/Photoes/ZirMarket.jpg');
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
    responseText = languageCode === 'ru' ? "Все покупки виртуальных предметов в нашей игре являются окончательными и не подлежат возврату. Мы рекомендуем тщательно обдумать покупку предмета перед его приобретением, так как обмен, возврат или компенсация средств за купленные виртуальные предметы невозможны.\n\nОплата виртуальных предметов в нашей игре принимается в Telegram Stars, стоимость которых определяется Telegram. Мы указываем только примерную цену. Для точной информации о текущей стоимости Telegram Stars, пожалуйста, обратитесь к магазину Telegram Stars.\n\nДля получения купленного предмета вам необходимо выполнить следующие шаги:\nLair => Gif Code => Введите полученный промокод => Submit\n\nСовершая покупку, вы автоматически соглашаетесь с условиями, установленными разработчиками игры. Данные условия включают отказ от возврата средств и обмена приобретенных виртуальных предметов. Покупка считается подтверждением того, что вы ознакомлены с данной политикой и принимаете ее в полном объеме." : "All purchases of virtual items in our game are final and non-refundable. We encourage you to carefully consider your purchase before proceeding, as exchanges, refunds, or compensation for purchased virtual items are not possible.\n\nPayment for virtual items in our game is accepted in Telegram Stars, the value of which is determined by Telegram. We provide only an approximate price for the items. For accurate information on the current value of Telegram Stars, please refer to the Telegram Stars store.\n\nTo redeem your purchased item, please follow these steps:\nLair => Gift Code => Enter the received promo code => Submit\n\nBy making a purchase, you automatically agree to the terms set by the game developers. These terms include a waiver of refunds and exchanges for purchased virtual items. Your purchase confirms that you have read, understood, and fully accept this policy.";
    const options = {
        reply_markup: {
          inline_keyboard: [
            [{ text: languageCode === 'ru' ? "Магазин" : "Shop", callback_data: 'gifts' }],
            [{ text: languageCode === 'ru' ? "Играть" : "Play", url: 'https://t.me/DireAnimals_bot' }]
          ]
        }
    };
    bot.sendMessage(chatId, responseText, options);
    return;

  } else if (data === 'Bik') {
    const invoice = {
        title: languageCode === 'ru' ? "Получите BERNARD за 45 Telegram Stars (~$0.99)" : "Get BERNARD for 45 Telegram Star (~$0.99)",
        description: languageCode === 'ru' ? "Совершая покупку, вы подтверждаете, что ознакомились и согласны с условиями использования." : "By making a purchase, you confirm that you have read and agree to the terms of use.",
        payload: "Bik",
        provider_token: "", // Пустой токен для Telegram Stars
        currency: "XTR", // Валюта для Telegram Stars
        prices: [{ label: languageCode === 'ru' ? "BERNARD" : "BERNARD", amount: 45 }] // 100 единиц Telegram Stars
      };

      const photo = fs.readFileSync('./src/Components/Photoes/BekPNG.png'); // Укажите путь к вашему изображению
      bot.sendPhoto(chatId, photo)
        .then(() => {
          // Затем отправляем инвойс
          bot.sendInvoice(
            chatId, 
            invoice.title, 
            invoice.description, 
            invoice.payload, 
            invoice.provider_token, 
            invoice.currency, 
            invoice.prices
          ).catch(err => console.error('Ошибка при отправке инвойса:', err.message));
        })
        .catch(err => console.error('Ошибка при отправке изображения:', err.message));
  
      console.log('Отправлен инвойс для Bernard.');
      return;


    } else if (data === 'Rat') {
      const invoice = {
          title: languageCode === 'ru' ? "Получите olev за 65 Telegram Stars (~$1.49)" : "Get olev for 65 Telegram Star (~$1.49)",
          description: languageCode === 'ru' ? "Совершая покупку, вы подтверждаете, что ознакомились и согласны с условиями использования." : "By making a purchase, you confirm that you have read and agree to the terms of use.",
          payload: "Rat",
          provider_token: "", // Пустой токен для Telegram Stars
          currency: "XTR", // Валюта для Telegram Stars
          prices: [{ label: languageCode === 'ru' ? "Крыса" : "Rat", amount: 1 }] // 100 единиц Telegram Stars
        };
      
        // Отправляем инвойс
        const photo = fs.readFileSync('./src/Components/Photoes/Krisa.png'); // Укажите путь к вашему изображению
      bot.sendPhoto(chatId, photo)
        .then(() => {
          // Затем отправляем инвойс
          bot.sendInvoice(
            chatId, 
            invoice.title, 
            invoice.description, 
            invoice.payload, 
            invoice.provider_token, 
            invoice.currency, 
            invoice.prices
          ).catch(err => console.error('Ошибка при отправке инвойса:', err.message));
        })
        .catch(err => console.error('Ошибка при отправке изображения:', err.message));
  
      console.log('Отправлен инвойс для olev.');
      return;
        
    } else if (data === 'X2') {
      const invoice = {
          title: languageCode === 'ru' ? "Получите X2 за 20 Telegram Stars (~$0.49)" : "Get X2 for 20 Telegram Stars (~$0.49)",
          description: languageCode === 'ru' ? "Совершая покупку, вы подтверждаете, что ознакомились и согласны с условиями использования." : "By making a purchase, you confirm that you have read and agree to the terms of use.",
          payload: "X2",
          provider_token: "", // Пустой токен для Telegram Stars
          currency: "XTR", // Валюта для Telegram Stars
          prices: [{ label: languageCode === 'ru' ? "X2" : "X2", amount: 20 }] // 100 единиц Telegram Stars
        };
      
        // Отправляем инвойс
        const photo = fs.readFileSync('./src/Components/Photoes/Red.png'); // Укажите путь к вашему изображению
      bot.sendPhoto(chatId, photo)
        .then(() => {
          // Затем отправляем инвойс
          bot.sendInvoice(
            chatId, 
            invoice.title, 
            invoice.description, 
            invoice.payload, 
            invoice.provider_token, 
            invoice.currency, 
            invoice.prices
          ).catch(err => console.error('Ошибка при отправке инвойса:', err.message));
        })
        .catch(err => console.error('Ошибка при отправке изображения:', err.message));
  
      console.log('Отправлен инвойс для X2.');
      return;

    } else if (data === 'X5') {
      const invoice = {
          title: languageCode === 'ru' ? "Получите X5 за 40 Telegram Stars (~$0.89)" : "Get X5 for 40 Telegram Star (~$0.89)",
          description: languageCode === 'ru' ? "Совершая покупку, вы подтверждаете, что ознакомились и согласны с условиями использования." : "By making a purchase, you confirm that you have read and agree to the terms of use.",
          payload: "X5",
          provider_token: "", // Пустой токен для Telegram Stars
          currency: "XTR", // Валюта для Telegram Stars
          prices: [{ label: languageCode === 'ru' ? "X5" : "X5", amount: 1 }] // 100 единиц Telegram Stars
        };
      
        // Отправляем инвойс
        const photo = fs.readFileSync('./src/Components/Photoes/Blue.png'); // Укажите путь к вашему изображению
      bot.sendPhoto(chatId, photo)
        .then(() => {
          // Затем отправляем инвойс
          bot.sendInvoice(
            chatId, 
            invoice.title, 
            invoice.description, 
            invoice.payload, 
            invoice.provider_token, 
            invoice.currency, 
            invoice.prices
          ).catch(err => console.error('Ошибка при отправке инвойса:', err.message));
        })
        .catch(err => console.error('Ошибка при отправке изображения:', err.message));
  
      console.log('Отправлен инвойс для X5.');
      return;

    } else if (data === 'X10') {
      const invoice = {
          title: languageCode === 'ru' ? "Получите X10 за 250 Telegram Stars (~$4.99)" : "Get X10 for 250 Telegram Star (~$4.99)",
          description: languageCode === 'ru' ? "Совершая покупку, вы подтверждаете, что ознакомились и согласны с условиями использования." : "By making a purchase, you confirm that you have read and agree to the terms of use.",
          payload: "X10",
          provider_token: "", // Пустой токен для Telegram Stars
          currency: "XTR", // Валюта для Telegram Stars
          prices: [{ label: languageCode === 'ru' ? "X10" : "X10", amount: 100 }] // 100 единиц Telegram Stars
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
                    ]
                ]
            }
        };
    
        responseText = languageCode === 'ru' ? "У меня есть все, что тебе нужно. Не раздумывай долго — хватай, пока есть в наличии." : "I've got everything you need. Don't think too long — grab it while it's still available.";
        const photo = fs.readFileSync('./src/Components/Photoes/Cargo.jpg');
        bot.sendPhoto(chatId, photo, { caption: responseText, ...options });
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
          ? `Ваш промокод для BERNARD: ${promoCode}\n`
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
