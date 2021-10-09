const asyncWrapper = (controller) => {
  // принимает контроллер
  return (req, res, next) => {
    controller(req, res).catch(next); // в случае ошибки catch отлавливает ее и передает в обработчик ошибок в server.js
  };
};

module.exports = { asyncWrapper };
