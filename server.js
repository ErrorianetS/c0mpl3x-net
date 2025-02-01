const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

let signals = []; // Массив для хранения сигналов

// Обработка POST-запроса для отправки сигнала
app.post('/signal', (req, res) => {
    const signal = req.body;
    signals.push(signal); // Сохраняем сигнал
    console.log('Получен сигнал:', signal);
    res.send('Сигнал получен!');
});

// Обработка GET-запроса для получения сигналов
app.get('/signals', (req, res) => {
    res.json(signals); // Возвращаем все сигналы
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
