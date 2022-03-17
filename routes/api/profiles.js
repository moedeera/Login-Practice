const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { Profiles } = require("./Database");

//Route
//type  : GetAllPosts
// access : public
router.get("/", (req, res) => {
  var PublicProfiles = Profiles.filter(
    (profile) => profile.status !== "unlisted"
  );

  res.send(PublicProfiles);
});

module.exports = router;
