const { MongoClient } = require("mongodb");
const collections = {}; //* создает объект для записи коллекции
const getCollections = () => collections; //* создает функцию, которая возвращает коллекцию
const connectMongo = async () => {
  const client = await MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db(); //* подключение к БД
  collections.Posts = db.collection("posts"); //* записывает коллекцию постов в collections.Posts
};

module.exports = { connectMongo, getCollections }; //*функция getCollections передается в middlewareModels.js
