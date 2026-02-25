const flowCol = require('./schemas').Flows;

class Flow {

   async createFlow(bagDoc, flowObj) {
      const newFlowDoc = await flowCol.create({frontId: flowObj.flowId,
                                   date: flowObj.date,
                                   desc: flowObj.desc,
                                   amount: flowObj.amount,
                                   currency: flowObj.currency
                                 });
      bagDoc.transactions.push(newFlowDoc._id);
      await bagDoc.save();
   }

   
   async changeAmount(bagDoc, { flowId, amount }) {
      const bagPopDoc = await bagDoc.populate('transactions');
      const flowDoc = bagPopDoc.transactions.find(flowItem => flowItem.frontId == flowId);
      flowDoc.amount = amount;
      await flowDoc.save();
   }


   async changeDesc(bagDoc, { flowId, desc }) {
      const bagPopDoc = await bagDoc.populate('transactions');
      const flowDoc = bagPopDoc.transactions.find(flowItem => flowItem.frontId == flowId);
      flowDoc.desc = desc;
      await flowDoc.save();
   }


   async changeDate(bagDoc, { flowId, isoDate }) {
      const bagPopDoc = await bagDoc.populate('transactions');
      const flowDoc = bagPopDoc.transactions.find(flowItem => flowItem.frontId == flowId);
      flowDoc.date = isoDate;  // auto cast to Date Object
      await flowDoc.save();
   }


   async deleteFlow(bagDoc, flowId) {
      const bagPopDoc = await bagDoc.populate('transactions');
      const flowDoc = bagPopDoc.transactions.find(flowItem => flowItem.frontId == flowId);
      await flowCol.findByIdAndDelete(flowDoc._id);
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