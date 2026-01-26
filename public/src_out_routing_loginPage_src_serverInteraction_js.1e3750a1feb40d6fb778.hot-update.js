"use strict";
globalThis["webpackHotUpdatefinadelic"]("src_out_routing_loginPage_src_serverInteraction_js",{

/***/ "./src_out/routing/loginPage_src/serverInteraction.js":
/*!************************************************************!*\
  !*** ./src_out/routing/loginPage_src/serverInteraction.js ***!
  \************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _infos_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../infos.js */ "./src_out/infos.js");
/* module decorator */ module = __webpack_require__.hmd(module);


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

module.exports = SIA;

/***/ })

});