import SubmitUtils from "../../modals_src/submitUtils";
import PeriodDataCalcer from "./PeriodDataCalcer.js";

class dataPreparator {

   constructor(dummyData, chart) {
      this.utils = new SubmitUtils(dummyData);
      this.PDC = new PeriodDataCalcer(chart);
   }


   #getProperTimeUnit(startObj, endObj) {
      const msDiff = (endObj.getTime()+86399999) - startObj.getTime();
      if (msDiff < 4320000000) {  // up to 49 days, then 7 weeks
         return 'day';
      } else if (msDiff < 21772800000) {  // up to 36 weeks, then 9 months
         return 'week';
      } else if (msDiff < 94672800000) {  // up to 36 months, then 12 quarters
         return 'month';
      } else if (msDiff < 252460800000) { // up to 32 quarters, then 8 years
         return 'quarter';
      } else {
         return 'year';
      }
   }


   #createTimelineData(unit, startObj, endObj) {
      
      this.PDC.startObj = startObj;
      this.PDC.endObj = endObj;
      let resultObj = {};
      console.log('unit:', unit);
      if (unit === 'day') {
         return this.PDC.getDailyData();
      } else if (unit === 'week') {
         return this.PDC.getWeeklyData();
      } else if (unit === 'month') {
         return this.PDC.getMonthlyData();
      } else if (unit === 'quarter') {
         return this.PDC.getQuarterlyData();
      } else if (unit === 'year') {
         return this.PDC.getYearlyData();
      }
   }

   prepareLineChartData() {
      const [startObj, endObj] = this.utils.retrieveDateSpanFromDOM();
      const timeUnit = this.#getProperTimeUnit(startObj, endObj);
      
      return this.#createTimelineData(timeUnit, startObj, endObj);
   }
}


export default dataPreparator;
