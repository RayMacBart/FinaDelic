const express = require('express');
const Mongoose = require('mongoose');
const { body } = require('express-validator');
const path = require('path');
const rootDir = require('./util/rootpath');
const router = express.Router();
const GenPages = require('./controller/generalPages');
const UserCTRL = require('./controller/userCTRL');
const BagCTRL = require('./controller/bagCTRL');
const FlowCTRL = require('./controller/flowCTRL');


const testSchema = Mongoose.Schema({
   testProp: String
});

const TestModel = Mongoose.model('test', testSchema);


router.get(['/legal', '/privacy', '/terms', '/workspace', '/chart', '/login'], GenPages.getPage);

router.get('/', GenPages.getRootPage);   // 'get' (& all method-named) look for exact route name - only 'use' for match of beginning!

router.post('/signup',     // implement ERROR-MESSAGES!
               body('email').trim().isEmail().normalizeEmail().escape().withMessage('Invalid Email!'),
               body('password').trim().isStrongPassword({minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}).escape().withMessage('Validation Error: The entered password is too weak!'),
               body('repeat').trim(),
               UserCTRL.signUp);

router.post('/signin',
               body('email').trim().isEmail().normalizeEmail().escape().withMessage('Invalid Email!'),
               body('password').trim().isStrongPassword({minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}).escape().withMessage('Invalid Password: Too weak!'),
               UserCTRL.signIn);

router.get('/logout', UserCTRL.logout);

router.post('/createBag', BagCTRL.postCreateBag);




module.exports = router;