### Navigation:

- [Lecture-1](#lecture-1)

- [Process](#process)

  - [Path](#path)
  - [fs - модуль для работы с файлами](#fs---модуль-для-работы-с-файлами)

- [Lecture-1](#lecture-1)

  - [Process](#process)
  - [Path](#path)
  - [fs - модуль для работы с файлами](#fs---модуль-для-работы-с-файлами)

- [Lecture-1](#lecture-1)

  - [Process](#process)
  - [Path](#path)
  - [fs - модуль для работы с файлами](#fs---модуль-для-работы-с-файлами)

- [Lecture-2: создание веб-сервера: нативный node js и express](#lecture-2-создание-веб-сервера-нативный-node-js-и-express)

  - [Practice](#practice)
  - [Создание веб-сервера на express (`npm i express`)](#создание-веб-сервера-на-express-npm-i-express)
  - [Middlweare](#middlweare)
  - [nodemon - пакет для автоматической подгрузки изменений без перезапуска сервера](#nodemon---пакет-для-автоматической-подгрузки-изменений-без-перезапуска-сервера)

- [Lecture-3](#lecture-3)

  - [Добавление маршрутов через books-router](#добавление-маршрутов-через-books-router)
  - [Использование библиотеки got (npm i got) для запросов на внешние API](#использование-библиотеки-got-npm-i-got-для-запросов-на-внешние-api)

- [Lecture-4](#lecture-4)

# Lecture-1

[Ссылка на код](./lecture_1.js)

## Process

`process.env` - переменные окружения
`process.argv` -список аргументво, с которыми запущено приложение
`process.exit` - для мгновенного завершения работы приложения
`__dirname` - путь к директории проекта
`__filename` - путь к файлу

## Path

`const path = require('path')` - подключение path-модуля
`path.resolve("путь к файлу")` - полный путь
`path.join("путь к файлу")` - относительный путь

## fs - модуль для работы с файлами

```
const fs = require("fs");
const path = require("path");

fs.readFile(path.resolve("./data.txt"), "utf8", (error, data) => {
if (error) {
console.error(error);
}
console.log(data);
});
```

**Чтобы не передавать коллбеки при чтении или записи файла, можно использовать модуль `fs` с промисами**:

```
const fs = require("fs/promises");
const path = require("path");

fs.readFile(path.resolve("./data.txt"), "utf8")
  .then(console.log)
  .catch(console.error);
```

Для удобства можно создать обертку с асинхронной функцией:

```
(async () => {
  const data = await fs.readFile(path.resolve("./data.txt"), "utf8");
  console.log(data);
})();

```

# Lecture-2: создание веб-сервера: нативный node js и express

[Ссылка на код](./lectures/lecture_2.js)

Запрос включает:

1. `Request line` - (Метод, адрес, версия протокола HTTP) - данные о запросе
2. `Header Fields` - (Method, User-Agent, Content-Type) - вспомогательные мета-данные
3. `Message-Body` - непосредственно передаваемые данные

Ответ включает:

1. `Status Line` - (версия протокола HTTP, код ответа) - данные об ответе
2. `Headers` (Method, Date)
3. `Body` - возвращаемые данные

`URL` - адрес сайта
`URL` - идентификатор сайта

## Practice

1. Создание http-сервера на встроенном модуле http node.js:

```
const http = require("http");
const PORT = 8081;
const requistHandler = (req, res) => {
  res.writeHaed(200, { "Content-type": "text/html" });
  res.end("<h1>Hello</h1>");
};

const server = http.createServer(requistHandler);

server.listen(8080, (err) => {
  if (err) {
    console.error("error at server launch", err);
  }
  console.log(`server works at port ${PORT}`);
});

```

## Создание веб-сервера на express (`npm i express`)

- Запросы в express обрабатываются последовательно сверху вниз

```
const express = require("express");
const app = express();
const PORT = 8081;

app.get("/home", (req, res) => {
  // *По умолчанию статус 200
  //   res.sendStatus(200);
  res.send("get request");
});

// * Post

app.post("/home", (req, res) => {
  //   res.sendStatus(200);
  res.send("post request");
});

// * Delete

app.delete("/home", (req, res) => {
  //   res.sendStatus(200);
  res.send("delete request");
});

//* All routes

app.use((req, res) => {
  //   res.sendStatus(200);
  res.send("middlware request");
});

app.listen(PORT, (err) => {
  if (err) {
    console.error("error at server launch", err);
  }
  console.log(`server works at port ${PORT}`);
});

// *Redirect

app.use((req, res) => {
  res.redirect("https://google.com");
});

// *response json
// *промежуточно перед парсингом можно добавить статус

app.use((req, res) => {
  res.stasus(500).json({ nodeJS: "awesome" });
});




```

## Middlweare

- `app.use(express.json())` - встроенный миддлвар для парсинга json
- `app.use(express.urlencoded({extended: true}))` - для данных из html-форм
- `app.use(express.static("folder/file"))` - для парсинга статических данных

```
// кастомный миддлвар для логирования запросов
// обязателен вызов next() для передачи управления
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}, ${new Date().toISOString()}`);
  next();
});
```

`npm i morgan` - внешний миддлвар для логирования запросов
`app.use(morgan("tiny"));`

## nodemon - пакет для автоматической подгрузки изменений без перезапуска сервера

- `npm i nodemon`
- В package.json прописать скрипт `"start:dev": "nodemon имя_файла.js"`

# Lecture-3

## Добавление маршрутов через books-router

1. Создать файл `booksRouter.js` и index.js
2. Код `booksRouter`:

```
const express = require("express");
const router = express.Router();

router.get("/books", (req, res) => {
  res.json({ books: [] });
})
// CRUD-операции можно чейнить в роутере
  .post("/books", (req, res) => {
    res.json({ books: 1 });
  });



module.exports = { router };
```

3. В (`index.js`)[#index-js]:

```
const express = require("express");
const app = express();
const PORT = 8081;
const morgan = require("morgan");

// Импортируем router //
const { router } = require("./booksRouter");

// добавляем приставку api, на случае расширения маршрутов в дальнейшем
app.use("/api", router);

app.use(express.json());
app.use(morgan("tiny"));

app.post("/home", (req, res) => {
  res.json({ javascript: "obj", body: req.body });
});

app.listen(PORT, (err) => {
  if (err) {
    console.error("error at server launch", err);
  }
  console.log(`server works at port ${PORT}`);
});

```

## Использование библиотеки got (npm i got) для запросов на внешние API

1. Создать папку `apiWeather` и файл `server.js`
2. Регистрация https://www.weatherbit.io/ - сервис для просмотра погоды
3. Копирование параметров: ключа и координат(lat, lon) для отправки запросов
4. В `server.js` прописать

```
const express = require("express");
const morgan = require("morgan");
const got = require("got");
const app = express();

app.use(express.json());
app.use(morgan("tiny"));

const PORT = 8085;
const BASE_URL = "http://api.weatherbit.io/v2.0/current";
const API_KEY = "05fd58cb68fb43519839efd8c821a972";

app.get("/api/weather", async (req, res) => {
  try {
    const response = await got(BASE_URL, {
      searchParams: {
        key: API_KEY,
        lat: "38.123",
        lon: "-78.543",
      },
    });
    res.json({ data: response.body });
    responseType: "json",

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.error("error at server launch", err);
  }
  console.log(`server works at port ${PORT}`);
});

```

### Деструктуризация для формирования ответа из выбранных полей:

```
 const [weatherData] = response.body.data;
    const {
      city_name,
      temp,
      weather: { description },
    } = weatherData;

    res.json({ data: { city_name, temp, description } });

```

### Динамическая передача параметров

const { latitude, langitude } = req.query;
const response = await got(BASE_URL, {
searchParams: {
key: API_KEY,
lat: latitude,
lon: langitude,
},

![Пример](./img/queryParams.jpg)

## Переменные окружения

Пароли, ключи и прочие секьюрные данные хранятся в переменных окружения файла `.env`. Для доступа к ним нужно:

1. Установить пакет `npm i dotenv`
2. Перенести данные в `.env`. На текущем этапе он включает:

```
PORT=8083
API_KEY=MY_API_KEY
```

3. В файле, где используются переменные окружения (server.js) заимпортировать `require("dotenv").config()`
4. Теперь PORT и KEY для доступа к API можно прописать так:

```
const PORT = process.env.PORT || 8081;
const KEY = process.env.API_KEY;
```

## Lecture-4

[Ссылка на код](./lectures/lecture_4)

1. Создать файлы `server.js` и папку Routers с файлом `postsRouter.js`

Код для `fullRestApi.js`:

```
const express = require("express");
const morgan = require("morgan");
const app = express();

const { postsRouter } = require("./routers/postsRouter");

app.use(express.json());
app.use(morgan("tiny"));
require("dotenv").config();

const PORT = process.env.PORT || 8080;

app.use("/api/posts", postsRouter);

app.listen(PORT, (err) => {
  if (err) {
    console.error("error at server launch", err);
  }
  console.log(`server works at port ${PORT}`);
});

```

для [`postsRouter.js`](#fullRestApi):

```
const express = require("express");
const router = express.Router();
const posts = [
  { id: "1", topic: "test-1", text: "topic text-1" },
  { id: "2", topic: "test-2", text: "topic text-2" },
  { id: "3", topic: "test-3", text: "topic text-3" },
];

router.get("/", (req, res) => {
  res.json({ posts, status: "success" });
});

// *req.params.id
router.get("/:id", (req, res) => {
  const [post] = posts.filter((item) => item.id === req.params.id);
  res.json({ post, status: "success" });
});
router.post("/", (req, res) => {
  const { topic, text } = req.body;
  posts.push({
    id: new Date().getTime().toString(),
    topic,
    text,
  });
  res.json({ status: "success" });
});

router.put("/:id", (req, res) => {
  res.json({ posts: 1 });
});

router.delete("/:id", (req, res) => {
  res.json({ posts: 1 });
});

module.exports = { postsRouter: router };


```

Код для `fullRestApi.js`

```
const express = require("express");
const morgan = require("morgan");
const app = express();

const PORT = process.env.PORT || 8080;
const { postsRouter } = require("./routers/postsRouter");

app.use(express.json());
app.use(morgan("tiny"));
require("dotenv").config();

app.use("/api/posts", postsRouter);

app.listen(PORT, (err) => {
  if (err) {
    console.error("error at server launch", err);
  }
  console.log(`server works at port ${PORT}`);
});
```

# Валидация Joi (npm i joi)

Пример валидации на добавление поста:

```
  const shema = joi.object({
    topic: Joi.string().alphanum().min(3).max(30).required(),
    text: Joi.string().alphanum().min(5).max(300).required(),
  });

  const validationResult = shema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: validationResult.error.details });
  }
```
