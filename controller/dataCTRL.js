const Data = require('../model/Data');

exports.getUserData = async (req, res) => {
   const userData = await Data.getData(req.session.userId);
   if (userData) {
      const preparedUserData = await Data.prepareData(userData);  // It is separated like this, because BAG only uses getData(), too
      res.json(preparedUserData);  // Im Backend wird es automatisch via json() zu json ( = Nicht wie im Frontend!)
   } else {
      res.status(500).send('Failed to fetch userdata!');
   }
}