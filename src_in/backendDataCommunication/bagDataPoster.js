import { showInfo } from '../infos.js';

class BagDataPoster {

   constructor() {
      this.CSRFToken = document.querySelector('meta[name="csrf-token"]').content;
   }

   async logErrorMsg(response) {
      const answer = await response.json();
      console.error(answer.msg);
   }

   async #sendBagAction(packet, route, errName, clientExecFunc) {
      const response = await fetch(route, {method: 'POST',
                                          headers: {
                                             'Content-Type': 'application/json',
                                             'CSRF-Token': this.CSRFToken
                                             },
                                           body: JSON.stringify(packet)
      });
      if (response.status === 422) {
         showInfo('invalidData', 'warning', null, errName);
         this.logErrorMsg(response);
      } else if (response.status === 507) {
         showInfo('dataStorageError', 'warning', null, errName);
         this.logErrorMsg(response);
      } else if (response.status === 409) {
         showInfo('nameCollisionError', 'warning', null, errName);
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

   renameBag(path, newName, clientExecFunc) {
      const packet = { path: path,
                       newName: newName
       };
      this.#sendBagAction(packet, '/renameBag', 'box renaming', clientExecFunc);
   }

   bagErase(path, clientExecFunc) {
      const packet = { path: path };
      this.#sendBagAction(packet, '/eraseBag', 'box deletion', clientExecFunc);
   }
   
   bagDisband(path, clientExecFunc) {
      const packet = { path: path };
      this.#sendBagAction(packet, '/disbandBag', 'disband of the box', clientExecFunc);
   }

   bagMove(fromPath, toPath, clientExecFunc) {
      const packet = { fromPath: fromPath,
                       toPath: toPath
       };
      this.#sendBagAction(packet, '/moveBag', 'box movement', clientExecFunc);
   }
}

const bagDataPoster = new BagDataPoster();

export default bagDataPoster;