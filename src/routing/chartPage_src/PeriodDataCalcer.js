class PeriodDataCalcer {

   startObj;
   endObj;
   monthNames = ['JAN.', 'FEB.', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUG.', 'SEP.', 'OKT.', 'NOV.', 'DEZ.']

   constructor(chart) {
      this.chart = chart;
   }
   

   getUIdateFromMS(ms) {
      const dateObj = new Date(ms);
      const properDay = String(dateObj.getDate()).length === 2 ? dateObj.getDate() : '0'+dateObj.getDate();
      const properMonth = String(Number(dateObj.getMonth())+1).length === 2 ? Number(dateObj.getMonth())+1 : '0'+(Number(dateObj.getMonth())+1);
      return properDay+'.'+properMonth+'.'+dateObj.getFullYear();
   }

   checkIfLeapYear(year) {
      if ((!(year % 400)) || ((!(year % 4)) && (year % 100))) {
         return true;
      } else {
         return false;
      }
   }


   checkMonthLength(month, year) {
      if ([1,3,5,7,8,10,12].includes(month)) {
         return 31;
      } else if ([4,6,9,11].includes(month)) {
         return 30;
      } else { // February
         return this.checkIfLeapYear(year) ? 29 : 28;
      }
   }


   getNextMonthObj(currentMonthObj) {
      const currentMonth = currentMonthObj.getMonth()+1;
      const nextMonth = currentMonth === 12 ? 1 : currentMonth+1;
      const currentMonthsYear = currentMonthObj.getFullYear();
      const nextMonthsYear = currentMonth === 12 ? currentMonthsYear+1 : currentMonthsYear;
      const nextMonthObj = new Date(`${nextMonthsYear}-${nextMonth}`);
      return nextMonthObj;
   }

   getMonthName(month) {
      return this.monthNames[month-1];
      if (month === '01') {
         return 'JAN';
      } else if (month === '02') {
         return 'FEB';
      }
   }


   getDailyData() {
      const dailyData = {};
      for (const bag in this.chart.bags) {
         const data = [];
         for (let ms=this.startObj.getTime(); ms<=this.endObj.getTime(); ms+=86400000) {
            const currentDate = this.getUIdateFromMS(ms);
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
      const startMonthLength = this.checkMonthLength(this.startObj.getMonth()+1, this.startObj.getFullYear());
      const endMonthLength = this.checkMonthLength(this.endObj.getMonth()+1, this.endObj.getFullYear());
      
      const startTime = this.startObj.getTime() - (this.startObj.getDate()-1)*86400000;
      const endTime = this.endObj.getTime() + Math.abs(this.endObj.getDate()-endMonthLength)*86400000;

      for (const bag in this.chart.bags) {
         const data = [];
         let currentMonthObj = this.startObj;
         let currentMonthLength = startMonthLength;

         for (let ms=startTime; ms<=endTime; ms+=currentMonthLength*86400000) {
            currentMonthLength = this.checkMonthLength(currentMonthObj.getMonth()+1, currentMonthObj.getFullYear());
            let currentMonthsAmount = 0;
            for (let currDayMS=ms; currDayMS<=ms+(currentMonthLength-1)*86400000; currDayMS+=86400000) {
               const currDate = this.getUIdateFromMS(currDayMS);
               if (currDate in this.chart.bags[bag]) {
                  currentMonthsAmount += this.chart.bags[bag][currDate];
               }
            }
            const currentMonthUIStr = this.getUIdateFromMS(ms);
            const monthdesc = this.monthNames[Number(currentMonthUIStr.slice(3,5))-1]+"'"+currentMonthUIStr.slice(8);

            if (currentMonthsAmount) {
               data.push({'month': monthdesc, 'amount': currentMonthsAmount});
            } else {
               data.push({'month': monthdesc, 'amount': 0});
            }
            currentMonthObj = this.getNextMonthObj(currentMonthObj);
         }
         monthlyData[bag] = data;
      }
      return monthlyData;
   }


   checkQuarterLength(month, monthYear) {
      let daySum = 0;
      if ([1,2,3].includes(month)) {
         for (let m=1; m<4; m++) {
            daySum += this.checkMonthLength(m, monthYear);
         }
      } else if ([4,5,6].includes(month)) {
         for (let m=4; m<7; m++) {
            daySum += this.checkMonthLength(m, monthYear);
         }
      } else if ([7,8,9].includes(month)) {
         for (let m=7; m<10; m++) {
            daySum += this.checkMonthLength(m, monthYear);
         }
      } else if ([10,11,12].includes(month)) {
         for (let m=10; m<=12; m++) {
            daySum += this.checkMonthLength(m, monthYear);
         }
      }
      return daySum;
   }


   getFirstQuarterMonth(month) {
      if ([1,2,3].includes(month)) {
         return 1;
      } else if ([4,5,6].includes(month)) {
         return 4;
      } else if ([7,8,9].includes(month)) {
         return 7;
      } else if ([10,11,12].includes(month)) {
         return 10;
      }
   }


   getNexQuarterObj(quarterObj) {
      
   }


   
   getQuarterlyData() {
      const quarterlyData = {};
      const startQuarterLength = this.checkQuarterLength(this.startObj.getMonth()+1, this.startObj.getFullYear());
      const endQuarterLength = this.checkQuarterLength(this.endObj.getMonth()+1, this.endObj.getFullYear());
      const startsFirstQuarterMonth = this.getFirstQuarterMonth(this.startObj.getMonth()+1);
      const endsFirstQuarterMonth = this.getFirstQuarterMonth(this.endObj.getMonth()+1);
      const startsFirstQuarterMonthObj = new Date(this.startObj.getFullYear()+'-'+startsFirstQuarterMonth);
      const endsFirstQuarterMonthObj = new Date(this.endObj.getFullYear()+'-'+endsFirstQuarterMonth);
      
      const startTime = startsFirstQuarterMonthObj.getTime();
      const endTime = endsFirstQuarterMonthObj.getTime();

      for (const bag in this.chart.bags) {
         const data = [];
         let currentQuarterObj = startsFirstQuarterMonthObj;
         let currentQuarterLength = startQuarterLength;

         for (let ms=startTime; ms<=endTime; ms+=currentQuarterLength*86400000) {
            currentQuarterLength = this.checkQuarterLength(currentQuarterObj.getMonth()+1, currentQuarterObj.getFullYear());
            let currentQuartersAmount = 0;

            for (let currDayMS=ms; currDayMS<=ms+(currentQuarterLength-1)*86400000; currDayMS+=86400000) {
               const currDate = this.getUIdateFromMS(currDayMS);
               if (currDate in this.chart.bags[bag]) {
                  currentQuartersAmount += this.chart.bags[bag][currDate];
               }
            }
            const currentQuarterUIStr = this.getUIdateFromMS(ms);
            const quarter = Math.ceil((Number(currentQuarterUIStr.slice(3,5))/3));
            const quarterdesc = 'Q'+quarter+"'"+currentQuarterUIStr.slice(8);

            if (currentQuartersAmount) {
               data.push({'quarter': quarterdesc, 'amount': currentQuartersAmount});
            } else {
               data.push({'quarter': quarterdesc, 'amount': 0});
            }
            currentQuarterObj = this.getNexQuarterObj(currentQuarterObj);
         }
         quarterlyData[bag] = data;
      }
      return quarterlyData;
   }


   getYearlyData() {
      const yearlyData = {};
   }
}t


export default PeriodDataCalcer;