const express = require('express');
const path = require('path');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const PORT = process.env.PORT || 3000;

app.use(express.json());

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
});

// Эндпоинт для увеличения голосов за Харрис
app.post('/vote/harris', (req, res) => {
  incrementHarrisTotalVotes();
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

app.post('/telegram/callback', (req, res) => {
  const userData = req.body;
  console.log(`${userData}`)
  // Проверка данных и хэша
  if (verifyTelegramAuth(userData)) {
    // Если данные верифицированы, регистрируем или авторизуем пользователя в системе
    console.log(`${userData}`)
    res.redirect('/profile');
  } else {
    res.status(401).send('Unauthorized');
  }
});

function verifyTelegramAuth(userData) {
  const hash = userData.hash;
  const checkString = Object.keys(userData).filter(key => key !== 'hash')
    .map(key => (`${key}=${userData[key]}`)).sort().join('\n');
  const secretKey = crypto.createHash('sha256').update(botToken).digest();
  const hmac = crypto.createHmac('sha256', secretKey).update(checkString).digest('hex');
  return hmac === hash;
}


// Обработка любых маршрутов
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
