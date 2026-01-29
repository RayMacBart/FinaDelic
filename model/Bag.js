const bagCollection = require('./schemas').Bags;
// const Flow = require('./Flow');

class Bag {

   static async create() {
      const newBagDoc = new bagCollection({nestedBags: [], transactions: []});
   }
}

module.exports = Bag;