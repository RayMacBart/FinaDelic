"use strict";
(globalThis["webpackChunkfinadelic"] = globalThis["webpackChunkfinadelic"] || []).push([["src_in_routing_flowPage_src_flowlist_js"],{

/***/ "./src_in/routing/flowPage_src/chronoOrder.js"
/*!****************************************************!*\
  !*** ./src_in/routing/flowPage_src/chronoOrder.js ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function chronoInsertFlow(orderedTimes, ID, startIDX, endIDX, dateObj) {  // recursive 'divide & conquer' algorithm

   if (orderedTimes.length) {
      const midDist = Math.floor((endIDX-startIDX)/2);
      if (dateObj.getTime() > orderedTimes[startIDX+midDist][1]) {
         if (midDist) {
            chronoInsertFlow(orderedTimes, ID, startIDX+midDist, endIDX, dateObj);
         } else {
            orderedTimes.splice(startIDX+1, 0, [ID, dateObj.getTime()]);
         }
      } else if (dateObj.getTime() < orderedTimes[startIDX+midDist][1]) {
         if (midDist) {
            chronoInsertFlow(orderedTimes, ID, startIDX, startIDX+midDist, dateObj);
         } else {
            orderedTimes.splice(startIDX, 0, [ID, dateObj.getTime()]);
         }
      } else {
         orderedTimes.splice(startIDX+1, 0, [ID, dateObj.getTime()]);
      }
   } else {
      orderedTimes.push([ID, dateObj.getTime()]);
   }
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (chronoInsertFlow);

/***/ },

/***/ "./src_in/routing/flowPage_src/flowlist.js"
/*!*************************************************!*\
  !*** ./src_in/routing/flowPage_src/flowlist.js ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _renderAmount_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderAmount.js */ "./src_in/routing/flowPage_src/renderAmount.js");
/* harmony import */ var _chronoOrder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chronoOrder.js */ "./src_in/routing/flowPage_src/chronoOrder.js");




class FlowList {

   doStyle2DirAdjust(amount, amountEl) {
      if (amount < 0) {
         if (amountEl.classList.contains('positive')) {
            amountEl.classList.replace('positive', 'negative');
            if (amountEl.classList.contains('flowItem--in')) {
               flowItem.classList.replace('flowItem--in', 'flowItem--out');
            } else if (amountEl.classList.contains('flowItem--neutral')) {
               flowItem.classList.replace('flowItem--neutral', 'flowItem--out');
            }
         }
      } else if ((amount > 0) && amountEl.classList.contains('negative')) {
         amountEl.classList.replace('negative', 'positive');
         if (amountEl.classList.contains('flowItem--out')) {
            flowItem.classList.replace('flowItem--out', 'flowItem--in');
         } else if (amountEl.classList.contains('flowItem--neutral')) {
            flowItem.classList.replace('flowItem--neutral', 'flowItem--in');
         }
      } else {
         if (amountEl.classList.contains('flowItem--out')) {
            flowItem.classList.replace('flowItem--out', 'flowItem--neutral');
         } else if (amountEl.classList.contains('flowItem--in')) {
            flowItem.classList.replace('flowItem--in', 'flowItem--neutral');
         }
      }
   }

   render(bagData, timespan) {
      const flowlistBG = document.querySelector('.flowlist-container-BG');
      const footerMargin = document.querySelector('.footer-margin');
      if (bagData['transactions'] && Object.keys(bagData['transactions']).length) {
         
         const orderedFlows = [];
         let flowInPeriodExists = false;
         for (const transaction in bagData['transactions']) {
            const dateArray = bagData['transactions'][transaction]['date'].split('.');
            const formattedDateString = dateArray[2]+'-'+dateArray[1]+'-'+dateArray[0];
            const transDateObj = new Date(formattedDateString);
            if ((timespan.start.getTime() <= transDateObj.getTime()) && (timespan.end.getTime()+86400000 > transDateObj.getTime() )) {  // (?)['../../../../../docs/timespanAddedMS.txt']
               (0,_chronoOrder_js__WEBPACK_IMPORTED_MODULE_1__["default"])(orderedFlows, transaction, 0, orderedFlows.length, transDateObj);
               if (!flowInPeriodExists) {
                  flowInPeriodExists = true;
               }
            }
         }
         if (flowInPeriodExists) {
            flowlistBG.style.display = 'block';
            if (!(footerMargin.classList.contains('footer-margin--flowlist'))) {
               footerMargin.classList.add('footer-margin--flowlist');
            }
         } else {
            flowlistBG.style.display = 'none';
            footerMargin.classList.remove('footer-margin--flowlist');
         }
         for (const orderedFlow of orderedFlows) {
            const flow = document.querySelector('.flow').content.cloneNode(true);
            const flowItem = flow.querySelector('.flowItem');
            flowItem.dataset.flowId = orderedFlow[0];
            flowItem.querySelector('.flow-date').innerText = bagData['transactions'][orderedFlow[0]]['date'];
            flowItem.querySelector('.flow-description').innerText = bagData['transactions'][orderedFlow[0]]['desc'];
            const amount = bagData['transactions'][orderedFlow[0]]['amount'];
            const amountEl = flowItem.querySelector('.flow-amount');
            this.doStyle2DirAdjust(amount, amountEl);
            (0,_renderAmount_js__WEBPACK_IMPORTED_MODULE_0__["default"])(amount, amountEl);
            document.querySelector('.flowlist').appendChild(flowItem);
         }
      } else {
         flowlistBG.style.display = 'none';
         footerMargin.classList.remove('footer-margin--flowlist');
      }
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FlowList);

/***/ },

/***/ "./src_in/routing/flowPage_src/renderAmount.js"
/*!*****************************************************!*\
  !*** ./src_in/routing/flowPage_src/renderAmount.js ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function renderAmount(amount, amountEl) {
   const formattedAmount = new Intl.NumberFormat('de-DE').format(amount.toFixed(2));
   const amountArray = String(formattedAmount).split(',');
   if (amountArray.length === 2) {
      if ((Number(amountArray[1]) > 0) && (Number(amountArray[1]) < 10) && (amountArray[1].length === 1)) {
         amountArray[1] = amountArray[1]+'0';
      }
      amountEl.innerText = amountArray[0]+','+amountArray[1];
   } else {
      amountEl.innerText = amountArray[0];
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renderAmount);

/***/ }

}]);