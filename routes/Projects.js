const express = require('express')
const router = express.Router()
const bcrypt = require ('bcrypt')
const mongoose = require ('mongoose')
const User = require ('../models/Users.js')
const Profile = require ('../models/Profile.js')
const List = require ('../models/List.js')

// Portfolio Page
router.get(('/'), (req, res)=> res.render('Projects/Projects.ejs'))



                       // Login pages

// login get 
router.get(('/Login'), (req, res)=> res.render('Projects/login.ejs'))
// login post
router.post('/Login', async (req,res)=> {

    
 
try {
    
 const Users = await User.findOne({ email:req.body.email}).exec()
 ///   Match.find(email=>email===req.body.email)
//  console.log(Users.password)
const auth = await bcrypt.compare(req.body.password, Users.password)

// console.log(auth, 'this is out auth request')
    if (auth){
  
     

 res.render('Projects/profile.ejs', {name: Users.name, Progress: Users.Progress  } )  }  

   
    else { res.send('invalid credentials')}
    
    
    
    }
      catch (err) { 
       
        console.log('error',err)
        res.status(500).send('invalid credentials')
    }

})


// Profile page
router.get(('/profile'), (req, res)=> res.render('Projects/profile.ejs'))



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





module.exports = router;




