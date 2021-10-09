const express = require("express"); //* каркас для построения приложения
const app = express(); //* вызывает функцию из express
const morgan = require("morgan"); //* для логирования запросов
const MongoClient = require("mongodb").MongoClient; //* модуль для подключения к MongoDB
require("dotenv").config(); //* для доступа к переменным окружения в .env
const PORT = process.env.PORT || 8080;

//* Мидлвары
app.use(express.json()); // *мидлвар для парсинга json
app.use(morgan("combined")); //* вызов мидлвар для логирования

//* IIFE для подключения к серверу
(async () => {
  //* настройки подключения
  const client = await MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, //* указывает использовать последнюю версию синтаксического анализатора (парсера url-строки)
    useUnifiedTopology: true, //* указывает использовать последнюю версию механизма обнаружения и мониторинга серверов
  });
  const db = client.db(); //* модуль для обращения к коллекциям в БД, db(<здесь>) можно указать имя БД или в .env

  const Users = db.collection("users"); //* создает или получает коллекцию users
  const users = await Users.find({}).toArray(); //* база данных возвращает coursor, нужно преобразовать его в массив
  console.log(users); //* здесь будет коллекция

  //* если не передать порт, сгенерируется случайный
  app.listen(PORT, (err) => {
    if (err) {
      console.error("error at server launch", err);
    }
    console.log(`server works at port ${PORT}`);
  });
})();
