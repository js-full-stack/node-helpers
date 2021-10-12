const { regService, logService } = require("../services/authService");

const regController = async (req, res) => {
  const { email, password } = req.body;
  await regService(email, password);
  res.json({ message: "registration success" });
};

const logController = async (req, res) => {
  const { email, password } = req.body;

  //* сервис возвращает токен, который можно записать в переменную, вызывав функцию
  const token = await logService(email, password);
  res.json({ message: "login success", token }); //* возвращаем токен клиенту как paylaod
};

module.exports = { regController, logController };
