const Data = require('../model/Data');

exports.getUserData = async (req, res) => {
   const userData = await Data.getData(req.session.userId);
   const preparedUserData = await Data.prepareData(userData);  // It is separated like this, because BAG only uses getData(), too
   // console.log('preparedUserData:', JSON.stringify(preparedUserData, null, 3));
   if (userData) {
      res.json(preparedUserData);  // Im Backend wird es automatisch via json() zu json ( = Nicht wie im Frontend!)
   } else {
      res.status(500).send('Failed to fetch userdata!');
   }
}