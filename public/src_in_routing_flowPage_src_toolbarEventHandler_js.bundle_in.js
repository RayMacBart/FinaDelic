"use strict";
(globalThis["webpackChunkfinadelic"] = globalThis["webpackChunkfinadelic"] || []).push([["src_in_routing_flowPage_src_toolbarEventHandler_js"],{

/***/ "./src_in/routing/flowPage_src/toolbarEventHandler.js"
/*!************************************************************!*\
  !*** ./src_in/routing/flowPage_src/toolbarEventHandler.js ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
    console.log('in add2chartHandler');
    event.stopPropagation();
    // const toolbarWrapElem = document.getElementById('flowpage-bag').querySelector('#toolbar-wrapper');
    const buttons = document.querySelectorAll('.tool-button');
    for (const button of buttons) {
      if (button.firstElementChild && button.firstElementChild.innerText && button.firstElementChild.innerText.includes('CHART')) {
        button.removeEventListener('click', this.boundAdd2chartHandler);
        button.removeEventListener('click', this.boundRemoveFromChartHandler);
        console.log('add!');
      }
    }
    this.modal.startModal('add2chart');
  }
  removeFromChartHandler(event) {
    console.log('in removeFromChartHandler');
    event.stopPropagation();
    const buttons = document.querySelectorAll('.tool-button');
    for (const button of buttons) {
      if (button.firstElementChild && button.firstElementChild.innerText && button.firstElementChild.innerText.includes('CHART')) {
        button.removeEventListener('click', this.boundRemoveFromChartHandler);
        button.removeEventListener('click', this.boundAdd2chartHandler);
        console.log('rem!');
      }
    }
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

/***/ }

}]);