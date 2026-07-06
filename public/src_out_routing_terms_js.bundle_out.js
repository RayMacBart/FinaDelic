"use strict";
(globalThis["webpackChunkfinadelic"] = globalThis["webpackChunkfinadelic"] || []).push([["src_out_routing_terms_js"],{

/***/ "./src_out/routing/legalTexts_src/termsHTML.js"
/*!*****************************************************!*\
  !*** ./src_out/routing/legalTexts_src/termsHTML.js ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _termsEnglish__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./termsEnglish */ "./src_out/routing/legalTexts_src/termsEnglish.js");
/* harmony import */ var _termsGerman__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./termsGerman */ "./src_out/routing/legalTexts_src/termsGerman.js");


const styling = `
   <style>
   .compPage {
      font-weight: 450;
   }
   .compPage strong {
      font-weight: 650;
   }
   .compPage em {
      font-style: italic;
   }
   .compPage li {
      padding-left: 0.7rem;
      margin-left: 3rem;
      margin-top: 0.8rem;
      margin-bottom: 0.7rem;
      color: #007;
      font-weight: 550;
   }
   ul {
      list-style-type: disc;
   }
    @media screen and (min-width: 576px) {
      #termsContainer {
         width: 30rem;
      }
      #termsContainer > article {
         width: 30rem;
      }
      .compPage__artwrap, .compPage__title, .compPage__paragraph {
         width: 30rem;
      }
    }
   ul {
      list-style-type: disc;
   }
    @media screen and (min-width: 880px) {
      #termsContainer {
         width: 42rem;
      }
      #termsContainer > article {
         width: 42rem;
      }
      .compPage__artwrap, .compPage__title, .compPage__paragraph {
         width: 42rem;
      }
    }
</style>`;
const termsHTML = styling + _termsEnglish__WEBPACK_IMPORTED_MODULE_0__["default"] + _termsGerman__WEBPACK_IMPORTED_MODULE_1__["default"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (termsHTML);

/***/ },

/***/ "./src_out/routing/terms.js"
/*!**********************************!*\
  !*** ./src_out/routing/terms.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _legalTexts_src_termsHTML__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./legalTexts_src/termsHTML */ "./src_out/routing/legalTexts_src/termsHTML.js");

class TermsPage {
  constructor() {
    this.boundSwitchLang = this.switchLang.bind(this);
  }
  retrieveElems() {
    this.englishArticle = document.getElementById('englishTerms');
    this.germanArticle = document.getElementById('germanTerms');
    this.englishSwitch = document.getElementById('termsEnglishSwitchWrap');
    this.germanSwitch = document.getElementById('termsGermanSwitchWrap');
    this.englishTitle = document.getElementById('englishTermsHeader');
    this.germanTitle = document.getElementById('germanTermsHeader');
  }
  switchLang(event) {
    let val1;
    let val2;
    if (event.target.id === 'termsGermanLangSwitch' || event.target.id === 'termsGermanLangSwitchLabel') {
      val1 = 'none';
      val2 = 'block';
    } else if (event.target.id === 'termsEnglishLangSwitch' || event.target.id === 'termsEnglishLangSwitchLabel') {
      val1 = 'block';
      val2 = 'none';
    }
    this.englishArticle.style.display = val1;
    this.germanSwitch.style.display = val1;
    this.englishTitle.style.display = val1;
    this.germanArticle.style.display = val2;
    this.englishSwitch.style.display = val2;
    this.germanTitle.style.display = val2;
  }
  setup(app) {
    document.querySelector('.loginBackButton').addEventListener('click', () => app.router.navigate('loggedoutHP'), ['page--landing']);
    document.getElementById('termsContainer').innerHTML = _legalTexts_src_termsHTML__WEBPACK_IMPORTED_MODULE_0__["default"];
    this.retrieveElems();
    document.getElementById('termsGermanSwitchWrap').addEventListener('click', this.boundSwitchLang);
    document.getElementById('termsEnglishSwitchWrap').addEventListener('click', this.boundSwitchLang);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TermsPage);

/***/ }

}]);