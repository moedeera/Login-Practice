const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { Profiles, Posts } = require("./Database");

//Route
//type  : GetAllPosts
// access : public

router.get("/", (req, res) => {
  var PublicPosts = Posts.filter((post) => post.status === "public");
  console.log(PublicPosts);
  res.send(PublicPosts);
});

//Route
//type  : GetPosts
// access : private

router.post("/", (req, res) => {
  var user = req.body;

  var publicPosts = Posts.filter((post) => post.status === "public");
  var userPosts = [];
  userPosts = [...publicPosts];

  for (var j = 0; j < user.following.length; j++) {
    for (var k = 0; k < Posts.length; k++) {
      if (
        Posts[k].status === "followers" &&
        user.following[j] === Posts[k].Poster
      ) {
        userPosts.push(Posts[k]);
      }
    }
  }
  for (var j = 0; j < user.Friends.length; j++) {
    for (var k = 0; k < Posts.length; k++) {
      if (
        Posts[k].status === "friends" &&
        user.Friends[j] === Posts[k].Poster
      ) {
        userPosts.push(Posts[k]);
      }
    }
  }

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  var unique = userPosts.filter(onlyUnique);

  unique.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  console.log("hello", unique);
  res.send(unique);
});

module.exports = router;
