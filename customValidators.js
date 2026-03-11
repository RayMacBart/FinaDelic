const UserCol = require('./model/schemas').Users;
const cry = require('./crypt');

class CustomValidator {

   static async checkPath(path, { req }) {

      if (path === 'IN' || path === 'OUT') {
         return true;
      } else {
         const userPopDoc = await UserCol.findById(req.session.userId).populate('data');
         const dataDoc = userPopDoc.data;
         const pathList = path.split('/');
         const dir = pathList.shift();
         if (dir === 'IN' || dir === 'OUT') {
            const dataPopDirDoc = await dataDoc.populate(dir);
            let currentBagDoc = dataPopDirDoc[dir];
            let decryNestBagsSet;
            for (const pathNode of pathList) {  // first item was already removed above via 'shift()'
               if (currentBagDoc.nestedBags) {
                  await currentBagDoc.populate('nestedBags.bag');
                  decryNestBagsSet = new Set(await Promise.all(currentBagDoc.nestedBags.map(bagItem => cry.decrypt(bagItem.name, req.session.userId))));
                  currentBagDoc = currentBagDoc.nestedBags.find(bagItem => decryNestBagsSet.has(pathNode));
                  // currentBagDoc = currentBagDoc.nestedBags.find(item => item.name === pathNode).bag;
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


   static async checkTimeSpan(end, { req }) {
      const startObj = new Date(req.body.start);
      const endObj = new Date(end);
      if (endObj < startObj) {
         throw new Error("Error: Can't etablish timespan with enddate lower than startdate!");
      } else {
         return true;
      }
   }


   // FOLLOWING CUSTOM VALIDATION METHOD WOULD WORK, BUT ISN'T AS EFFICIENT AS HANDLING NAME COLLISION WITHIN THE MODEL,
   // WHERE THE TARGETED BAGDOC HAS TO BE TRAVERSED TO FOR OTHER OPERATIONS ANYWAY VIA 'BAG.getBagDocFromPath()' AND IS
   // THEREFORE ALREADY AT HAND.

   // static async checkBagNameUniqueness(newName, { req } ) {
   //    const userPopDoc = await UserCol.findById(req.session.userId).populate('data');
   //    const dataDoc = userPopDoc.data;
   //    const pathList = req.body.path.split('/');
   //    const dir = pathList.shift();
   //    const dataPopBag = await dataDoc.populate(dir);
   //    let choosenBagDoc = dataPopBag[dir];
   //    for (const bagName of pathList) {  // first item was already removed above via 'shift()'
   //       const parentPopBagDoc = await choosenBagDoc.populate('nestedBags.bag');
   //       const wrappingDoc = parentPopBagDoc.nestedBags.find(bagItem => bagItem.name === bagName);
   //       choosenBagDoc = wrappingDoc.bag;
   //    }
   //    const sameNameFound = false;
   //    for (const nestedBagWrap of choosenBagDoc.nestedBags) {
   //       if (nestedBagWrap.name.toUpperCase() === newName.toUpperCase()) {
   //          throw new Error(`Bag Name Collision: ${newName} already exists in ${req.body.path}!`);
   //       }
   //    }
   //    return true;
   // }
}

module.exports = CustomValidator;