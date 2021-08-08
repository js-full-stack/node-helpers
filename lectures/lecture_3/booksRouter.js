const express = require("express");
const router = express.Router();

router
  .get("/books", (req, res) => {
    res.json({ books: [] });
  })
  .post("/books", (req, res) => {
    res.json({ books: 1 });
  });

module.exports = { router };
