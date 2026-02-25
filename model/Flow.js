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


   async changeDate(bagDoc, { flowId, isoDate }) {
      const bagPopDoc = await bagDoc.populate('transactions');
      const flowDoc = bagPopDoc.transactions.find(flowItem => flowItem.frontId == flowId);
      flowDoc.date = isoDate;  // auto cast to Date Object
      await flowDoc.save();
   }
}

const flow = new Flow();

module.exports = flow;