const jwt = require("jsonwebtoken");
const { CustomError } = require("../helpers/errors");

const authMiddlware = (req, res, next) => {
  //* если не передан заголовок авторизации - пробразываем ошибку
  if (!req.headers.authorization) {
    next(new CustomError(401, "Authorization header not passed"));
  }

  //* сплитим tokenType (Bearer) и token по пустой строке, деструктуризируя из в переменные
  const [tokenType, token] = req.headers.authorization?.split(" ");

  try {
    //* если токен есть, декодируем его, передавая в функцию decode токен и секрет
    const user = jwt.decode(token, process.env.SECRET); //* декодируем токен и получаем payload юзера (id)
    req.token = token; //* записывает на request token (это необязательно)
    req.user = user; //* записываем на request декодированные данные юзера
    next(); //* передаем управление дальше
  } catch (error) {
    next(new CustomError(401, "Invalid token"));
  }
};

module.exports = { authMiddlware };
