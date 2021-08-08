// const http = require("http");
// const PORT = 8081;
// const requistHandler = (req, res) => {
//   res.writeHead(200, { "Content-type": "text/html" });
//   res.end("<h1>Hello</h1>");
// };

// const server = http.createServer(requistHandler);

// server.listen(PORT, (err) => {
//   if (err) {
//     console.error("error at server launch", err);
//   }
//   console.log(`server works at port ${PORT}`);
// });

//! ========================================

const express = require("express");
const app = express();
const PORT = 8081;
const morgan = require("morgan");

// * middleware response json
app.use(express.json());

// * middleware html form
app.use(express.urlencoded({ extended: true }));

//  * middlware static data
app.use(express.static("public"));

app.get("/home", (req, res) => {
  // *По умолчанию статус 200
  //   res.sendStatus(200);
  res.send("get request");
});

// * external middleware morgan for logging request
app.use(morgan("tiny"));
// * Post

app.post("/home", (req, res) => {
  //   console.log(req.body);

  // * Простая валидация на обязательное поле

  if (!req.body.name) {
    res.status(400).json({ message: "field name is required" });
  }
  res.json({ javascript: "obj", body: req.body });
});

// * Delete

app.delete("/home", (req, res) => {
  res.send("delete request");
});

//* All routes

// app.use((req, res) => {
//   //   res.sendStatus(200);
//   res.send("middlware request");
// });

// *Redirect

// app.use((req, res) => {
//   res.redirect("https://google.com");
// });

// * response json
// app.use((req, res) => {
//   res.json({ nodeJS: "awesome" });
// });

app.listen(PORT, (err) => {
  if (err) {
    console.error("error at server launch", err);
  }
  console.log(`server works at port ${PORT}`);
});

// *redirect
