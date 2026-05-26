import { showInfo } from '../infos.js';


class AccountSubmits {

   constructor() {
      this.CSRFToken = document.querySelector('meta[name="csrf-token"]').content;
   }

   async accountDelete() {
      const response = await fetch('/userdata', {method: 'DELETE',
                                                headers: {
                                                   'Content-Type': 'application/json',
                                                   'CSRF-Token': this.CSRFToken
                                                   },
                                                //  body: JSON.stringify(packet)
      });
      if (response.status === 503) {
         showInfo('couldNotDelAccount', 'warning');
      } else if (response.status === 200) {
         window.location.href = '/login';
      }
   }

}

export default AccountSubmits;