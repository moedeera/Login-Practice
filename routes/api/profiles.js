const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { Profiles } = require("./Database");

//Route
//type  : GetAllProfiles
// access : public
router.get("/", (req, res) => {
  console.log("profile get request received");

  var PublicProfiles = Profiles.filter(
    (profile) => profile.status !== "unlisted"
  );

  res.send(PublicProfiles);
});

module.exports = router;
