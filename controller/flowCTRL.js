const checkAndHandleValError = require('../util/valErrorCheck');
const FLOW = require('../model/Flow');
const BAG = require('../model/Bag');


exports.postCreateFlow = async (req, res) => {
   if (checkAndHandleValError(req, res)) { // the function will also run!
      return;
   }
   const bagDoc = await BAG.getBagDocFromPath(req.session.userId, req.body.path);
   if (typeof bagDoc === 'string') {
      return res.status(404).json({ error: `The bag ${bagDoc} doesn't exist in the DB!`});
   }
   await FLOW.createFlow(bagDoc, req.body, req.session.userId);
   res.status(201).send();
}


exports.postChangeAmount = async (req, res) => {
   if (checkAndHandleValError(req, res)) { // the function will also run!
      return;
   }
   const bagDoc = await BAG.getBagDocFromPath(req.session.userId, req.body.path);
   if (typeof bagDoc === 'string') {
      return res.status(404).json({ error: `The bag ${bagDoc} doesn't exist in the DB!`});
   }
   await FLOW.changeAmount(bagDoc, req.session.userId, req.body);
   res.status(201).send();
}


exports.postChangeDesc = async (req, res) => {
   if (checkAndHandleValError(req, res)) { // the function will also run!
      return;
   }
   const bagDoc = await BAG.getBagDocFromPath(req.session.userId, req.body.path);
   if (typeof bagDoc === 'string') {
      return res.status(404).json({ error: `The bag ${bagDoc} doesn't exist in the DB!`});
   }
   await FLOW.changeDesc(bagDoc, req.session.userId, req.body);
   res.status(201).send();
}


exports.postChangeDate = async (req, res) => {
   if (checkAndHandleValError(req, res)) {
      return;
   }
   const bagDoc = await BAG.getBagDocFromPath(req.session.userId, req.body.path);
   if (typeof bagDoc === 'string') {
      return res.status(404).json({ error: `The bag ${bagDoc} doesn't exist in the DB!`});
   }
   await FLOW.changeDate(bagDoc, req.session.userId, req.body);
   res.status(201).send();
}


exports.postDeleteFlow = async (req, res) => {
   if (checkAndHandleValError(req, res)) {
      return;
   }
   const bagDoc = await BAG.getBagDocFromPath(req.session.userId, req.body.path);
   if (typeof bagDoc === 'string') {
      return res.status(404).json({ error: `The bag ${bagDoc} doesn't exist in the DB!`});
   }
   await FLOW.deleteFlow(bagDoc, req.body.flowId);
   res.status(201).send();
}


exports.postMoveFlow = async (req, res) => {
   if (checkAndHandleValError(req, res)) {
      return;
   }
   const originBagDoc = await BAG.getBagDocFromPath(req.session.userId, req.body.originPath);
   const targetBagDoc = await BAG.getBagDocFromPath(req.session.userId, req.body.targetPath);
   if (typeof originBagDoc === 'string' || typeof targetBagDoc === 'string') {
      return res.status(404).json({ error: `The bag ${bagDoc} doesn't exist in the DB!`});
   }
   await FLOW.moveFlow(originBagDoc, targetBagDoc, req.body.flowId);
   res.status(201).send();
}