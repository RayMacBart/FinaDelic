import { showInfo } from '../infos.js';

class BagDataPoster {

   async logErrorMsg(response) {
      const answer = await response.json();
      console.error(answer.msg);
   }

   async #sendBagAction(packet, route, errName, clientExecFunc) {
      const response = await fetch(route, {method: 'POST',
                                          headers: {
                                             'Content-Type': 'application/json'
                                             },
                                           body: JSON.stringify(packet)
      });
      if (response.status === 422) {
         showInfo('invalidData', 'warning', null, errName);
         this.logErrorMsg(response);
      } else if (response.status === 507) {
         showInfo('dataStorageError', 'warning', null, errName);
         this.logErrorMsg(response);
      } else if (response.status === 201) {
         clientExecFunc();
      }
   }

   createBag(path, name, clientExecFunc) {
      const packet = { path: path,
                       name: name
      };
      this.#sendBagAction(packet, '/createBag', 'box creation', clientExecFunc);
   }

   renameBag(path, newBagName) {
      const packet = { path: path,
                       newBagName: newBagName
       };
      this.#sendBagAction(packet, '/renameBag', 'box renaming');
   }

   bagErase(path) {
      const packet = { path: path };
      this.#sendBagAction(packet, '/eraseBag', 'box deletion');
   }
   
   bagDisband(path) {
      const packet = { path: path };
      this.#sendBagAction(packet, '/disbandBag', 'disband of the box');
   }

   bagMove(fromPath, toPath) {
      const packet = { fromPath: fromPath,
                       toPath: toPath
       };
      this.#sendBagAction(packet, '/moveBag', 'box movement');
   }
}

const bagDataPoster = new BagDataPoster();

export default bagDataPoster;