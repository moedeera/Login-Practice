const express = require ('express')
const app = express()
const mongoose = require ('mongoose')
const path = require('path')
const morgan = require('morgan')

app.use(morgan('dev'))
app.set('view engine', 'ejs')

app.set('views', [path.join(__dirname, 'views'),
                      path.join(__dirname, 'views/Projects/'), 
                      path.join(__dirname, 'views/Users/')]);

//DB config
const db = require ('./config/keys').MongoURI;

// Connect to mongo //
mongoose.connect(db, { useUnifiedTopology:true, useNewUrlParser: true} )
.then(()=> console.log('mongoDB connected'))
.catch(err=> console.log(err));


app.use('/public', express.static('public'))
app.use(express.urlencoded({extended: false}))


// Page Directory
app.use('/', require('./routes/dashboard'))


const PORT = process.env.PORT || 8080


app.listen(PORT)