"use strict";
(globalThis["webpackChunkfinadelic"] = globalThis["webpackChunkfinadelic"] || []).push([["src_in_routing_flowPage_src_flowPageSurface_js"],{

/***/ "./src_in/routing/flowPage_src/flowPageSurface.js"
/*!********************************************************!*\
  !*** ./src_in/routing/flowPage_src/flowPageSurface.js ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _renderAmount_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderAmount.js */ "./src_in/routing/flowPage_src/renderAmount.js");


// import logg from "../logger.js";

class FlowPageSurface {
  clear(eventHandler) {
    const baglist = document.querySelector('.baglist');
    const flowlist = document.querySelector('.flowlist');
    const bags = Array.from(baglist.children);
    for (let i = 0; i < bags.length; i++) {
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
    // logg({location: 'in renderTopMostBagAmounts start'});

    (0,_renderAmount_js__WEBPACK_IMPORTED_MODULE_0__["default"])(bagData.IN.amount, document.getElementById('in-total'));
    (0,_renderAmount_js__WEBPACK_IMPORTED_MODULE_0__["default"])(bagData.OUT.amount, document.getElementById('out-total'));
    const totalBalanceEl = document.querySelector('#total-balance > span');
    (0,_renderAmount_js__WEBPACK_IMPORTED_MODULE_0__["default"])(bagData.IN.amount + bagData.OUT.amount, totalBalanceEl);
    if (Number(totalBalanceEl.innerText) < 0) {
      totalBalanceEl.classList.remove('positive');
      if (!totalBalanceEl.classList.contains('negative')) {
        totalBalanceEl.classList.add('negative');
      }
    } else {
      totalBalanceEl.classList.remove('negative');
      if (!totalBalanceEl.classList.contains('positive')) {
        totalBalanceEl.classList.add('positive');
      }
    }
  }
  setupProperSurface(bagData, bagPath, revisit, timespan) {
    // logg({location: 'setupProperSurface start', revisit: revisit, timespan: timespan});

    const flowbag = document.getElementById('flowpage-bag');
    const flowtop = document.getElementById('flowpage-top');
    const uparrow_icon = document.querySelector('.icon--uparrow');
    const uparrow_taparea = document.getElementById('uparrow-icon-tap-area');
    document.getElementById('time-start').innerText = timespan.start.getDate() + '.' + (timespan.start.getMonth() + 1) + '.' + timespan.start.getFullYear();
    document.getElementById('time-end').innerText = timespan.end.getDate() + '.' + (timespan.end.getMonth() + 1) + '.' + timespan.end.getFullYear();
    if (Object.keys(bagData).length === 2 && 'IN' in bagData && 'OUT' in bagData) {
      // if topmost

      // logg({location: 'in topmost @ SetupPS start'});

      flowbag.style.display = 'none';
      flowtop.style.display = 'block';
      this.renderTopMostBagAmounts(bagData);
      uparrow_icon.src = './assets/icons/uparrow_disabled.svg';
      uparrow_taparea.dataset.status = 'disabled';
      uparrow_taparea.classList.add('icon-tap-area--disabled');
    } else {
      if (bagPath === 'IN' || bagPath === 'OUT' || revisit) {
        // if IN || OUT: 50% chance user came from topmost
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
      if (bagData.amount === 0) {
        titleBG.classList.remove('flowBagTitleBG--fire');
        titleBG.classList.remove('flowBagTitleBG--bag');
        if (!titleBG.classList.contains('flowBagTitleBG--null')) {
          titleBG.classList.add('flowBagTitleBG--null');
        }
      } else if (bagPath.split('/')[0] === 'IN') {
        titleBG.classList.remove('flowBagTitleBG--fire');
        titleBG.classList.remove('flowBagTitleBG--null');
        if (!titleBG.classList.contains('flowBagTitleBG--bag')) {
          titleBG.classList.add('flowBagTitleBG--bag');
        }
        if (totalBagAmountEl.classList.contains('negative')) {
          totalBagAmountEl.classList.replace('negative', 'positive');
        }
      } else {
        titleBG.classList.remove('flowBagTitleBG--bag');
        titleBG.classList.remove('flowBagTitleBG--null');
        if (!titleBG.classList.contains('flowBagTitleBG--fire')) {
          titleBG.classList.add('flowBagTitleBG--fire');
        }
        if (totalBagAmountEl.classList.contains('positive')) {
          totalBagAmountEl.classList.replace('positive', 'negative');
        }
      }
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FlowPageSurface);

/***/ },

/***/ "./src_in/routing/flowPage_src/renderAmount.js"
/*!*****************************************************!*\
  !*** ./src_in/routing/flowPage_src/renderAmount.js ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// import logg from "../logger.js";

function renderAmount(amount, amountEl) {
  // logg({location: 'in renderAmount start!', amount: amount, amountEl: amountEl});
  const formattedAmount = new Intl.NumberFormat('de-DE').format(amount.toFixed(2));
  const amountArray = String(formattedAmount).split(',');
  if (amountArray.length === 2) {
    if (Number(amountArray[1]) > 0 && Number(amountArray[1]) < 10 && amountArray[1].length === 1) {
      amountArray[1] = amountArray[1] + '0';
    }
    amountEl.innerText = amountArray[0] + ',' + amountArray[1];
  } else {
    amountEl.innerText = amountArray[0];
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renderAmount);

/***/ }

}]);