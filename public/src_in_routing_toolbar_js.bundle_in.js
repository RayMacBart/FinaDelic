"use strict";
(globalThis["webpackChunkfinadelic"] = globalThis["webpackChunkfinadelic"] || []).push([["src_in_routing_toolbar_js"],{

/***/ "./src_in/routing/flowPage_src/toolbarEventHandler.js":
/*!************************************************************!*\
  !*** ./src_in/routing/flowPage_src/toolbarEventHandler.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class ToolbarEventHandler {
   
   boundAdd2chartHandler;
   boundRemoveFromChartHandler;
   boundAddNestedBagHandler;
   boundAddFlowHandler;
   boundRenameBagHandler;
   boundMoveBagHandler;
   boundEraseBagHandler;
   boundDisbandBagHandler;
   boundDeleteFlowHandler;
   boundMoveFlowHandler;
   boundChangeFlowHandler;
   boundChangeDateHandler;
   boundChangeTextHandler;
   boundChangeAmountHandler;

   constructor(appData, reloadEvent, modal) {
      this.appData = appData;
      this.reloadEvent = reloadEvent;
      this.modal = modal;
      this.modal.reloadEvent = reloadEvent;
   }


   add2chartHandler(event) {
      event.stopPropagation();
      this.modal.startModal('add2chart');
   }


   removeFromChartHandler(event) {
      event.stopPropagation();
      this.modal.startModal('removeFromChart');
   }


   addNestedBagHandler() {
      // NO STOPPROPAGATION() HERE - THIS CAN ONLY BE TRIGGERED IF NO FLOW IS SELECTED ANYWAY
      this.modal.startModal('bag-create');
   }


   addFlowHandler() {
      this.modal.startModal('flow-amount', true);
   }


   renameBagHandler() {
      this.modal.startModal('bag-rename');
   }


   moveBagHandler() {
      this.modal.startModal('bag-move');
   }


   eraseBagHandler() {
      this.modal.startModal('bag-erase');
   }


   disbandBagHandler() {
      this.modal.startModal('bag-disband');
   }


   deleteFlowHandler(event) {
      event.stopPropagation();
      this.modal.startModal('flow-delete');
      
   }


   moveFlowHandler(event) {
      event.stopPropagation();
      this.modal.startModal('flow-move');
   }


   changeDateHandler(event) {
      event.stopPropagation();
      this.modal.startModal('flow-date');
   }


   changeTextHandler(event) {
      event.stopPropagation();
      this.modal.startModal('flow-desc');
   }


   changeAmountHandler(event) {
      event.stopPropagation();
      this.modal.startModal('flow-amount');
   }
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ToolbarEventHandler);

/***/ }),

/***/ "./src_in/routing/toolbar.js":
/*!***********************************!*\
  !*** ./src_in/routing/toolbar.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _flowPage_src_toolbarEventHandler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./flowPage_src/toolbarEventHandler.js */ "./src_in/routing/flowPage_src/toolbarEventHandler.js");


class Toolbar {

   currentType = 'account';
   toolbarElement;
   direction = 'IN';
   boundRefreshHandler;
   currentBagName;
   TEH;

   constructor(appData, reloadEvent, modal, chart) {
      this.TEH = new _flowPage_src_toolbarEventHandler_js__WEBPACK_IMPORTED_MODULE_0__["default"](appData, reloadEvent, modal);
      this.boundModifyHandler = this.modifyHandler.bind(this);
      this.TEH.boundAdd2chartHandler = this.TEH.add2chartHandler.bind(this.TEH);
      this.TEH.boundRemoveFromChartHandler = this.TEH.removeFromChartHandler.bind(this.TEH);
      this.TEH.boundAddNestedBagHandler = this.TEH.addNestedBagHandler.bind(this.TEH);
      this.TEH.boundAddFlowHandler = this.TEH.addFlowHandler.bind(this.TEH);
      this.TEH.boundRenameBagHandler = this.TEH.renameBagHandler.bind(this.TEH);
      this.TEH.boundMoveBagHandler = this.TEH.moveBagHandler.bind(this.TEH);
      this.boundBackToMainHandler = this.backToMainHandler.bind(this);
      this.boundRemoveBagHandler = this.removeBagHandler.bind(this);
      this.TEH.boundEraseBagHandler = this.TEH.eraseBagHandler.bind(this.TEH);
      this.TEH.boundDisbandBagHandler = this.TEH.disbandBagHandler.bind(this.TEH);
      this.TEH.boundDeleteFlowHandler = this.TEH.deleteFlowHandler.bind(this.TEH);
      this.TEH.boundMoveFlowHandler = this.TEH.moveFlowHandler.bind(this.TEH);
      this.boundChangeFlowHandler = this.changeFlowHandler.bind(this);
      this.boundBackToFlowHandler = this.backToFlowHandler.bind(this);
      this.TEH.boundChangeDateHandler = this.TEH.changeDateHandler.bind(this.TEH);
      this.TEH.boundChangeTextHandler = this.TEH.changeTextHandler.bind(this.TEH);
      this.TEH.boundChangeAmountHandler = this.TEH.changeAmountHandler.bind(this.TEH);
      this.chartBags = chart.bags;
      this.setupBar();
   }


   setupBar() {
      if (!document.querySelector('.toolbar-caption')) {
         const flowBag = document.getElementById('flowpage-bag');
         const toolbarFragment = document.getElementById('toolbar').content.cloneNode(true);
         this.toolbarElement = toolbarFragment.getElementById('toolbar-wrapper');
         flowBag.appendChild(this.toolbarElement);
         document.querySelector('.toolbar-caption').lastElementChild.style.fontStyle = 'italic';
      }
      // else {
      //    console.log('Toolbar setup aborted: Toolbar already existed!');
      // }
   }


   activateBar(bartype) {
      if (!this.toolbarElement) {
         this.setupBar();
         this.activateBar(bartype);
      } else {
         if (this.toolbarElement.style.display === 'none') {
            this.toolbarElement.style.display = 'block';
         }
         if (this.currentType) {
            this.toolbarElement.querySelector(`.menu--${this.currentType}`).style.display = 'none';
         }
         this.toolbarElement.querySelector(`.menu--${bartype}`).style.display = 'flex';
         this.currentType = bartype;
         this.#setCaption(bartype);
         this.#setupButtons(bartype);
      }
   }


   #setCaption(bartype) {
      const captionEl = document.querySelector('.toolbar-caption');
      if (captionEl) {
         if (bartype === 'account') {
            const bagDir = this.direction === 'IN' ? 'INBOX:' : 'OUTBOX:';
            if (this.currentBagName === 'IN' || this.currentBagName === 'OUT') {
               captionEl.firstElementChild.style.display = 'none';
               captionEl.lastElementChild.innerText = `${this.currentBagName}`;
            } else {
               captionEl.firstElementChild.style.display = 'inline';
               captionEl.firstElementChild.innerText = bagDir;
               captionEl.lastElementChild.innerText = ` ${this.currentBagName}`;
            }
         } else if (bartype === 'account-modification') {
            captionEl.firstElementChild.innerText = 'Modify:';
            captionEl.lastElementChild.innerText = ` ${this.currentBagName}`;
         } else if (bartype === 'flow') {
            captionEl.firstElementChild.style.display = 'inline';
            captionEl.firstElementChild.innerText = 'Selected Flow:'
            captionEl.lastElementChild.innerText = '';
         } else if (bartype === 'flow-change') {
            captionEl.firstElementChild.innerText = 'Change Flow:'
         }
      } else {
         console.log('toolbar-caption element doesn\'t exist!');
      }
   }


   #setupButtons(bartype) {
      const buttons = this.toolbarElement.querySelectorAll('button');
      if (bartype === 'account') {
         if (this.currentBagName !== 'IN' && this.currentBagName !== 'OUT') {
            buttons[0].style.display = 'inline-block';
            buttons[0].addEventListener('click', this.boundModifyHandler, {once: true});  // (!)[../../docs/secureOnceNote.txt]
         } else {
            buttons[0].style.display = 'none';
         }
         if (this.TEH.appData.getBagPath() in this.chartBags) {
            buttons[1].addEventListener('click', this.TEH.boundRemoveFromChartHandler, {once: true});
         } else {
            buttons[1].addEventListener('click', this.TEH.boundAdd2chartHandler, {once: true});  // (warning)[../../docs/onceListenerWarning.txt]
         }
         // if (buttons[1].firstElementChild.innerText === 'ADD TO CHART') {
         //    buttons[1].addEventListener('click', this.TEH.boundAdd2chartHandler, {once: true});  // (warning)[../../docs/onceListenerWarning.txt]
         // } else if (buttons[1].firstElementChild.innerText === 'CHART: REMOVE') {
         //    buttons[1].addEventListener('click', this.TEH.boundRemoveFromChartHandler, {once: true});
         // }
         buttons[2].addEventListener('click', this.TEH.boundAddNestedBagHandler, {once: true});
         buttons[3].addEventListener('click', this.TEH.boundAddFlowHandler, {once: true});
      }
      else if (bartype === 'account-modification') {
         buttons[4].addEventListener('click', this.boundBackToMainHandler, {once: true});
         buttons[5].addEventListener('click', this.boundRemoveBagHandler, {once: true});
         buttons[6].addEventListener('click', this.TEH.boundRenameBagHandler, {once: true});
         buttons[7].addEventListener('click', this.TEH.boundMoveBagHandler, {once: true});
      }
      else if (bartype === 'account-remove') {
         buttons[8].addEventListener('click', this.boundModifyHandler, {once: true});
         buttons[9].addEventListener('click', this.TEH.boundEraseBagHandler, {once: true});
         buttons[10].addEventListener('click', this.TEH.boundDisbandBagHandler, {once: true});
      }
      else if (bartype === 'flow') {
         buttons[11].addEventListener('click', this.TEH.boundDeleteFlowHandler, {once: true});
         buttons[12].addEventListener('click', this.TEH.boundMoveFlowHandler, {once: true});
         buttons[13].addEventListener('click', this.boundChangeFlowHandler, {once: true});
      }
      else if (bartype === 'flow-change') {
         buttons[14].addEventListener('click', this.boundBackToFlowHandler, {once: true});
         buttons[15].addEventListener('click', this.TEH.boundChangeDateHandler, {once: true});
         buttons[16].addEventListener('click', this.TEH.boundChangeTextHandler, {once: true});
         buttons[17].addEventListener('click', this.TEH.boundChangeAmountHandler, {once: true});
      }
   }


   modifyHandler(event) {
      event.stopPropagation();
      this.activateBar('account-modification');
   }

   backToMainHandler(event) {
      event.stopPropagation();
      this.activateBar('account');
   }

   removeBagHandler(event) {
      event.stopPropagation();
      this.activateBar('account-remove');
   }

   backToFlowHandler(event) {
      event.stopPropagation();
      this.activateBar('flow');
   }

   changeFlowHandler(event) {
      event.stopPropagation();
      this.activateBar('flow-change');
   }


   
   handleDirection(bagPath) {
      if (bagPath.split('/')[0] !== this.direction) {
         this.direction = this.direction === 'IN' ? 'OUT' : 'IN';
         const dynamicWordList = this.toolbarElement.querySelectorAll('span');
         dynamicWordList.forEach((wordElem) => {
            if (wordElem.classList.contains('bagname--uppercase')) {
               wordElem.innerText = this.direction === 'IN' ? 'INBOX' : 'OUTBOX';
            } else if (wordElem.classList.contains('bagname--lowercase')) {
               wordElem.innerText = this.direction === 'IN' ? 'inbox' : 'outbox';
            } else if (wordElem.classList.contains('flowname')) {
               wordElem.innerText = this.direction === 'IN' ? 'GAIN' : 'LOSS';
            }
         })
      }
   }
}
   
   
   /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Toolbar);

/***/ })

}]);