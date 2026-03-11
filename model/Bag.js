const bagCol = require('./schemas').Bags;
const dataCol = require('./schemas').Datas;
const flowCol = require('./schemas').Flows;
const Data = require('./Data');
const cry = require('../crypt');


class Bag {

   async getBagDocFromPath(userId, path) {
      const pathArray = (path).split('/');
      const dataDoc = await Data.getData(userId);
      const popDataDoc = await dataDoc.populate(pathArray[0]);
      let bagDoc = popDataDoc[pathArray[0]];
      const cutPathArray = pathArray.slice(1);
      let bagItem;
      let decryptedName;
      for (const bag of cutPathArray) {
         await bagDoc.populate('nestedBags.bag');
         bagItem = null;
         decryptedName = null;
         for (const nestedBag of bagDoc.nestedBags) {
            decryptedName = await cry.decrypt(nestedBag.name, userId);
            if (decryptedName === bag) {
               bagItem = nestedBag;
               break;
            }
         }
         // const bagItem = bagDoc.nestedBags.find(b => await cry.decrypt(b.name, userId) === bag);
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


   async createNestedBag(bagDoc, name, userId) {
      let decryptedName;
      for (const nestedBag of bagDoc.nestedBags) {   // duplicate name appearance check
         decryptedName = await cry.decrypt(nestedBag.name, userId);
         if (decryptedName.toUpperCase() == name.toUpperCase()) {
            return true;
         }
      }
      // if (bagDoc.nestedBags.find(bagWrap => bagWrap.name.toUpperCase() == name.toUpperCase())) {
      //    return true;
      // }
      const newBagDoc = await this.createBag();
      const encryptedName = await cry.encrypt(name, userId);
      bagDoc.nestedBags.push({name: encryptedName, bag: newBagDoc._id});
      await bagDoc.save();
      return false;
   }


   async renameBag(parentBagDoc, oldName, newName, userId) {
      let bagItem;
      let decryptedName;
      for (const nestedBag of parentBagDoc.nestedBags) {
         decryptedName = await cry.decrypt(nestedBag.name, userId);
         if (decryptedName.toUpperCase() == newName.toUpperCase()) {  // duplicate name appearance check
            return true;
         }
         if (decryptedName === oldName) {
            bagItem = nestedBag;
         }
      }
      // const bagItem = parentBagDoc.nestedBags.find(bagItem => bagItem.name === oldName);
      bagItem.name = await cry.encrypt(newName, userId);
      await parentBagDoc.save();
      return false;
   }


   async eraseBag(parentBagDoc, bagName, userId) {
      let bagItem;
      let decryptedName;
      const otherBagItems = [];
      for (const nestedBag of parentBagDoc.nestedBags) {
         decryptedName = await cry.decrypt(nestedBag.name, userId);
         if (decryptedName === bagName) {
            bagItem = nestedBag;
         } else {
            otherBagItems.push(nestedBag);
         }
      }
      // const bagItem = parentBagDoc.nestedBags.find(bagItem => bagItem.name === bagName);
      const parentBagPopDoc = await parentBagDoc.populate('nestedBags.bag');
      const bagDoc = bagItem.bag;
      const getToBeErasedIds = async (currentDoc) => {
         let flowIdList = [];
         for (const flow of currentDoc.transactions) {
            flowIdList.push(flow._id);
         }
         let bagIdList = [currentDoc._id];
         if (currentDoc.nestedBags) {
            const currentBagPopDoc = await currentDoc.populate('nestedBags.bag');
            for (const bagItem of currentBagPopDoc.nestedBags) {
               const { flowIds, bagIds } = await getToBeErasedIds(bagItem.bag);
               flowIdList = flowIdList.concat(flowIds);
               bagIdList = bagIdList.concat(bagIds);
            }
         }
         return {flowIds: flowIdList, bagIds: bagIdList};
      }
      const { flowIds, bagIds } = await getToBeErasedIds(bagDoc);
      parentBagDoc.nestedBags = otherBagItems;
      // parentBagDoc.nestedBags = parentBagDoc.nestedBags.filter(bagItem => bagItem.name !== bagName);
      for (const id of flowIds) {
         await flowCol.findByIdAndDelete(id);
      }
      for (const id of bagIds) {
         await bagCol.findByIdAndDelete(id);
      }
      await parentBagDoc.save();
   }


   async disbandBag(parentBagDoc, oldBagName, userId) {
      const parentBagPopDoc = await parentBagDoc.populate('nestedBags.bag');
      let oldBagWrap;
      let currentDecryptedName;
      const allDecryptedNames = [];
      const otherBagItems = [];
      for (const nestedBag of parentBagDoc.nestedBags) {
         currentDecryptedName = await cry.decrypt(nestedBag.name, userId);
         allDecryptedNames.push(currentDecryptedName);
         if (currentDecryptedName === oldBagName) {
            oldBagWrap = nestedBag;
         } else {
            otherBagItems.push(nestedBag);
         }
      }
      // const oldBagWrap = parentBagPopDoc.nestedBags.find(bagWrap => bagWrap.name === oldBagName);
      const oldBagDoc = oldBagWrap.bag;
      const parentNestBagsDecryNamesSet = new Set([allDecryptedNames]);
      // const parentNestBagsDecryNamesSet = new Set(parentBagDoc.nestedBags.map(bagItem => await cry.decrypt(bagItem.name, userId))); 
      const allOldNestBagsDecryNames = [];
      for (const nestedBag of oldBagDoc.nestedBags) {
         currentDecryptedName = await cry.decrypt(nestedBag.name, userId);
         allOldNestBagsDecryNames.push(currentDecryptedName);
      }
                                                                                                        // This leads to O(n*2) instead of O(n^2) by 2 Loops,
      if (allOldNestBagsDecryNames.some(oldBagName => parentNestBagsDecryNamesSet.has(oldBagName))) {   // Because Set Creation = O(n) and Array.some() = O(n),
         return true;                                                                                   // BUT: Set.has() = O(1)  --> Set is a Hash Data Structure which
      }                                                                                                 // have O(1) read access (other than array value-based lookups!)
      // const cleanedNestedBags = parentBagDoc.nestedBags.filter(bagWrap => bagWrap.name !== oldBagName);
      parentBagDoc.nestedBags = [...otherBagItems, ...oldBagDoc.nestedBags];
      parentBagDoc.transactions = [...parentBagDoc.transactions, ...oldBagDoc.transactions];
      await bagCol.findByIdAndDelete(oldBagDoc._id);
      await parentBagDoc.save();
      return false;
   }


   async moveBag(parentBagDoc, destBagDoc, bagName, userId) {
      let bagItem;
      let decryptedName;
      const otherBagItems = [];
      for (const nestedBag of destBagDoc.nestedBags) {
         decryptedName = await cry.decrypt(nestedBag.name, userId);
         if (decryptedName.toUpperCase() == bagName.toUpperCase()) {  // duplicate name appearance check
            return true;
         }
      }
      for (const nestedBag of parentBagDoc.nestedBags) {
         decryptedName = await cry.decrypt(nestedBag.name, userId);
         if (decryptedName === bagName) {
            bagItem = nestedBag;
         } else {
            otherBagItems.push(nestedBag);
         }
      }
      // const bagItem = parentBagDoc.nestedBags.find(bagItem => bagItem.name === bagName);
      // if (destBagDoc.nestedBags.some(bagItem => bagItem.name.toUpperCase() == bagName.toUpperCase())) {
      //    return true;
      // }
      destBagDoc.nestedBags.push({name: bagItem.name, bag: bagItem.bag});
      parentBagDoc.nestedBags = otherBagItems;
      // parentBagDoc.nestedBags = parentBagDoc.nestedBags.filter(bagItem => bagItem.name !== bagName);
      await destBagDoc.save();
      await parentBagDoc.save();
      return false;
   }
}

const BAG = new Bag();

module.exports = BAG;