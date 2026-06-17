const Data = require('../model/Data');
const User = require('../model/User');


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