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




function incrementTrumpTotalVotes(teamDMG) {

    console.log(`Incrementing Trump votes by: ${teamDMG}`);

    // Проверяем, что значение teamDMG корректное
    if (teamDMG === null || teamDMG === undefined || isNaN(teamDMG)) {
        console.error('Invalid teamDMG value:', teamDMG);
        return;
    }

  const updateQuery = `UPDATE total_votes SET votes = votes + ? WHERE candidate = 'Trump';`;
  const selectQuery = `SELECT votes FROM total_votes WHERE candidate = 'Trump';`;

  db.run(updateQuery, [teamDMG], function(updateErr) {
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

function incrementHarrisTotalVotes(teamDMG) {
  const updateQuery = `UPDATE total_votes SET votes = votes + ? WHERE candidate = 'Harris';`;
  const selectQuery = `SELECT votes FROM total_votes WHERE candidate = 'Harris';`;

  db.run(updateQuery, [teamDMG], function(updateErr) {
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

    db.get(`SELECT * FROM try15 WHERE id = ?`, [id], (err, row) => {
        if (err) {
            return console.error('Error fetching data', err.message);
        }

        if (row) {
            // Если пользователь существует, обновляем его данные
            db.run(`UPDATE try15 SET first_name = ?, last_name = ?, username = ?, language_code = ?, is_premium = ?, city = ?, country = ?, ip = ? WHERE id = ?`, 
                        [first_name, processedLastName, processedUsername, language_code, is_premium, city, country, ip, id], 
                        function(err) {
                if (err) {
                    return console.error('Error updating data', err.message);
                }
                console.log(`User with telegram_id ${id} updated`);
            });
        } else {
            // Если пользователь не существует, вставляем новую запись
            db.run(`INSERT INTO try15 (id, first_name, last_name, username, language_code, is_premium, city, country, ip, personal_count, personal_harris_count, personal_trump_count, best_summ, favorite, contribution, awaitingpoints, animal0, animal1, animal2, animal3, animal4, animal5, animal6, animal7, animal8, animal9, animal10, animal11)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 0, 0, 'none', 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)`, 
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
    const { id, personal_count, personal_harris_count, personal_trump_count, favorite, contribution } = req.body;

    console.log('Получены данные для обновления:', {
        id,
        personal_count,
        personal_harris_count,
        personal_trump_count,
        favorite,
        contribution
    });

    db.run(`UPDATE try15 SET personal_count = ?, personal_harris_count = ?, personal_trump_count = ?, favorite = ?, contribution = ? WHERE id = ?`, 
                [personal_count, personal_harris_count, personal_trump_count, favorite, contribution, id], 
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
    console.log('get-counts получил запрос')
    db.get(`SELECT personal_harris_count, personal_trump_count, personal_count, favorite, contribution, awaitingpoints FROM try15 WHERE id = ?`, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Ошибка при получении данных пользователя' });
        }
        if (row) {
            const updatedPersonalCount = row.personal_count + row.awaitingpoints;
            const bestSumm = updatedPersonalCount + row.contribution;
            
            db.run(`UPDATE try15 SET awaitingpoints = 0, personal_count = ?, best_summ = ? WHERE id = ?`, [updatedPersonalCount, bestSumm, id], function(err) {
                if (err) {
                    return res.status(500).json({ error: 'Ошибка при обновлении данных пользователя' });
                }            

                // Возвращаем обновленные данные клиенту
                res.status(200).json({
                    personal_harris_count: row.personal_harris_count,
                    personal_trump_count: row.personal_trump_count,
                    personal_count: updatedPersonalCount,
                    favorite: row.favorite,
                    contribution: row.contribution
                });
            });
        } else {
            res.status(404).json({ message: 'Пользователь не найден' });
        }
    });
});

app.get('/get-top-player', (req, res) => {
    const { favorite } = req.query;

    db.get(`SELECT first_name, username, best_summ FROM try15 WHERE favorite = ? ORDER BY best_summ DESC LIMIT 1`, [favorite], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Ошибка при получении данных' });
        }
        if (row) {
            res.status(200).json({
                first_name: row.first_name,
                username: row.username,
                best_summ: row.best_summ
            });
        } else {
            res.status(404).json({ message: 'Игрок не найден' });
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
  
    db.run(`UPDATE try15 SET visitor_id = ?, screen_resolution = ?, device = ?, raw_data = ? WHERE id = ?`,
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
  const { teamDMG } = req.body;
  incrementTrumpTotalVotes(teamDMG);
  res.send({ message: 'Vote for Wild Hearts registered' });
});

// Эндпоинт для увеличения голосов за Харрис
app.post('/vote/harris', (req, res) => {
  const { teamDMG } = req.body;
  incrementHarrisTotalVotes(teamDMG);
  res.send({ message: 'Vote for Dire Warriors registered' });
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

app.post('/update-animal-status', (req, res) => {
    const { id, animalIndex, status } = req.body;

    // Формируем правильное название колонки на основе переданного индекса
    const columnName = `animal${animalIndex}`;
    const userUpdateQuery = `UPDATE try15 SET ${columnName} = ? WHERE id = ?`;
    const amountUpdateQuery = `UPDATE animalamount SET ${columnName} = ${columnName} + 1`;

    // Обновляем статус животного в таблице пользователя
    db.run(userUpdateQuery, [status, id], function(err) {
        if (err) {
            console.error('Error updating animal status', err.message);
            return res.status(500).json({ error: 'Ошибка при обновлении статуса животного' });
        }

        // Обновляем счетчик животного в таблице animalamount
        db.run(amountUpdateQuery, function(err) {
            if (err) {
                console.error('Error updating animal count', err.message);
                return res.status(500).json({ error: 'Ошибка при обновлении счетчика животного' });
            }
            console.log(`Animal ${animalIndex} count incremented in animalamount`);
            res.status(200).json({ message: 'Статус животного и счетчик успешно обновлены' });
        });
    });
});
app.get('/get-animal-status', (req, res) => {
    const { id } = req.query;

    db.get(`SELECT animal0, animal1, animal2, animal3, animal4, animal5, animal6, animal7, animal8, animal9, animal10, animal11 FROM try15 WHERE id = ?`, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Ошибка при получении данных пользователя' });
        }
        if (row) {
            res.status(200).json(row);
        } else {
            res.status(404).json({ error: 'Пользователь не найден' });
        }
    });
});


app.get('/check-user', (req, res) => {
    const { id } = req.query;
    
    db.get(`SELECT id FROM try15 WHERE id = ?`, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Ошибка при проверке пользователя' });
        }
        if (row) {
            res.status(200).json({ exists: true });
        } else {
            res.status(404).json({ exists: false });
        }
    });
});
app.post('/donate', (req, res) => {
    const { id_from, id, amount } = req.body;

    db.get(`SELECT awaitingpoints FROM try15 WHERE id = ?`, [id], (err, row) => {
        if (err) {
            console.error('Ошибка при получении данных пользователя:', err);
            return res.status(500).json({ error: 'Ошибка при получении данных пользователя' });
        }
        if (row) {
            const newAwaitingPoints = row.awaitingpoints + parseInt(amount);

            // Сначала вставляем данные в таблицу транзакций
            db.run(`INSERT INTO donations (from_id, to_id, amount, date) VALUES (?, ?, ?, ?)`, 
                [id_from, id, amount, new Date().toISOString()], 
                function(err) {
                    if (err) {
                        console.error('Ошибка при записи транзакции:', err);
                        return res.status(500).json({ error: 'Ошибка при записи транзакции' });
                    } else {

                    // Если транзакция успешно записана, обновляем awaitingpoints
                    console.log('Попытка обновления awaitingpoints для пользователя с id:', id);
                    db.run(`UPDATE try15 SET awaitingpoints = ? WHERE id = ?`, [newAwaitingPoints, id], function(err) {
                        if (err) {
                            console.error('Ошибка при обновлении данных пользователя:', err);
                            return res.status(500).json({ error: 'Ошибка при обновлении данных пользователя' });
                        }
                        // Отправляем успешный ответ только после успешного завершения всех операций
                        res.status(200).json({ message: 'Donation successful', newAwaitingPoints });
                    });
                    }
                }
            );
        } else {
            console.warn('Пользователь не найден:', id);
            res.status(404).json({ error: 'Пользователь не найден' });
        }
    });
});

app.post('/add-points-promo-id', (req, res) => {
    const { id, points } = req.body;

    db.get(`SELECT awaitingpoints FROM try15 WHERE id = ?`, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Ошибка при получении данных пользователя' });
        }
        if (row) {
            const newPersonalCount = row.awaitingpoints + parseInt(points);

            db.run(`UPDATE try15 SET awaitingpoints = ? WHERE id = ?`, [newPersonalCount, id], function(err) {
                if (err) {
                    return res.status(500).json({ error: 'Ошибка при обновлении данных пользователя' });
                }
                res.status(200).json({ message: 'Points added successfully', newPersonalCount });
            });
        } else {
            res.status(404).json({ error: 'Пользователь не найден' });
        }
    });
});

app.get('/check-promo', (req, res) => {
    const { promoCode } = req.query;

    db.get(`SELECT value FROM promocodes WHERE code = ?`, [promoCode], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Ошибка при проверке промокода' });
        }
        if (row) {
            // Если промокод существует, отправляем его значение клиенту
            res.status(200).json({ exists: true, value: row.value });

            // Удаляем промокод из базы данных после его использования
            db.run(`DELETE FROM promocodes WHERE code = ?`, [promoCode], (deleteErr) => {
                if (deleteErr) {
                    console.error('Ошибка при удалении промокода:', deleteErr);
                } else {
                    console.log(`Промокод ${promoCode} был успешно удален.`);
                }
            });
        } else {
            // Если промокод не найден
            res.status(200).json({ exists: false });
        }
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
