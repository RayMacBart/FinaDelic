"use strict";
(globalThis["webpackChunkfinadelic"] = globalThis["webpackChunkfinadelic"] || []).push([["src_out_routing_loginPage_src_serverInteraction_js"],{

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
   static async execSignIn(event) {
      const response = await fetch('/signin', {
                                                method: 'POST',
                                                body: JSON.stringify({email: event.target.form[0].value,
                                                                      password: event.target.form[1].value}),
                                                headers: {
                                                   'Content-Type': 'application/json'
                                                }
                                             });
      if (response.status === 403) {
         (0,_infos_js__WEBPACK_IMPORTED_MODULE_0__.showInfo)('failedSignin', 'warning');
      } else if (response.status === 303) {
         window.location.href = '/';
      }
   }

   static async execSignUp(event) {
      const response = await fetch('/signup', {
                                                method: 'POST',
                                                body: JSON.stringify({email: event.target.form[0].value,
                                                                      password: event.target.form[1].value,
                                                                      repeat: event.target.form[2].value}),
                                                headers: {
                                                   'Content-Type': 'application/json'
                                                }
                                             });
      const status = response.status;
      if (status === 404) {
         alert("We are sorry!\nYour sign up failed due to a server error.\nWe'll fix it fast!");
      } else if (status === 409) {
         (0,_infos_js__WEBPACK_IMPORTED_MODULE_0__.showInfo)('taken');
      } else if (status === 406) {
         console.log('HARAEER');
         (0,_infos_js__WEBPACK_IMPORTED_MODULE_0__.showInfo)('invalidPW', 'warning');
      } else if (status === 400) {
         (0,_infos_js__WEBPACK_IMPORTED_MODULE_0__.showInfo)('repeatMismatch', 'warning');
      } else if (status === 422) {
         const body = await response.json();
         console.log('VALIDATION ERROR MESSAGE:\n', body.msg);
         (0,_infos_js__WEBPACK_IMPORTED_MODULE_0__.showInfo)('ValErr', 'warning', null, body.path);
      } else if (status === 303) {
         window.location.href = '/';
      }
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SIA);

/***/ })

}]);