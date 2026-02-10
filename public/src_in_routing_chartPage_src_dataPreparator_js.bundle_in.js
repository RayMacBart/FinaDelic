"use strict";
(globalThis["webpackChunkfinadelic"] = globalThis["webpackChunkfinadelic"] || []).push([["src_in_routing_chartPage_src_dataPreparator_js"],{

/***/ "./src_in/routing/chartPage_src/dataPreparator.js"
/*!********************************************************!*\
  !*** ./src_in/routing/chartPage_src/dataPreparator.js ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modals_src_submitUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modals_src/submitUtils */ "./src_in/modals_src/submitUtils.js");
/* harmony import */ var _PeriodAggregator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PeriodAggregator.js */ "./src_in/routing/chartPage_src/PeriodAggregator.js");



class dataPreparator {

   constructor(appData, chart) {
      this.utils = new _modals_src_submitUtils__WEBPACK_IMPORTED_MODULE_0__["default"](appData);
      this.PA = new _PeriodAggregator_js__WEBPACK_IMPORTED_MODULE_1__["default"](chart);
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
      for (const bagObj of pieData) {
         wholeChartAmount += bagObj['amount'];
      }
      for (const bagObj of pieData) {
         const bagShare = ((bagObj['amount']/wholeChartAmount)*100).toFixed(2);
         bagObj['bagDesc'] = bagObj['bagDesc']+`: ${bagShare}%`;
         // delete pieData[bag];
      }
      return pieData;
   }


   preparePieChartData() {
      let pieData = [];
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
         const bagDesc = bag.length > 22 ? '...'+bag.slice(-20) : bag;

         // let bagDescArray = bag.split('/');
         // let bagDesc;
         // if (bagDescArray.length > 2) {
         //    const last = bagDescArray.pop();
         //    const secondlast = bagDescArray.pop();
         //    bagDesc = '.../'+secondlast+'/'+last;
         // }
         pieData.push({'bagDesc': bagDesc, 'amount': totalAmount});
         pieData[bagDesc] = totalAmount;
      }
      pieData = this.addProcentualValues(pieData);
      pieData = pieData.sort((a,b) => b.amount - a.amount);
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dataPreparator);


/***/ }

}]);