const userCol = require('./schemas').Users;
const dataCol = require('./schemas').Datas;
const BAG = require('./Bag');
const { Users } = require('./schemas');

// class Data {

   // async createData() {
exports.createData = async () => {
      const inBag = await BAG.createBag();
      const outBag = await BAG.createBag();
      const newDataDoc = await dataCol.create({IN: inBag, OUT: outBag});
      return newDataDoc;
   }

   // async getData(userId) {
exports.getData = async (userId) => {
      const popUserDoc = await Users.findById(userId).populate('data');
      return popUserDoc.data;  // USE THIS LATER!
      // return await Users.find({email: userId}).populate(data);  // DELETE THIS LATER!
   }
// }

// const data = new Data();

// module.exports = data;