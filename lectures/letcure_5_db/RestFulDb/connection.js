const { MongoClient } = require("mongodb");
const collections = {}; //* создает объект для записи коллекции
const getCollections = () => collections; //* создает функцию, которая возвращает коллекцию
const uriDb = process.env.MONGO_URL;

const connectMongo = async () => {
  const client = await new MongoClient(uriDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).connect();
  try {
    const db = client.db(); //* подключение к БД
    collections.Posts = db.collection("posts"); //* записывает коллекцию постов в collections.Posts
  } catch (error) {
    console.error(error);
  }
};

module.exports = { connectMongo, getCollections }; //*функция getCollections передается в middlewareModels.js
