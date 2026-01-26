"use strict";
globalThis["webpackHotUpdatefinadelic"]("src_out_routing_loginPage_js",{

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

   async #checkUser() {
      const response = await fetch('/signup');
      if (!(response.status === '404')) {
         const json = await response.json();
         console.log('json:\n', json);
      } else {
         alert("We are sorry!\nYour sign up failed due to a server error.\nWe'll fix it fast!");
      }
   }

   #signUp(event) {
      event.preventDefault();
      const valid = this.inputChecker.checkSignUp(event);
      if (valid) {
         this.#checkUser();
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

/***/ })

});