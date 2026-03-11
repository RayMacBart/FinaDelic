const flowCol = require('./schemas').Flows;
const cry = require('../crypt');

class Flow {

   async createFlow(bagDoc, flowObj, userId) {
      const [encryDate, encryDesc, encryAmount, encryCurrency] = await Promise.all([cry.encrypt(flowObj.date, userId),
                                                                                    cry.encrypt(flowObj.desc, userId),
                                                                                    cry.encrypt(flowObj.amount, userId),
                                                                                    cry.encrypt(flowObj.currency, userId)]);
      const newFlowDoc = await flowCol.create({frontId: flowObj.flowId,
                                               date: encryDate,
                                               desc: encryDesc,
                                               amount: encryAmount,
                                               currency: encryCurrency
                                              });
      bagDoc.transactions.push(newFlowDoc._id);
      await bagDoc.save();
   }

   
   async changeAmount(bagDoc, userId, { flowId, amount }) {
      const bagPopDoc = await bagDoc.populate('transactions');
      const flowDoc = bagPopDoc.transactions.find(flowItem => flowItem.frontId == flowId);
      flowDoc.amount = await cry.encrypt(amount, userId);
      await flowDoc.save();
   }


   async changeDesc(bagDoc, userId, { flowId, desc }) {
      const bagPopDoc = await bagDoc.populate('transactions');
      const flowDoc = bagPopDoc.transactions.find(flowItem => flowItem.frontId == flowId);
      flowDoc.desc = await cry.encrypt(desc, userId);
      await flowDoc.save();
   }


   async changeDate(bagDoc, userId, { flowId, isoDate }) {
      const bagPopDoc = await bagDoc.populate('transactions');
      const flowDoc = bagPopDoc.transactions.find(flowItem => flowItem.frontId == flowId);
      flowDoc.date = await cry.encrypt(isoDate, userId);  // auto cast to Date Object
      await flowDoc.save();
   }


   async deleteFlow(bagDoc, flowId) {
      const bagPopDoc = await bagDoc.populate('transactions');
      const flowDoc = bagPopDoc.transactions.find(flowItem => flowItem.frontId == flowId);
      bagPopDoc.transactions = bagPopDoc.transactions.filter(flowItem => flowItem.frontId != flowId);
      await flowCol.findByIdAndDelete(flowDoc._id);
      await bagDoc.save();
   }


   async moveFlow(originBagDoc, targetBagDoc, flowId) {
      const originBagPopDoc = await originBagDoc.populate('transactions');
      const flowDoc = originBagPopDoc.transactions.find(flowItem => flowItem.frontId == flowId);
      targetBagDoc.transactions.push(flowDoc._id);
      originBagPopDoc.transactions = originBagPopDoc.transactions.filter(flowItem => flowItem.frontId != flowId);
      await targetBagDoc.save();
      await originBagDoc.save();
   }
}

const flow = new Flow();

module.exports = flow;