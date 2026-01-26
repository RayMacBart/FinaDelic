const rootDir = require('./util/rootpath');
const path = require('path');
const express = require('express');
const router = express.Router();
const GenPages = require('./controller/generalPages');
const Login = require('./controller/login');

const Mongoose = require('mongoose');

const testSchema = Mongoose.Schema({
   testProp: String
});

const TestModel = Mongoose.model('test', testSchema);



// router.get('/in', (req, res) => {
//    // HERE, IMPLEMENT LOGIN LOGIC
//    destinationPath = path.join(rootDir, 'public', 'index_in.html');
//    res.sendFile(destinationPath, (err) => console.log(err));
//    // res.status(200).redirect(destinationPath);
// });


// router.get('/out', (req, res) => {
//    // HERE, IMPLEMENT LOGOUT LOGIC
//    destinationPath = path.join(rootDir, 'public', 'index_out.html');
//    res.sendFile(destinationPath, (err) => console.log(err));
//    // res.status(200).redirect(destinationPath);
// });


router.get(['/legal', '/privacy', '/terms', '/workspace', '/chart', '/login'], GenPages.getPage);

// router.get('/DBtest', async (req, res) => {
//    const newDoc = new TestModel({ testProp: 'testValue2' });
//    await newDoc.save();
//    console.log('should have saved test in DB!');
//    res.send('saved!');
// });

router.get('/', GenPages.getRootPage);

router.post('/signup', Login.signUp);

router.post('/signin', Login.signIn);



// router.get(['/', '/login', '/workspace', '/charts', '/legal', '/privacy', '/terms'], (req, res) => {


module.exports = router;
