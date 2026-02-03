import { showInfo } from '../infos.js';

class BagDataPoster {

   async #sendBagAction(packet, route, errName) {
      const response = await fetch(route, {method: 'POST',
                                          headers: {
                                             'Content-Type': 'application/json'
                                             },
                                           body: JSON.stringify(packet)
      });
      if (response.status === 422) {
         showInfo('invalidData', 'warning', null, errName);
      }
      if (response.status === 507) {
         showInfo('dataStorageError', 'warning', null, errName);
      }
   }

   createBag(path, name) {
      const packet = { path: path,
                       name: name
      };
      this.#sendBagAction(packet, '/createBag', 'box creation');
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