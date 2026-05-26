const argon2 = require('argon2');
const crypto = require('crypto');
const userCol = require('./schemas').Users;
const bagCol = require('./schemas').Bags;
const flowCol = require('./schemas').Flows;
const Data = require('./Data');


class User {

   static async create(email, password) {
      const emailHash = await crypto.createHash("sha256").update(email).digest("base64");
      const pwhash = await argon2.hash(password);
      const data = await Data.createData();
      const now = new Date();
      const startdate = (now.getFullYear()-1)+'-01-01';
      const enddate = now.toISOString().split('T')[0];
      return await userCol.create({
                                    email: 'placeholder',
                                    emailHash: emailHash,
                                    pwhash: pwhash,
                                    data: data,
                                    timeconfig: { 
                                       startdate: startdate,
                                       enddate: enddate
                                    }});
   }

   static async delete(userId) {
      const popUserDoc = await userCol.findById(userId).populate('data');
      const dataDoc = popUserDoc.data;
      const popDataDoc = await dataDoc.populate('IN OUT');
      const inBagDoc = popDataDoc.IN;
      const outBagDoc = popDataDoc.OUT;
      const flush = async (bagDoc) => {
         const popBagDoc = await bagDoc.populate('nestedBags.bag transactions');
         const bagIds = [];
         const flowIds = [];
         for (const bagWrap of popBagDoc.nestedBags) {
            bagIds.push(bagWrap.bag._id);
            flush(bagWrap.bag);
         }
         for (const flow of popBagDoc.transactions) {
            flowIds.push(flow._id);
         }
         for (const id of bagIds) {
            await bagCol.findByIdAndDelete(id);
         }
         for (const id of flowIds) {
            await flowCol.findByIdAndDelete(id);
         }
      }
      flush(inBagDoc);
      flush(outBagDoc);
      await inBagDoc.deleteOne();
      await outBagDoc.deleteOne();
      await dataDoc.deleteOne();
      await popUserDoc.deleteOne();
      return popUserDoc.$isDeleted();
   }
}

module.exports = User;