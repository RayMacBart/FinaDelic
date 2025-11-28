import SubmitUtils from "../../modals_src/submitUtils";
import PeriodAggregator from "./PeriodAggregator.js";

class dataPreparator {

   constructor(dummyData, chart) {
      this.utils = new SubmitUtils(dummyData);
      this.PA = new PeriodAggregator(chart);
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
      
      this.PA.startObj = startObj;
      this.PA.endObj = endObj;
      console.log('unit:', unit);
      if (unit === 'day') {
         return this.PA.getDailyData();
      } else if (unit === 'week') {
         return this.PA.getWeeklyData();
      } else if (unit === 'month') {
         return this.PA.getMonthlyData();
      } else if (unit === 'quarter') {
         return this.PA.getQuarterlyData();
      } else if (unit === 'year') {
         return this.PA.getYearlyData();
      }
   }

   prepareLineChartData() {
      const [startObj, endObj] = this.utils.retrieveDateSpanFromDOM();
      const timeUnit = this.#getProperTimeUnit(startObj, endObj);
      
      return this.#createTimelineData(timeUnit, startObj, endObj);
   }
}


export default dataPreparator;
