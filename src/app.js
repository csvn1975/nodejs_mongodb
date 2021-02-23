require('dotenv').config(); // .env read and write to process.env
// console.log(process.env);
const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const port = 4201;
// const http = require('https');

const path = require('path');
const morgan = require('morgan');
const routeInit = require('./routes'); // = routes/index.js
const routeAPI = require('./app/api/routes'); // = routes/index.js
const db = require('./config/db');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const requireAuthMiddleware = require('./public/middleware/requireAuthMiddleware')
const sortMiddleware = require('./public/middleware/sortMiddleware');

/** methodoverrid:  POST => DELETE/PUT in form 
 * npm install method-override */

 app.use(methodOverride('_method'));
/** connect to Database mongodb */
db.connect();

//HTTP-logger write
app.use(morgan('combined'));

//static-folder, es könnten mehrere hinzufügen
app.use(express.static(path.join(__dirname, 'public')));

/** cookie signed */
app.use(cookieParser(process.env.SESSION_SECRET));

// req.body empty
app.use(bodyParser.json());  // for parsing applacation/json!!! z.B postmann post
app.use(bodyParser.urlencoded({ extended: true }));


// CUSTOM MIDDLEWARE  mit res.locals
app.use(sortMiddleware);


//set Path for view
app.set('views', path.join(__dirname, '/resources/views'));

// Template engine mit extension hbs ändern
app.engine('hbs', 
    handlebars({ 
        extname: '.hbs',
        //weitere function können wir in der file functions definieren
        helpers: {
            ...require('./helpers/handlebars'), 
            ...require('./helpers/dateFormat'),
        },
        }));

app.set('view engine', 'hbs'); //es gibt noch andere pug(jade), mustache, ejs 
app.use(express.urlencoded({ extended: false })); /**  wenn data leer ist  */

routeInit(app); // routes initialize
routeAPI(app); // routes initialize


app.listen(process.env.PORT || port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
