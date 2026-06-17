const checkAndHandleValError = require('../util/valErrorCheck');
const cry = require('../crypt');
const Data = require('../model/Data');


exports.getChartPaths = async (req, res) => {
   const userId = req.session.userId;
   const dataDoc = await Data.getData(userId);
   const decryPaths = await Promise.all(dataDoc.chartPaths.map(encryPath => cry.decrypt(encryPath, userId)));
   res.json(decryPaths);
}


exports.postChartPath = async (req, res) => {
   if (checkAndHandleValError(req, res)) {
      return;
   }
   const path = req.body.path;
   const userId = req.session.userId;
   const dataDoc = await Data.getData(userId);
   for (const encryPath of dataDoc.chartPaths) {
      const decryPath = await cry.decrypt(encryPath, userId);
      if (decryPath === path) {
         return res.status(409).json({ error: `The path ${path} already exists in the DB!`});
      }
   }
   const encryPath = await cry.encrypt(path, userId);
   dataDoc.chartPaths.push(encryPath);
   await dataDoc.save();
   res.status(201).send();
}


exports.delChartPath = async (req, res) => {
   if (checkAndHandleValError(req, res)) {
      return;
   }
   const path = req.body.path;
   const userId = req.session.userId;
   const dataDoc = await Data.getData(userId);
   let pathFound = false;
   const otherPaths = [];
   for (const encryPath of dataDoc.chartPaths) {
      const decryPath = await cry.decrypt(encryPath, userId);
      if (decryPath === path) {
         pathFound = true;
      } else {
         otherPaths.push(encryPath);
      }
   }
   if (pathFound) {
      dataDoc.chartPaths = otherPaths;
      dataDoc.save();
      return res.status(201).send();
   }
   res.status(410).json({ error: `The path "${path}" isn't in the DB, hence it can't be deleted!`});
}

