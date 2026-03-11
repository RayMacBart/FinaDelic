import { showInfo } from '../infos.js';

class FlowDataPoster {


   constructor() {
      this.CSRFToken = document.querySelector('meta[name="csrf-token"]').content;
   }

   async #sendFlowAction(packet, route, errName, clientExecFunc) {
      const response = await fetch(route, {method: 'POST',
                                          headers: {
                                             'Content-Type': 'application/json',
                                             'CSRF-Token': this.CSRFToken
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

   changeAmount(path, flowId, amount, clientExecFunc) {
      const packet = { path: path,
                       flowId: flowId,
                       amount: amount.toFixed(2)
                     };
      this.#sendFlowAction(packet, '/changeFlowAmount', 'amount modification', clientExecFunc);
   }

   changeDesc(path, flowId, text, clientExecFunc) {
      const packet = { path: path,
                       flowId: flowId,
                       desc: text
                     };
      this.#sendFlowAction(packet, '/changeFlowDesc', 'modification of the transaction description', clientExecFunc);
   }

   changeDate(path, flowId, isoDate, clientExecFunc) {
      const packet = { path: path,
                       flowId: flowId,
                       isoDate: isoDate
                     };
      this.#sendFlowAction(packet, '/changeFlowDate', 'transaction date modification', clientExecFunc);
   }

   deleteFlow(path, flowId, clientExecFunc) {
      const packet = { path: path,
                       flowId: flowId
                     };
      this.#sendFlowAction(packet, '/deleteFlow', 'deletion of the transaction', clientExecFunc);
   }

   moveFlow(originPath, flowId, targetPath, clientExecFunc) {
      const packet = { originPath: originPath,
                       flowId: flowId,
                       targetPath: targetPath
                     };
      this.#sendFlowAction(packet, '/moveFlow', 'flow movement', clientExecFunc);
   }


}

const flowDataPoster = new FlowDataPoster();

export default flowDataPoster;