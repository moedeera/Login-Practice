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

//run when client connects

io.on("connection", (socket) => {

  socket.on('create-game',({game,username})=>{
    var player = userJoin(socket.id,username,game)
    socket.join(player.game)
    var count = io.sockets.adapter.rooms.get(player.game).size 
   var data = {player,count}
    console.log(player.game, player.name)
    socket.emit('game-board', (data))
    // console.log('new game created')
    } )


                    //test emissions
  console.log('new connection ')
  //emit to everyone
  socket.emit('message', `welcome to Chess Game User ${socket.id}`)
  //emits to everyone a new user on site/ updates counts.
  socket.broadcast.emit('message',`user ${socket.id} has joined`)
  // Listen for messages
  socket.on('data',(msg)=>{
io.emit('message',`${msg}`)
  })


  //               Chess Game Emissions 


  
  //User disconnects
  socket.on('disconnect',()=>{
    io.emit('message', `user ${socket.id} has left`)
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