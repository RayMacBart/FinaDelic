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
      return bagCol.create({nestedBags: [], transactions: []});
             // This ^^ is the Mongoose method for commented out code below!
      /*
      const newBagDoc = new bagCol({nestedBags: [], transactions: []});
      await newBagDoc.save();
      return newBagDoc;
      */
   }

   async createNestedBag(bagDoc, name) {
      const newBagDoc = await this.createBag();
      bagDoc.nestedBags.push({name, bag: newBagDoc._id});
      await bagDoc.save();
   }
}

const BAG = new Bag();

module.exports = BAG;