const express = require('express')
const router = express.Router()
const bcrypt = require ('bcrypt')
const mongoose = require ('mongoose')
const User = require ('../models/Users.js')
const Profile = require ('../models/Profile.js')
const List = require ('../models/List.js')


// welcome page

router.get(('/'), (req, res)=> res.render('welcome.ejs'))
module.exports = router;