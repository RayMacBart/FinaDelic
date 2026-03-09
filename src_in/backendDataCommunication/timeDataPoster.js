import { showInfo } from '../infos.js';

class TimeDataPoster {

   constructor() {
      this.CSRFToken = document.querySelector('meta[name="csrf-token"]').content;
   }

   async storeTimeSpan(ISOstart, ISOend, execTimeSet) {
      const packet = { start: ISOstart, end: ISOend };
      const response = await fetch('/setTime', {method: 'POST',
                                               headers: {
                                                  'Content-Type': 'application/json',
                                                  'CSRF-Token': this.CSRFToken
                                                   },
                                                body: JSON.stringify(packet)
                                                }
                                   );
      if (response.status === 422) {
         showInfo('invalidData', 'warning', null, "The input dates are not valid! (e.g. start date must be <= end date)");
      }
      else if (response.status === 507) {
         showInfo('dataStorageError', 'warning', null, "Sorry!\nWhile storing the selected time, a server side error occured.");
      }
      else if (response.status === 201) {
         execTimeSet()
      }
   }
}

const timeDataPoster = new TimeDataPoster();

export default timeDataPoster;