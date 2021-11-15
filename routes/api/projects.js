const express = require('express')
const router = express.Router()
const bcrypt = require ('bcrypt')
const mongoose = require ('mongoose')
const User = require ('../../models/Users.js')
const Profile = require ('../../models/Profile.js')
const Post = require('../../models/Posts')
const List = require ('../../models/List.js')
const sessions = require('express-session')
var flash = require('connect-flash');
const session = require('express-session')

// Global variable
var  Userz ;


// Portfolio Page
router.get(('/'), (req, res)=> res.render('Projects/Projects.ejs'))



                      
////////////////////// LOGIN PAGE//////////////////////////////////////////   
//Login Page 
//GET route
router.get(('/Login'), (req, res)=>{
          res.render('Projects/login.ejs')
        })
//Login Page 
//POST route
router.post('/Login', async (req,res)=> {
  try {
    const users = await User.findOne({ email:req.body.email}).exec()
    console.log(req.body.password, users.password)
    const auth = await bcrypt.compare(req.body.password, users.password)

           if (auth){
  
               req.session.user = users;
               res.redirect('./profile' )  
                    }  
           else { res.send('invalid credentials')}
      
           }
          catch (err) { 
               console.log('error',err)
               res.status(500).send('invalid credentials')
            }
           })
////////////////////// PROFILE PAGE//////////////////////////////////////////
//Profile Page 
//GET route
router.get(('/profile'), (req, res)=>{
         console.log('Profile page GET')
         res.render('Projects/profile.ejs', {info : req.session.user}
          )})
//Profile Page 
//POST route 
router.post(('/profile'), async (req, res)=>{

//password change request
if (req.body.npassword===req.body.npassword2)
{console.log('password change')
try {
  // 
  const users = await User.findOne({ email:req.session.user.email}).exec()
  const hashedPassword = await bcrypt.hashSync(req.body.password, 10)
  console.log('old',users.password, req.session.user.password)
  const auth = 
  await bcrypt.compare(req.body.password, users.password)
         if (auth){
console.log('match')

             users.password = hashedPassword;
             req.session.user = users;

             console.log('new',users.password, req.session.user.password)
             await users.save()
                  }  
         else { res.send('invalid credentials')}
    
         }
        catch (err) { 
             console.log('error',err)
             res.status(500).send('invalid credentials')
          }
         







}
else if (req.body.url)
{console.log('avatar change')
try {
  const users = await User.findOne({ email:req.session.user.email}).exec()
  users.avatar = req.body.url;
  req.session.user = users;
  await users.save()
  
} catch (error) {
  console.log(error)
             res.status(500).send('invalid credentials')
}
}  // req.body.url,
  // req.body.password, req.body.npassword, req.body.npassword2
  
  })         
////////////////////// TUTORIAL PAGE//////////////////////////////////////////       
//Profile Page 
//GET route         
// Tutorial page
router.get(('/tutorials'), (req, res)=>{

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
                    }
  await users.save()
  req.session.user = users;
  res.redirect('/tutorials')
  
} 
 catch (error) {
  console.log(error)
}
} )
//GET route         
// Tutorial page

router.get(('/Catalogue'),(req, res)=>{

res.render('Projects/UserProj.ejs')

})


////////////////////// REGISTER PAGE//////////////////////////////////////////  
//GET route         
// Register page
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

               res.redirect('./Login')} 
            catch(err) {
                 res.redirect('/register')
                 console.log(err)
                  }}

else {

  res.render('Projects/file.ejs', {msg : 'Email Already in Use'})
}})

////////////////////// PRACTICE PAGE//////////////////////////////////////////  
//GET  route         
// practice page  
  router.get(('/Practice'),(req, res)=>{
    res.render('Projects/Practice.ejs')
    })


////////////////////// FORUM PAGE//////////////////////////////////////////  
//GET route         
// forum page
router.get(('/Forum'), async (req, res)=>{

try {
  const posts = await Post.find().sort({date:-1})

 res.render('Projects/Forum.ejs',{Posts:posts})

} catch (error) { 
  console.log(error)
}



 

  })
//POST route         
// forum page
router.post(('/Forum'), async (req, res)=>{
  const d = new Date();
let postId = (Math.random() + 1).toString(36).substring(7);
let day = d.getDate();
const month = d.toLocaleString('default', { month: 'long' });
let year = d.getFullYear();
const date  =`${day} ${month} ${year}`
 console.log('hello its working', req.body, req.session.user.name,`${day} ${month} ${year} id :${postId}`)


              try {
    const post = new Post  ({
    PostID:postId,
    PostSubject:req.body.subject,
    PostDate:date,
    PostTopic:req.body.selection,
    PostUser:req.session.user.name,
    PostText:req.body.post,
        })


                await post.save()
                const posts = await Post.find().sort({date:-1})

                res.redirect('/Forum')
                
                
              } catch (error) {
                console.log(error)
              }


})








// access Project

router.get(('/Folder'), (req, res)=> res.render('Projects/file.ejs'))




router.post(('/Projects/Login'))




module.exports = router;




