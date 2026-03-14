const userCol = require('./schemas').Users;
const dataCol = require('./schemas').Datas;
const BAG = require('./Bag');
const { Users } = require('./schemas');
const cry = require('../crypt');


exports.createData = async () => {
   const inBag = await BAG.createBag();
   const outBag = await BAG.createBag();
   const newDataDoc = await dataCol.create({IN: inBag._id, OUT: outBag._id, chartPaths: []});
   return newDataDoc;
}


exports.getData = async (userId) => {
   const popUserDoc = await Users.findById(userId).populate('data');
   return popUserDoc.data;
}


const fillUp = async (popBagDoc, userId) => {
   const bagObj = {'nestedBags': {}, 'transactions': {}};
   if (popBagDoc.transactions) {
      for (const transaction of popBagDoc.transactions) {
         const dateString = await cry.decrypt(transaction.date, userId);
         // const dateString = transaction.date.toISOString().split('T')[0];
         const dateArray = dateString.split('-');
         const preppedDate = dateArray[2]+'.'+dateArray[1]+'.'+dateArray[0];
         const [decryDesc, decryAmount, decryCurrency] = await Promise.all([cry.decrypt(transaction.desc, userId),
                                                                            cry.decrypt(transaction.amount, userId),
                                                                            cry.decrypt(transaction.currency, userId)]);
         bagObj.transactions[transaction.frontId] = {
                                                   date: preppedDate,
                                                   desc: decryDesc,
                                                   amount: decryAmount,
                                                   currency: decryCurrency
                                                };
      }
   }
   if (popBagDoc.nestedBags) {
      for (const bagHolder of popBagDoc.nestedBags) {
         const bagDoc = bagHolder.bag;
         const newPopBagDoc = await bagDoc.populate('nestedBags.bag transactions');
         const decryBagName = await cry.decrypt(bagHolder.name, userId);
         bagObj.nestedBags[decryBagName] = await fillUp(newPopBagDoc, userId);
      }
   }
   return bagObj;
}


exports.prepareData = async (dataDoc, userId) => {
   const popDataDoc = await dataDoc.populate('IN OUT');
   const popInDataDoc = await popDataDoc.populate('IN.nestedBags.bag IN.transactions');
   const popOutDataDoc = await popDataDoc.populate('OUT.nestedBags.bag OUT.transactions');
   const popInBagDoc = popInDataDoc.IN;
   const popOutBagDoc = popOutDataDoc.OUT;
   const inBagObj = popInBagDoc ? await fillUp(popInBagDoc, userId) : [];
   const outBagObj = popOutBagDoc ? await fillUp(popOutBagDoc, userId) : [];
   return { IN: inBagObj, OUT: outBagObj };
}


// {"IN": {
//    "nestedBags": {
//       "official": {
//          "nestedBags": {},
//          "transactions": {
//             "32": {
//                "date": "24.04.2025",
//                "desc": "tax return",
//                "amount": 5854.89,
//                "currency": "EUR"
//             },
//          }
//       }
//    }
// }}