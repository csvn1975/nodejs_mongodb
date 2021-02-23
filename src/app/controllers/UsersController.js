const User = require('../models/Users');
var path = require('path');
const md5 = require('md5');

// const { bcryptPassword } = require('../../helpers/bcryptPassword')

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
          

class UserController {
   // [GET]: 
   
   list(req, res, next) {       
      res.render('users');
   }
   
   
   create(req, res, next) {
      res.render('users/sign-up', {layout: false});
   }
   
   create_post(req, res, next) {
      var fileData = req.file;
      var ext = path.extname(fileData.originalname);
      req.filename = req.filename + ext;
      req.body.avatar = fileData.filename;
      req.body.dest = fileData.destination;
      req.body.password = md5(req.body.password);


      // bcrypt.genSalt(saltRounds, function(err, salt) {
      //       bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
      //          if (!err)
      //             body.password = hash
      //       });
      // });  

      
      User.create(req.body)
      .then(() => {
         res.render('users/sign-up', {
               layout: false, 
               message : "created user successfully"});
      })
      .catch((error) => 
           res.redirect('back')    
      )

   }

}

module.exports = new UserController();
