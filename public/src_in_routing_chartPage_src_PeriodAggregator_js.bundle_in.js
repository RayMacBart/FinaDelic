"use strict";
(globalThis["webpackChunkfinadelic"] = globalThis["webpackChunkfinadelic"] || []).push([["src_in_routing_chartPage_src_PeriodAggregator_js"],{

/***/ "./src_in/routing/chartPage_src/AggregationUtils.js"
/*!**********************************************************!*\
  !*** ./src_in/routing/chartPage_src/AggregationUtils.js ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class AggregationUtils {

   monthNames = ['JAN.', 'FEB.', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUG.', 'SEP.', 'OKT.', 'NOV.', 'DEZ.'];

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


   getQuarter(quarterObj) {
      if (quarterObj.getMonth() === 0) {
         return 1;
      } else if (quarterObj.getMonth() === 3) {
         return 2;
      } else if (quarterObj.getMonth() === 6) {
         return 3;
      } else if (quarterObj.getMonth() === 9) {
         return 4;
      }
   }


   getNextQuarterObj(quarterObj) {
      if (quarterObj.getMonth() === 0) {
         return new Date(`${quarterObj.getFullYear()}-04`);
      } else if (quarterObj.getMonth() === 3) {
         return new Date(`${quarterObj.getFullYear()}-07`);
      } else if (quarterObj.getMonth() === 6) {
         return new Date(`${quarterObj.getFullYear()}-10`);
      } else if (quarterObj.getMonth() === 9) {
         return new Date(`${quarterObj.getFullYear()+1}-01`);
      }
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AggregationUtils);

/***/ },

/***/ "./src_in/routing/chartPage_src/PeriodAggregator.js"
/*!**********************************************************!*\
  !*** ./src_in/routing/chartPage_src/PeriodAggregator.js ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AggregationUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AggregationUtils.js */ "./src_in/routing/chartPage_src/AggregationUtils.js");



class PeriodAggregator {

   startObj;
   endObj;

   constructor(chart) {
      this.chart = chart;
      this.agutils = new _AggregationUtils_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
   }


   getDailyData() {
      const dailyData = {};
      for (const bag in this.chart.bags) {
         const data = [];
         let totalAmount = 0;
         for (let ms=this.startObj.getTime(); ms<=this.endObj.getTime(); ms+=86400000) {
            const currentDate = this.agutils.getUIdateFromMS(ms);
            if (currentDate in this.chart.bags[bag]) {
               totalAmount += this.chart.bags[bag][currentDate];
            }
            data.push({'period': currentDate, 'amount': totalAmount});
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
         let totalAmount = 0;

         for (let ms=startTime; ms<=endTime; ms+=604800000) {
            let currentWeeksAmount = 0;

            for (let currDayMS=ms; currDayMS<=ms+518400000; currDayMS+=86400000) {
               const currDate = this.agutils.getUIdateFromMS(currDayMS);
               if (currDate in this.chart.bags[bag]) {
                  currentWeeksAmount += this.chart.bags[bag][currDate];
               }
            }
            const mondate = this.agutils.getUIdateFromMS(ms);
            const sundate = this.agutils.getUIdateFromMS(ms+518400000);
            const weekdesc = mondate.slice(0,6)+mondate.slice(8)+'-'+sundate.slice(0,6)+sundate.slice(8);
            totalAmount += currentWeeksAmount;
            data.push({'period': weekdesc, 'amount': totalAmount});

         }
         weeklyData[bag] = data;
      }
      return weeklyData;
   }


   getMonthlyData() {
      const monthlyData = {};
      const startMonthLength = this.agutils.checkMonthLength(this.startObj.getMonth()+1, this.startObj.getFullYear());
      const endMonthLength = this.agutils.checkMonthLength(this.endObj.getMonth()+1, this.endObj.getFullYear());
      
      const startTime = this.startObj.getTime() - (this.startObj.getDate()-1)*86400000;
      const endTime = this.endObj.getTime() + Math.abs(this.endObj.getDate()-endMonthLength)*86400000;

      for (const bag in this.chart.bags) {
         const data = [];
         let currentMonthObj = this.startObj;
         let currentMonthLength = startMonthLength;
         let totalAmount = 0;

         for (let ms=startTime; ms<=endTime; ms+=currentMonthLength*86400000) {
            currentMonthLength = this.agutils.checkMonthLength(currentMonthObj.getMonth()+1, currentMonthObj.getFullYear());
            let currentMonthsAmount = 0;
            for (let currDayMS=ms; currDayMS<=ms+(currentMonthLength-1)*86400000; currDayMS+=86400000) {
               const currDate = this.agutils.getUIdateFromMS(currDayMS);
               if (currDate in this.chart.bags[bag]) {
                  currentMonthsAmount += this.chart.bags[bag][currDate];
               }
            }
            const currentMonthUIStr = this.agutils.getUIdateFromMS(ms);
            const monthdesc = this.agutils.monthNames[Number(currentMonthUIStr.slice(3,5))-1]+"'"+currentMonthUIStr.slice(8);
            totalAmount += currentMonthsAmount;
            data.push({'period': monthdesc, 'amount': totalAmount});
            currentMonthObj = this.agutils.getNextMonthObj(currentMonthObj);
         }
         monthlyData[bag] = data;
      }
      return monthlyData;
   }

   
   getQuarterlyData() {
      const quarterlyData = {};
      const startQuarterLength = this.agutils.checkQuarterLength(this.startObj.getMonth()+1, this.startObj.getFullYear());
      const startsFirstQuarterMonth = this.agutils.getFirstQuarterMonth(this.startObj.getMonth()+1);
      const endsFirstQuarterMonth = this.agutils.getFirstQuarterMonth(this.endObj.getMonth()+1);
      const startsFirstQuarterMonthObj = new Date(this.startObj.getFullYear()+'-'+startsFirstQuarterMonth);
      const endsFirstQuarterMonthObj = new Date(this.endObj.getFullYear()+'-'+endsFirstQuarterMonth);
      const startTime = startsFirstQuarterMonthObj.getTime();
      const endTime = endsFirstQuarterMonthObj.getTime();

      for (const bag in this.chart.bags) {
         const data = [];
         let currentQuarterObj = startsFirstQuarterMonthObj;
         let currentQuarterLength = startQuarterLength;
         let totalAmount = 0;

         for (let ms=startTime; ms<=endTime; ms+=currentQuarterLength*86400000) {
            currentQuarterLength = this.agutils.checkQuarterLength(currentQuarterObj.getMonth()+1, currentQuarterObj.getFullYear());
            let currentQuartersAmount = 0;

            for (let currDayMS=ms; currDayMS<=ms+(currentQuarterLength-1)*86400000; currDayMS+=86400000) {
               const currDate = this.agutils.getUIdateFromMS(currDayMS);
               if (currDate in this.chart.bags[bag]) {
                  currentQuartersAmount += this.chart.bags[bag][currDate];
               }
            }
            const currentQuarterUIStr = this.agutils.getUIdateFromMS(ms);
            // const quarter = Math.ceil((Number(currentQuarterUIStr.slice(3,5))/3));
            const QO = new Date(ms);
            const quarter = this.agutils.getQuarter(QO);
            const quarterdesc = 'Q'+quarter+"'"+currentQuarterUIStr.slice(8);
            totalAmount += currentQuartersAmount;
            data.push({'period': quarterdesc, 'amount': totalAmount});
            currentQuarterObj = this.agutils.getNextQuarterObj(currentQuarterObj);
         }
         quarterlyData[bag] = data;
      }
      return quarterlyData;
   }


   getYearlyData() {
      const yearlyData = {};
      const startYearLength = this.agutils.checkIfLeapYear(this.startObj.getFullYear()) ? 366 : 365;
      const startYearObj = new Date(`${this.startObj.getFullYear()}-01`);
      const endYearObj = new Date(`${this.endObj.getFullYear()}-01`);
      const startTime = startYearObj.getTime(); // ???
      const endTime = endYearObj.getTime();

      for (const bag in this.chart.bags) {
         const data = [];
         let currentYearObj = this.startObj;
         let currentYearLength = startYearLength;
         let totalAmount = 0;

         for (let ms=startTime; ms<=endTime; ms+=currentYearLength*86400000) {
            currentYearLength = this.agutils.checkIfLeapYear(currentYearObj.getFullYear()+1) ? 366 : 365;
            let currentYearsAmount = 0;

            for (let currDayMS=ms; currDayMS<=ms+(currentYearLength-1)*86400000; currDayMS+=86400000) {
               const currDate = this.agutils.getUIdateFromMS(currDayMS);
               if (currDate in this.chart.bags[bag]) {
                  currentYearsAmount += this.chart.bags[bag][currDate];
               }
            }
            const yeardesc = currentYearObj.getFullYear();
            totalAmount += currentYearsAmount;
            data.push({'period': yeardesc, 'amount': totalAmount});
            currentYearObj = new Date(`${currentYearObj.getFullYear()+1}-01`);
         }
         yearlyData[bag] = data;
      }
      return yearlyData;
   }
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PeriodAggregator);

/***/ }

}]);