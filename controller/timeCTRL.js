const userColl = require('../model/schemas').Users;

exports.getTime = async (req, res) => {
   const userDocPopStart = await userColl.findById(req.session.userId).populate('timeconfig.startdate');
   const userDocPopEnd = await userColl.findById(req.session.userId).populate('timeconfig.enddate');
   const startdate = userDocPopStart.timeconfig.startdate;
   const enddate = userDocPopEnd.timeconfig.enddate;
   res.json( {startdate, enddate} );
}