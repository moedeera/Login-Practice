const express = require ('express')
const app = express()
const http = require('http')
const mongoose = require ('mongoose')
const path = require('path')
const morgan = require('morgan')
const session = require('express-session')
const flash = require('express-flash');

//manage chess users
const Users = ['user1','user2']
const Rooms = ['room1','room2']

function userJoin(id,username,room){
const user = {id, username,room}
Users.push(user)
}

function getCurrentUser(id){
return Users.find((user)=> user.id === id)
}
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
// Listen for broadcast announcements
socket.on('Calls', (msg)=>{
  // console.log(msg)
      socket.emit('Call-Info',msg)
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