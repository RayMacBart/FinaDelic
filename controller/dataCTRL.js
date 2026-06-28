const Data = require('../model/Data');
const User = require('../model/User');
const userCol = require('../model/schemas').Users;
const { validationResult } = require('express-validator');
const cry = require('../crypt');


exports.getUserData = async (req, res) => {
   const userData = await Data.getData(req.session.userId);
   if (userData) {
      const preparedUserData = await Data.prepareData(userData, req.session.userId);  // It is separated like this, because BAG only uses getData(), too
      res.json(preparedUserData);  // Im Backend wird es automatisch via json() zu json ( = Nicht wie im Frontend!)
   } else {
      res.status(500).send('Failed to fetch userdata!');
   }
}


exports.deleteAccount = async (req, res) => {
   const confirmation = await User.delete(req.session.userId);
   if (confirmation) {
      req.session.destroy(error => {
         if (error) {
            console.log('FOLLOWING ERROR DURING SESSION ELIMINATION OCCURRED:\n', error);
            return res.status(503).send('Failed to finish Session:', error);
            }
      });
      return res.status(200).send('account deletion successful');
   } else {
      res.status(503).send('Failed to delete useraccount!');
   }
}


exports.postDeriveKey = async (req, res) => {
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const userDoc = await userCol.findById(req.session.userId).select('_id pwhash');
    const keyBuffer = await cry.deriveKey(userDoc.pwhash, req.body.saltBase64);
    const keyBase64 = keyBuffer.toString('base64');
    res.json({keyBase64: keyBase64});
}