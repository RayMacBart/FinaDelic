"use strict";
(globalThis["webpackChunkfinadelic"] = globalThis["webpackChunkfinadelic"] || []).push([["src_in_routing_flowPage_js"],{

/***/ "./src_in/routing/flowPage.js":
/*!************************************!*\
  !*** ./src_in/routing/flowPage.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _flowPage_src_flowPageSurface_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./flowPage_src/flowPageSurface.js */ "./src_in/routing/flowPage_src/flowPageSurface.js");
/* harmony import */ var _flowPage_src_baglist_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./flowPage_src/baglist.js */ "./src_in/routing/flowPage_src/baglist.js");
/* harmony import */ var _flowPage_src_flowlist_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./flowPage_src/flowlist.js */ "./src_in/routing/flowPage_src/flowlist.js");
/* harmony import */ var _flowPage_src_flowPageEventHandler_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./flowPage_src/flowPageEventHandler.js */ "./src_in/routing/flowPage_src/flowPageEventHandler.js");
/* harmony import */ var _toolbar_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./toolbar.js */ "./src_in/routing/toolbar.js");






// for now, DummyData is used instead of fetching bag related folder and transaction content from backend API!


class FlowPage {

   timespan;
   lastFlowCount;

   constructor(dummyData, modal, chart) {
      this.surface = new _flowPage_src_flowPageSurface_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
      this.dummyData = dummyData;
      this.reloadEvent = new Event('bagReload');  // (?)[../../docs/customEventToolbarTrigger.txt]
      this.toolbar = new _toolbar_js__WEBPACK_IMPORTED_MODULE_4__["default"](dummyData, this.reloadEvent, modal, chart);
      this.baglist = new _flowPage_src_baglist_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
      this.flowlist = new _flowPage_src_flowlist_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
      this.eventHandler = new _flowPage_src_flowPageEventHandler_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
      this.chartBags = chart.bags;
   }


   #renderFlowPage(bagName, stepUp=false, toolbarReset=false) {
      // console.log('render');
      this.dummyData.setCurrentBag(bagName, stepUp);
      const bagData = this.dummyData.getData();
      const bagPath = this.dummyData.getBagPath();
      
      const cachedFlowId = this.eventHandler.choosenFlowID;
      this.surface.clear(this.eventHandler);
      
      this.surface.setupProperSurface(bagData, bagPath, (bagName === this.dummyData.revisitFlag), this.timespan);
      
      this.baglist.render(bagData, bagPath);
      this.flowlist.render(bagData, this.timespan);

      if (!((Object.keys(bagData).length === 2) && ('IN' in bagData) && ('OUT' in bagData))) { // --> if not topmost

         // if (bagName === this.dummyData.revisitFlag) {
         if (!(document.getElementById('flowpage-bag').querySelector('#toolbar-wrapper'))) {
            this.toolbar.setupBar();
         }
         
         this.toolbar.currentBagName = bagPath.split('/').pop();
         this.toolbar.handleDirection(bagPath);
         if (((this.toolbar.currentType === 'flow') && (document.querySelector(".flowlist").children.length < this.lastFlowCount)) || 
                                                   (document.querySelector('.menu--account-remove').dataset.removalHappened === 'true')) {
            toolbarReset = true;
         }
         
         
         if (toolbarReset) {
            this.toolbar.activateBar('account');
         } else {
            this.toolbar.activateBar(this.toolbar.currentType);
         }
         if (this.toolbar.boundRefreshHandler) {
            document.removeEventListener('bagReload', this.toolbar.boundRefreshHandler);
         }
         this.toolbar.boundRefreshHandler = this.#renderFlowPage.bind(this, this.dummyData.revisitFlag);
         document.addEventListener('bagReload', this.toolbar.boundRefreshHandler);   // (?)[../../docs/customEventToolbarTrigger.txt]
         
         if (document.querySelector('.dynamicChartButtonText')) {
            document.querySelector('.dynamicChartButtonText').innerText = (bagPath in this.chartBags) ? 'CHART REMOVE' : 'ADD TO CHART';
         } else {
            alert("WARNING!\nCOULDN'T SET DYNAMIC CHART BUTTON TEXT - BUTTON'S TEXT ELEMENT IS MISSING!");
         }
      }
      

      this.#linkBags(bagData, bagPath);
      this.eventHandler.linkFlows(bagData, this.toolbar);
      
      if (cachedFlowId) {
         this.#reselectFlow(cachedFlowId);
      }
      this.lastFlowCount = document.querySelector(".flowlist").children.length;
   }


   #bagClickHandler(nestedBag) {
      this.#renderFlowPage(nestedBag, false, true);
   }


   #linkBags(bagData, bagPath) {
      for (const nestedBag in bagData['nestedBags']) {
         this.eventHandler.boundBagClickHandlers[`${bagPath}/${nestedBag}`] = this.#bagClickHandler.bind(this, nestedBag)
         document.getElementById(`${bagPath}/${nestedBag}`).addEventListener('click', this.eventHandler.boundBagClickHandlers[`${bagPath}/${nestedBag}`]);
      }
   }
   

   #reselectFlow(cachedFlowId) {
      const flowlist = document.querySelector('.flowlist');
      const flowArray = Array.from(flowlist.querySelectorAll('.flowItem'));
      let flowStillHere = false;
      for (const flowItem of flowArray) {
         if (flowItem.dataset.flowId === cachedFlowId) {
            flowStillHere = true;
            flowItem.click();
            this.toolbar.activateBar('flow-change');
         }
      }
      if (!flowStillHere) {
         this.toolbar.activateBar('account');
         // IMPLEMENT POP UP INFO, TELLING THE FLOW DOESN'T APPEAR ANYMORE BECAUSE IT'S NOT IN THE CHOOSEN TIMESPAN ANYMORE!
      }
   }
   
   
   #setupFlowPageLinks(app) {
      document.querySelector('.logo--nav').addEventListener('click', () => app.router.navigate('loggedinHP', ['page--landing']));
      document.getElementById('uparrow-icon-tap-area').addEventListener('click', (e) => {
                                                                            if (!(e.target.dataset.status === 'disabled')) {
                                                                              this.#renderFlowPage('', true, true);
                                                                            }
                                                                        });
      document.getElementById('clock-icon-tap-area').addEventListener('click', () => app.modal.startModal('time')); // OPEN MODAL
      document.getElementById('chart-icon-tap-area').addEventListener('click', () => app.router.navigate('chartPage'));
      document.getElementById('logout-icon-tap-area').addEventListener('click', () => window.location.href = '/out');
      document.querySelector('.buzzer--in').addEventListener('click', () => this.#renderFlowPage('IN'));
      document.querySelector('.buzzer--out').addEventListener('click', () => this.#renderFlowPage('OUT'));
   };
   

   setup(app) {
      if (!this.timespan) {
         this.timespan = app.timespan;
      }
      this.#renderFlowPage(this.dummyData.revisitFlag);
      this.#setupFlowPageLinks(app);
      app.makeIconHoverEffect('uparrow');
      app.makeIconHoverEffect('clock');
      app.makeIconHoverEffect('chart');
      app.makeIconHoverEffect('logout');
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FlowPage);

/***/ }),

/***/ "./src_in/routing/flowPage_src/baglist.js":
/*!************************************************!*\
  !*** ./src_in/routing/flowPage_src/baglist.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _renderAmount_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderAmount.js */ "./src_in/routing/flowPage_src/renderAmount.js");


class BagList {

   doStyle2DirAdjust(amount, amountEl, bagItem) {
      if (amount < 0) {
         bagItem.querySelector('.account-badge').src = './assets/fireheader.svg';
         if (amountEl.classList.contains('positive')) {
            amountEl.classList.replace('positive', 'negative');
         }
      }
      else if (amount > 0) {
         bagItem.querySelector('.account-badge').src = './assets/bagheader.svg';
         if (amountEl.classList.contains('negative')) {
            amountEl.classList.replace('negative', 'positive');
         }
      } else {
         bagItem.querySelector('.account-badge').src = './assets/nullheader.svg';
      }
   }

   render(bagData, bagPath) {
      const bagList = document.querySelector('.baglist');
      if (bagData['nestedBags'] && Object.keys(bagData['nestedBags']).length) {
         bagList.classList.remove('baglist--nobag');
         for (const nestedBag in bagData['nestedBags']) {
            const bag = document.querySelector('.bag').content.cloneNode(true);
            const bagItem = bag.querySelector('.bagItem');
            bagItem.id = bagPath + '/' + nestedBag;
            bagItem.querySelector('.bagTitle').innerText = nestedBag.toUpperCase();
            const amountEl = bagItem.querySelector('.account-amount');
            const amount = parseFloat(bagData['nestedBags'][nestedBag]['amount']);
            this.doStyle2DirAdjust(amount, amountEl, bagItem);
            (0,_renderAmount_js__WEBPACK_IMPORTED_MODULE_0__["default"])(amount, amountEl);
            bagList.appendChild(bagItem);
         }
      } else {
         if (!(bagList.classList.contains('baglist--nobag'))) {
            bagList.classList.add('baglist--nobag');
         }
      }

   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BagList);

/***/ }),

/***/ "./src_in/routing/flowPage_src/chronoOrder.js":
/*!****************************************************!*\
  !*** ./src_in/routing/flowPage_src/chronoOrder.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function chronoInsertFlow(orderedTimes, ID, startIDX, endIDX, dateObj) {  // recursive 'divide & conquer' algorithm

   if (orderedTimes.length) {
      const midDist = Math.floor((endIDX-startIDX)/2);
      if (dateObj.getTime() > orderedTimes[startIDX+midDist][1]) {
         if (midDist) {
            chronoInsertFlow(orderedTimes, ID, startIDX+midDist, endIDX, dateObj);
         } else {
            orderedTimes.splice(startIDX+1, 0, [ID, dateObj.getTime()]);
         }
      } else if (dateObj.getTime() < orderedTimes[startIDX+midDist][1]) {
         if (midDist) {
            chronoInsertFlow(orderedTimes, ID, startIDX, startIDX+midDist, dateObj);
         } else {
            orderedTimes.splice(startIDX, 0, [ID, dateObj.getTime()]);
         }
      } else {
         orderedTimes.splice(startIDX+1, 0, [ID, dateObj.getTime()]);
      }
   } else {
      orderedTimes.push([ID, dateObj.getTime()]);
   }
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (chronoInsertFlow);

/***/ }),

/***/ "./src_in/routing/flowPage_src/flowPageEventHandler.js":
/*!*************************************************************!*\
  !*** ./src_in/routing/flowPage_src/flowPageEventHandler.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class EventHandler {

   boundBagClickHandlers = {};
   boundBGClickHandler;
   choosenFlowID;
   boundFlowClickHandler;

   #unchooseFlow(flowEl) {
      flowEl.classList.remove('flowItem--choosen');
      if (!(flowEl.classList.contains('flowItem--unchoosen'))) {
         flowEl.classList.add('flowItem--unchoosen');
      }
   }

   #deselectFormerFlow() {
      document.querySelector('.view-wrapper').removeEventListener('click', this.boundBGClickHandler);
      const flowItems = document.querySelectorAll('.flowItem');
      flowItems.forEach((flowItem) => {
         if (flowItem.dataset.flowId === this.choosenFlowID) {
            this.#unchooseFlow(flowItem);
         }
      })
   }

   #BGClick(flowEl, toolbar) {
      this.#unchooseFlow(flowEl);
      this.choosenFlowID = null;
      document.querySelector('.view-wrapper').removeEventListener('click', this.boundBGClickHandler);
      this.boundBGClickHandler = null;
      if (toolbar.currentType !== 'account') {
         toolbar.activateBar('account');
      }
   }

   #flowClick(toolbar, event) {
      event.stopPropagation();
      const flowEl = event.target.closest('.flowItem');
      if (flowEl) {
         const id = flowEl.dataset.flowId;
         if (!(this.choosenFlowID === id)) {
            if (this.choosenFlowID) {
               this.#deselectFormerFlow();
            }
            this.boundBGClickHandler = this.#BGClick.bind(this, flowEl, toolbar);
            document.querySelector('.view-wrapper').addEventListener('click', this.boundBGClickHandler);
            this.choosenFlowID = id;
            flowEl.classList.remove('flowItem--unchoosen');
            if (!(flowEl.classList.contains('flowItem--choosen'))) {
               flowEl.classList.add('flowItem--choosen');
            }
            if (toolbar.currentType !== 'flow') {
               toolbar.activateBar('flow');
            }
         } 
      } else {
         console.log('WARNING: TRIED TO ADD FLOW EVENTLISTENER TO NON EXISTING ELEMENT!');
      }
   }

   linkFlows(bagData, toolbar) {
      if (bagData['transactions']) {
         this.boundFlowClickHandler = this.#flowClick.bind(this, toolbar);
         document.querySelector('.flowlist').addEventListener('click', this.boundFlowClickHandler);
      }
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EventHandler);

/***/ }),

/***/ "./src_in/routing/flowPage_src/flowPageSurface.js":
/*!********************************************************!*\
  !*** ./src_in/routing/flowPage_src/flowPageSurface.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _renderAmount_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderAmount.js */ "./src_in/routing/flowPage_src/renderAmount.js");


class FlowbagSurface {

   clear(eventHandler) {
      const baglist = document.querySelector('.baglist');
      const flowlist = document.querySelector('.flowlist');
      const bags = Array.from(baglist.children);
      for (let i=0; i<bags.length; i++) {
         bags[i].removeEventListener('click', eventHandler.boundBagClickHandlers[bags[i].id]);
      }
      eventHandler.boundBagClickHandlers = {};
      baglist.innerHTML = "";
      flowlist.removeEventListener('click', eventHandler.boundFlowClickHandler);
      flowlist.innerHTML = "";
      if (eventHandler.choosenFlowID) {
         document.querySelector('.view-wrapper').removeEventListener('click', eventHandler.boundBGClickHandler);
         eventHandler.choosenFlowID = null;
         eventHandler.boundBGClickHandler = null;
      }
   }
   

   renderTopMostBagAmounts(bagData) {
      (0,_renderAmount_js__WEBPACK_IMPORTED_MODULE_0__["default"])(bagData.IN.amount, document.getElementById('in-total'));
      (0,_renderAmount_js__WEBPACK_IMPORTED_MODULE_0__["default"])(bagData.OUT.amount, document.getElementById('out-total'));
      const totalBalanceEl = document.querySelector('#total-balance > span');
      (0,_renderAmount_js__WEBPACK_IMPORTED_MODULE_0__["default"])(bagData.IN.amount+bagData.OUT.amount, totalBalanceEl);
      if (parseFloat(totalBalanceEl.innerText) < 0) {
         totalBalanceEl.classList.remove('positive');
         if (!(totalBalanceEl.classList.contains('negative'))) {
            totalBalanceEl.classList.add('negative');
         }
      } else {
         totalBalanceEl.classList.remove('negative');
         if (!(totalBalanceEl.classList.contains('positive'))) {
            totalBalanceEl.classList.add('positive');
         }
      }
   }


   setupProperSurface(bagData, bagPath, revisit, timespan) {
      const flowbag = document.getElementById('flowpage-bag');
      const flowtop = document.getElementById('flowpage-top');
      const uparrow_icon = document.querySelector('.icon--uparrow');
      const uparrow_taparea = document.getElementById('uparrow-icon-tap-area');

      document.getElementById('time-start').innerText = timespan.start.getDate()+'.'+(timespan.start.getMonth()+1)+'.'+timespan.start.getFullYear();
      document.getElementById('time-end').innerText = timespan.end.getDate()+'.'+(timespan.end.getMonth()+1)+'.'+timespan.end.getFullYear();
      
      if ((Object.keys(bagData).length === 2) && ('IN' in bagData) && ('OUT' in bagData)) {  // if topmost
         flowbag.style.display = 'none';
         flowtop.style.display = 'block';
         this.renderTopMostBagAmounts(bagData);
         uparrow_icon.src = './assets/icons/uparrow_disabled.svg';
         uparrow_taparea.dataset.status = 'disabled';
         uparrow_taparea.classList.add('icon-tap-area--disabled');
      } else {
         if (bagPath === 'IN' || bagPath === 'OUT' || revisit) { // if IN || OUT: 50% chance user came from topmost
            flowtop.style.display = 'none';
            flowbag.style.display = 'block';
            if (uparrow_taparea.dataset.status === 'disabled') {
               uparrow_icon.src = './assets/icons/uparrow.svg';
               uparrow_taparea.dataset.status = 'enabled';
               uparrow_taparea.classList.remove('icon-tap-area--disabled');
            }
         }


         const titleBG = document.querySelector('.flowBagTitleBG');
         document.querySelector('.flowBagTitle').innerText = bagPath.split('/').pop();
         const totalBagAmountEl = document.querySelector('#bag-total > p > span');
         (0,_renderAmount_js__WEBPACK_IMPORTED_MODULE_0__["default"])(bagData.amount, totalBagAmountEl);
         if (bagData.amount >= 0) {
            titleBG.classList.remove('flowBagTitleBG--fire');
            if (!(titleBG.classList.contains('flowBagTitleBG--bag'))) {
               titleBG.classList.add('flowBagTitleBG--bag');
            }
            if (totalBagAmountEl.classList.contains('negative')) {
               totalBagAmountEl.classList.replace('negative', 'positive');
            }
         } else {
            titleBG.classList.remove('flowBagTitleBG--bag');
            if (!(titleBG.classList.contains('flowBagTitleBG--fire'))) {
               titleBG.classList.add('flowBagTitleBG--fire');
            }
            if (totalBagAmountEl.classList.contains('positive')) {
               totalBagAmountEl.classList.replace('positive', 'negative');
            }
         }
      }
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FlowbagSurface);

/***/ }),

/***/ "./src_in/routing/flowPage_src/flowlist.js":
/*!*************************************************!*\
  !*** ./src_in/routing/flowPage_src/flowlist.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _renderAmount_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderAmount.js */ "./src_in/routing/flowPage_src/renderAmount.js");
/* harmony import */ var _chronoOrder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chronoOrder.js */ "./src_in/routing/flowPage_src/chronoOrder.js");




class FlowList {

   doStyle2DirAdjust(amount, amountEl) {
      if (amount < 0) {
         if (amountEl.classList.contains('positive')) {
            amountEl.classList.replace('positive', 'negative');
            if (amountEl.classList.contains('flowItem--in')) {
               flowItem.classList.replace('flowItem--in', 'flowItem--out');
            } else if (amountEl.classList.contains('flowItem--neutral')) {
               flowItem.classList.replace('flowItem--neutral', 'flowItem--out');
            }
         }
      } else if ((amount > 0) && amountEl.classList.contains('negative')) {
         amountEl.classList.replace('negative', 'positive');
         if (amountEl.classList.contains('flowItem--out')) {
            flowItem.classList.replace('flowItem--out', 'flowItem--in');
         } else if (amountEl.classList.contains('flowItem--neutral')) {
            flowItem.classList.replace('flowItem--neutral', 'flowItem--in');
         }
      } else {
         if (amountEl.classList.contains('flowItem--out')) {
            flowItem.classList.replace('flowItem--out', 'flowItem--neutral');
         } else if (amountEl.classList.contains('flowItem--in')) {
            flowItem.classList.replace('flowItem--in', 'flowItem--neutral');
         }
      }
   }

   render(bagData, timespan) {
      const flowlistBG = document.querySelector('.flowlist-container-BG');
      const footerMargin = document.querySelector('.footer-margin');
      if (bagData['transactions'] && Object.keys(bagData['transactions']).length) {
         
         const orderedFlows = [];
         let flowInPeriodExists = false;
         for (const transaction in bagData['transactions']) {
            const dateArray = bagData['transactions'][transaction]['date'].split('.');
            const formattedDateString = dateArray[2]+'-'+dateArray[1]+'-'+dateArray[0];
            const transDateObj = new Date(formattedDateString);
            if ((timespan.start.getTime() <= transDateObj.getTime()) && (timespan.end.getTime()+86400000 > transDateObj.getTime() )) {  // (?)['../../../../../docs/timespanAddedMS.txt']
               (0,_chronoOrder_js__WEBPACK_IMPORTED_MODULE_1__["default"])(orderedFlows, transaction, 0, orderedFlows.length, transDateObj);
               if (!flowInPeriodExists) {
                  flowInPeriodExists = true;
               }
            }
         }
         if (flowInPeriodExists) {
            flowlistBG.style.display = 'block';
            if (!(footerMargin.classList.contains('footer-margin--flowlist'))) {
               footerMargin.classList.add('footer-margin--flowlist');
            }
         } else {
            flowlistBG.style.display = 'none';
            footerMargin.classList.remove('footer-margin--flowlist');
         }
         for (const orderedFlow of orderedFlows) {
            const flow = document.querySelector('.flow').content.cloneNode(true);
            const flowItem = flow.querySelector('.flowItem');
            flowItem.dataset.flowId = orderedFlow[0];
            flowItem.querySelector('.flow-date').innerText = bagData['transactions'][orderedFlow[0]]['date'];
            flowItem.querySelector('.flow-description').innerText = bagData['transactions'][orderedFlow[0]]['desc'];
            const amount = bagData['transactions'][orderedFlow[0]]['amount'];
            const amountEl = flowItem.querySelector('.flow-amount');
            this.doStyle2DirAdjust(amount, amountEl);
            (0,_renderAmount_js__WEBPACK_IMPORTED_MODULE_0__["default"])(amount, amountEl);
            document.querySelector('.flowlist').appendChild(flowItem);
         }
      } else {
         flowlistBG.style.display = 'none';
         footerMargin.classList.remove('footer-margin--flowlist');
      }
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FlowList);

/***/ }),

/***/ "./src_in/routing/flowPage_src/renderAmount.js":
/*!*****************************************************!*\
  !*** ./src_in/routing/flowPage_src/renderAmount.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function renderAmount(amount, amountEl) {
   const formattedAmount = new Intl.NumberFormat('de-DE').format(amount.toFixed(2));
   const amountArray = String(formattedAmount).split(',');
   if (amountArray.length === 2) {
      if ((Number(amountArray[1]) > 0) && (Number(amountArray[1]) < 10) && (amountArray[1].length === 1)) {
         amountArray[1] = amountArray[1]+'0';
      }
      amountEl.innerText = amountArray[0]+','+amountArray[1];
   } else {
      amountEl.innerText = amountArray[0];
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renderAmount);

/***/ })

}]);