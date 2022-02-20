const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../../models/Users.js");
const Profile = require("../../models/Profile.js");
const Post = require("../../models/Posts");
const List = require("../../models/List.js");
const sessions = require("express-session");
var flash = require("connect-flash");
const session = require("express-session");
const Appointment = require("../../models/Appt.js");

// Global variable
var Userz;
const Guest = {
  name: "Guest",
  email: "Guest@gmail.com",
  occupation: "student",
  location: "London",
  password: "123",
  id: "Guest",
  age: "23",
  date: "",
  avatar: "https://www.w3schools.com/howto/img_avatar.png",
  // HTML
  CHECKB1: false,
  CHECKB2: false,
  CHECKB3: false,
  CHECKB4: false,
  CHECKB5: false,
  CHECKBF: false,
  HTML: false,
  // CSS Basic
  CSSBasic: false,
  // CSS Intermediate
  CSSIntermediate: false,
  // CSS Advanced
  CSSAdvanced: false,
  // Javascript Basic
  JSBasic: false,
  // Javascript InterMediate
  JSIntermediate: false,
  // Javascript Advanced
  JSAdvanced: false,
  // Server Side Basic
  BackendBasic: false,
  // Server Side Advanced
  BackendAdvanced: false,
  // Level
  Value: 0,
  // Practices
  Practices: 0,
  Objectives: 0,
  Appointments: false,
  AppointDate: "no appointments to show",
  Progress: {
    HTML: true,
    CSSbasic: false,
    CSSIntermediate: false,
    CSSAdvanced: false,
    JavascriptB: false,
    JavascriptM: false,
    JavascriptA: false,
    ServerSideB: false,
    ServerSideA: false,
  },
};

module.exports = Guest;

// Portfolio Page
router.get("/", (req, res) => res.render("Projects/Projects.ejs"));

////////////////////// LOGIN PAGE//////////////////////////////////////////
//Login Page
//GET route
router.get("/Login", (req, res) => {
  res.render("Projects/login.ejs", { info: "" });
});

//Guest route
router.get("/E-Learning", (req, res) => {
  req.session.user = Guest;
  res.redirect("./profile");
});
//Login Page
//POST route
router.post("/Login", async (req, res) => {
  if (req.body.email === "guest@g") {
    req.session.user = Guest;
    res.redirect("./profile");
  } else {
    try {
      const users = await User.findOne({ email: req.body.email }).exec();
      if (users) {
        const auth = await bcrypt.compare(req.body.password, users.password);
        if (auth) {
          console.log("condition 1A");
          req.session.user = users;
          res.redirect("./profile");
        } else if (!auth) {
          console.log("condition 1B");
          res.render("Projects/login.ejs", { info: false });
        }
      } else if (!users) {
        if (req.body.email === "admin@g") {
          const profiles = await User.find().sort({ date: -1 });

          res.render("Projects/Admin.ejs", { info: profiles });
        } else if (req.body.email === "guest@g") {
          req.session.user = Guest;
          res.redirect("./profile");
        } else {
          console.log("condition 1C");
          res.render("Projects/login.ejs", { info: false });
        }
      }
    } catch (err) {
      console.log("condition 2");
      console.log("error", err);
      res.status(500).send("invalid credentials");
    }
  }
});
////////////////////// PROFILE PAGE//////////////////////////////////////////
//Profile Page
//GET route
router.get("/profile", (req, res) => {
  console.log("Profile page GET");
  res.render("Projects/profile.ejs", { info: req.session.user });
});
//Profile Page
//POST route
router.post("/profile", async (req, res) => {
  //password change request
  if (req.body.password && req.body.npassword === req.body.npassword2) {
    console.log("password change");
    try {
      //
      const users = await User.findOne({
        email: req.session.user.email,
      }).exec();

      const hashedPassword = await bcrypt.hashSync(req.body.npassword2, 10);
      console.log("old", users.password, req.session.user.password);
      const auth = await bcrypt.compare(req.body.password, users.password);
      if (auth) {
        console.log("match");

        users.password = hashedPassword;
        req.session.user = users;

        console.log("new", users.password, req.session.user.password);
        await users.save();
      } else {
        res.send("invalid credentials");
      }
    } catch (err) {
      console.log("error", err);
      res.status(500).send("invalid credentials");
    }

    // Avatar Change request
  } else if (req.body.url) {
    console.log("avatar change");
    try {
      const users = await User.findOne({
        email: req.session.user.email,
      }).exec();
      users.avatar = req.body.url;
      req.session.user = users;
      await users.save();
      res.render("Projects/profile.ejs", { info: req.session.user });
    } catch (error) {
      console.log(error);
      res.status(500).send("invalid credentials");
    }
  } else {
    console.log(req.body.appointment);

    try {
      const name = req.session.user.name;
      const email = req.session.user.email;
      req.session.user.Appointments = true;
      req.session.user.AppointDate = req.body.appointment;
      const users = await User.findOne({
        email: req.session.user.email,
      }).exec();
      users.Appointments = true;
      users.AppointDate = req.session.user.AppointDate;
      const Appt = new Appointment({
        name,
        email,
        date: req.body.appointment,
      });
      await Appt.save();
      await users.save();
      res.render("Projects/profile.ejs", { info: req.session.user });
    } catch (error) {
      console.log(error);
      res.status(500).send("unable to save Appointment");
    }
  }
});
////////////////////// TUTORIAL PAGE//////////////////////////////////////////
//Profile Page
//GET route
// Tutorial page
router.get("/tutorials", (req, res) => {
  res.render("Projects/tutorials", { info: req.session.user });
});
router.post("/tutorials", async (req, res) => {
  //Level Updater
  function Reset(users) {
    users.CHECKB1 = false;
    users.CHECKB2 = false;
    users.CHECKB3 = false;
    users.CHECKB4 = false;
    users.CHECKB5 = false;
    users.CHECKBF = false;
  }
  function LevelUpdate(User) {
    if (User.Value === 1) {
      User.Progress.CSSbasic = true;
      User.HTML = true;
    }
    if (User.Value === 2) {
      User.Progress.CSSIntermediate = true;
      User.CSSBasic = true;
    }
    if (User.Value === 3) {
      User.Progress.CSSAdvanced = true;
      User.CSSIntermediate = true;
    }
    if (User.Value === 4) {
      User.Progress.JavascriptB = true;
      User.CSSAdvanced = true;
    }
    if (User.Value === 5) {
      User.Progress.JavascriptM = true;
      User.JSBasic = true;
    }
    if (User.Value === 6) {
      User.Progress.JavascriptA = true;
      User.JSIntermediate = true;
    }
  }
  const Data = [];
  function GetBodyData() {
    const values = [
      req.body.b1,
      req.body.b2,
      req.body.b3,
      req.body.b4,
      req.body.b5,
      req.body.chat,
    ];

    for (var j = 0; j < values.length; j++) {
      if (values[j] === "on") {
        Data[j] = true;
      } else {
        Data[j] = false;
      }
    }
  }
  GetBodyData();
  //Get and Update User

  if (req.session.user.email === "Guest@gmail.com") {
    var users = req.session.user;
    users.CHECKB1 = Data[0];
    users.CHECKB2 = Data[1];
    users.CHECKB3 = Data[2];
    users.CHECKB4 = Data[3];
    users.CHECKB5 = Data[4];
    users.CHECKBF = Data[5];

    if (users.CHECKBF === true) {
      users.Value = users.Value + 1;
      console.log(users.Value);
      LevelUpdate(users);
      Reset(users);
      req.session.user = users;
      res.render("Projects/tutorials", { info: req.session.user });
    }
  } else {
    try {
      const users = await User.findOne({
        email: req.session.user.email,
      }).exec();
      users.CHECKB1 = Data[0];
      users.CHECKB2 = Data[1];
      users.CHECKB3 = Data[2];
      users.CHECKB4 = Data[3];
      users.CHECKB5 = Data[4];
      users.CHECKBF = Data[5];

      if (users.CHECKBF === true) {
        users.Value = users.Value + 1;
        console.log(users.Value);
        LevelUpdate(users);
        Reset(users);
      }
      await users.save();
      req.session.user = users;
      res.render("Projects/tutorials", { info: req.session.user });
    } catch (error) {
      console.log(error);
    }
  }
});
//GET route
// Tutorial page

router.get("/Catalogue", (req, res) => {
  res.render("Projects/UserProj.ejs");
});

////////////////////// REGISTER PAGE//////////////////////////////////////////
//GET route
// Register page
router.get("/register", (req, res) => {
  console.log(User);

  res.render("Projects/register.ejs");
});

router.post("/register", async (req, res) => {
  const { name, email } = req.body;
  let key = (Math.random() + 1).toString(36).substring(7);
  const duplicate = await User.findOne({ email: req.body.email }).exec();
  if (!duplicate) {
    try {
      const hashedPassword = await bcrypt.hashSync(req.body.password, 10);
      const user = new User({
        name,
        email,
        password: hashedPassword,
        id: key,
      });
      await user.save();
      // res.send(user)
      const profile = new Profile({
        UserID: key,
      });
      await profile.save();

      res.redirect("./login");
    } catch (err) {
      res.redirect("/register");
      console.log(err);
    }
  } else {
  }
});

////////////////////// PRACTICE PAGE//////////////////////////////////////////
//GET  route
// practice page
router.get("/Practice", (req, res) => {
  res.render("Projects/Practice.ejs");
});

////////////////////// FORUM PAGE//////////////////////////////////////////
//GET route
// forum page
router.get("/Forum", async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    res.render("Projects/Forum.ejs", { Posts: posts, User: req.body.user });
  } catch (error) {
    console.log(error);
  }
});
//POST route
// forum page
router.post("/Forum", async (req, res) => {
  const d = new Date();
  let postId = (Math.random() + 1).toString(36).substring(7);
  let day = d.getDate();
  const month = d.toLocaleString("default", { month: "long" });
  let year = d.getFullYear();
  const date = `${day} ${month} ${year}`;
  console.log(
    "hello its working",
    req.body,
    req.session.user.name,
    `${day} ${month} ${year} id :${postId}`
  );

  try {
    const post = new Post({
      PostID: postId,
      PostSubject: req.body.subject,
      PostDate: date,
      PostAvatar: req.session.user.avatar,
      PostTopic: req.body.selection,
      PostUser: req.session.user.name,
      PostText: req.body.post,
    });

    if (post.PostSubject === "" || post.PostText === "") {
      console.log("post invalid");
    } else {
      await post.save();
      const posts = await Post.find().sort({ date: -1 });

      res.render("Projects/Forum.ejs", { Posts: posts, User: req.body.user });
    }
  } catch (error) {
    console.log(error);
  }
});

////////////////////// MyLearning PAGE//////////////////////////////////////////
//MyLearningPage
//GET route
// Tutorial page
router.get("/myLearning", (req, res) => {
  res.render("Projects/mylearning.ejs", { info: req.session.user });
});
///////////////////////////////
////////////////////// MyLearning PAGE//////////////////////////////////////////
//MyLearningPage
//GET route
// Tutorial page
router.get("/Account", (req, res) => {
  res.render("Projects/Account.ejs", { info: req.session.user });
});
///////////////////////////////
//MyLearningPage
//GET route
// Tutorial page

router.post("/account", async (req, res) => {
  //password change request

  if (req.session.user.name === "Guest") {
    console.log("its a guest");
    if (req.body.opassword) {
      console.log("password change request");
      if (
        req.body.opassword === req.session.user.password &&
        req.body.npassword === req.body.password2
      ) {
        req.session.user.password = req.body.npassword;
        res.render("Projects/Account.ejs", { info: req.session.user });
      }
    } else if (req.body.deletePass) {
      console.log("Account Delete Request");
    } else if (req.body.name) {
      console.log("Public Info Change request");

      req.session.user.name = req.body.name;
      req.session.user.occupation = req.body.occupation;
      req.session.user.location = req.body.location;
      req.session.user.age = req.body.age;

      res.render("Projects/Account.ejs", { info: req.session.user });
    }
  } else {
    console.log("its not a guest");
  }
});

// access Project

router.get("/Folder", (req, res) => res.render("Projects/file.ejs"));

router.post("/Projects/Login");

module.exports = router;
