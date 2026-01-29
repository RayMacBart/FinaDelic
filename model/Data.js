const userCollection = require('./schemas').Users;
const dataCollection = require('./schemas').Datas;
const Bag = require('./Bag');
const { Users } = require('./schemas');

class Data {

   static async create() {
      const inBag = await Bag.create;
      const outBag = await Bag.create;
      const newDataDoc = new dataCollection({IN: inBag, OUT: outBag});
      return newDataDoc;
   }

   static async getData(userId) {
      const userDoc = Users.find({_id: userId}).populate(data);
   }
}

module.exports = Data;