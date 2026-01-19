"use strict";
(globalThis["webpackChunkfinadelic"] = globalThis["webpackChunkfinadelic"] || []).push([["src_in_routing_privacy_js"],{

/***/ "./src_in/routing/privacy.js":
/*!***********************************!*\
  !*** ./src_in/routing/privacy.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class PrivacyPage {

   setup(app) {
      document.querySelector('.loginBackButton').addEventListener('click', () => app.router.navigate('loggedinHP'), ['page--landing']);
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PrivacyPage);

/***/ })

}]);