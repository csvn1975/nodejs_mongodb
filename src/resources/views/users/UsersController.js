const User = require('../models/Users');
var path = require('path');

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
      console.log(fileData);
      var ext = path.extname(fileData.originalname);
      req.filename = req.filename + ext;
      req.body.avatar = fileData.filename;
      req.body.dest = fileData.destination;
      

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
