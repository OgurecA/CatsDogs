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
  const updateQuery = `UPDATE total_votes SET votes = votes + 1 WHERE candidate = 'Trump'`;
  db.run(updateQuery, function(err) {
      if (err) {
          console.error('Error updating Trump votes', err.message);
      } else {
          if (this.changes === 0) {
              // Если обновление не затронуло ни одной строки, значит, необходимо добавить запись
              db.run(`INSERT INTO total_votes (candidate, votes) VALUES ('Trump', 1)`, (err) => {
                  if (err) console.error('Error adding Trump votes', err.message);
              });
          } else {
              console.log(`Trump votes updated: ${this.changes}`);
          }
      }
  });
}

function incrementHarrisTotalVotes() {
  const updateQuery = `UPDATE total_votes SET votes = votes + 1 WHERE candidate = 'Harris'`;
  db.run(updateQuery, function(err) {
      if (err) {
          console.error('Error updating Harris votes', err.message);
      } else {
          console.log(`Harris votes updated: ${this.changes}`);
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

// Обработка любых маршрутов
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
