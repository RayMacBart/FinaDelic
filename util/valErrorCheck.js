const { validationResult } = require('express-validator');

const sendValError = async (res, msg) => {
   res.status(422).send(msg);
}


const checkAndHandleValError = (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      console.log('error:', errors.array()[0]);
      sendValError(res, errors.array()[0]);
      return true;
   } else {
      return false;
   }
};

module.exports = checkAndHandleValError;