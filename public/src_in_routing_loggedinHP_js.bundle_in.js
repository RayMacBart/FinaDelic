"use strict";
(globalThis["webpackChunkfinadelic"] = globalThis["webpackChunkfinadelic"] || []).push([["src_in_routing_loggedinHP_js"],{

/***/ "./src_in/routing/loggedinHP.js":
/*!**************************************!*\
  !*** ./src_in/routing/loggedinHP.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

class LoggedinHP {
   #setupLoggedinHPLinks(app) {
      // document.getElementById('logout-icon-tap-area').addEventListener('click', () => app.router.navigate('loggedoutHP', ['page--landing']));
      document.getElementById('logout-icon-tap-area').addEventListener('click', () => window.location.href = '/out');
      document.querySelector('a').addEventListener('click', (e) => {e.preventDefault(); app.router.navigate('flowPage');});
      document.querySelector('.button--enter').addEventListener('click', () => app.router.navigate('flowPage'));
   }
   
   async setup(app) {
      this.#setupLoggedinHPLinks(app);
      await app.lazyLoader.importSVG('FinaDelic Logo Hero', 'heroLogoBox', ['logo', 'logo--hero']);
      app.makeIconHoverEffect('logout');
   }
}

const page = new LoggedinHP();


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LoggedinHP);

/***/ })

}]);