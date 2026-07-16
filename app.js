require('dotenv').config();
const Mongoose = require('mongoose');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const helmet = require('helmet');
const csurf = require('@dr.pogodin/csurf');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const rootDir = require('./util/rootpath');
const router = require('./routes');

// const SessionConnection = connectMongoDBSession(session);
// const sessionCollection = new SessionConnection({uri: process.env.MONGODB_URI, collection: 'sessions'});

const csrfProtection = csurf({sameSite: 'lax'});

const app = express();

app.use(helmet());


// app.use(bodyParser.urlencoded({extended: false}));  // Maybe will be used by login form submission?
app.use(bodyParser.json());

const sessionStore = MongoStore.create({mongoUrl: process.env.MONGODB_URI, collectionName: 'sessions'});

app.set('trust proxy', 1);

app.use(session({
   secret: process.env.SESSION_SECRET,
   resave: false,
   saveUninitialized: false,
   rolling: true,
   store: sessionStore,
   cookie: {
      // path: '/',
      httpOnly: true,
      maxAge: 216000000,  // = 60 hours = 2,5 days
      secure: true,           // DONT FORGET TO ACTIVATE THIS!!!!!!!!!!!!!!!!!!!!!!!!!
      sameSite: 'none'
      // secure: false,           // FOR DEV ONLY!
      // sameSite: 'lax'
   }
}));


app.use(express.static(path.join(rootDir, 'public')));
   

// app.options('*', (req, res) => { res.sendStatus(204); });  // needed when using custom headers!

app.use((req, res, next) => {
   res.set('Access-Control-Allow-Origin', '*');
   res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   next();
});


app.use((req, res, next) => {
   if (req.path !== '/signin' && req.path !== '/signup' && req.path !== '/PWresetMail' && req.path !== '/PWreset') {
      return csrfProtection(req, res, next);
   }
   next();
});


app.use(router);

app.use((req, res) => {
   res.status(404).sendFile(path.join(rootDir, '404.html'), (err) => console.log(err));
});

const connectMongoose = async (app) => {
   await Mongoose.connect(process.env.MONGODB_URI);
   app.listen(process.env.PORT);
}

connectMongoose(app);