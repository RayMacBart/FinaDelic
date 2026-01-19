"use strict";
(globalThis["webpackChunkfinadelic"] = globalThis["webpackChunkfinadelic"] || []).push([["src_out_routing_loginPage_js"],{

/***/ "./src_out/infos.js":
/*!**************************!*\
  !*** ./src_out/infos.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   showInfo: () => (/* binding */ showInfo)
/* harmony export */ });
class Infos {

   constructor() {
      this.infoTexts = {
      'invalidTimespan': 'The specified start date is later than the end date. Hence the end date was automatically set to be equal to the start date.',
      'added2chart': 'The current bag was added to the chart.',
      'removedFromChart': 'The current bag was removed from the chart!',
      'flowNotInPeriod': "The date of the affected Flow is not within the selected time period - hence it doesn't appear.",
      'duplicate': "Duplicate name: the Box already contains that entry.",
      'invalidLogin': 'Incorrect email or password.',
      'allEmpty': 'Please enter your email and password.',
      'emptyEmail': 'Please enter your email address.',
      'emptyPW': 'Please enter your password.',
      'invalidEmail': 'Invalid email.',
      'missRepeat': "Please repeat your password.",
      'repeatMismatch': "Your password entries don’t match. Please try again.",
      'password': "Your password does not meet the following requirements:\n",
      'badChars': 'Your password contains special characters which are not allowed. \nPlease only use one of the following characters: \n § @ . # $ ! % * ? & ',
      'checkBoxes': 'You must agree to the Terms & Conditions and confirm the Privacy Policy to continue.',
      'taken': 'This email address is already registered!',
      'emailSent': 'We sent you an verification email.\nPlease check your mailbox.'
      // 'noSpecialChars': 'Beside normal letters, digits and spaces, only  ? ! . , / ) (  are allowed!'
      }
   }
   

   showInfo(infoTitle, infoType='neutral', listing=null) {
      const box = document.createElement('div');
      const text = document.createElement('p');
      box.appendChild(text);
      text.innerText = this.infoTexts[infoTitle];
      if (listing) {
         let newText = text.innerText;
         for (const item of listing) {
            newText = ` ${newText}\n --> ${item}`;
         }
         text.innerText = newText;
      }
      const viewWrapper = document.querySelector('.view-wrapper');
      viewWrapper.appendChild(box);
      box.classList.add('infobox');
      text.classList.add('infotext');
      if (infoType === 'warning') {
         box.classList.add('infobox--warning');
         text.classList.add('infotext--warning');
      } else if (infoType === 'neutral') {
         box.classList.add('infobox--neutral');
         text.classList.add('infotext--neutral');
      }
      setTimeout(() => {
         viewWrapper.removeChild(box);
      }, text.innerText.length*40);
   }
}

const infos = new Infos();
const showInfo = infos.showInfo.bind(infos);



/***/ }),

/***/ "./src_out/routing/loginPage.js":
/*!**************************************!*\
  !*** ./src_out/routing/loginPage.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _loginPage_src_inputChecker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loginPage_src/inputChecker.js */ "./src_out/routing/loginPage_src/inputChecker.js");
/* harmony import */ var _infos_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../infos.js */ "./src_out/infos.js");




class LoginPage {

   
   constructor() {
      this.resetModal = document.getElementById('reset-modal');
      this.inputChecker = new _loginPage_src_inputChecker_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
   }
   

   #signIn(event) {
      event.preventDefault();
      const valid = this.inputChecker.checkSignIn(event);
      if (valid) {
         console.log('sending2backend...');
         // async BACKEND SEND AND REACT UPON RESPONSE (e.g. app.router.navigate('flowPage') or showInfo('invalidLogin', 'warning')) LOGIC HERE
      }
   }


   #signUp(event) {
      event.preventDefault();
      const valid = this.inputChecker.checkSignUp(event);
      if (valid) {
         console.log('sending2backend...');  
         // async BACKEND SEND AND REACT UPON RESPONSE (e.g. app.router.navigate('flowPage') or showInfo('taken'))) LOGIC HERE
      }
   }


   #submitReset(event) {
      event.preventDefault();
      const mailInput = event.target.form[0].value;
      const isValidEmail = this.inputChecker.emailRX.test(mailInput);
      if (isValidEmail) {

         // POST REQUEST WITH MAILINPUT TO BACKEND -
         // IF EMAIL IS FOUND AT BACKEND - THEN SEND THE EMAIL.
         // ELSE: CONSIDER CREATING ANOTHER SHOWINFO-BOX: EMAIL NOT FOUND!
         
         this.resetModal.close();
         (0,_infos_js__WEBPACK_IMPORTED_MODULE_1__.showInfo)('emailSent');
      } else {
         document.getElementById('invalMailWarn').style.display = 'block';
      }
   }

   #openResetModal(event) {
      event.preventDefault();
      this.resetModal.showModal();
      document.getElementById('invalMailWarn').style.display = 'none';
      document.getElementById('reset-modal-input').value = '';
      document.getElementById('resetSubmitButton').addEventListener('click', this.#submitReset.bind(this));
   }


   #setupLoginPageLinks(app) {
      document.querySelector('.loginBackButton').addEventListener('click', () => app.router.navigate('loggedoutHP', ['page--landing']));
      document.getElementById('forgotPWlink').addEventListener('click', this.#openResetModal.bind(this));
      document.getElementById('sign-in-submit-button').addEventListener('click', this.#signIn.bind(this));
      document.getElementById('inline-terms-link').addEventListener('click', (event) => {
                                                                                    event.preventDefault();
                                                                                    app.router.navigate('terms');
                                                                                    }
                                                                   );
      document.getElementById('inline-privacy-link').addEventListener('click', (event) => {
                                                                                    event.preventDefault();
                                                                                    app.router.navigate('privacy');
                                                                                    }
                                                                   );
      document.getElementById('sign-up-submit-button').addEventListener('click', this.#signUp.bind(this));
   }


   async setup(app) {
      this.#setupLoginPageLinks(app);
      await app.lazyLoader.importSVG('FinaDelic Logo Hero', 'heroLogoBox', ['logo', 'logo--hero']);
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LoginPage);

/***/ }),

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