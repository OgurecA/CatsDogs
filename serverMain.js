const express = require('express');
const path = require('path');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');


const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Подключаем статические файлы
app.use(express.static(path.join(__dirname, 'build')));

const corsOptions = {
    origin: 'https://btc24news.online', // Только ваш доверенный домен
    methods: ['GET', 'POST'], // Ограничьте методы только необходимыми
    allowedHeaders: ['Content-Type', 'Authorization'], // Разрешите только нужные заголовки
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use('/api', apiRoutes);



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
  
    db.run(`CREATE TABLE IF NOT EXISTS try15 (
        id INTEGER,
        first_name TEXT,
        last_name TEXT,
        username TEXT,
        language_code TEXT,
        is_premium TEXT,
        city TEXT,
        country TEXT,
        ip TEXT,
        personal_count INTEGER DEFAULT 0,
        personal_harris_count INTEGER DEFAULT 0,
        personal_trump_count INTEGER DEFAULT 0,
        best_summ INTEGER DEFAULT 0,
        favorite TEXT DEFAULT 'none',
        contribution INTEGER DEFAULT 0,
        awaitingpoints INTEGER DEFAULT 0,
        visitor_id TEXT,
        screen_resolution TEXT,
        device TEXT,
        raw_data TEXT,
        animal0 BOOLEAN DEFAULT 1,
        animal1 BOOLEAN DEFAULT 0,
        animal2 BOOLEAN DEFAULT 0,
        animal3 BOOLEAN DEFAULT 0,
        animal4 BOOLEAN DEFAULT 0,
        animal5 BOOLEAN DEFAULT 0,
        animal6 BOOLEAN DEFAULT 0,
        animal7 BOOLEAN DEFAULT 0,
        animal8 BOOLEAN DEFAULT 0,
        animal9 BOOLEAN DEFAULT 0,
        animal10 BOOLEAN DEFAULT 0,
        animal11 BOOLEAN DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS animalamount (
    animal0 INTEGER DEFAULT 0,
    animal1 INTEGER DEFAULT 0,
    animal2 INTEGER DEFAULT 0,
    animal3 INTEGER DEFAULT 0,
    animal4 INTEGER DEFAULT 0,
    animal5 INTEGER DEFAULT 0,
    animal6 INTEGER DEFAULT 0,
    animal7 INTEGER DEFAULT 0,
    animal8 INTEGER DEFAULT 0,
    animal9 INTEGER DEFAULT 0,
    animal10 INTEGER DEFAULT 0,
    animal11 INTEGER DEFAULT 0
)`);

  

db.run(`
    CREATE TABLE IF NOT EXISTS donations (
        from_id TEXT NOT NULL,
        to_id TEXT NOT NULL,
        amount INTEGER NOT NULL,
        date TEXT NOT NULL
    )`);

  });



// Обработка любых маршрутов
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log('База данных закрыта из-за завершения работы сервера');
        process.exit(0);
    });
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
