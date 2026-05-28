"use strict";
(globalThis["webpackChunkfinadelic"] = globalThis["webpackChunkfinadelic"] || []).push([["src_out_routing_loginPage_src_serverInteraction_js"],{

/***/ "./src_out/routing/loginPage_src/infos.js"
/*!************************************************!*\
  !*** ./src_out/routing/loginPage_src/infos.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
      'alreadyInChart': 'The current bag already was added to the chart before!',
      'chartPathDelError': "The Box can't be deleted at the server - because it doesn't exist there!",
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
      'invalidPW': 'Invalid Password!\nTry a stronger one.',
      'veriEmailSent': 'We sent you an verification email.\nPlease check your mailbox.\n\nYou may also want to check your spam folder.',
      'resetEmailSent': "We sent you an email.\nPlease click the link inside\nto reset your password.\nYou can't find the email?\nThen you may also want to check your spam folder.",
      'failedSignin': 'Invalid email or password!',
      'ValErr1': 'Invalid input in the field: ',
      'ValErr2': "The server couldn't accept what you entered there.\nPlease try again and enter something different in this field.",
      'emailNotFound': "The specified email address\nis not registered at FinaDelic!",
      'emailNotWorking': "We are sorry!\nThe email wasn't sent because\nthe connection to our SMTP-Host failed.\nPlease try again later."
      // 'noSpecialChars': 'Beside normal letters, digits and spaces, only  ? ! . , / ) (  are allowed!'
    };
  }
  showInfo(infoTitle, infoType = 'neutral', listing = null, field = '') {
    const box = document.createElement('div');
    const text = document.createElement('p');
    box.appendChild(text);
    if (infoTitle === 'ValErr' && field) {
      text.innerText = this.infoTexts['ValErr1'] + '\n\n   ' + field + '\n\n' + this.infoTexts['ValErr2'];
    } else {
      text.innerText = this.infoTexts[infoTitle];
    }
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
    }, text.innerText.length * 55);
  }
}
const infos = new Infos();
const showInfo = infos.showInfo.bind(infos);


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
/* harmony import */ var _infos_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./infos.js */ "./src_out/routing/loginPage_src/infos.js");

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
    } else if (status === 502) {
      (0,_infos_js__WEBPACK_IMPORTED_MODULE_0__.showInfo)('emailNotWorking', 'warning');
    } else if (status === 201) {
      (0,_infos_js__WEBPACK_IMPORTED_MODULE_0__.showInfo)('veriEmailSent');
    }
    // else if (status === 303) {
    //    window.location.href = '/';
    // }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SIA);

/***/ }

}]);