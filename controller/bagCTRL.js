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
   const result = await BAG.createNestedBag(bagDoc, req.body.name);
   if (result) {
      res.status(201).send();
   } else {
      res.status(409).send('Operation aborted due to box name collision!');
   }
}


exports.postRenameBag = async (req, res) => {
   if (checkAndHandleValError(req, res)) { // the function will also run!
      return;
   }
   const pathArray = req.body.path.split('/');
   const oldName = pathArray.pop();
   const parentPath = pathArray.join('/');
   const parentBagDoc = await BAG.getBagDocFromPath(req.session.userId, parentPath);
   if (typeof parentBagDoc === 'string') {
      return res.status(404).json({ error: `The bag ${parentBagDoc} doesn't exist in the DB!`});
   }
   const nameCollisionDetected = await BAG.renameBag(parentBagDoc, oldName, req.body.newName);
   if (nameCollisionDetected) {
      res.status(409).send('Operation aborted due to box name collision!');
   } else {
      res.status(201).send();
   }
}


exports.postDisbandBag = async (req, res) => {
   if (checkAndHandleValError(req, res)) { // the function will also run!
      return;
   }
   const pathArray = req.body.path.split('/');
   const oldBagName = pathArray.pop();
   const parentPath = pathArray.join('/');
   const parentBagDoc = await BAG.getBagDocFromPath(req.session.userId, parentPath);
   if (typeof parentBagDoc === 'string') {
      return res.status(404).json({ error: `The bag ${parentBagDoc} doesn't exist in the DB!`});
   }
   const nameCollisionDetected = await BAG.disbandBag(parentBagDoc, oldBagName);
   if (nameCollisionDetected) {
      res.status(409).send('Operation aborted due to box name collision!');
   } else {
      res.status(201).send();
   }
}


exports.postMoveBag = async (req, res) => {
   if (checkAndHandleValError(req, res)) { // the function will also run!
      return;
   }
   const pathArray = req.body.fromPath.split('/');
   const bagName = pathArray.pop();
   const parentPath = pathArray.join('/');
   const parentBagDoc = await BAG.getBagDocFromPath(req.session.userId, parentPath);
   const destBagDoc = await BAG.getBagDocFromPath(req.session.userId, req.body.toPath);  // dest = destination
   if (typeof parentBagDoc === 'string' || typeof destBagDoc === 'string') {
      return res.status(404).json({ error: `The bag ${parentBagDoc} doesn't exist in the DB!`});
   }
   const nameCollisionDetected = await BAG.moveBag(parentBagDoc, destBagDoc, bagName);
   if (nameCollisionDetected) {
      res.status(409).send('Operation aborted due to box name collision!');
   } else {
      res.status(201).send();
   }
}