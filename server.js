const express = require('express');
const path = require('path');
const app = express();

// Порт, на котором будет запущен сервер
const PORT = process.env.PORT || 3000;

// Обслуживание статических файлов из папки build
app.use(express.static(path.join(__dirname, 'build')));

// Обработка запросов на корневой URL
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
