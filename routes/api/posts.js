const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const path = require("path");
const { Profiles, Posts } = require("./Database");
const multer = require("multer");
const { promises: fsp } = require("fs");

const checkFileCount = async (req, res, next) => {
  const files = await fsp.readdir("routes/api/post-images", {
    withFileTypes: true,
  });
  if (files.length > 8) {
    res.status(409);
    res.send("Too many files");
  }
  next();
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "routes/api/post-images");
  },

  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// check files count
function CheckFileCount(req, res, next) {}

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
  userPosts = [];

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
      if (user.Friends[j] === Posts[k].Poster) {
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

  res.send(unique);
});

//Route
//type  : CreatePosts
// access : private
router.post("/create", [checkFileCount, upload.single("file")], (req, res) => {
  console.log("create post request made", req.file);

  res.send("thank you for the post");
});

module.exports = router;
