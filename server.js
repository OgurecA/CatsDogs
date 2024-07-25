const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Подключаем статические файлы
app.use(express.static(path.join(__dirname, 'build')));

// Обработка любых маршрутов
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
