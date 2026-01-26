"use strict";
globalThis["webpackHotUpdatefinadelic"]("main",{

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
      'emailSent': 'We sent you an verification email.\nPlease check your mailbox.',
      'userExists': 'This email already is in use!'
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

/***/ "./src_out/route.js":
/*!**************************!*\
  !*** ./src_out/route.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _infos_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./infos.js */ "./src_out/infos.js");



class Router {

   pages = {}

   constructor(app) {
      let frontpath = window.location.pathname;
      this.app = app;
      window.addEventListener('popstate', (e) => {
                                             const extraClassesWanted = [];
                                             let appPath = window.location.pathname;
                                             if (appPath === '/') {
                                                appPath = '/loggedoutHP';
                                             } else if (appPath === '/login') {
                                                appPath = '/loginPage';
                                             }
                                             if (e.state.page === 'loggedoutHP') {
                                                extraClassesWanted.push('page--landing');
                                             }
                                             this.navigate(appPath.slice(1), extraClassesWanted, true);
                                             // this.navigate(e.state.page, extraClassesWanted, true);
                                             });

      if (frontpath === '/' || frontpath === '/out') {
         this.navigate('loggedoutHP', ['page--landing']); 
      } else {
         let wantedpage;
         const routeinfoEl = document.getElementById('routeinfo');
         if (routeinfoEl) {
            wantedpage = routeinfoEl.textContent;
            routeinfoEl.remove();
         } else {
            wantedpage = frontpath;
         }
         this.navigate(wantedpage.slice(1));
         const userWarningEl = document.getElementById('warning');
         if (userWarningEl) {
            (0,_infos_js__WEBPACK_IMPORTED_MODULE_0__.showInfo)(userWarningEl.textContent);
         }
      }
   }

// 'loggedoutHP', ['page--landing'] | 'loginPage' | 'terms' | 'privacy' | 'legal'


   #updatePageClasses(wanted, current) {
      const toDel = [];
      let cls;
      for (cls of current) {
         if (!(wanted.includes(cls)) && !(cls === 'page')) {
            toDel.push(cls);
         }
      }
      for (cls of toDel) {
         current.remove(cls);
      }
      for (cls of wanted) {
         if (!current.contains(cls)) {
            current.add(cls);
         }
      }
   }

   #transit(id, wantedPageClasses) {
      const pageContainer = document.querySelector('.page');
      const page = document.getElementById(id).content.cloneNode(true);
      this.#updatePageClasses(wantedPageClasses, pageContainer.classList)
      pageContainer.replaceChildren(page);
      scrollTo(0, 0);
   }

   navigate = async(pageid, wantedPageClasses=[], popstate=false) => {  // (?)[../docs/methodAsProperty.txt]
      this.#transit(pageid, wantedPageClasses);
      if (!(pageid in this.pages)) {
         const Module = await __webpack_require__("./src_out/routing lazy recursive ^\\.\\/.*\\.js$")(`./${pageid}.js`);
         const newInst = new Module.default(this.app.dummyData, this.app.modal, this.app.chart);
         this.pages[pageid] = newInst;
      }
      const urlname = pageid === 'loginPage' ? 'login' : pageid;
      // if (!popstate) {
      if (pageid === 'loggedoutHP') {
         history.pushState({page: `${pageid}`}, "", '/');
      }
      else {
         history.pushState({page: `${pageid}`}, "", `/${urlname}`);
      }
      // }
      this.pages[pageid].setup(this.app);
   }
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Router);

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("cd0e585efdad06d9e82d")
/******/ })();
/******/ 
/******/ }
);