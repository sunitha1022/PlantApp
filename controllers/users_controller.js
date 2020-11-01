const bcrypt = require('bcrypt')
const express = require('express')
const multer = require('multer'); 
const router = express.Router()
const User = require('../models/users.js')
const Garden = require('../models/gardens.js')
const storage = multer.diskStorage({ 
  destination: (req, file, cb) => { 
      cb(null, 'uploads') 
  }, 
  filename: (req, file, cb) => { 
      cb(null, file.fieldname + '-' + Date.now()) 
  } 
}); 


const upload = multer({ storage: storage }); 

router.get('/new', (req, res) => {
  res.render('users/new.ejs')
})
router.post('/', (req, res) => {
  //overwrite the user password with the hashed password, then pass that in to our database
    req.body.password = bcrypt.hashSync(
    req.body.password, 
    bcrypt.genSaltSync(10))
    User.create(req.body, (err, createdUser) => {
    console.log('user is created', createdUser)
    res.redirect('/')
  })
})
//getting the images

module.exports = router