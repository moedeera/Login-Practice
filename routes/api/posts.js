const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { Profiles } = require("./Database");

router.get("/", (req, res) => {
  res.send(Profiles);
});

module.exports = router;
