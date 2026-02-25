const express = require('express');
const Mongoose = require('mongoose');
const { body, checkExact } = require('express-validator');
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

const whiteListChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890äöüÄÖÜß ?!,.-/()';


router.get(['/legal', '/privacy', '/terms', '/workspace', '/chart', '/login'], GenPages.getPage);

router.get('/', GenPages.getRootPage);   // 'get' (& all method-named) look for exact route name - only 'use' for match of beginning!

router.post('/signup',
               body('email', 'Invalid Email!').trim().isEmail().normalizeEmail().escape(),
               body('password', 'The entered password is too weak!').trim().isStrongPassword({minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}).escape(),
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
               body('path', 'invalid Path!').trim().isLength({min: 2, max: 256}).isWhitelisted(whiteListChars).custom(CusVal.checkPath).withMessage("destination path doesn't exist in DB!"),
               body('name', 'invalid Box name length!').trim().isLength({min: 3, max: 25}).isWhitelisted(whiteListChars).withMessage('bag name has invalid chars!').escape(),
               body('name', 'bag name collision: bag already exists @ destination!').custom(CusVal.checkBagNameUniqueness),
               // check, if no name duplicate in path exists!
               checkExact(),
               BagCTRL.postCreateBag
            );

router.post('/createFlow',
               body('path', 'invalid Path!').trim().isLength({min: 2, max: 256}).isWhitelisted(whiteListChars).custom(CusVal.checkPath),
               body('flowId').trim().isInt({gt: -1, lt: 1000000}).withMessage('invalid tansaction ID!'),
               body('date').trim().isDate().withMessage('invalid transaction date!'),
               body('desc', 'invalid chars in flow desc!').trim().isWhitelisted(whiteListChars).isLength({min: 3, max: 50}).withMessage('invalid length of flow desc'),
               body('amount').trim().isDecimal({force_decimal: true, decimal_digits: 2}).withMessage('invalid transaction amount!'),
               body('currency').trim().equals('EUR').withMessage('invalid transaction currency!'),
               checkExact(),
               FlowCTRL.postCreateFlow
)


router.post('/changeFlowAmount',
               body('path', 'invalid Path!').trim().isLength({min: 2, max: 256}).isWhitelisted(whiteListChars).custom(CusVal.checkPath),
               body('flowId').trim().isInt({gt: -1, lt: 1000000}).withMessage('invalid tansaction ID!'),
               body('amount').trim().isDecimal({force_decimal: true, decimal_digits: 2}).withMessage('invalid transaction amount!'),
               checkExact(),
               FlowCTRL.postChangeAmount
)


router.post('/changeFlowDesc',
               body('path', 'invalid Path!').trim().isLength({min: 2, max: 256}).isWhitelisted(whiteListChars).custom(CusVal.checkPath),
               body('flowId').trim().isInt({gt: -1, lt: 1000000}).withMessage('invalid tansaction ID!'),
               body('desc', 'invalid chars in flow desc!').trim().isWhitelisted(whiteListChars).isLength({min: 3, max: 50}).withMessage('invalid length of flow desc'),
               checkExact(),
               FlowCTRL.postChangeDesc
)


router.post('/changeFlowDate',
               body('path', 'invalid Path!').trim().isLength({min: 2, max: 256}).isWhitelisted(whiteListChars).custom(CusVal.checkPath),
               body('flowId').trim().isInt({gt: -1, lt: 1000000}).withMessage('invalid tansaction ID!'),
               body('isoDate').trim().isDate().withMessage('invalid transaction date!'),
               checkExact(),
               FlowCTRL.postChangeDate
)


router.post('/deleteFlow',
               body('path', 'invalid Path!').trim().isLength({min: 2, max: 256}).isWhitelisted(whiteListChars).custom(CusVal.checkPath),
               body('flowId').trim().isInt({gt: -1, lt: 1000000}).withMessage('invalid tansaction ID!'),
               checkExact(),
               FlowCTRL.postDeleteFlow
)


router.post('/moveFlow',
               body('originPath', 'invalid Path!').trim().isLength({min: 2, max: 256}).isWhitelisted(whiteListChars).custom(CusVal.checkPath),
               body('flowId').trim().isInt({gt: -1, lt: 1000000}).withMessage('invalid tansaction ID!'),
               body('targetPath', 'invalid Path!').trim().isLength({min: 2, max: 256}).isWhitelisted(whiteListChars).custom(CusVal.checkPath),
               checkExact(),
               FlowCTRL.postMoveFlow
)




module.exports = router;