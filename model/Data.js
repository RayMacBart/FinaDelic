const userCol = require('./schemas').Users;
const dataCol = require('./schemas').Datas;
const BAG = require('./Bag');
const { Users } = require('./schemas');


exports.createData = async () => {
   const inBag = await BAG.createBag();
   const outBag = await BAG.createBag();
   const newDataDoc = await dataCol.create({IN: inBag._id, OUT: outBag._id});
   return newDataDoc;
}


exports.getData = async (userId) => {
   const popUserDoc = await Users.findById(userId).populate('data');
   return popUserDoc.data;
}


const fillUp = async (popBagDoc) => {
   const bagObj = {'nestedBags': {}, 'transactions': {}};
   for (const transaction of popBagDoc.transactions) {
      const dateString = transaction.date.toISOString().split('T')[0];
      const dateArray = dateString.split('-');
      const preppedDate = dateArray[2]+'.'+dateArray[1]+'.'+dateArray[0];
      bagObj.transactions[transaction.frontId] = {
                                                date: preppedDate,
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
   const popInDataDoc = await popDataDoc.populate('IN.nestedBags.bag IN.transactions');
   const popOutDataDoc = await popDataDoc.populate('OUT.nestedBags.bag OUT.transactions');
   const popInBagDoc = popInDataDoc.IN;
   const popOutBagDoc = popOutDataDoc.OUT;
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