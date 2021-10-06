const express = require('express')
const router = express.Router()
const bcrypt = require ('bcrypt')
const mongoose = require ('mongoose')
const User = require ('../../models/Users.js')
const Profile = require ('../../models/Profile.js')
const List = require ('../../models/List.js')

// Portfolio Page
router.get(('/'), (req, res)=> res.render('Portfolio/Portfolio.ejs'))


// Diner Website
router.get(('/Diner'), (req, res)=> res.render('Portfolio/Diner.ejs'))


module.exports = router;
