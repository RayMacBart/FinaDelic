import TDP from '../backendDataCommunication/timeDataPoster.js';
import { timespan, router } from '../index.js';
import { showInfo } from '../infos.js';


class TimeSet {

   currelems;
   reloadEvent;

   constructor(appData) {
      this.appData = appData;
   }


   setTime() {
      const startDateStr = (this.currelems['start-date'].value);
      const endDateStr = (this.currelems['end-date'].value);
      timespan.start = new Date(startDateStr);
      timespan.end = new Date(endDateStr);
      if (timespan.start > timespan.end) {
         timespan.end = new Date(startDateStr);
         showInfo('invalidTimespan', 'warning');
      }
      TDP.storeTimeSpan(timespan.start, timespan.end);
      this.appData.setBagAmounts(timespan);
      const currentPage = window.location.href.split('/').pop();
      if (currentPage === 'chart') {
         router.navigate('chartPage');
      } 
      else if (currentPage === 'workspace') {
         router.navigate('flowPage');
      }
   }
}


export default TimeSet;