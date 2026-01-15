const path = require('path');
const rootDir = require('./path_util')
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

// app.use(bodyParser.urlencoded({extended: false}));  // Maybe will be used by login form submission?
app.use(bodyParser.json());

app.use(express.static(path.join(rootDir, 'dist')));

// app.options('*', (req, res) => { res.sendStatus(204); });  // needed when using custom headers!

app.use((req, res, next) => {
   res.set('Access-Control-Allow-Origin', '*');
   res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   next();
});

app.use(routes);


app.listen(3000);