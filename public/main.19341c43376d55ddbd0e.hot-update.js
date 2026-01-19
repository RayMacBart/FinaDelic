"use strict";
globalThis["webpackHotUpdatefinadelic"]("main",{

/***/ "./src_out/index.js":
/*!**************************!*\
  !*** ./src_out/index.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   chart: () => (/* binding */ chart),
/* harmony export */   router: () => (/* binding */ router),
/* harmony export */   timespan: () => (/* binding */ timespan)
/* harmony export */ });
/* harmony import */ var _footer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./footer.js */ "./src_out/footer.js");
/* harmony import */ var _route_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./route.js */ "./src_out/route.js");
/* harmony import */ var _lazyLoader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lazyLoader.js */ "./src_out/lazyLoader.js");




console.log('starting index.js @ OUT!');
console.log('YYY');

class App {
   constructor() {
      console.log('FULL RELOAD!');
      this.router = new _route_js__WEBPACK_IMPORTED_MODULE_1__["default"](this);
      this.lazyLoader = new _lazyLoader_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
      new _footer_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.router.navigate, this.lazyLoader.importSVG);
   }

   makeIconHoverEffect(iconName) {
      const iconTapArea = document.getElementById(`${iconName}-icon-tap-area`);
      iconTapArea.addEventListener('mouseenter', this.lazyLoader.hoverPicLoader);
      iconTapArea.addEventListener('mouseover', this.lazyLoader.hoverPicLoader);
      iconTapArea.addEventListener('mouseleave', e => this.lazyLoader.hoverPicLoader(e, false));
   }

}


const app = new App();

const timespan = app.timespan;
const router = app.router;
const chart = app.chart;

                           

                                            

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("974ed6c27be6e78aaf6e")
/******/ })();
/******/ 
/******/ }
);