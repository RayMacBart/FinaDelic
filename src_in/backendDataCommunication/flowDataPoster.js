import { showInfo } from '../infos.js';

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
         clientExecFunc();
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

   changeAmount(flowId, amount, clientExecFunc) {
      const packet = { flowId: flowId,
                       amount: amount
                     };
      this.#sendFlowAction(packet, '/changeFlowAmount', 'amount modification', clientExecFunc);
   }

   changeDesc(flowId, text, clientExecFunc) {
      const packet = { flowId: flowId,
                       text: text
                     };
      this.#sendFlowAction(packet, '/changeFlowText', 'modification of the transaction description', clientExecFunc);
   }

   changeDate(path, flowId, isoDate, clientExecFunc) {
      const packet = { path: path,
                       flowId: flowId,
                       isoDate: isoDate
                     };
      console.log('packet:', packet);
      this.#sendFlowAction(packet, '/changeFlowDate', 'transaction date modification', clientExecFunc);
   }

   deleteFlow(flowId, clientExecFunc) {
      const packet = { flowId: flowId };
      this.#sendFlowAction(packet, '/deleteFlow', 'deletion of the transaction', clientExecFunc);
   }

   moveFlow(flowId, targetBagPath, clientExecFunc) {
      const packet = { flowId: flowId,
                       targetBagPath: targetBagPath
                     };
      this.#sendFlowAction(packet, '/moveFlow', 'flow movement', clientExecFunc);
   }


}

const flowDataPoster = new FlowDataPoster();

export default flowDataPoster;