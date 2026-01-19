"use strict";
(globalThis["webpackChunkfinadelic"] = globalThis["webpackChunkfinadelic"] || []).push([["src_in_routing_flowPage_src_renderAmount_js"],{

/***/ "./src_in/routing/flowPage_src/renderAmount.js":
/*!*****************************************************!*\
  !*** ./src_in/routing/flowPage_src/renderAmount.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ })

}]);