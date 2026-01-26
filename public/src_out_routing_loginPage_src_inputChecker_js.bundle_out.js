"use strict";
(globalThis["webpackChunkfinadelic"] = globalThis["webpackChunkfinadelic"] || []).push([["src_out_routing_loginPage_src_inputChecker_js"],{

/***/ "./src_out/routing/loginPage_src/inputChecker.js":
/*!*******************************************************!*\
  !*** ./src_out/routing/loginPage_src/inputChecker.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _infos_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../infos.js */ "./src_out/infos.js");



class InputChecker {

   emailRX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   passwordRX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[§@.#$!%*?&])[A-Za-z\d§@.#$!%*?&]{8,}$/
   allowedCharRX = /^[A-Za-z\d§@.#$!%*?&]{1,}$/;
   min8RX = /^[A-Za-z\d§@.#$!%*?&]{8,}$/;
   lowerRX = /(?=.*[a-z])[A-Za-z\d§@.#$!%*?&]/;
   upperRX = /(?=.*[A-Z])[A-Za-z\d§@.#$!%*?&]/
   min1digitRX = /(?=.*\d)[A-Za-z\d§@.#$!%*?&]/;
   min1specialRX = /(?=.*[§@.#$!%*?&])[A-Za-z\d§@.#$!%*?&]/;


   #handleEmptyCreds(val1, val2) {
      if (!val1 && !val2) {
            (0,_infos_js__WEBPACK_IMPORTED_MODULE_0__.showInfo)('allEmpty');
         } else if (!val1) {
            (0,_infos_js__WEBPACK_IMPORTED_MODULE_0__.showInfo)('emptyEmail');
         } else {
            const isValidEmail = this.emailRX.test(val1);
            if (isValidEmail) {
               (0,_infos_js__WEBPACK_IMPORTED_MODULE_0__.showInfo)('emptyPW');
            } else {
               (0,_infos_js__WEBPACK_IMPORTED_MODULE_0__.showInfo)('invalidEmail', 'warning');
            }
         }
   }


   #assertPW(PW) {
      let complaints = [];
      if (!(this.min8RX.test(PW))) {
         complaints.push('min. length = 8 characters');
      }
      if (!(this.lowerRX.test(PW))) {
         complaints.push('min. 1 lowercase letter');
      }
      if (!(this.upperRX.test(PW))) {
         complaints.push('min. 1 uppercase letter');
      }
      if (!(this.min1digitRX.test(PW))) {
         complaints.push('min. 1 digit');
      }
      if (!(this.min1specialRX.test(PW))) {
         complaints.push('min. 1 special character');
      }

      return complaints;
   }


   checkSignIn(event) {
      let valid = false;
      if ((!(event.target.form[0].value)) || (!(event.target.form[1].value))) {
         this.#handleEmptyCreds(event.target.form[0].value, event.target.form[1].value);
      } else {
         const isValidEmail = this.emailRX.test(event.target.form[0].value);
         if (isValidEmail) {
            const isValidPassword = this.passwordRX.test(event.target.form[1].value);
            if (isValidPassword) {
               valid = true;
            } else {
               (0,_infos_js__WEBPACK_IMPORTED_MODULE_0__.showInfo)('invalidLogin', 'warning');
            }
         } else {
            (0,_infos_js__WEBPACK_IMPORTED_MODULE_0__.showInfo)('invalidLogin', 'warning');
         }
      }
      return valid;
   }


   checkSignUp(event) {
      let valid = false;
      if ((!(event.target.form[0].value)) || (!(event.target.form[1].value))) {
         this.#handleEmptyCreds(event.target.form[0].value, event.target.form[1].value);
      } else {
         const isValidEmail = this.emailRX.test(event.target.form[0].value);
         if (isValidEmail) {
            if (event.target.form[2].value) {
               if (event.target.form[1].value === event.target.form[2].value) {
                  const isValidPassword = this.passwordRX.test(event.target.form[2].value);
                  if (isValidPassword) {
                     if (event.target.form[3].checked && event.target.form[4].checked) {
                        valid = true;
                     } else {
                        (0,_infos_js__WEBPACK_IMPORTED_MODULE_0__.showInfo)('checkBoxes', 'warning');
                     }
                  } else {
                     const noBadChars = this.allowedCharRX.test(event.target.form[2].value);
                     if (noBadChars) {
                        const complaints = this.#assertPW(event.target.form[1].value);
                        (0,_infos_js__WEBPACK_IMPORTED_MODULE_0__.showInfo)('password', 'warning', complaints);
                     } else {
                        (0,_infos_js__WEBPACK_IMPORTED_MODULE_0__.showInfo)('badChars', 'warning');
                     }
                  }
               } else {
                  (0,_infos_js__WEBPACK_IMPORTED_MODULE_0__.showInfo)('repeatMismatch', 'warning');
               }
            } else {
               (0,_infos_js__WEBPACK_IMPORTED_MODULE_0__.showInfo)('missRepeat');
            }
         } else {
            (0,_infos_js__WEBPACK_IMPORTED_MODULE_0__.showInfo)('invalidEmail', 'warning');
         }
      }
      return valid;
   }
   
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InputChecker);

/***/ })

}]);