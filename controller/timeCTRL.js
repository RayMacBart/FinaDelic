const userColl = require('../model/schemas').Users;
const checkAndHandleValError = require('../util/valErrorCheck');

exports.getTime = async (req, res) => {
   if (checkAndHandleValError(req, res)) { // the function will also run!
      return;
   }
   const userDocPopStart = await userColl.findById(req.session.userId).populate('timeconfig.startdate');
   const userDocPopEnd = await userColl.findById(req.session.userId).populate('timeconfig.enddate');
   const startdate = userDocPopStart.timeconfig.startdate;
   const enddate = userDocPopEnd.timeconfig.enddate;
   res.json( {startdate, enddate, rollingEndDate: true} );
}


exports.setTime = async (req, res) => {
   if (checkAndHandleValError(req, res)) {
      return;
   }
   const userDoc = await userColl.findById(req.session.userId);
   const userDocPopStart = await userDoc.populate('timeconfig.startdate');
   const userDocPopEnd = await userDoc.populate('timeconfig.enddate');
   userDocPopStart.timeconfig.startdate = req.body.start;
   userDocPopEnd.timeconfig.enddate = req.body.end;
   await userDoc.save();
   res.status(201).send('set timespan successfully!');
}