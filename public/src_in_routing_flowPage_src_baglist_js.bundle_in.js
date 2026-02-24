"use strict";
(globalThis["webpackChunkfinadelic"] = globalThis["webpackChunkfinadelic"] || []).push([["src_in_routing_flowPage_src_baglist_js"],{

/***/ "./src_in/routing/flowPage_src/baglist.js"
/*!************************************************!*\
  !*** ./src_in/routing/flowPage_src/baglist.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
            const amount = Number(bagData['nestedBags'][nestedBag]['amount']);
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

/***/ }

}]);