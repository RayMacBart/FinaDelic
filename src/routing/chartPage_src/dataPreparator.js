import SubmitUtils from "../../modals_src/submitUtils";
import PeriodAggregator from "./PeriodAggregator.js";

class dataPreparator {

   constructor(dummyData, chart) {
      this.utils = new SubmitUtils(dummyData);
      this.PA = new PeriodAggregator(chart);
      this.chart = chart;
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
      // console.log('unit:', unit);
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


   addProcentualValues(pieData) {
      let wholeChartAmount = 0;
      for (const bag in pieData) {
         wholeChartAmount += pieData[bag];
      }
      console.log('wholeChartAmount:', wholeChartAmount);
      for (const bag in pieData) {
         console.log('pieData[bag]:', pieData[bag]);
         const bagShare = ((pieData[bag]/wholeChartAmount)*100).toFixed(2);
         pieData[bag+`: ${bagShare}%`] = pieData[bag];
         delete pieData[bag];
      }
      return pieData;
   }


   preparePieChartData() {
      let pieData = {};
      const [startObj, endObj] = this.utils.retrieveDateSpanFromDOM();
      for (const bag in this.chart.bags) {
         let totalAmount = 0;
         for (const datekey in this.chart.bags[bag]) {
            const dateKeyArr = datekey.split('.');
            const formDateKeyStr = dateKeyArr[2]+'-'+dateKeyArr[1]+'-'+dateKeyArr[0];
            const dateKeyObj = new Date(formDateKeyStr);
            if ((dateKeyObj >= startObj) && (dateKeyObj <= endObj)) {
               totalAmount += this.chart.bags[bag][datekey];
            }
         }
         pieData[bag] = totalAmount;
      }
      pieData = this.addProcentualValues(pieData);
      return pieData;
   }

   // const dailyData = {};
   //    for (const bag in this.chart.bags) {
   //       const data = [];
   //       let totalAmount = 0;
   //       for (let ms=this.startObj.getTime(); ms<=this.endObj.getTime(); ms+=86400000) {
   //          const currentDate = this.agutils.getUIdateFromMS(ms);
   //          if (currentDate in this.chart.bags[bag]) {
   //             totalAmount += this.chart.bags[bag][currentDate];
   //          }
   //          data.push({'period': currentDate, 'amount': totalAmount});
   //       }
   //       dailyData[bag] = data;
   //    }
   //    return dailyData;
}


export default dataPreparator;
