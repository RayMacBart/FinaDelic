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
      const execTimeSet = () => {
         this.appData.setBagAmounts(timespan);
         const currentPage = window.location.href.split('/').pop();
         if (currentPage === 'chart') {
            router.navigate('chartPage');
         } 
         else if (currentPage === 'workspace') {
            router.navigate('flowPage');
         }
      }
      const ISOstart = timespan.start.toISOString().split('T')[0];
      const ISOend = timespan.end.toISOString().split('T')[0];
      TDP.storeTimeSpan(ISOstart, ISOend, execTimeSet);
   }
}


export default TimeSet;