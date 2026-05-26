"use strict";
(globalThis["webpackChunkfinadelic"] = globalThis["webpackChunkfinadelic"] || []).push([["src_in_routing_profilePage_js"],{

/***/ "./src_in/routing/profilePage.js"
/*!***************************************!*\
  !*** ./src_in/routing/profilePage.js ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class ProfilePage {
  constructor(appData, modal, chart) {
    this.modal = modal;
  }
  #delAccountAction() {
    this.modal.reloadEvent = new Event('mockEvent');
    this.modal.startModal('confirmAccDel');
  }
  setup(app) {
    document.getElementById('username-profile').innerText = app.appData.username;
    document.querySelector('.loginBackButton').addEventListener('click', () => app.router.navigate('loggedinHP'), ['page--landing']);
    document.getElementById('deleteLink').addEventListener('click', () => this.#delAccountAction());
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProfilePage);

/***/ }

}]);