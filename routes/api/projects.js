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
//Level Updater 

function Reset(users){

  
  users.CHECKB1 =false;
  users.CHECKB2 =false;
  users.CHECKB3 =false;
  users.CHECKB4 =false;
  users.CHECKB5 =false;
  users.CHECKBF =false;
}


function LevelUpdate(User){
if(User.Value===1){
  User.Progress.CSSbasic=true;
  User.HTML = true;  
        }
        if(User.Value===2){
          User.Progress.CSSIntermediate=true;
          User.CSSBasic = true;  
                }
                if(User.Value===3){
                  User.Progress.CSSAdvanced=true;
                  User.CSSIntermediate = true;  
                        }        
                        if(User.Value===4){
                          User.Progress.JavascriptB=true;
                          User.CSSAdvanced = true;  
                                }        
                                if(User.Value===5){
                                  User.Progress.JavascriptM=true;
                                  User.JSBasic = true;  
                                        }    
                                        if(User.Value===6){
                                          User.Progress.JavascriptA=true;
                                          User. JSIntermediate = true;  
                                                }   


}



const Data = []
function GetBodyData(){
const values = [req.body.b1,req.body.b2,req.body.b3,req.body.b4,req.body.b5,req.body.chat]

for (var j=0; j<values.length; j++){
  if (values[j]==='on'){
    Data[j]=true;
  } else{
    Data[j]=false
  }
}
}
GetBodyData()


//Get and Update User

try {
  const users = await User.findOne({ email:req.session.user.email}).exec() 
  users.CHECKB1 =Data[0];
  users.CHECKB2 =Data[1];
  users.CHECKB3 =Data[2];
  users.CHECKB4 =Data[3];
  users.CHECKB5 =Data[4];
  users.CHECKBF =Data[5];

if (users.CHECKBF===true){
users.Value = users.Value + 1;
console.log(users.Value)
LevelUpdate(users)
Reset(users)
console.log(' the updated user', req.session.user.Value, users.Value )


}




  await users.save()
  req.session.user = users;
  // res.render('Projects/tutorials', {info : req.session.user})
  res.redirect('/tutorials')
  
} catch (error) {
  console.log(error)
}







} )


router.get(('/Catalogue'),(req, res)=>{

res.render('Projects/UserProj.ejs')

})



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
router.get(('/Forum'),(req, res)=>{

  res.render('Projects/Forum.ejs')
  
  })
  
  router.get(('/Practice'),(req, res)=>{

    res.render('Projects/Practice.ejs')
    
    })
    








// access Project

router.get(('/Folder'), (req, res)=> res.render('Projects/file.ejs'))




router.post(('/Projects/Login'))




module.exports = router;




