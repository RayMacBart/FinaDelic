const express = require('express');
const Mongoose = require('mongoose');
const { body, checkExact, validationResult } = require('express-validator');
const path = require('path');
const rootDir = require('./util/rootpath');
const router = express.Router();
const GenPages = require('./controller/generalPages');
const UserCTRL = require('./controller/userCTRL');
const BagCTRL = require('./controller/bagCTRL');
const FlowCTRL = require('./controller/flowCTRL');
const DataCTRL = require('./controller/dataCTRL');
const TimeCTRL = require('./controller/timeCTRL');
const ChartCTRL = require('./controller/chartCTRL');
const MailCTRL = require('./controller/mailCTRL');
const CusVal = require('./customValidators');

const whiteListChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890äöüÄÖÜß ?!,.-/()';


router.get(['/legal', '/privacy', '/terms', '/workspace', '/chart', '/login', '/profile', '/PWresetPage', '/confirmation'], GenPages.getPage);

router.get('/', GenPages.getRootPage);   // 'get' (& all method-named) look for exact route name - only 'use' for match of beginning!

router.post('/signup',
   body('email', 'Invalid Email!').trim().isEmail().normalizeEmail(),
   body('password', 'The entered password is too weak!').trim().isStrongPassword({minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}).escape(),
   body('repeat').trim(),
   (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         console.log("Validation failed:", errors.array());
         return res.status(400).json({ errors: errors.array() });
      }
      next();
   },
   UserCTRL.postSignUp);

router.post('/signin',
               body('email').trim().isEmail().normalizeEmail().withMessage('Invalid Email!'),
               body('password').trim().isStrongPassword({minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}).escape().withMessage('Invalid Password: Too weak!'),
               UserCTRL.postSignIn);

router.get('/logout', UserCTRL.getLogout);

router.get('/userdata', DataCTRL.getUserData);

router.delete('/userdata', DataCTRL.deleteAccount);

router.get('/time', TimeCTRL.getTime);

router.post('/time',
               body('start').trim().isDate().withMessage('invalid date input!'),
               body('end').trim().isDate().withMessage('invalid date input!').custom(CusVal.checkTimeSpan).withMessage('Invalid time input: end date is lower than start date!'),
               checkExact(),
               TimeCTRL.setTime
);

router.get('/chartPaths', ChartCTRL.getChartPaths);

router.post('/chartPath',
               body('path', 'invalid Path!').trim().isLength({min: 2, max: 256}).isWhitelisted(whiteListChars).custom(CusVal.checkPath).withMessage("destination path doesn't exist in DB!"),
               checkExact(),
               ChartCTRL.postChartPath
)

router.delete('/chartPath',
               body('path', 'invalid Path!').trim().isLength({min: 2, max: 256}).isWhitelisted(whiteListChars).custom(CusVal.checkPath).withMessage("destination path doesn't exist in DB!"),
               checkExact(),
               ChartCTRL.delChartPath
)

router.post('/createBag',
               body('path', 'invalid Path!').trim().isLength({min: 2, max: 256}).isWhitelisted(whiteListChars).custom(CusVal.checkPath).withMessage("destination path doesn't exist in DB!"),
               body('name', 'invalid Box name length!').trim().isLength({min: 3, max: 25}).isWhitelisted(whiteListChars).withMessage('bag name has invalid chars!').escape(),
               // body('name', 'bag name collision: bag already exists @ destination!').custom(CusVal.checkBagNameUniqueness),
               // this was taken out due to inefficiency (see @ customValidators.js)
               checkExact(),
               BagCTRL.postCreateBag
            );


router.post('/renameBag',
               body('path', 'invalid Path!').trim().isLength({min: 2, max: 256}).isWhitelisted(whiteListChars).custom(CusVal.checkPath).withMessage("destination path doesn't exist in DB!"),
               body('newName', 'invalid Box name length!').trim().isLength({min: 3, max: 25}).isWhitelisted(whiteListChars).withMessage('bag name has invalid chars!').escape(),
               checkExact(),
               BagCTRL.postRenameBag
);


router.post('/eraseBag',
               body('path', 'invalid Path!').trim().isLength({min: 2, max: 256}).isWhitelisted(whiteListChars).custom(CusVal.checkPath).withMessage("destination path doesn't exist in DB!"),
               checkExact(),
               BagCTRL.postEraseBag
);


router.post('/disbandBag',
               body('path', 'invalid Path!').trim().isLength({min: 2, max: 256}).isWhitelisted(whiteListChars).custom(CusVal.checkPath).withMessage("destination path doesn't exist in DB!"),
               checkExact(),
               BagCTRL.postDisbandBag
);


router.post('/moveBag',
               body('fromPath', 'invalid move FROM Path!').trim().isLength({min: 2, max: 256}).isWhitelisted(whiteListChars).custom(CusVal.checkPath).withMessage("destination path doesn't exist in DB!"),
               body('toPath', 'invalid move TO Path!').trim().isLength({min: 2, max: 256}).isWhitelisted(whiteListChars).custom(CusVal.checkPath).withMessage("destination path doesn't exist in DB!"),
               checkExact(),
               BagCTRL.postMoveBag
);


router.post('/createFlow',
               body('path', 'invalid Path!').trim().isLength({min: 2, max: 256}).isWhitelisted(whiteListChars).custom(CusVal.checkPath).withMessage("destination path doesn't exist in DB!"),
               body('flowId').trim().isInt({gt: -1, lt: 1000000}).withMessage('invalid tansaction ID!'),
               body('date').trim().isDate().withMessage('invalid transaction date!'),
               body('desc', 'invalid chars in flow desc!').trim().isWhitelisted(whiteListChars).isLength({min: 3, max: 50}).withMessage('invalid length of flow desc'),
               body('amount').trim().isDecimal({force_decimal: true, decimal_digits: 2}).withMessage('invalid transaction amount!'),
               body('currency').trim().equals('EUR').withMessage('invalid transaction currency!'),
               checkExact(),
               FlowCTRL.postCreateFlow
);


router.post('/changeFlowAmount',
               body('path', 'invalid Path!').trim().isLength({min: 2, max: 256}).isWhitelisted(whiteListChars).custom(CusVal.checkPath).withMessage("destination path doesn't exist in DB!"),
               body('flowId').trim().isInt({gt: -1, lt: 1000000}).withMessage('invalid tansaction ID!'),
               body('amount').trim().isDecimal({force_decimal: true, decimal_digits: 2}).withMessage('invalid transaction amount!'),
               checkExact(),
               FlowCTRL.postChangeAmount
);


router.post('/changeFlowDesc',
               body('path', 'invalid Path!').trim().isLength({min: 2, max: 256}).isWhitelisted(whiteListChars).custom(CusVal.checkPath).withMessage("destination path doesn't exist in DB!"),
               body('flowId').trim().isInt({gt: -1, lt: 1000000}).withMessage('invalid tansaction ID!'),
               body('desc', 'invalid chars in flow desc!').trim().isWhitelisted(whiteListChars).isLength({min: 3, max: 50}).withMessage('invalid length of flow desc'),
               checkExact(),
               FlowCTRL.postChangeDesc
);


router.post('/changeFlowDate',
               body('path', 'invalid Path!').trim().isLength({min: 2, max: 256}).isWhitelisted(whiteListChars).custom(CusVal.checkPath).withMessage("destination path doesn't exist in DB!"),
               body('flowId').trim().isInt({gt: -1, lt: 1000000}).withMessage('invalid tansaction ID!'),
               body('isoDate').trim().isDate().withMessage('invalid transaction date!'),
               checkExact(),
               FlowCTRL.postChangeDate
);


router.post('/deleteFlow',
               body('path', 'invalid Path!').trim().isLength({min: 2, max: 256}).isWhitelisted(whiteListChars).custom(CusVal.checkPath).withMessage("destination path doesn't exist in DB!"),
               body('flowId').trim().isInt({gt: -1, lt: 1000000}).withMessage('invalid tansaction ID!'),
               checkExact(),
               FlowCTRL.postDeleteFlow
);


router.post('/moveFlow',
               body('originPath', 'invalid Path!').trim().isLength({min: 2, max: 256}).isWhitelisted(whiteListChars).custom(CusVal.checkPath).withMessage("destination path doesn't exist in DB!"),
               body('flowId').trim().isInt({gt: -1, lt: 1000000}).withMessage('invalid tansaction ID!'),
               body('targetPath', 'invalid Path!').trim().isLength({min: 2, max: 256}).isWhitelisted(whiteListChars).custom(CusVal.checkPath).withMessage("destination path doesn't exist in DB!"),
               checkExact(),
               FlowCTRL.postMoveFlow
);

router.post('/PWresetMail',
               body('email').trim().isEmail().normalizeEmail().withMessage('Invalid Email!'),
               MailCTRL.postPWresetMail
);

router.post('/PWreset',
               body('email', 'Invalid Email!').trim().isEmail().normalizeEmail(),
               body('password', 'The entered password is too weak!').trim().isStrongPassword({minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}).escape(),
               body('repeat').trim(),
               MailCTRL.postPWreset
)




module.exports = router;