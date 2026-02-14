const userCol = require('./schemas').Users;
const dataCol = require('./schemas').Datas;
const BAG = require('./Bag');
const { Users } = require('./schemas');


exports.createData = async () => {
   const inBag = await BAG.createBag();
   const outBag = await BAG.createBag();
   const newDataDoc = await dataCol.create({IN: inBag, OUT: outBag});
   return newDataDoc;
}


exports.getData = async (userId) => {
   const popUserDoc = await Users.findById(userId).populate('data');
   return popUserDoc.data;
}


const fillUp = async (popBagDoc) => {
   const bagObj = {'nestedBags': {}, 'transactions': {}};
   for (const transaction of popBagDoc.transactions) {
      bagObj.transactions[transaction.frontId] = {
                                                date: transaction.date,
                                                desc: transaction.desc,
                                                amount: transaction.amount,
                                                currency: transaction.currency
                                             };
   }
   for (const bagHolder of popBagDoc.nestedBags) {
      const bagDoc = bagHolder.bag;
      const newPopBagDoc = await bagDoc.populate('nestedBags.bag transactions');
      bagObj.nestedBags[bagHolder.name] = await fillUp(newPopBagDoc);
   }
   return bagObj;
}


exports.prepareData = async (dataDoc) => {
   const popDataDoc = await dataDoc.populate('IN OUT');
   const popInBagDoc = await popDataDoc.IN.populate('nestedBags.bag transactions');
   const popOutBagDoc = await popDataDoc.OUT.populate('nestedBags.bag transactions');
   const inBagObj = await fillUp(popInBagDoc);
   const outBagObj = await fillUp(popOutBagDoc);
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