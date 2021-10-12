const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const { connectMongo } = require("./db/connect");
const { postRouter } = require("./routes/postRouters");
const { authRouter } = require("./routes/authRouters");
const { errorHandler } = require("./helpers/apiHelpers");
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);
app.use(errorHandler);

const PORT = process.env.PORT;

(async () => {
  try {
    await connectMongo();
    app.listen(PORT, (err) => {
      if (err) console.log("error connect");
      console.log(`server works at port ${PORT}`);
    });
  } catch (error) {
    console.error(`failer to launch app with error ${error.message}`);
  }
})();
