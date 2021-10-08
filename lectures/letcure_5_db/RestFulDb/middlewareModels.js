const { getCollections } = require("./connection");

module.exports = (req, res, next) => {
  const collections = getCollections();
  req.db = { ...collections }; // *создает переменную db, куда распылаются все коллекции
  next(); //* передает управление дальше
};
