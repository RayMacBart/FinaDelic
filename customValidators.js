const UserCol = require('./model/schemas').Users;

class CustomValidator {

   static async checkPath(path, { req }) {

      const userPopDoc = await UserCol.findById(req.session.userId).populate('data');
      const dataDoc = userPopDoc.data;
      const pathList = path.split('/');
      const dir = pathList.shift();
      if (dir === 'IN' || dir === 'OUT') {
         const dataPopDirDoc = await dataDoc.populate(dir);
         let currentBagDoc = dataPopDirDoc[dir];
         for (const pathNode of pathList) {  // first item was already removed above via 'shift()'
            if (currentBagDoc.nestedBags) {
               await currentBagDoc.populate('nestedBags.bag');
               currentBagDoc = currentBagDoc.nestedBags.find(item => item.name === pathNode).bag;
               if (!currentBagDoc) {
                  throw new Error('Bag path not found in DB!');
               }
            } else {
               throw new Error('Bag path not found in DB!');
            }
         }
         return true;
      } else {
         throw new Error('Received invalid Path!');
      }
   }
}

module.exports = CustomValidator;