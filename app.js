const path = require('path');
const rootDir = require('./util/rootpath');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');

const app = express();

// app.use(bodyParser.urlencoded({extended: false}));  // Maybe will be used by login form submission?
app.use(bodyParser.json());

app.use(express.static(path.join(rootDir, 'public')));


// app.options('*', (req, res) => { res.sendStatus(204); });  // needed when using custom headers!

app.use((req, res, next) => {
   res.set('Access-Control-Allow-Origin', '*');
   res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   next();
});

app.use(router);

app.use((req, res) => {
   res.status(404).send(`<body><br><h1>404</h1><br><br><h2>SORRY,<br> BUT THE PAGE<br><br>${req.path.toUpperCase()}<br><br>CAN'T BE FOUND!</h2></body>`, (err) => console.log(err));
});

app.listen(3000);