const express = require('express')
const router = express.Router()
const bcrypt = require ('bcrypt')
const mongoose = require ('mongoose')
const User = require ('../../models/Users.js')
const Profile = require ('../../models/Profile.js')
const List = require ('../../models/List.js')
const sessions = require('express-session')
var flash = require('connect-flash');
const session = require('express-session')

// Global variable
var  Userz ;


// Portfolio Page
router.get(('/'), (req, res)=> res.render('Projects/Projects.ejs'))



                       // Login pages

// login get 
router.get(('/Login'), (req, res)=>{
console.log('Login Page GET')

res.render('Projects/login.ejs')})
// login post
router.post('/Login', async (req,res)=> {

    
 
try {
    
 const users = await User.findOne({ email:req.body.email}).exec()
 
 ///   Match.find(email=>email===req.body.email)
//  console.log(Users.password)
const auth = await bcrypt.compare(req.body.password, users.password)

// console.log(auth, 'this is out auth request')
    if (auth){
  
      req.session.user = users;
    
    
// console.log(req.flash)
//  res.render('Projects/profile.ejs', {name: Users.name, Progress: Users.Progress, CSS: Users.CSSbasic  } )  
 res.redirect('./profile' )  



 


}  

   
    else { res.send('invalid credentials')}
    
    
    
    }
      catch (err) { 
       
        console.log('error',err)
        res.status(500).send('invalid credentials')
    }

})


// Profile page
router.get(('/profile'), (req, res)=>{
// res.render('Projects/profile.ejs', {name: req.session, Progress: Userz.Progress, CSS: Userz.CSSbasic}
console.log('Profile page GET')
res.render('Projects/profile.ejs', {info : req.session.user}

)})

router.post(('/profile'), (req, res)=>{


console.log('Profile Page POST', req.body.c0, req.body.c1, req.body)


} )





//register pages
router.get(('/register'), (req, res)=>{
console.log(User)

res.render('Projects/register.ejs')})

router.post(('/register'), async (req, res)=> {
const {name, email} = req.body


  let key = (Math.random() + 1).toString(36).substring(7);
 
try {
const hashedPassword = await bcrypt.hashSync(req.body.password, 10)





// const Users = await User.create({ name,

// email,
// password: hashedPassword,
// id:key

// })

const user = new User({
name,
email,
password:hashedPassword,
id:key
})



await user.save()
// res.send(user)
const profile = new Profile({

  UserID:key
  })
  await profile.save()


// List.userId.push(key)
// await List.save()






// const Profile = await Profile.create({ 


//   UserID:rkey
  
//   }).save()








// console.log('line 39',Users)
res.redirect('./Login')
} catch{
res.redirect('/register')


}


router.get(('/Diner'), (req, res)=> res.render('Partials/Diner.ejs'))




})














// access Project

router.get(('/Folder'), (req, res)=> res.render('Projects/file.ejs'))




router.post(('/Projects/Login'))




module.exports = router;




