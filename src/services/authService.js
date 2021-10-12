const bcrypt = require("bcrypt"); //* подключает bcrypt
const jwt = require("jsonwebtoken"); //* подключает jwt

const JWT_SECRET = process.env.SECRET; //* достает секрет из .env
const { User } = require("../db/userShema"); //* достает схему юзера

const { CustomError } = require("../helpers/errors");

const regService = async (email, password) => {
  // *создает нового юзера со свойствами email и password
  const user = new User({ email, password });
  await user.save(); //* сохраняет юзера в БД
};

const logService = async (email, password) => {
  const user = await User.findOne({ email });

  //* если не находит юзера в БД, пробрасывает ошибку авторизации
  if (!user) {
    throw new CustomError(401, `user with email "${email}" not exist`);
  }

  //* если введенный и полученный из БД пароль юзера не совпадаетт - ошибка
  //* password - пароль, который вводит юзер; user.password - пароль, который хранится на бекенде
  if (!(await bcrypt.compare(password, user.password))) {
    throw new CustomError(401, "wrong password");
  }

  //* если юзер найден - подписывает ему токен, записывая в payload его _id
  const token = jwt.sign(
    {
      _id: user._id, //* зашивает в token _id юзера
    },
    JWT_SECRET, //* 2-м аргументом ф-я sign принимает ключ
    { expiresIn: "4h" } //* здесь можно указать срок действия токена
  );
  return token; //* возвращает токен
};

module.exports = { regService, logService };
