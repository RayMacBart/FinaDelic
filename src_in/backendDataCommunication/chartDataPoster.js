import { showInfo } from "../infos";


class ChartDataPoster {

   constructor() {
      this.CSRFToken = document.querySelector('meta[name="csrf-token"]').content;
   }

   async logErrorMsg(response) {
      const answer = await response.json();
      console.error(answer.msg);
   }

   async processChartPath(path, method, execFunc) {
      const response = await fetch('/chartPath', {method: method,
                                               headers: {
                                                  'Content-Type': 'application/json',
                                                  'CSRF-Token': this.CSRFToken
                                                   },
                                                body: JSON.stringify({path: path})
                                                }
                                   );
      if (response.status === 422) {
         showInfo('invalidData', 'warning', null, "The input for chart operation is not valid - must be a bagPath.");
         this.logErrorMsg(response);
      }
      else if (response.status === 507) {
         showInfo('dataStorageError', 'warning', null, "Sorry!\nWhile processing the selected chart path, a server side error occured.");
         this.logErrorMsg(response);
      }
      else if (response.status === 409) {
         showInfo('alreadyInChart');
         this.logErrorMsg(response);
         execFunc();
      }
      else if (response.status === 410) {
         showInfo('chartPathDelError', 'warning');
         this.logErrorMsg(response);
      } 
      else if (response.status === 201) {
         execFunc();
      }
   }
}

const chartDataPoster = new ChartDataPoster();

export default chartDataPoster;