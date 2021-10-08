const express = require ('express')
const app = express()
const mongoose = require ('mongoose')
const path = require('path')
const morgan = require('morgan')
const session = require('express-session')
const flash = require('express-flash');

// const MongoStore = require ('connect-mongo')(session);

app.use(morgan('dev'))
app.set('view engine', 'ejs')

app.set('views', [path.join(__dirname, 'views'),
                      path.join(__dirname, 'views/Projects/'), 
                      path.join(__dirname, 'views/Users/')]);
// Configure flash
        //  app.use(
        //                 session({
        //                   resave: true,
        //                   saveUninitialized: true,
        //                   secret:"yash is a super star",
        //                   cookie: { secure: false, maxAge: 14400000 },
        //                 })
        //             );
        //             app.use(flash());             



// COnfigure sessions
// const sessionStore = new MongoStore ({

// mongooseConnection:mongoose.connection,
// collection:'sessions'

// })



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


app.listen(PORT)