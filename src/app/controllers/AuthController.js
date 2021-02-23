const User = require('../models/Users');
const Course = require('../models/Courses');
const md5 = require('md5');
const { setCurrentUser, resetUser } = require('../../helpers/handlebars');
const { renderSync } = require('node-sass');

class AuthController {
   // [GET]: 
   
   login(req, res, next) {       
      if (!req.signedCookies.userId){
         res.render('users/login', {layout: false});
      }
      else
         res.redirect('/courses')
   }
   
   //post auth/sing_in
   postLogin(req, res, next) {
      User.findOne({username : req.body.username})
      .then((data) => {
         
         if (data.password != md5(req.body.password)) {
            //resetUser(res);
            res.render('users/login', {
               layout:false,
               error: "Password is wrong"})
         } else 
         {
            setCurrentUser(res, data) 
            res.redirect('/courses/list')
         }
      })
      .catch((err) => {
         resetUser(res);
         res.render('users/login', { 
            layout:false,
            error: "User is not exists" });
      });    
   }

   //[GET] /auth/sign_out
   logout(req, res, next) {     
      resetUser(res);
      res.render('users/login', {layout: false});
   }


   getSignUp(req, res, next) {
      res.render('users/sign-up', {layout: false});
   }
   
   postSignUp(req, res, next) {
      res.render('users/sign-up', {
            layout: false, 
            message : "created user successfully"});
   }
}

module.exports = new AuthController();
