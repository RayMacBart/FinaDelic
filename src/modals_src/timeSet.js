import { timespan, router } from '../index.js';


class TimeSet {

   currelems;

   constructor(dummyData) {
      this.dummyData = dummyData;
   }


   setTime() {
      const startDateStr = (this.currelems['start-date'].value);
      const endDateStr = (this.currelems['end-date'].value);
      timespan.start = new Date(startDateStr);
      timespan.end = new Date(endDateStr);
      this.dummyData.setBagAmounts(timespan);
      router.navigate('flowPage');
   }
}


export default TimeSet;