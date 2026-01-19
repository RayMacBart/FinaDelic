"use strict";
(globalThis["webpackChunkfinadelic"] = globalThis["webpackChunkfinadelic"] || []).push([["src_out_routing_loggedoutHP_js"],{

/***/ "./src_out/routing/loggedoutHP.js":
/*!****************************************!*\
  !*** ./src_out/routing/loggedoutHP.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

class LoggedoutHP {
   #setupLoggedoutHPLinks(app) {
      document.getElementById('login-icon-tap-area').addEventListener('click', () => app.router.navigate('loginPage'));
      document.querySelector('.button--call2action').addEventListener('click', () => app.router.navigate('loginPage'));
      document.querySelector('.button--enter').addEventListener('click', () => app.router.navigate('loginPage'));
   }
   
   async setup(app) {
      this.#setupLoggedoutHPLinks(app);
      await app.lazyLoader.importSVG('FinaDelic Logo Hero', 'heroLogoBox', ['logo', 'logo--hero']);
      app.makeIconHoverEffect('login');
   }
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LoggedoutHP);

/***/ })

}]);