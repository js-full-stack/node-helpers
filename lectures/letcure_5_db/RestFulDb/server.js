const express = require("express");
const app = express();
const morgan = require("morgan");
require("dotenv").config();
const { connectMongo } = require("./connection");
const { router } = require("./routers");

const PORT = process.env.PORT || 8080;

app.use("/api/posts", router);

app.use(express.json());
app.use(morgan("combined"));

(async () => {
  await connectMongo();

  app.listen(PORT, (err) => {
    if (err) console.error("error at server launch");
    console.log(`server work at port ${PORT}`);
  });
})();
