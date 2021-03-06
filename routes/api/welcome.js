const express = require('express')
const router = express.Router()
const bcrypt = require ('bcrypt')
const mongoose = require ('mongoose')
const User = require ('../../models/Users.js')
const Profile = require ('../../models/Profile.js')
const List = require ('../../models/List.js')
const path = require('path')


// welcome page

router.get(('/'), (req, res)=> res.render('welcome.ejs'))
router.get(('/contact'), (req, res)=> res.render('Projects/Projects.ejs'))

module.exports = router;