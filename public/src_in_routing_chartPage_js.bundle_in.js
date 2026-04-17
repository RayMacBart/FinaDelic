"use strict";
(globalThis["webpackChunkfinadelic"] = globalThis["webpackChunkfinadelic"] || []).push([["src_in_routing_chartPage_js"],{

/***/ "./src_in/routing/chartPage.js"
/*!*************************************!*\
  !*** ./src_in/routing/chartPage.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _chartPage_src_dataPreparator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chartPage_src/dataPreparator.js */ "./src_in/routing/chartPage_src/dataPreparator.js");
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! chart.js */ "./node_modules/chart.js/dist/chart.js");


chart_js__WEBPACK_IMPORTED_MODULE_1__.Chart.register(chart_js__WEBPACK_IMPORTED_MODULE_1__.Colors, chart_js__WEBPACK_IMPORTED_MODULE_1__.Legend, chart_js__WEBPACK_IMPORTED_MODULE_1__.LineController, chart_js__WEBPACK_IMPORTED_MODULE_1__.LineElement, chart_js__WEBPACK_IMPORTED_MODULE_1__.PointElement, chart_js__WEBPACK_IMPORTED_MODULE_1__.CategoryScale, chart_js__WEBPACK_IMPORTED_MODULE_1__.LinearScale, chart_js__WEBPACK_IMPORTED_MODULE_1__.PieController, chart_js__WEBPACK_IMPORTED_MODULE_1__.ArcElement);
class ChartPage {
  legendSize;
  getLegendPluginObj(legendSize) {
    return {
      // display: false,
      position: 'bottom',
      fullSize: true,
      labels: {
        // generateLabels: function()
        color: '#225',
        boxWidth: 23,
        textAlign: 'left',
        padding: 20,
        useBorderRadius: true,
        borderRadius: 6,
        font: {
          size: legendSize,
          weight: 500,
          family: "'Inter', 'sans-serif'"
        }
      }
    };
  }
  constructor(appData, modal, chart) {
    this.appData = appData;
    this.chart = chart;
    this.dataPrep = new _chartPage_src_dataPreparator_js__WEBPACK_IMPORTED_MODULE_0__["default"](appData, chart);
  }
  createPeriodLabels(dataObj) {
    const periodLabels = [];
    for (const bag in dataObj) {
      for (const row of dataObj[bag]) {
        periodLabels.push(row.period);
      }
      break;
    }
    return periodLabels;
  }
  createAmountSets(dataObj) {
    const amountSets = [];
    for (const bag in dataObj) {
      amountSets.push({
        label: bag,
        data: dataObj[bag].map(row => row.amount),
        borderColor: ["#dd3333", "#3333dd", "#eedd00", "#119911", "#bb44bb", "#00bbbb", "#ee9900", "#999999", "#aa7744", "#555555", "#ff8888", "#cccccc", "#111111"]
      });
    }
    return amountSets;
  }
  #switchChart(app) {
    this.chart.type = this.chart.type === 'line' ? 'pie' : 'line';
    app.router.navigate('chartPage');
  }
  #renderChart() {
    let lineDataObj;
    const pageWrap = document.querySelector('.view-wrapper');
    if (pageWrap.getBoundingClientRect().width < 500) {
      this.legendSize = 16;
    } else {
      this.legendSize = 21;
    }
    if (this.chart.type === 'line') {
      document.querySelector('.chart-container').classList.add('line-chart-box');
      lineDataObj = this.dataPrep.prepareLineChartData();
      const periodLabels = this.createPeriodLabels(lineDataObj);
      const amountSets = this.createAmountSets(lineDataObj);
      let lineWidth;
      const canvasXpos = document.querySelector('canvas').getBoundingClientRect().x;
      if (canvasXpos < 150) {
        lineWidth = 2;
      } else if (canvasXpos < 400) {
        lineWidth = 3;
      } else {
        lineWidth = 4;
      }
      (async function (getLegendPluginObj, legendSize) {
        new chart_js__WEBPACK_IMPORTED_MODULE_1__.Chart(document.getElementById('chart'), {
          type: 'line',
          data: {
            labels: periodLabels,
            datasets: amountSets
          },
          options: {
            pointStyle: false,
            borderWidth: lineWidth,
            maintainAspectRatio: false,
            layout: {
              autoPadding: false
              // padding: {top: 10},
            },
            scales: {
              y: {
                ticks: {
                  color: '#1A1A4A',
                  font: {
                    size: 15
                  }
                }
              },
              x: {
                ticks: {
                  color: '#1A1A4A',
                  font: {
                    size: 15
                  }
                }
              }
            },
            plugins: {
              // htmlLegend: {containerID: 'legends'},
              legend: getLegendPluginObj(legendSize)
            }
          }
          // plugins: [htmlLegendPlugin]
        });
      })(this.getLegendPluginObj, this.legendSize);
    } else if (this.chart.type === 'pie') {
      document.querySelector('.chart-container').classList.add('pie-chart-box');
      const pieDataArr = this.dataPrep.preparePieChartData();
      if (pieDataArr.length < 4) {
        document.querySelector('.pie-chart-box').style.height = '16rem';
      } else {
        document.querySelector('.pie-chart-box').style.minHeight = String(5.1 * pieDataArr.length) + 'rem';
      }
      (async function (getLegendPluginObj, legendSize) {
        new chart_js__WEBPACK_IMPORTED_MODULE_1__.Chart(document.getElementById('chart'), {
          type: 'pie',
          data: {
            labels: pieDataArr.map(l => l.bagDesc),
            datasets: [{
              data: pieDataArr.map(l => l.amount),
              backgroundColor: ["#dd3333", "#3333dd", "#eedd00", "#119911", "#bb44bb", "#00bbbb", "#ee9900", "#999999", "#aa7744", "#555555", "#ff8888", "#cccccc", "#111111"]
            }]
          },
          options: {
            maintainAspectRatio: false,
            borderWidth: 0,
            layout: {
              autoPadding: false
              // padding: {top: 10},
            },
            plugins: {
              // htmlLegend: {containerID: 'legends'},
              legend: getLegendPluginObj(legendSize)
            }
          }
          // plugins: [htmlLegendPlugin]
        });
      })(this.getLegendPluginObj, this.legendSize);
    }

    // ALSO TODO: 
    // - IMPLEMENT CHART-TYPE-SWITCH-BUTTON FUNCTIONALITY
    // - FOR EVERY INPUT IN EVERY MODAL: INPUT VALIDATION!!!
  }
  #setTimeHeader(timespan) {
    document.getElementById('time-start-chart').innerText = timespan.start.getDate() + '.' + (timespan.start.getMonth() + 1) + '.' + timespan.start.getFullYear();
    document.getElementById('time-end-chart').innerText = timespan.end.getDate() + '.' + (timespan.end.getMonth() + 1) + '.' + timespan.end.getFullYear();
  }
  #setupChartPageLinks(app) {
    document.querySelector('.logo--nav').addEventListener('click', () => app.router.navigate('loggedinHP', ['page--landing']));
    document.getElementById('switch-icon-tap-area').addEventListener('click', () => this.#switchChart(app)); // CALLS SWITCH FUNCTION
    document.getElementById('clock-icon-tap-area').addEventListener('click', () => app.modal.startModal('time')); // OPEN MODAL
    document.getElementById('flows-icon-tap-area').addEventListener('click', () => app.router.navigate('flowPage'));
    document.getElementById('logout-icon-tap-area').addEventListener('click', () => window.location.href = '/logout');
  }
  setup(app) {
    if (!this.timespan) {
      this.timespan = app.timespan;
    }
    this.#setTimeHeader(app.timespan);
    this.#renderChart();
    this.#setupChartPageLinks(app);
    document.getElementById('username-chart').innerText = app.appData.username;
    app.makeIconHoverEffect('switch');
    app.makeIconHoverEffect('clock');
    app.makeIconHoverEffect('flows');
    app.makeIconHoverEffect('logout');
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChartPage);

/***/ },

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
    const msDiff = endObj.getTime() + 86399999 - startObj.getTime();
    if (msDiff < 4320000000) {
      // up to 49 days, then 7 weeks
      return 'day';
    } else if (msDiff < 21772800000) {
      // up to 36 weeks, then 9 months
      return 'week';
    } else if (msDiff < 94672800000) {
      // up to 36 months, then 12 quarters
      return 'month';
    } else if (msDiff < 252460800000) {
      // up to 32 quarters, then 8 years
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
      const bagShare = (bagObj['amount'] / wholeChartAmount * 100).toFixed(2);
      bagObj['bagDesc'] = bagObj['bagDesc'] + `: ${bagShare}%`;
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
        const formDateKeyStr = dateKeyArr[2] + '-' + dateKeyArr[1] + '-' + dateKeyArr[0];
        const dateKeyObj = new Date(formDateKeyStr);
        if (dateKeyObj >= startObj && dateKeyObj <= endObj) {
          totalAmount += this.chart.bags[bag][datekey];
        }
      }
      const bagDesc = bag.length > 22 ? '...' + bag.slice(-20) : bag;

      // let bagDescArray = bag.split('/');
      // let bagDesc;
      // if (bagDescArray.length > 2) {
      //    const last = bagDescArray.pop();
      //    const secondlast = bagDescArray.pop();
      //    bagDesc = '.../'+secondlast+'/'+last;
      // }
      pieData.push({
        'bagDesc': bagDesc,
        'amount': totalAmount
      });
      pieData[bagDesc] = totalAmount;
    }
    pieData = this.addProcentualValues(pieData);
    pieData = pieData.sort((a, b) => b.amount - a.amount);
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