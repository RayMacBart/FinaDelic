"use strict";
(globalThis["webpackChunkfinadelic"] = globalThis["webpackChunkfinadelic"] || []).push([["src_in_routing_chartPage_src_AggregationUtils_js"],{

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
    const properDay = String(dateObj.getDate()).length === 2 ? dateObj.getDate() : '0' + dateObj.getDate();
    const properMonth = String(Number(dateObj.getMonth()) + 1).length === 2 ? Number(dateObj.getMonth()) + 1 : '0' + (Number(dateObj.getMonth()) + 1);
    return properDay + '.' + properMonth + '.' + dateObj.getFullYear();
  }
  checkIfLeapYear(year) {
    if (!(year % 400) || !(year % 4) && year % 100) {
      return true;
    } else {
      return false;
    }
  }
  checkMonthLength(month, year) {
    if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
      return 31;
    } else if ([4, 6, 9, 11].includes(month)) {
      return 30;
    } else {
      // February
      return this.checkIfLeapYear(year) ? 29 : 28;
    }
  }
  getNextMonthObj(currentMonthObj) {
    const currentMonth = currentMonthObj.getMonth() + 1;
    const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
    const currentMonthsYear = currentMonthObj.getFullYear();
    const nextMonthsYear = currentMonth === 12 ? currentMonthsYear + 1 : currentMonthsYear;
    const nextMonthObj = new Date(`${nextMonthsYear}-${nextMonth}`);
    return nextMonthObj;
  }
  checkQuarterLength(month, monthYear) {
    let daySum = 0;
    if ([1, 2, 3].includes(month)) {
      for (let m = 1; m < 4; m++) {
        daySum += this.checkMonthLength(m, monthYear);
      }
    } else if ([4, 5, 6].includes(month)) {
      for (let m = 4; m < 7; m++) {
        daySum += this.checkMonthLength(m, monthYear);
      }
    } else if ([7, 8, 9].includes(month)) {
      for (let m = 7; m < 10; m++) {
        daySum += this.checkMonthLength(m, monthYear);
      }
    } else if ([10, 11, 12].includes(month)) {
      for (let m = 10; m <= 12; m++) {
        daySum += this.checkMonthLength(m, monthYear);
      }
    }
    return daySum;
  }
  getFirstQuarterMonth(month) {
    if ([1, 2, 3].includes(month)) {
      return 1;
    } else if ([4, 5, 6].includes(month)) {
      return 4;
    } else if ([7, 8, 9].includes(month)) {
      return 7;
    } else if ([10, 11, 12].includes(month)) {
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
      return new Date(`${quarterObj.getFullYear() + 1}-01`);
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AggregationUtils);

/***/ }

}]);