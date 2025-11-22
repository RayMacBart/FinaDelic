import { timespan, router } from '../index.js';
import { showInfo } from '../infos.js';


class TimeSet {

   currelems;
   reloadEvent;

   constructor(dummyData) {
      this.dummyData = dummyData;
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
      this.dummyData.setBagAmounts(timespan);
      const currentPage = window.location.href.split('/').pop();
      if (currentPage === 'chartPage') {
         router.navigate('chartPage');
      } 
      else if (currentPage === 'flowPage') {
         router.navigate('flowPage')
      }
   }
}


export default TimeSet;