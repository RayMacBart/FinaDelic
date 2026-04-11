"use strict";
(globalThis["webpackChunkfinadelic"] = globalThis["webpackChunkfinadelic"] || []).push([["src_out_routing_loginPage_ts"],{

/***/ "./src_out/routing/loginPage.ts"
/*!**************************************!*\
  !*** ./src_out/routing/loginPage.ts ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LoginPage)
/* harmony export */ });
/* harmony import */ var _loginPage_src_inputChecker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loginPage_src/inputChecker.js */ "./src_out/routing/loginPage_src/inputChecker.js");
/* harmony import */ var _loginPage_src_serverInteraction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loginPage_src/serverInteraction.js */ "./src_out/routing/loginPage_src/serverInteraction.js");
/* harmony import */ var _infos_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../infos.js */ "./src_out/infos.js");
// LoginPage.ts




/**
 * Minimal app types used by this module
 */

/**
 * Event shape used by handlers: a click event whose target is an element inside a form.
 * We accept the general Event type in handlers and narrow/cast where needed.
 */

/**
 * LoginPage
 *
 * - Binds event handlers once in the constructor and stores them as EventListener
 *   so addEventListener/removeEventListener calls are type-safe and removable.
 * - Public API: setup(app)
 */
class LoginPage {
  // Bound handlers typed as EventListener so they match addEventListener overloads

  constructor() {
    const resetModal = document.getElementById("reset-modal");
    if (!resetModal) {
      throw new Error("LoginPage: required element '#reset-modal' not found");
    }
    this.resetModal = resetModal;
    this.inputChecker = new _loginPage_src_inputChecker_js__WEBPACK_IMPORTED_MODULE_0__["default"]();

    // Bind once and store as EventListener (cast via unknown to satisfy TS)
    this.onSignIn = this.signIn.bind(this);
    this.onSignUp = this.signUp.bind(this);
    this.onOpenResetModal = this.openResetModal.bind(this);
    this.onSubmitReset = this.submitReset.bind(this);
  }

  // -------------------------
  // Internal handlers (accept Event and narrow inside)
  // -------------------------
  signIn(event) {
    event.preventDefault();

    // Narrow event.target to the expected shape
    const target = event.target;
    // InputChecker expects the same event shape as original JS code
    const valid = this.inputChecker.checkSignIn(event);
    if (valid) {
      // SIA.execSignIn expects the event-like object
      _loginPage_src_serverInteraction_js__WEBPACK_IMPORTED_MODULE_1__["default"].execSignIn(event);
      // async BACKEND SEND AND REACT UPON RESPONSE (e.g. app.router.navigate('flowPage') or showInfo('invalidLogin', 'warning')) LOGIC HERE
    }
  }
  signUp(event) {
    event.preventDefault();
    // const valid = this.inputChecker.checkSignUp(event as unknown as Event & { target: any });
    const valid = true;
    if (valid) {
      _loginPage_src_serverInteraction_js__WEBPACK_IMPORTED_MODULE_1__["default"].execSignUp(event);
    }
  }
  submitReset(event) {
    event.preventDefault();
    const target = event.target;
    const form = target.form;
    const mailInput = form ? form[0].value ?? "" : "";
    const isValidEmail = this.inputChecker.emailRX.test(mailInput);
    if (isValidEmail) {
      // POST REQUEST WITH MAILINPUT TO BACKEND - omitted here
      this.resetModal.close();
      (0,_infos_js__WEBPACK_IMPORTED_MODULE_2__.showInfo)("emailSent");
    } else {
      const warn = document.getElementById("invalMailWarn");
      if (warn) {
        warn.style.display = "block";
      }
    }
  }
  openResetModal(event) {
    event.preventDefault();
    this.resetModal.showModal();
    const warn = document.getElementById("invalMailWarn");
    if (warn) {
      warn.style.display = "none";
    }
    const input = document.getElementById("reset-modal-input");
    if (input) {
      input.value = "";
    }
    const resetBtn = document.getElementById("resetSubmitButton");
    if (resetBtn) {
      // attach the submit handler (use the pre-bound EventListener)
      resetBtn.addEventListener("click", this.onSubmitReset);
    }
  }

  // -------------------------
  // Setup wiring
  // -------------------------
  setupLoginPageLinks(app) {
    const backBtn = document.querySelector(".loginBackButton");
    if (backBtn) {
      backBtn.addEventListener("click", () => app.router.navigate("loggedoutHP", ["page--landing"]));
    }
    const forgotLink = document.getElementById("forgotPWlink");
    if (forgotLink) {
      forgotLink.addEventListener("click", this.onOpenResetModal);
    }
    const signInBtn = document.getElementById("sign-in-submit-button");
    if (signInBtn) {
      signInBtn.addEventListener("click", this.onSignIn);
    }
    const termsLink = document.getElementById("inline-terms-link");
    if (termsLink) {
      termsLink.addEventListener("click", event => {
        event.preventDefault();
        app.router.navigate("terms");
      });
    }
    const privacyLink = document.getElementById("inline-privacy-link");
    if (privacyLink) {
      privacyLink.addEventListener("click", event => {
        event.preventDefault();
        app.router.navigate("privacy");
      });
    }
    const signUpBtn = document.getElementById("sign-up-submit-button");
    if (signUpBtn) {
      signUpBtn.addEventListener("click", this.onSignUp);
    }
  }

  // -------------------------
  // Public API
  // -------------------------
  async setup(app) {
    this.setupLoginPageLinks(app);
    await app.lazyLoader.importSVG("FinaDelic Logo Hero", "heroLogoBox", ["logo", "logo--hero"]);
  }
}

/***/ },

/***/ "./src_out/routing/loginPage_src/inputChecker.js"
/*!*******************************************************!*\
  !*** ./src_out/routing/loginPage_src/inputChecker.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _infos_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../infos.js */ "./src_out/infos.js");

class InputChecker {
  emailRX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  passwordRX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[§@.#$€!%*?&])[A-Za-z\d§@.#$€!%*?&]{8,}$/;
  allowedCharRX = /^[A-Za-z\d§@.#$€!%*?&]{1,}$/;
  min8RX = /^[A-Za-z\d§@.#$€!%*?&]{8,}$/;
  lowerRX = /(?=.*[a-z])[A-Za-z\d§@.#$€!%*?&]/;
  upperRX = /(?=.*[A-Z])[A-Za-z\d§@.#$€!%*?&]/;
  min1digitRX = /(?=.*\d)[A-Za-z\d§@.#$€!%*?&]/;
  min1specialRX = /(?=.*[§@.#$€!%*?&])[A-Za-z\d§@.#$€!%*?&]/;
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
    if (!this.min8RX.test(PW)) {
      complaints.push('min. length = 8 characters');
    }
    if (!this.lowerRX.test(PW)) {
      complaints.push('min. 1 lowercase letter');
    }
    if (!this.upperRX.test(PW)) {
      complaints.push('min. 1 uppercase letter');
    }
    if (!this.min1digitRX.test(PW)) {
      complaints.push('min. 1 digit');
    }
    if (!this.min1specialRX.test(PW)) {
      complaints.push('min. 1 special character');
    }
    return complaints;
  }
  checkSignIn(event) {
    let valid = false;
    if (!event.target.form[0].value || !event.target.form[1].value) {
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
    if (!event.target.form[0].value || !event.target.form[1].value) {
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

/***/ },

/***/ "./src_out/routing/loginPage_src/serverInteraction.js"
/*!************************************************************!*\
  !*** ./src_out/routing/loginPage_src/serverInteraction.js ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _infos_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../infos.js */ "./src_out/infos.js");

class SIA {
  static async execSignIn(event) {
    const response = await fetch('/signin', {
      method: 'POST',
      body: JSON.stringify({
        email: event.target.form[0].value,
        password: event.target.form[1].value
      }),
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
      body: JSON.stringify({
        email: event.target.form[0].value,
        password: event.target.form[1].value,
        repeat: event.target.form[2].value
      }),
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
      (0,_infos_js__WEBPACK_IMPORTED_MODULE_0__.showInfo)('invalidPW', 'warning');
    } else if (status === 400) {
      (0,_infos_js__WEBPACK_IMPORTED_MODULE_0__.showInfo)('repeatMismatch', 'warning');
    } else if (status === 422) {
      const body = await response.json();
      (0,_infos_js__WEBPACK_IMPORTED_MODULE_0__.showInfo)('ValErr', 'warning', null, body.path);
    } else if (status === 303) {
      window.location.href = '/';
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SIA);

/***/ }

}]);