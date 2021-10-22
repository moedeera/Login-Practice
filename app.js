const express = require ('express')
const app = express()
const http = require('http')
const mongoose = require ('mongoose')
const path = require('path')
const morgan = require('morgan')
const session = require('express-session')
const flash = require('express-flash');

//manage chess users
const Users = []

function userJoin(id,username){
const user = {id, username}
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
socket.join('room1')

socket.emit('message','You are connected as user ')
turn = true;
socket.broadcast.emit('message', 'a player is spectating')

// Listen for Chess Info
socket.on('Info', (msg)=>{
// console.log(msg)
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