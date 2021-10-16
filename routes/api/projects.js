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
// Tutorial page
router.get(('/tutorials'), (req, res)=>{
  // res.render('Projects/profile.ejs', {name: req.session, Progress: Userz.Progress, CSS: Userz.CSSbasic}
  console.log('tutorial page GET')
  res.render('Projects/tutorials', {info : req.session.user}
  
  )})




router.post(('/tutorials'), async (req, res)=>{


console.log('Profile Page POST',  req.session.user.CHECKB1)

var DataBase =
 [req.session.user.CHECKB1, req.session.user.CHECKB2, req.session.user.CHECKB3, req.session.user.CHECKBF,
  req.session.user.CSSB1, req.session.user.CSSB2, req.session.user.CSSB3, req.session.user.CSSB4,  req.session.user.CSSB5,req.session.user.CSSBF, 
  req.session.user.CSSM1, req.session.user.CSSM2, req.session.user.CSSM3, req.session.user.CSSM4,  req.session.user.CSSM5,req.session.user.CSSMF, 
  req.session.user.CSSA1, req.session.user.CSSA2, req.session.user.CSSAF, 
  req.session.user.JSB1,  req.session.user.JSB2,req.session.user.JSB3, req.session.user.JSB4,req.session.user.JSBF, 
  req.session.user.JSM1,  req.session.user.JSM2,req.session.user.JSM3, req.session.user.JSM4,req.session.user.JSMF, 

]

var Update =   [
     req.body.b1, req.body.b2, req.body.b3, req.body.b1, req.body.chat1,
     req.body.c0, req.body.c1, req.body.c2, req.body.c3, req.body.c4, req.body.chat2, 
     req.body.cm0, req.body.cm1, req.body.cm2, req.body.cm3, req.body.cm4, req.body.chatm2 
    
    
    ]

for (var j=0; j<Update.length; j++){
if (Update[j] === 'on'){

  DataBase[j] = true;
  
} else if (Update[j] !== 'on'){

 DataBase[j] = false;
}


}






console.log('user updated', req.session.user.CHECKB1)

try {
 const users = await User.findOne({ email:req.session.user.email}).exec()
 var MongoData =
 [users.CHECKB1, users.CHECKB2, users.CHECKB3, users.CHECKBF,
  users.CSSB1, users.CSSB2, users.CSSB3, users.CSSB4,  users.CSSB5,users.CSSBF, 
  users.CSSM1, users.CSSM2, users.CSSM3, users.CSSM4,  users.CSSM5,users.CSSMF, 
  users.CSSA1, users.CSSA2, users.CSSAF, 
  users.JSB1,  users.JSB2,users.JSB3, users.JSB4,users.JSBF, 
  users.JSM1,  users.JSM2,users.JSM3, users.JSM4, users.JSMF, 

]
// for (var j =0; j<Update.length; j++){
// MongoData[j]= Update[j]

// }
users.CHECKB1 = Update[0]
users.CHECKB2 = Update[1]
users.CHECKB3 = Update[2]
users.CHECKBF = Update[3]

users.CSSB1 = Update[4]
users.CSSB2 = Update[5]
users.CSSB3 = Update[6]
users.CSSB4 = Update[7]
users.CSSB5 = Update[8]
users.CSSBF = Update[9]

users.CSSM1 = Update[10]
users.CSSM2 = Update[11]
users.CSSM3 = Update[12]
users.CSSM4 = Update[13]
users.CSSM5 = Update[14]
users.CSSBF = Update[15]





await users.save()
console.log('success')
} catch (err) {

  console.log('error',err)
        
}



} )





//register pages
router.get(('/register'), (req, res)=>{
console.log(User)

res.render('Projects/register.ejs')})

router.post(('/register'), async (req, res)=> {
const {name, email} = req.body
  

  let key = (Math.random() + 1).toString(36).substring(7);
 const duplicate = await User.findOne({ email:req.body.email}).exec()


if(!duplicate){
  try {
const hashedPassword = await bcrypt.hashSync(req.body.password, 10)

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

res.redirect('./Login')
} catch(err) {
res.redirect('/register')
console.log(err)




}}

else {

  res.render('Projects/file.ejs', {msg : 'Email Already in Use'})
}






})



// router.get(('/Diner'), (req, res)=> res.render('Partials/Diner.ejs'))










// access Project

router.get(('/Folder'), (req, res)=> res.render('Projects/file.ejs'))




router.post(('/Projects/Login'))




module.exports = router;




