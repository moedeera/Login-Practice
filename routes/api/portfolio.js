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
// Elearning website Website
router.get(('/Elearning'), (req, res)=> res.render('Projects/login.ejs'))


// Chess Website
router.get(('/Chess'), (req, res)=> res.render('Portfolio/Chess.ejs'))
router.get(('/Chess/Game'), (req, res)=> res.render('Portfolio/Game.ejs'))


module.exports = router;
