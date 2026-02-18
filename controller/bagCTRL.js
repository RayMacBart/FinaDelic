const checkAndHandleValError = require('../util/valErrorCheck');
const BAG = require('../model/Bag');

exports.postCreateBag = async (req, res) => {
   if (checkAndHandleValError(req, res)) { // the function will also run!
      return;
   }
   const bagDoc = await BAG.getBagDocFromPath(req.session.userId, req.body.path);
   if (typeof bagDoc === 'string') {
      return res.status(404).json({ error: `The bag ${bagDoc} doesn't exist in the DB!`});
   }
   await BAG.createNestedBag(bagDoc, req.body.name);
   res.status(201).send();
}