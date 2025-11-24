import SubmitUtils from "../../modals_src/submitUtils";

class dataPreparator {

   constructor(dummyData, chart) {
      this.utils = new SubmitUtils(dummyData);
      this.chart = chart;
   }


   #getProperTimeUnit(startTime, endTime) {
      const msDiff = (endTime+86399999) - startTime;
      console.log('msDiff:', msDiff);
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


   #prepare(unit, startTime, endTime) {
      const resultObj = {};
      console.log('in prepare');
      console.log('unit:', unit);
      if (unit === 'day') {
         console.log('in prepare @ day');
         for (const bag in this.chart.bags) {
            const data = [];
            for (let ms=startTime; ms<=endTime; ms+=86400000) {
               const currentDateObj = new Date(ms);
               const properDay = String(currentDateObj.getDate()).length === 2 ? currentDateObj.getDate() : '0'+currentDateObj.getDate();
               const properMonth = String(Number(currentDateObj.getMonth())+1).length === 2 ? Number(currentDateObj.getMonth())+1 : '0'+(Number(currentDateObj.getMonth())+1);
               const currentDate = properDay+'.'+properMonth+'.'+currentDateObj.getFullYear();
               
               // ALSO TODO: UPON FLOW CREATIONS, DELETIONS, MOVES AND RENAMES AUTOMATICALLY UPDATE CHART TOO!!!

               if (currentDate in this.chart.bags[bag]) {
                  data.push({'date': currentDate, 'amount': this.chart.bags[bag][currentDate]});
               } else {
                  data.push({'date': currentDate, 'amount': 0});
               }
            }
            resultObj[bag] = data;
         }
      }
      return resultObj;
   }

   prepareLineChartData() {
      const [startObj, endObj] = this.utils.retrieveDateSpanFromDOM();
      console.log('startObj:', startObj);
      const startTime = startObj.getTime();
      const endTime = endObj.getTime();
      const timeUnit = this.#getProperTimeUnit(startTime, endTime);
      
      return this.#prepare(timeUnit, startTime, endTime);
   }
}


export default dataPreparator;
