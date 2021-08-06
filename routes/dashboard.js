const express = require('express')
const router = express.Router()
const bcrypt = require ('bcrypt')
const mongoose = require ('mongoose')
const User = require ('../models/Users.js')






router.get(('/'), (req, res)=> res.render('welcome.ejs'))


                         // Login pages

// login get 
router.get(('/Login'), (req, res)=> res.render('login.ejs'))



// login post
router.post('/Login', async (req,res)=> {

 
 
try {
    
 const Users = await User.findOne({ email:req.body.email}).exec()
 console.log(Users.password)
const auth = await bcrypt.compare(req.body.password, Users.password)

console.log(auth, 'this is out auth request')
    if (auth){
  
     

 res.render('profile.ejs', {name: Users.name} )  }  

    
  

  
    

    
    else { res.send('invalid credentials')}
    
    
    
    }
      catch (err) { 
       
        console.log('error',err)
        res.status(500).send('invalid credentials')
    }

})


// Profile page
router.get(('/profile'), (req, res)=> res.render('profile.ejs'))



//register pages
router.get(('/register'), (req, res)=> res.render('register.ejs'))

router.post(('/register'), async (req, res)=> {

try {
const hashedPassword = await bcrypt.hashSync(req.body.password, 10)

const Users = await User.create({ name: req.body.name,

email: req.body.email,
password: hashedPassword

}).save()

console.log(Users)
res.json(Users).redirect('./Login')
} catch{
res.redirect('/register')


}







})









module.exports = router;