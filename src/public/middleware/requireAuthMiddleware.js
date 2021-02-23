const User = require('../../app/models/Users')
const { setCurrentUser, resetUser } = require('../../helpers/handlebars');
module.exports = function (req, res,  next) {     
      
    if (req.signedCookies.userId == undefined){
        resetUser(res);
        res.redirect('/auth');
        return;
    }

    // check valid of user again
    User.find({_id: req.signedCookies.userId})
    .then(data => {
        next()}
    )
    .catch(err => {
    //   resetUser(res);
      res.redirect('/auth', {
          error: "User is not exists"
      });
    })

}