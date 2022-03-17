const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

router.get("/", (req, res) => {
  res.send("hello");
});

module.exports = router;
