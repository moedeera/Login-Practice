const express = require("express");
const app = express();
const http = require("http");
const mongoose = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const session = require("express-session");

const cors = require("cors");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});

const { userJoin, getCurrentUser, getGuest, getHost } = require("./utils/user");

//manage chess users
// const Users = []
// const Rooms = ['room1','room2']
const Guest = {
  name: "Moderator",
  email: "Guest",
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

//

const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

// Global variable to set up c
var Games = [];
//run when client connects
io.on("connection", (socket) => {
  //               Chess Game Emissions
  /////////////////// Creating a game //////////////////////////
  socket.on("create-game", ({ game, username }) => {
    io.emit("message", `A new game was created by ${socket.id}`);
    var player = userJoin(socket.id, username);

    socket.join(game);
    console.log(game);
    var gameRoom = game;
    var type = "wait";
    var data = { player, player2: "", gameRoom, type };
    Games.unshift(data);
    // console.log(`room name is ${player.game},and the object for game is ${Games}`)
    var x = 1;
    // Sends to all the users that this game is initiated
    io.emit("game-board", Games);
    // console.log('new game created')
  });
  /////////////////////// Joining a Game /////////////////////////////
  socket.on("join-game", ({ game, username }) => {
    socket.join(game);
    // console.log(game)
    var Index = 0;
    const match = Games.some((games) => games.gameName === game);
    // console.log(Games[0].player.game, game, match)
    if (match) {
      for (var j = 0; j < Games.length; Games++) {
        if (Games[j].gameName === game) {
          Index = j;
        }
      }
    }
    var player = userJoin(socket.id, username);
    Games[Index].player2 = player;

    Games[Index].type = "in-game";
    console.log(Games);

    // Sending back to the socket that joined the information on the host
    socket.emit("message", `you have joined ${game}' game`);

    // socket.emit('guest-host-data',(username,guest))
    console.log("join-game-info:", game, username);

    io.to(game).emit("guest-host-data", game, username);

    io.to(game).emit("start", true);
    // console.log(`${game} room size is now
    // ${ io.sockets.adapter.rooms.get(game).size }`)
    io.emit("message", `User ${socket.id} has joined ${game}`);

    var host = 1;
    var guest = 2;

    // Sends to all the users that this game is initiated
    io.emit("game-board", Games);

    // console.log('new game created')
  });
  ////////////////////////// Sending  Message to specific game ///
  socket.on("send-data", (data) => {
    console.log(data);

    var CurrentPlayer = getCurrentUser(socket.id, Games);

    if (CurrentPlayer) {
      var game = CurrentPlayer.gameRoom;

      var name = "";
      if (CurrentPlayer.player.id === socket.id) {
        name = CurrentPlayer.player.name;
      } else {
        name = CurrentPlayer.player2.name;
      }

      socket.to(game).emit("send-data", `${name} said '${data}'`);
    } else {
      console.log(Games);
      socket.emit("send-data", "you are not in a game");
    }
  });
  ////////////////////// Send Information on Chess Game
  socket.on("Chess-Game", (data) => {
    console.log(data);
    // io.emit(data)
    var CurrentPlayer = getCurrentUser(socket.id, Games);

    if (CurrentPlayer) {
      var game = CurrentPlayer.gameRoom;

      socket.to(game).emit("Chess-Game", data);
    } else {
      console.log(Games);
      socket.emit("send-data", "you are not in a room");
    }
  });
  //test emissions
  console.log("new connection ");
  //emit to everyone
  socket.emit("message", `welcome to Chess Game User ${socket.id}`);

  io.emit("game-board", Games);
  //emits to everyone a new user on site/ updates counts.
  socket.broadcast.emit("message", `user ${socket.id} has joined`);
  // Listen for messages
  socket.on("data", (msg) => {
    io.emit("message", `${msg}`);
  });

  // Players leaving rooms //////

  socket.on("closure", (disco) => {
    console.log(`you have left ${disco}`);

    for (var j = 0; j < Games.length; j++) {
      if (Games[j].player.id === socket.id) {
        io.to(Games[j].gameRoom).emit("reset", "Host ended game");
        Games.splice(j, 1);
        console.log("game removed", Games);
        io.emit("game-board", Games);
      } else if (Games[j].player2.id === socket.id) {
        Games[j].player2 = "";
        Games[j].type = "wait";
        console.log("player removed", Games);
        io.emit("game-board", Games);
        io.to(Games[j].gameRoom).emit("reset", "guest exited");
      }
    }
  });
  // Checkmate/Game over situation
  socket.on("checkmate", () => {
    for (var j = 0; j < Games.length; j++) {
      if (
        Games[j].player.id === socket.id ||
        Games[j].player2.id === socket.id
      ) {
        io.to(Games[j].gameRoom).emit("reset", "Game is over");
        Games.splice(j, 1);
        console.log("game removed", Games);
        io.emit("game-board", Games);
      }
    }
  });
  // Sending a checked message
  socket.on("checked", (msg) => {
    if (msg !== "xyz") {
      for (var j = 0; j < Games.length; j++) {
        if (
          Games[j].player.id === socket.id ||
          Games[j].player2.id === socket.id
        ) {
          socket.to(Games[j].gameRoom).emit("checked", msg);
        }
      }
    } else if (msg === "xyz") {
      for (var j = 0; j < Games.length; j++) {
        if (
          Games[j].player.id === socket.id ||
          Games[j].player2.id === socket.id
        ) {
          socket.to(Games[j].gameRoom).emit("alert", msg);
        }
      }
    }
  });

  //User disconnects
  socket.on("disconnect", () => {
    io.emit("message", `user ${socket.id} has left`);

    for (var j = 0; j < Games.length; j++) {
      if (Games[j].player.id === socket.id) {
        io.to(Games[j].gameRoom).emit("reset", "Host ended game");
        Games.splice(j, 1);
        console.log("game removed", Games);
        io.emit("game-board", Games);
      } else if (Games[j].player2.id === socket.id) {
        Games[j].player2 = "";
        Games[j].type = "wait";
        console.log("player removed", Games);
        io.emit("game-board", Games);
        io.to(Games[j].gameRoom).emit("reset", "guest exited");
        io.to(Games[j].gameRoom).emit("send-data", "Guest Exited");
      }
    }
  });
});
// const MongoStore = require ('connect-mongo')(session);

app.use(morgan("dev"));
app.set("view engine", "ejs");

app.set("views", [
  path.join(__dirname, "views"),
  path.join(__dirname, "views/Projects/"),
  path.join(__dirname, "views/Users/"),
]);

app.use(
  session({
    key: "user",
    secret: "secret-key",
    rolling: true,
    resave: true,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);

//DB config
const db = require("./config/keys").MongoURI;

// Connect to mongo //
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("mongoDB connected"))
  .catch((err) => console.log(err));

app.use("/public", express.static("public"));
app.use(express.urlencoded({ extended: false }));

// Page Directory

app.use("/", require("./routes/api/welcome"));
app.use("/Portfolio", require("./routes/api/portfolio"));
app.use("/Projects", require("./routes/api/projects"));
app.use("/Contact", require("./routes/api/contact"));
app.use("/posts", require("./routes/api/posts"));
app.use("/profiles", require("./routes/api/profiles"));
app.use("/images", express.static("./routes/api/post-images"));
// app.use('/', require('./routes/dashboard'))

const PORT = process.env.PORT || 8080;

server.listen(PORT);
