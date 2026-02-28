const bagCol = require('./schemas').Bags;
const dataCol = require('./schemas').Datas;
const Data = require('./Data');
// const Flow = require('./Flow');

class Bag {

   async getBagDocFromPath(userId, path) {
      const pathArray = (path).split('/');
      const dataDoc = await Data.getData(userId);
      const popDataDoc = await dataDoc.populate(pathArray[0]);
      let bagDoc = popDataDoc[pathArray[0]];
      const cutPathArray = pathArray.slice(1);
      for (const bag of cutPathArray) {
         await bagDoc.populate('nestedBags.bag');
         const bagItem = bagDoc.nestedBags.find(b => b.name === bag);
         if (!bagItem) {
            return bag;
         }
         bagDoc = bagItem.bag;
      }
      return bagDoc;
   }

   async createBag() {
      return await bagCol.create({nestedBags: [], transactions: []});
             // This ^^ is the Mongoose method for commented out code below!
      /*
      const newBagDoc = new bagCol({nestedBags: [], transactions: []});
      await newBagDoc.save();
      return newBagDoc;
      */
   }


   async createNestedBag(bagDoc, name) {
      if (bagDoc.nestedBags.find(bagWrap => bagWrap.name.toUpperCase() == name.toUpperCase())) {
         return false;
      }
      const newBagDoc = await this.createBag();
      bagDoc.nestedBags.push({name, bag: newBagDoc._id});
      await bagDoc.save();
      return true;
   }


   async renameBag(parentBagDoc, oldName, newName) {
      if (parentBagDoc.nestedBags.find(bagWrap => bagWrap.name.toUpperCase() == newName.toUpperCase())) {
         return true;
      }
      const bagWrap = parentBagDoc.nestedBags.find(bagWrap => bagWrap.name === oldName);
      bagWrap.name = newName;
      await parentBagDoc.save();
      return false;
   }


   async disbandBag(parentBagDoc, oldBagName) {
      const parentBagPopDoc = await parentBagDoc.populate('nestedBags.bag');
      const oldBagWrap = parentBagPopDoc.nestedBags.find(bagWrap => bagWrap.name === oldBagName);
      const oldBagDoc = oldBagWrap.bag;
      const parentNestedBagsSet = new Set(parentBagDoc.nestedBags.map(bagItem => bagItem.name)); // This leads to O(n*2) instead of O(n^2) by 2 Loops,
      if (oldBagDoc.nestedBags.some(oldBagItem => parentNestedBagsSet.has(oldBagItem.name))) {   // Because Set Creation = O(n) and Array.some() = O(n),
         return true;                                                                            // BUT: Set.has() = O(1)  --> Set is a Hash Data Structure which
      }                                                                                          // have O(1) read access (other than array value-based lookups!)
      const cleanedNestedBags = parentBagDoc.nestedBags.filter(bagWrap => bagWrap.name !== oldBagName);
      parentBagDoc.nestedBags = [...cleanedNestedBags, ...oldBagDoc.nestedBags];
      parentBagDoc.transactions = [...parentBagDoc.transactions, ...oldBagDoc.transactions];
      await bagCol.findByIdAndDelete(oldBagDoc._id);
      await parentBagDoc.save();
      return false;
   }


   async moveBag(parentBagDoc, destBagDoc, bagName) {
      const parentBagPopDoc = await parentBagDoc.populate('nestedBags.bag');
      const bagWrap = parentBagPopDoc.nestedBags.find(bagWrap => bagWrap.name === bagName);
      const bagDoc = bagWrap.bag;
      const nestedBagsSet = new Set(bagDoc.nestedBags.map(bagItem => bagItem.name));       // This leads to O(n*2) instead of O(n^2) by 2 Loops,
      if (destBagDoc.nestedBags.some(bagItem => nestedBagsSet.has(bagItem.name))) {        // Because Set Creation = O(n) and Array.some() = O(n),
         return true;                                                                      // BUT: Set.has() = O(1)  --> Set is a Hash Data Structure which
      }                                                                                    // have O(1) read access (other than array value-based lookups!)
      destBagDoc.nestedBags.push({name: bagName, bag: bagDoc._id});
      parentBagDoc.nestedBags = parentBagDoc.nestedBags.filter(bagWrap => bagWrap.name !== bagName);
      await destBagDoc.save();
      await parentBagDoc.save();
      return false;
   }
}

const BAG = new Bag();

module.exports = BAG;