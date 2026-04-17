"use strict";
(globalThis["webpackChunkfinadelic"] = globalThis["webpackChunkfinadelic"] || []).push([["src_in_routing_flowPage_src_chronoOrder_js"],{

/***/ "./src_in/routing/flowPage_src/chronoOrder.js"
/*!****************************************************!*\
  !*** ./src_in/routing/flowPage_src/chronoOrder.js ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function chronoInsertFlow(orderedTimes, ID, startIDX, endIDX, dateObj) {
  // recursive 'divide & conquer' algorithm

  if (orderedTimes.length) {
    const midDist = Math.floor((endIDX - startIDX) / 2);
    if (dateObj.getTime() > orderedTimes[startIDX + midDist][1]) {
      if (midDist) {
        chronoInsertFlow(orderedTimes, ID, startIDX + midDist, endIDX, dateObj);
      } else {
        orderedTimes.splice(startIDX + 1, 0, [ID, dateObj.getTime()]);
      }
    } else if (dateObj.getTime() < orderedTimes[startIDX + midDist][1]) {
      if (midDist) {
        chronoInsertFlow(orderedTimes, ID, startIDX, startIDX + midDist, dateObj);
      } else {
        orderedTimes.splice(startIDX, 0, [ID, dateObj.getTime()]);
      }
    } else {
      orderedTimes.splice(startIDX + 1, 0, [ID, dateObj.getTime()]);
    }
  } else {
    orderedTimes.push([ID, dateObj.getTime()]);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (chronoInsertFlow);

/***/ }

}]);