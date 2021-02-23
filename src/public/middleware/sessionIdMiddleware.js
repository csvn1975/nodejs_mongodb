// sessionidMiddleware
// call in index.js, dann gilt für alle router

const shortId = require('shortid');
module.exports = function cookieSessionid(req, res, next){
    if (!req.signedCookies.Sessionid)
        res.cookie("Sessionid", 
                shortId.generate(), 
                {signed: true});
    next();

} 