const express = require('express');
const path = require('path');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const crypto = require('crypto');
const bodyParser = require('body-parser');

const botToken = '7491271001:AAEOiriYnXp_fFXVS_Iqvekzga6wSH0NxhU';

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Подключаем статические файлы
app.use(express.static(path.join(__dirname, 'build')));

app.use(cors()); // Это позволит все запросы из любых источников


let db = new sqlite3.Database('./election.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
      console.error('Error opening database', err.message);
  } else {
      console.log('Connected to the election database.');
  }
});

// Создание таблиц
db.serialize(() => {
  // Создание таблицы для общих голосов
  db.run(`CREATE TABLE IF NOT EXISTS total_votes (
      candidate TEXT PRIMARY KEY,
      votes INTEGER DEFAULT 0
  )`);

  // Добавление начальных данных
  db.run(`INSERT OR IGNORE INTO total_votes (candidate, votes) VALUES ('Trump', 0), ('Harris', 0)`);

  // Создание таблицы для данных пользователя
  db.run(`CREATE TABLE IF NOT EXISTS user_data (
      telegram_id TEXT PRIMARY KEY,
      username TEXT,
      choice TEXT,
      personal_clicks INTEGER DEFAULT 0
  )`);
});

process.on('SIGINT', () => {
  db.close(() => {
      console.log('База данных закрыта из-за завершения работы сервера');
      process.exit(0);
  });
});


function incrementTrumpTotalVotes() {
  const updateQuery = `UPDATE total_votes SET votes = votes + 1 WHERE candidate = 'Trump';`;
  const selectQuery = `SELECT votes FROM total_votes WHERE candidate = 'Trump';`;

  db.run(updateQuery, function(updateErr) {
      if (updateErr) {
          console.error('Error updating Trump votes', updateErr.message);
      } else {
          db.get(selectQuery, (selectErr, row) => {
              if (selectErr) {
                  console.error('Error fetching Trump votes', selectErr.message);
              } else {
                  console.log(`Current number of votes for Trump: ${row.votes}`);
              }
          });
      }
  });
}

function incrementHarrisTotalVotes() {
  const updateQuery = `UPDATE total_votes SET votes = votes + 1 WHERE candidate = 'Harris';`;
  const selectQuery = `SELECT votes FROM total_votes WHERE candidate = 'Harris';`;

  db.run(updateQuery, function(updateErr) {
      if (updateErr) {
          console.error('Error updating Harris votes', updateErr.message);
      } else {
          db.get(selectQuery, (selectErr, row) => {
              if (selectErr) {
                  console.error('Error fetching Harris votes', selectErr.message);
              } else {
                  console.log(`Current number of votes for Harris: ${row.votes}`);
              }
          });
      }
  });
}

// Эндпоинт для увеличения голосов за Трампа
app.post('/vote/trump', (req, res) => {
  incrementTrumpTotalVotes();
  res.send({ message: 'Vote for Trump registered' });
});

// Эндпоинт для увеличения голосов за Харрис
app.post('/vote/harris', (req, res) => {
  incrementHarrisTotalVotes();
  res.send({ message: 'Vote for Harris registered' });
});

app.get('/votes', (req, res) => {
  db.all(`SELECT candidate, votes FROM total_votes`, [], (err, rows) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      res.json({
          votes: rows.reduce((acc, row) => {
              acc[row.candidate] = row.votes;
              return acc;
          }, {})
      });
  });
});

function validateHash(params) {
    const token = '7491271001:AAEOiriYnXp_fFXVS_Iqvekzga6wSH0NxhU'; // Токен вашего бота
    const secret_key = crypto.createHash('sha256').update(token).digest();

    const data_check_string = Object.keys(params)
        .filter(key => key !== 'hash') // Исключите 'hash' из данных
        .sort() // Сортировка ключей в алфавитном порядке
        .map(key => `${key}=${params[key]}`) // Формирование строки в формате 'key=value'
        .join('\n'); // Склейка через перенос строки

    const hmac = crypto.createHmac('sha256', secret_key).update(data_check_string).digest('hex');

    return hmac === params.hash; // Сравнение вычисленного хеша с полученным
}

app.get('/telegram_auth', (req, res) => {
    const { id, first_name, last_name, username, photo_url, auth_date, hash } = req.query;

    // Здесь должна быть ваша логика проверки подлинности данных, включая проверку хеша
    console.log("Получены данные пользователя:", req.query);

    // Примерная проверка подлинности (реализуйте свою логику на основе секретного ключа)
    if (validateHash(req.query)) {
        // Авторизация успешна, создайте сессию пользователя
        console.log(`Привет, ${first_name}! Вы успешно авторизованы.`);
        res.redirect('https://btc24news.online')
    } else {
        // Неудачная попытка авторизации
        res.status(401).send("Ошибка авторизации.");
    }
});

app.get('/data', (req, res) => {
    console.log({ message: 'Это ответ API' });
  });

// Обработка любых маршрутов
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
