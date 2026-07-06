"use strict";
(globalThis["webpackChunkfinadelic"] = globalThis["webpackChunkfinadelic"] || []).push([["src_in_routing_logger_js"],{

/***/ "./src_in/routing/logger.js"
/*!**********************************!*\
  !*** ./src_in/routing/logger.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const logg = logObj => {
  let CSRFToken = null;
  try {
    CSRFToken = document.querySelector('meta[name="csrf-token"]')?.content || null;
  } catch (e) {
    CSRFToken = null;
  }
  logObj['CSRFToken'] = CSRFToken;
  fetch('/client-errorLog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'CSRF-Token': CSRFToken
    },
    body: JSON.stringify(logObj)
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (logg);

/***/ }

}]);