const flowCol = require('./schemas').Flows;

class Flow {

   static async createFlow(bagDoc, flowObj) {
      const newFlowDoc = await flowCol.create({frontId: flowObj.flowId,
                                   date: flowObj.date,
                                   desc: flowObj.desc,
                                   amount: flowObj.amount,
                                   currency: flowObj.currency
                                 });
      bagDoc.transactions.push(newFlowDoc._id);
   }
}

const flow = new Flow();

module.exports = flow;