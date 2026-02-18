class FlowDataPoster {

   async #sendFlowAction(packet, route, errName, clientExecFunc) {
      const response = await fetch(route, {method: 'POST',
                                          headers: {
                                             'Content-Type': 'application/json'
                                             },
                                           body: JSON.stringify(packet)
      });
      if (response.status === 422) {
         showInfo('invalidData', 'warning', null, errName);
      } else if (response.status === 507) {
         showInfo('dataStorageError', 'warning', null, errName);
      } else if (response.status === 201) {
         clientExecFunc(packet.flowId, {date: packet.date, desc: packet.desc, amount: packet.amount, currency: packet.currency});
      }
   }

   createFlow(path, flowId, flowObj, clientExecFunc) {
      const packet = { path: path,
                       flowId: flowId,
                       date: flowObj.date,
                       desc: flowObj.desc,
                       amount: flowObj.amount,
                       currency: flowObj.currency
                     };
      this.#sendFlowAction(packet, '/createFlow', 'creation of the transaction', clientExecFunc);
   }

   changeAmount(flowId, amount) {
      const packet = { flowId: flowId,
                       amount: amount
                     };
      this.#sendFlowAction(packet, '/changeFlowAmount', 'amount modification');
   }

   changeDesc(flowId, text) {
      const packet = { flowId: flowId,
                       text: text
                     };
      this.#sendFlowAction(packet, '/changeFlowText', 'modification of the transaction description');
   }

   changeDate(flowId, isoDate) {
      const packet = { flowId: flowId,
                       isoDate: isoDate
                     };
      this.#sendFlowAction(packet, '/changeFlowDate', 'transaction date modification');
   }

   deleteFlow(flowId) {
      const packet = { flowId: flowId };
      this.#sendFlowAction(packet, '/deleteFlow', 'deletion of the transaction');
   }

   moveFlow(flowId, targetBagPath) {
      const packet = { flowId: flowId,
                       targetBagPath: targetBagPath
                     };
      this.#sendFlowAction(packet, '/moveFlow', 'flow movement');
   }


}

const flowDataPoster = new FlowDataPoster();

export default flowDataPoster;