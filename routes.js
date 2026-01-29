const express = require('express');
const Mongoose = require('mongoose');
const { body } = require('express-validator');
const path = require('path');
const rootDir = require('./util/rootpath');
const router = express.Router();
const GenPages = require('./controller/generalPages');
const User = require('./model/User');


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

router.post('/signup',     // implement ERROR-MESSAGES!
               body('email').trim().isEmail().normalizeEmail().escape().withMessage('Invalid Email!'),
               body('password').trim().isStrongPassword({minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}).escape().withMessage('Validation Error: The entered password is too weak!'),
               body('repeat').trim(),
               User.signUp);

router.post('/signin',
               body('email').trim().isEmail().normalizeEmail().escape().withMessage('Invalid Email!'),
               body('password').trim().isStrongPassword({minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}).escape().withMessage('Invalid Password: Too weak!'),
               User.signIn);

router.get('/logout', User.logout);



// router.get(['/', '/login', '/workspace', '/charts', '/legal', '/privacy', '/terms'], (req, res) => {


module.exports = router;
