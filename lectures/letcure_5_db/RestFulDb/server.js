const express = require("express");
const app = express();
const morgan = require("morgan");
require("dotenv").config();
const { router } = require("./routers");
const { connectMongo } = require("./connection");
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use(morgan("combined"));
app.use("/api/posts", router);

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

(async () => {
  try {
    await connectMongo();
    app.listen(PORT, (err) => {
      if (err) console.error("error at server launch");
      console.log(`server work at port ${PORT}`);
    });
  } catch (error) {
    console.error(`failed to launch application with error: ${error.message}`);
  }
})();
