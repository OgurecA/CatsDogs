const express = require('express');
const path = require('path');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const IPINFO_API_TOKEN = '08cf3071fa85c1';

const botToken = '7491271001:AAEOiriYnXp_fFXVS_Iqvekzga6wSH0NxhU';

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Подключаем статические файлы
app.use(express.static(path.join(__dirname, 'build')));

const corsOptions = {
    origin: 'https://btc24news.online', // Укажите ваш источник
    optionsSuccessStatus: 200
  };
  
  app.use(cors(corsOptions));


  const ENERGY_RECOVERY_INTERVAL = 1; // Время в секундах для восстановления одной единицы энергии
  const MAX_ENERGY = 100; // Максимальное количество энергии
  


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
  
    db.run(`CREATE TABLE IF NOT EXISTS try7 (
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
          favorite TEXT DEFAULT 'none',
          energy INTEGER DEFAULT 100,
          last_active INTEGER,
          visitor_id TEXT,
          screen_resolution TEXT,
          device TEXT,
          raw_data TEXT
    )`);
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
                  console.log(`Current number of votes for Snake: ${row.votes}`);
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
                  console.log(`Current number of votes for Owl: ${row.votes}`);
              }
          });
      }
  });
}


app.post('/login', async (req) => {
    const { id, first_name, last_name, username, language_code, is_premium } = req.body;
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('Получены данные:', {
        id,
        first_name,
        last_name,
        username,
        language_code,
        is_premium
    });

    const geoResponse = await fetch(`https://ipinfo.io/${ipAddress}?token=${IPINFO_API_TOKEN}`);
    const geoData = await geoResponse.json();
    const { city, country, ip } = geoData;
    console.log('Geo Data:', { city, country, ip });

    const processedLastName = last_name || '';
    const processedUsername = username || '';

    db.get(`SELECT * FROM try7 WHERE id = ?`, [id], (err, row) => {
        if (err) {
            return console.error('Error fetching data', err.message);
        }

        if (row) {
            // Если пользователь существует, обновляем его данные
            db.run(`UPDATE try7 SET first_name = ?, last_name = ?, username = ?, language_code = ?, is_premium = ?, city = ?, country = ?, ip = ? WHERE id = ?`, 
                        [first_name, processedLastName, processedUsername, language_code, is_premium, city, country, ip, id], 
                        function(err) {
                if (err) {
                    return console.error('Error updating data', err.message);
                }
                console.log(`User with telegram_id ${id} updated`);
            });
        } else {
            // Если пользователь не существует, вставляем новую запись
            db.run(`INSERT INTO try7 (id, first_name, last_name, username, language_code, is_premium, city, country, ip, personal_count, personal_harris_count, personal_trump_count, favorite, energy)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 0, 'none', 100)`, 
                         [id, first_name, processedLastName, processedUsername, language_code, is_premium, city, country, ip], 
                         function(err) {
                if (err) {
                    return console.error('Error inserting data', err.message);
                }
                console.log(`A new user with telegram_id ${id} has been inserted`);
            });
        }
    });
});

app.post('/update-counts', (req, res) => {
    const { id, personal_count, personal_harris_count, personal_trump_count, favorite, energy } = req.body;
    const lastActive = Math.floor(Date.now() / 1000);

    console.log('Получены данные для обновления:', {
        id,
        personal_count,
        personal_harris_count,
        personal_trump_count,
        favorite,
        energy,
        lastActive
    });

    db.run(`UPDATE try7 SET personal_count = ?, personal_harris_count = ?, personal_trump_count = ?, favorite = ?, energy = ?, last_active = ? WHERE id = ?`, 
                [personal_count, personal_harris_count, personal_trump_count, favorite, energy, lastActive, id], 
                function(err) {
        if (err) {
            return console.error('Error updating counts', err.message);
        }
        console.log(`User with telegram_id ${id} counts updated`);
        res.status(200).json({ message: 'Counts successfully updated' });
    });
});

app.get('/get-counts', (req, res) => {
    const { id } = req.query;
    db.get(`SELECT personal_harris_count, personal_trump_count, favorite, energy, last_active FROM try7 WHERE id = ?`, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Ошибка при получении данных пользователя' });
        }
        if (row) {
            const currentTime = Math.floor(Date.now() / 1000);
            const elapsedTime = currentTime - row.last_active;
            const recoveredEnergy = Math.floor(elapsedTime / ENERGY_RECOVERY_INTERVAL); // Восстановление 1 энергии в минуту
            const newEnergy = Math.min(row.energy + recoveredEnergy, MAX_ENERGY);

            res.status(200).json({
                personal_harris_count: row.personal_harris_count,
                personal_trump_count: row.personal_trump_count,
                favorite: row.favorite,
                energy: newEnergy
            });
        } else {
            res.status(404).json({ message: 'Пользователь не найден' });
        }
    });
});

app.post('/api/save-fingerprint', (req, res) => {
    const fingerprintData = req.body;
    const { components, visitorId, userId } = fingerprintData;
    id = userId;
  
    if (!components || !visitorId || !userId) {
      return res.status(400).json({ error: 'Недостаточно данных для сохранения отпечатка' });
    }
  
    const screenResolution = components.screenResolution ? JSON.stringify(components.screenResolution.value) : 'N/A';
    const device = components.platform ? components.platform.value : 'N/A';
    const rawData = JSON.stringify(fingerprintData, null, 2);
  
    console.log('Fingerprint data received:');
    console.log('Visitor ID:', visitorId);
    console.log('Screen Resolution:', screenResolution);
    console.log('Device:', device);
  
    db.run(`UPDATE try7 SET visitor_id = ?, screen_resolution = ?, device = ?, raw_data = ? WHERE id = ?`,
      [visitorId, screenResolution, device, rawData, id],
      function(err) {
        if (err) {
          console.error('Error updating data', err.message);
          return res.status(500).json({ error: 'Ошибка при обновлении данных' });
        }
        console.log(`Fingerprint data for visitor ${visitorId} updated`);
        res.status(200).json({ message: 'Fingerprint data saved successfully' });
      }
    );
  });

// Эндпоинт для увеличения голосов за Трампа
app.post('/vote/trump', (req, res) => {
  incrementTrumpTotalVotes();
  res.send({ message: 'Vote for Snake registered' });
});

// Эндпоинт для увеличения голосов за Харрис
app.post('/vote/harris', (req, res) => {
  incrementHarrisTotalVotes();
  res.send({ message: 'Vote for Owl registered' });
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
