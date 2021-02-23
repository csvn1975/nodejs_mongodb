const apiRouter = require('./api');

function routeAPI(app) {
 
    app.use('/api', apiRouter);
}

module.exports = routeAPI ;
