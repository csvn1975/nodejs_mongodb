//const apiRoutes = require('../app/api/routes/api');

const newRoutes = require('./news');
const siteRoutes = require('./site');
const courseRoutes = require('./courses');
const authRoutes = require('./auth');
const userRoutes = require('./users');
const componentRoutes = require('./components');

//middleware
const sessionIdMiddlewate = require('../public/middleware/sessionIdMiddleware');
const userMiddleware = require('../public/middleware/currentUserMiddleware');

function route(app) {
    /**
     * hier muss app.use aufgerufen werden.
     * '/news' ist hosting
     * '/photos'
     */
    //
    
    // call middleware
    app.use(sessionIdMiddlewate); // create sessionId
    app.use(userMiddleware); // set value to res.locals.currentUser 

    app.use('/', courseRoutes);

    app.use('/news', newRoutes);
    
    app.use('/courses', courseRoutes);

    app.use('/auth', authRoutes);
    app.use('/users', userRoutes);
    
    app.use('/components', componentRoutes);

    // API Restfull API 
    //app.use('/api', apiRoutes);
    //app.use('/', siteRoutes);

    app.get('/admin', function(req, res) {
        res.render('admin/login');
    });

}

module.exports = route ;
