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

   static async checkBagNameUniqueness(newName, { req } ) {
      const userPopDoc = await UserCol.findById(req.session.userId).populate('data');
      const dataDoc = userPopDoc.data;
      const pathList = req.body.path.split('/');
      const dir = pathList.shift();
      const dataPopBag = await dataDoc.populate(dir);
      let choosenBagDoc = dataPopBag[dir];
      for (const bagName of pathList) {  // first item was already removed above via 'shift()'
         const parentPopBagDoc = await choosenBagDoc.populate('nestedBags.bag');
         const wrappingDoc = parentPopBagDoc.nestedBags.find(bagItem => bagItem.name === bagName);
         choosenBagDoc = wrappingDoc.bag;
      }
      const sameNameFound = false;
      for (const nestedBagWrap of choosenBagDoc.nestedBags) {
         if (nestedBagWrap.name === newName) {
            throw new Error(`Bag Name Collision: ${newName} already exists in ${req.body.path}!`);
         }
      }
      return true;
   }
}

module.exports = CustomValidator;