"use strict";
globalThis["webpackHotUpdatefinadelic"]("main",{

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
         let wantedpage = frontpath;
         let warningTitle;
         const routeinfoEl = document.getElementById('routeinfo');
         if (routeinfoEl) {
            wantedpage = routeinfoEl.textContent.split('§')[0];
            warningTitle = routeinfoEl.textContent.split('§')[1];
         }
         routeinfoEl.remove();
         this.navigate(wantedpage.slice(1));
         if (warningTitle) {
            console.log('warningTitle:', warningTitle);
            (0,_infos_js__WEBPACK_IMPORTED_MODULE_0__.showInfo)(warningTitle);
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
/******/ 	__webpack_require__.h = () => ("9f83ff41f18b27af345e")
/******/ })();
/******/ 
/******/ }
);