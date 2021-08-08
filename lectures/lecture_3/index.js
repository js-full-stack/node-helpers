const express = require("express");
const app = express();
const PORT = 8081;
const morgan = require("morgan");
const { router } = require("./booksRouter");

app.use(express.json());
app.use(morgan("tiny"));
app.use("/api", router);

app.post("/home", (req, res) => {
  res.json({ javascript: "obj", body: req.body });
});

app.listen(PORT, (err) => {
  if (err) {
    console.error("error at server launch", err);
  }
  console.log(`server works at port ${PORT}`);
});
