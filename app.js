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
io.on('connection', socket =>{




socket.on('JoinGame', ({user,room})=>{
// broadcast to all the games and users in play  
socket.emit('Games', Rooms)
// Create a user every-time a connection is made 
userJoin(socket.id, user, room)
// see if the game the user is looking for exists
const match = Rooms.find((game)=>game===user.room)
//if it does join that match
if (match){

socket.join(match)
}
//if not 
else if(!match){
//create a match
socket.join(user.room)  

}



socket.emit('message',`${user} has joined ${room}` )

})

socket.join('room1')

socket.emit('message','You are connected as user ')
turn = true;
socket.broadcast.emit('message', 'a player is spectating')

// Listen for Chess Info
socket.on('Info',  (msg, room)=>{
// console.log(msg)
     console.log(room)
    socket.broadcast.emit('message',msg)
})
// Testing final message system
socket.on('Call-Info', (playerName,roomName, Info)=>{

  
//check for username
const match =  CheckForUser(socket.id)
if (!match){

  user = userJoin(socket.id,playerName,roomName)

  socket.join(roomName)
}
else if (match){

  user = getCurrentUser(socket.id)

  socket.broadcast.to(user.room).emit 
}


Users =  getALL()
   console.log(playerName, ` id is ${socket.id} and Users is ${user.id} is match is ${match} and room is ${user.room} and this is all the Users ${Users[0].name}`)
      socket.emit('Caller-Info',roomName)
  })

socket.on('disconnect', ()=>{

  io.emit('message', 'spectator has left')  

})

})


// const MongoStore = require ('connect-mongo')(session);

app.use(morgan('dev'))
app.set('view engine', 'ejs')

app.set('views', [path.join(__dirname, 'views'),
                      path.join(__dirname, 'views/Projects/'), 
                      path.join(__dirname, 'views/Users/')]);




app.use(session({
key:'user',
secret:'secret-key',
resave:false,
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
// app.use('/', require('./routes/dashboard'))


const PORT = process.env.PORT || 8080


server.listen(PORT)