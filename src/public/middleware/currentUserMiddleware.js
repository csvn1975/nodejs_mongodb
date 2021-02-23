module.exports = function currentUserMiddleware (req, res,  next) {
      
  if (!req.signedCookies.userId){
        res.locals.currentUser = {
            login: false,
            username: 'Username',
        }    
    } else
    res.locals.currentUser = {
        login: true,
        username: req.signedCookies.user.username,
    } 
    next() 
}