"use strict";
(globalThis["webpackChunkfinadelic"] = globalThis["webpackChunkfinadelic"] || []).push([["src_in_routing_flowPage_src_flowPageEventHandler_js"],{

/***/ "./src_in/routing/flowPage_src/flowPageEventHandler.js"
/*!*************************************************************!*\
  !*** ./src_in/routing/flowPage_src/flowPageEventHandler.js ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
         console.warn('WARNING: TRIED TO ADD FLOW EVENTLISTENER TO NON EXISTING ELEMENT!');
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

/***/ }

}]);