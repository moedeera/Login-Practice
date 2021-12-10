const express = require ('express')
const app = express()
const http = require('http')
const mongoose = require ('mongoose')
const path = require('path')
const morgan = require('morgan')
const session = require('express-session')
const flash = require('express-flash');
const {
  userJoin,
  getCurrentUser,
  CheckForUser,
  getALL
 
} = require('./utils/user');

//manage chess users
// const Users = []
// const Rooms = ['room1','room2']



//

const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server); 

// Global variable to set up c
var Games = []
//run when client connects
io.on("connection", (socket) => {
  //               Chess Game Emissions 
  /////////////////// Creating a game //////////////////////////
  socket.on('create-game',({game,username})=>{

   io.emit('message', `A new game was created by ${socket.id}`)
    var player = userJoin(socket.id,username,game)
   
    socket.join(player.game)
    console.log(player.game)
    var count = io.sockets.adapter.rooms.get(player.game).size 
    var type = 'add';
   var data = {player,count,type}
   Games.unshift(data)
    // console.log(`room name is ${player.game},and the object for game is ${Games}`)
    var x =1 
  // Sends to all the users that this game is initiated 
    io.emit('game-board',(Games))
    // console.log('new game created')
    } )
/////////////////////// Joining a Game /////////////////////////////
socket.on('join-game',({game,username})=>{
  console.log(game)
  var player = userJoin(socket.id,username,game)
   var count = io.sockets.adapter.rooms.get(player.game).size 
    var type = 'join';
   var data = {player,count,type}
   Games.unshift(data)
// Sending back to the socket that joined the information on the host
var CurrentPlayer = getCurrentUser(socket.id,Games)
var gameName = CurrentPlayer.player.game
io.to(CurrentPlayer.player.game).emit('guest-host-data',game,username)
// socket.emit('guest-host-data',(username,guest))
  console.log('join-game-info:',game,username)
socket.join(game)
// console.log(`${game} room size is now
// ${ io.sockets.adapter.rooms.get(game).size }`)
  io.emit('message', `User ${socket.id} has joined ${game}`)
   
   var host = 1
   var guest = 2


 // Sends to all the users that this game is initiated 
   io.emit('game-board',(Games))
   // console.log('new game created')
   } )
////////////////////////// Sending  Message to specific game ///
socket.on('send-data',(data)=>{
console.log(data)

  var CurrentPlayer = getCurrentUser(socket.id,Games)
 
  if (CurrentPlayer){

 var game = CurrentPlayer.player.game

  io.to(game).emit('send-data',(data))}
else {
console.log(Games)
  socket.emit('send-data','you are not in a room')
}


}


)





                    //test emissions
  console.log('new connection ')
  //emit to everyone
  socket.emit('message', `welcome to Chess Game User ${socket.id}`)
  
  io.emit('game-board',(Games))
  //emits to everyone a new user on site/ updates counts.
  socket.broadcast.emit('message',`user ${socket.id} has joined`)
  // Listen for messages
  socket.on('data',(msg)=>{
io.emit('message',`${msg}`)
  })





  
  //User disconnects
  socket.on('disconnect',()=>{
    io.emit('message', `user ${socket.id} has left`)
Games = Games.filter((x)=>{
if(x.player.id!==socket.id){
return x
}

})
    console.log(Games)

    io.emit('game-board', (Games))
  })
});

// const MongoStore = require ('connect-mongo')(session);

app.use(morgan('dev'))
app.set('view engine', 'ejs')

app.set('views', [path.join(__dirname, 'views'),
                      path.join(__dirname, 'views/Projects/'), 
                      path.join(__dirname, 'views/Users/')]);




app.use(session({
key:'user',
secret:'secret-key',
rolling:true,
resave:true,
saveUninitialized:false,
cookie: {
    expires: 600000
}



}));



//DB config
const db = require ('./config/keys').MongoURI;

// Connect to mongo //
mongoose.connect(db, { useUnifiedTopology:true, useNewUrlParser: true} )
.then(()=> console.log('mongoDB connected'))
.catch(err=> console.log(err));






app.use('/public', express.static('public'))
app.use(express.urlencoded({extended: false}))




// Page Directory

app.use('/', require('./routes/api/welcome'))
app.use('/Portfolio', require('./routes/api/portfolio'))
app.use('/Projects', require('./routes/api/projects'))
app.use('/Contact', require('./routes/api/contact'))
// app.use('/', require('./routes/dashboard'))


const PORT = process.env.PORT || 8080


server.listen(PORT)