const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const fetch = require('node-fetch');
require('dotenv').config();

const IPINFO_API_TOKEN = process.env.IPINFO_API_TOKEN;

// Подключение базы данных
let db = new sqlite3.Database('./election.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the election database.');
  }
});

// Функции для обработки голосов
function incrementTrumpTotalVotes(teamDMG, rage) {
  const updateQuery = `UPDATE total_votes SET votes = votes + ? WHERE candidate = 'Trump';`;
  const selectQuery = `SELECT votes FROM total_votes WHERE candidate = 'Trump';`;

  const totalIncrement = teamDMG * rage;

  db.run(updateQuery, [totalIncrement], function (updateErr) {
    if (updateErr) {
      console.error('Error updating Trump votes', updateErr.message);
    } else {
      db.get(selectQuery, (selectErr, row) => {
        if (selectErr) {
          console.error('Error fetching Trump votes', selectErr.message);
        } else {
          console.log(`Current number of votes for Wild Hearts: ${row.votes}`);
        }
      });
    }
  });
}

function incrementHarrisTotalVotes(teamDMG, rage) {
  const updateQuery = `UPDATE total_votes SET votes = votes + ? WHERE candidate = 'Harris';`;
  const selectQuery = `SELECT votes FROM total_votes WHERE candidate = 'Harris';`;

  const totalIncrement = teamDMG * rage;

  db.run(updateQuery, [totalIncrement], function (updateErr) {
    if (updateErr) {
      console.error('Error updating Harris votes', updateErr.message);
    } else {
      db.get(selectQuery, (selectErr, row) => {
        if (selectErr) {
          console.error('Error fetching Harris votes', selectErr.message);
        } else {
          console.log(`Current number of votes for Dire Warriors: ${row.votes}`);
        }
      });
    }
  });
}

// Маршрут для логина пользователя
router.post('/login', async (req, res) => {
  const { id, first_name, last_name, username, language_code, is_premium } = req.body;
  const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('Получены данные:', { id, first_name, last_name, username, language_code, is_premium });

  const geoResponse = await fetch(`https://ipinfo.io/${ipAddress}?token=${IPINFO_API_TOKEN}`);
  const geoData = await geoResponse.json();
  const { city, country, ip } = geoData;
  console.log('Geo Data:', { city, country, ip });

  const processedLastName = last_name || '';
  const processedUsername = username || '';

  db.get(`SELECT * FROM try15 WHERE id = ?`, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching data' });
    }

    if (row) {
      db.run(
        `UPDATE try15 SET first_name = ?, last_name = ?, username = ?, language_code = ?, is_premium = ?, city = ?, country = ?, ip = ? WHERE id = ?`,
        [first_name, processedLastName, processedUsername, language_code, is_premium, city, country, ip, id],
        function (err) {
          if (err) {
            return res.status(500).json({ error: 'Error updating data' });
          }
          console.log(`User with telegram_id ${id} updated`);
          res.status(200).json({ message: 'User updated successfully' });
        }
      );
    } else {
      db.run(
        `INSERT INTO try15 (id, first_name, last_name, username, language_code, is_premium, city, country, ip, personal_count, personal_harris_count, personal_trump_count, best_summ, favorite, contribution, awaitingpoints, animal0, animal1, animal2, animal3, animal4, animal5, animal6, animal7, animal8, animal9, animal10, animal11)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 0, 0, 'none', 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)`,
        [id, first_name, processedLastName, processedUsername, language_code, is_premium, city, country, ip],
        function (err) {
          if (err) {
            return res.status(500).json({ error: 'Error inserting data' });
          }
          console.log(`A new user with telegram_id ${id} has been inserted`);
          res.status(201).json({ message: 'User inserted successfully' });
        }
      );
    }
  });
});

// Маршрут для обновления счетчиков
router.post('/update-counts', (req, res) => {
  const { id, personal_count, personal_harris_count, personal_trump_count, favorite, contribution } = req.body;
  console.log('Получены данные для обновления:', { id, personal_count, personal_harris_count, personal_trump_count, favorite, contribution });

  db.run(
    `UPDATE try15 SET personal_count = ?, personal_harris_count = ?, personal_trump_count = ?, favorite = ?, contribution = ? WHERE id = ?`,
    [personal_count, personal_harris_count, personal_trump_count, favorite, contribution, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Error updating counts' });
      }
      console.log(`User with telegram_id ${id} counts updated`);
      res.status(200).json({ message: 'Counts successfully updated' });
    }
  );
});

// Маршрут для получения счетчиков пользователя
router.get('/get-counts', (req, res) => {
  const { id } = req.query;
  console.log('get-counts получил запрос');
  db.get(
    `SELECT personal_harris_count, personal_trump_count, personal_count, favorite, contribution, awaitingpoints FROM try15 WHERE id = ?`,
    [id],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Ошибка при получении данных пользователя' });
      }
      if (row) {
        const updatedPersonalCount = row.personal_count + row.awaitingpoints;
        const bestSumm = updatedPersonalCount + row.contribution;

        db.run(
          `UPDATE try15 SET awaitingpoints = 0, personal_count = ?, best_summ = ? WHERE id = ?`,
          [updatedPersonalCount, bestSumm, id],
          function (err) {
            if (err) {
              return res.status(500).json({ error: 'Ошибка при обновлении данных пользователя' });
            }

            res.status(200).json({
              personal_harris_count: row.personal_harris_count,
              personal_trump_count: row.personal_trump_count,
              personal_count: updatedPersonalCount,
              favorite: row.favorite,
              contribution: row.contribution
            });
          }
        );
      } else {
        res.status(404).json({ message: 'Пользователь не найден' });
      }
    }
  );
});

// Маршрут для получения топ-игрока
router.get('/get-top-player', (req, res) => {
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

// Эндпоинт для голосования
router.post('/vote/trump', (req, res) => {
  const { teamDMG, rage } = req.body;
  incrementTrumpTotalVotes(teamDMG, rage);
  res.send({ message: 'Vote for Trump registered' });
});

router.post('/vote/harris', (req, res) => {
  const { teamDMG, rage } = req.body;
  incrementHarrisTotalVotes(teamDMG, rage);
  res.send({ message: 'Vote for Harris registered' });
});

router.get('/votes', (req, res) => {
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

  router.post('/update-animal-status', (req, res) => {
    const { id, animalIndex, status } = req.body;
    const columnName = `animal${animalIndex}`;
    const userUpdateQuery = `UPDATE try15 SET ${columnName} = ? WHERE id = ?`;
    const amountUpdateQuery = `UPDATE animalamount SET ${columnName} = ${columnName} + 1`;
  
    db.run(userUpdateQuery, [status, id], function (err) {
      if (err) {
        console.error('Error updating animal status', err.message);
        return res.status(500).json({ error: 'Ошибка при обновлении статуса животного' });
      }
  
      db.run(amountUpdateQuery, function (err) {
        if (err) {
          console.error('Error updating animal count', err.message);
          return res.status(500).json({ error: 'Ошибка при обновлении счетчика животного' });
        }
        console.log(`Animal ${animalIndex} count incremented in animalamount`);
        res.status(200).json({ message: 'Статус животного и счетчик успешно обновлены' });
      });
    });
  });
  
  // Маршрут для получения статуса животных
  router.get('/get-animal-status', (req, res) => {
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

  router.get('/check-user', (req, res) => {
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

router.post('/donate', (req, res) => {
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

router.post('/add-points-promo-id', (req, res) => {
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

router.get('/check-promo', (req, res) => {
  const { promoCode, userId } = req.query;

  console.log(`Проверка промокода: ${promoCode}, для пользователя: ${userId}`);

  // Сначала проверяем существование промокода
  db.get(`SELECT value FROM promocodes WHERE code = ?`, [promoCode], (err, promoRow) => {
    if (err) {
      console.error('Ошибка при проверке промокода:', err);
      return res.status(500).json({ error: 'Ошибка при проверке промокода' });
    }
    if (!promoRow) {
      // Если промокод не найден
      console.log('Промокод не найден');
      return res.status(200).json({ exists: false });
    }

    console.log('Промокод найден, проверяем статус животного...');

    // Если промокод существует, проверяем статус животного для данного пользователя
    db.get(`SELECT animal4, animal1 FROM try15 WHERE id = ?`, [userId], (err, userRow) => {
      if (err) {
        console.error('Ошибка при получении данных пользователя:', err);
        return res.status(500).json({ error: 'Ошибка при получении данных пользователя' });
      }
      if (!userRow) {
        console.log('Пользователь не найден' + userId);
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      console.log('Данные о пользователе получены:', userRow);

      // Проверяем, разблокировано ли животное, соответствующее промокоду
      if ((promoRow.value === 'Drake' && userRow.animal4 === 1) ||
          (promoRow.value === 'Rat' && userRow.animal1 === 1)) {
        // Если животное уже разблокировано, не удаляем промокод и отправляем ответ
        console.log('Животное уже разблокировано, промокод не удален');
        return res.status(200).json({
          exists: true,
          value: promoRow.value,
          message: 'Животное уже разблокировано, промокод не удален'
        });
      }

      // Если животное еще не разблокировано, продолжаем с удалением промокода
      db.run(`DELETE FROM promocodes WHERE code = ?`, [promoCode], (deleteErr) => {
        if (deleteErr) {
          console.error('Ошибка при удалении промокода:', deleteErr);
          return res.status(500).json({ error: 'Ошибка при удалении промокода' });
        }

        console.log(`Промокод ${promoCode} был успешно удален.`);
        res.status(200).json({
          exists: true,
          value: promoRow.value,
          message: 'Промокод успешно использован и удален'
        });
      });
    });
  });
});


router.post('/save-fingerprint', (req, res) => {
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






// Экспорт маршрутов
module.exports = router;
