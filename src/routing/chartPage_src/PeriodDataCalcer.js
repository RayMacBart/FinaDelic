class PeriodDataCalcer {

   startObj;
   endObj;

   constructor(chart) {
      this.chart = chart;
   }
   

   getUIdateFromMS(ms) {
      const dateObj = new Date(ms);
      const properDay = String(dateObj.getDate()).length === 2 ? dateObj.getDate() : '0'+dateObj.getDate();
      const properMonth = String(Number(dateObj.getMonth())+1).length === 2 ? Number(dateObj.getMonth())+1 : '0'+(Number(dateObj.getMonth())+1);
      return properDay+'.'+properMonth+'.'+dateObj.getFullYear();
   }


   getDailyData() {
      const dailyData = {};
      for (const bag in this.chart.bags) {
         const data = [];
         for (let ms=this.startObj.getTime(); ms<=this.endObj.getTime(); ms+=86400000) {
            const currentDate = this.getUIdateFromMS(ms);
            
            // ALSO TODO: UPON FLOW CREATIONS, DELETIONS, MOVES AND RENAMES AUTOMATICALLY UPDATE CHART TOO!!!

            if (currentDate in this.chart.bags[bag]) {
               data.push({'date': currentDate, 'amount': this.chart.bags[bag][currentDate]});
            } else {
               data.push({'date': currentDate, 'amount': 0});
            }
         }
         dailyData[bag] = data;
      }
      return dailyData;
   }


   getWeeklyData() {
      const weeklyData = {};
      const startTime = this.startObj.getTime() - (this.startObj.getDay()-1)*86400000;
      const endTime = this.endObj.getTime() + Math.abs(this.endObj.getDay()-7)*86400000;
      for (const bag in this.chart.bags) {
         const data = [];
         for (let ms=startTime; ms<=endTime; ms+=604800000) {
            let currentWeeksAmount = 0;
            for (let currDayMS=ms; currDayMS<=ms+518400000; currDayMS+=86400000) {
               const currDate = this.getUIdateFromMS(currDayMS);
               if (currDate in this.chart.bags[bag]) {
                  currentWeeksAmount += this.chart.bags[bag][currDate];
               }
            }
            const mondate = this.getUIdateFromMS(ms);
            const sundate = this.getUIdateFromMS(ms+518400000);
            const weekdesc = mondate.slice(0,6)+mondate.slice(8)+'-'+sundate.slice(0,6)+sundate.slice(8);
            if (currentWeeksAmount) {
               data.push({'week': weekdesc, 'amount': currentWeeksAmount});
            } else {
               data.push({'week': weekdesc, 'amount': 0});
            }
         }
         weeklyData[bag] = data;
      }
      return weeklyData;
   }


   getMonthlyData() {
      const monthlyData = {};
   }


   getQuarterlyData() {
      const quarterlyData = {};
   }


   getYearlyData() {
      const yearlyData = {};
   }
}


export default PeriodDataCalcer;