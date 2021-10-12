const mongoose = require("mongoose");

const connectMongo = async () => {
  const uriDb = process.env.MONGO_URL;

  const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(uriDb, connectOptions);
  console.log("connected DB");
};

module.exports = {
  connectMongo,
};
