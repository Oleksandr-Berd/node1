const express = require("express");
const router = express.Router();

router
  .get("/books", (req, res) => {
    res.json({ books: [1] });
  })
  .post("/books", (res, req) => {
    res.json({ books: [2] });
  });

module.exports = { router };
