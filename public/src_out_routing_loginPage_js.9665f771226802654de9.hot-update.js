"use strict";
globalThis["webpackHotUpdatefinadelic"]("src_out_routing_loginPage_js",{

/***/ "./src_out/routing/loginPage_src/serverInteraction.js":
/*!************************************************************!*\
  !*** ./src_out/routing/loginPage_src/serverInteraction.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _infos_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../infos.js */ "./src_out/infos.js");


class SIA {
   static async execSignUp(event) {
      const response = await fetch('/signup', {
                                                method: 'POST',
                                                body: JSON.stringify({email: event.target.form[0].value,
                                                                      password: event.target.form[1].value}),
                                                headers: {
                                                   'Content-Type': 'application/json'
                                                }
                                             });
      if (response.status === 404) {
         alert("We are sorry!\nYour sign up failed due to a server error.\nWe'll fix it fast!");
      } else if (response.status === 409) {
         (0,_infos_js__WEBPACK_IMPORTED_MODULE_0__.showInfo)('taken');
      } else if (response.status === 406) {
         (0,_infos_js__WEBPACK_IMPORTED_MODULE_0__.showInfo)('wrongPW');
      }
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SIA);

/***/ })

});