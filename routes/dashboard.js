const express = require('express')
const router = express.Router()
const bcrypt = require ('bcrypt')
const mongoose = require ('mongoose')
const User = require ('../models/Users.js')
const Profile = require ('../models/Profile.js')
const List = require ('../models/List.js')




// welcome page

router.get(('/'), (req, res)=> res.render('welcome.ejs'))
// Portfolio Page
router.get(('/Portfolio'), (req, res)=> res.render('Portfolio.ejs'))
// Portfolio Page
router.get(('/Projects'), (req, res)=> res.render('Projects.ejs'))


                         // Login pages

// login get 
router.get(('/Login'), (req, res)=> res.render('login.ejs'))
// login post
router.post('/Login', async (req,res)=> {
 
try {
    
 const Users = await User.findOne({ email:req.body.email}).exec()
 ///   Match.find(email=>email===req.body.email)
//  console.log(Users.password)
const auth = await bcrypt.compare(req.body.password, Users.password)

console.log(auth, 'this is out auth request')
    if (auth){
  
     

 res.render('profile.ejs', {name: Users.name, progress: Users.progress  } )  }  

   
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
router.get(('/register'), (req, res)=>{
console.log(User)

res.render('register.ejs')})

router.post(('/register'), async (req, res)=> {
const {name, email} = req.body


  let key = (Math.random() + 1).toString(36).substring(7);
  console.log('line 67')
try {
const hashedPassword = await bcrypt.hashSync(req.body.password, 10)
console.log('line 70')




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

console.log('line 106', List.userId)
// List.userId.push(key)
// await List.save()





console.log('line 78')
// const Profile = await Profile.create({ 


//   UserID:rkey
  
//   }).save()








// console.log('line 39',Users)
res.redirect('./Login')
} catch{
res.redirect('/register')


}







})

// access Project

router.get(('/Folder'), (req, res)=> res.render('Projects/file.ejs'))





module.exports = router;