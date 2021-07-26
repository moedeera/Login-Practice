const express = require('express')
const router = express.Router()
const bcrypt = require ('bcrypt')
const mongoose = require ('mongoose')


//DB config


const db = require ('../config/keys').MongoURI;

// Connnect to mongo

mongoose.connect(db, { useUnifiedTopology: true})
.then(()=> console.log('mongoDB connected'))
.catch(err=> console.log(err));





const app = express()
app.use('/public', express.static('public'))
app.use(express.urlencoded({extended: false}))


var Users = [ 
{email:'moe@gmail.com', password:'1234', name:'Moe'},
{email:'john@gmail.com', password:'j', name:'John'},
{email:'joe@gmail.com', password:'joe', name:'Joe'},
 ]
 var inc =0;

router.get(('/'), (req, res)=> res.render('index.ejs'))


                         // Login pages

// login get 
router.get(('/Login'), (req, res)=> res.render('login.ejs'))



// login post
router.post('/Login', (req,res)=> {



    var LoginUser= 
        {email:req.body.email,
         password: req.body.password   
        }
    const match = Users.some(user=>user.email===req.body.email)
    if (match){
    const matchUser = Users.filter(user=> user.email===req.body.email)
    try {bcrypt.compare(req.body.password, user.password)
    } catch { res.status(500).send}

    res.render('profile.ejs', {name: matchUser[0].name} )
    
    }
    
    else { res.render('register.ejs')}
    
    
    
    })
    



// Profile page
router.get(('/profile'), (req, res)=> res.render('profile.ejs'))



//register pages
router.get(('/register'), (req, res)=> res.render('register.ejs'))

router.post(('/register'), async (req, res)=> {

try {

    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    Users.push({
name: req.body.name,
email: req.body.email,
password: hashedPassword



    })
res.redirect('./Login')
} catch{
res.redirect('/register')


}







})









module.exports = router;