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
const DataCTRL = require('./controller/dataCTRL');
const TimeCTRL = require('./controller/timeCTRL');
const CusVal = require('./customValidators');


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
               UserCTRL.postSignUp);

router.post('/signin',
               body('email').trim().isEmail().normalizeEmail().escape().withMessage('Invalid Email!'),
               body('password').trim().isStrongPassword({minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}).escape().withMessage('Invalid Password: Too weak!'),
               UserCTRL.postSignIn);

router.get('/logout', UserCTRL.getLogout);

router.get('/userdata', DataCTRL.getUserData);

router.get('/time', TimeCTRL.getTime);

router.post('/createBag',
               // body().isJSON().withMessage('Invalid JSON!'),
               // body('name').trim().custom(nameValue => CusVal.checkText(nameValue)).escape().withMessage('Failed Bag (=IN/OUT-Box) - Name Validation'),
               body('name').trim().isLength({min: 3, max: 25}).isWhitelisted('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890äöüÄÖÜß ?!,.-/()').escape().withMessage('invalid Box name!'),
               BagCTRL.postCreateBag);   // advanced idea: check path against paths actually stored in the DB if it exists there.




module.exports = router;