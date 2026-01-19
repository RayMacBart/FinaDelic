const path = require('path');
const rootDir = require('./path_util');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');

const app = express();

// app.use(bodyParser.urlencoded({extended: false}));  // Maybe will be used by login form submission?
app.use(bodyParser.json());

// app.use(['/', '/in'], express.static(path.join(rootDir, 'dist_in')));
// app.use('/out', express.static(path.join(rootDir, 'dist_out')), (req, res) => console.log('in OUT static midware'));
app.use(express.static(path.join(rootDir, 'public')));
// app.use(express.static(path.join(rootDir, 'public')));
// app.use('/in', express.static(path.join(rootDir, 'dist_in')), (req, res) => console.log('in IN static midware'));
// app.use('/in', express.static(path.join(rootDir, 'dist_in')));
// app.use('/', express.static(path.join(rootDir, 'dist_in')));


// app.options('*', (req, res) => { res.sendStatus(204); });  // needed when using custom headers!

app.use((req, res, next) => {
   res.set('Access-Control-Allow-Origin', '*');
   res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   next();
});

app.use(router);


app.listen(3000);
