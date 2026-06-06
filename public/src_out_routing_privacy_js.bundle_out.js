"use strict";
(globalThis["webpackChunkfinadelic"] = globalThis["webpackChunkfinadelic"] || []).push([["src_out_routing_privacy_js"],{

/***/ "./src_out/routing/legalTexts_src/privacyHTML.js"
/*!*******************************************************!*\
  !*** ./src_out/routing/legalTexts_src/privacyHTML.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _privacyEnglish__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./privacyEnglish */ "./src_out/routing/legalTexts_src/privacyEnglish.js");
/* harmony import */ var _privacyGerman__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./privacyGerman */ "./src_out/routing/legalTexts_src/privacyGerman.js");


const styling = `<style>
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
   .table {
      list-style-type: decimal;
   }
   ul {
      list-style-type: disc;
   }
    @media screen and (min-width: 576px) {
      #privacyContainer {
         width: 30rem;
      }
      #privacyContainer > article {
         width: 30rem;
      }
      .compPage__artwrap, .compPage__title, .compPage__paragraph {
         width: 30rem;
      }
    }
    @media screen and (min-width: 880px) {
      #privacyContainer {
         width: 42rem;
      }
      #privacyContainer > article {
         width: 42rem;
      }
      .compPage__artwrap, .compPage__title, .compPage__paragraph {
         width: 42rem;
      }
    }
</style>`;
const privacyHTML = styling + _privacyEnglish__WEBPACK_IMPORTED_MODULE_0__["default"] + _privacyGerman__WEBPACK_IMPORTED_MODULE_1__["default"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (privacyHTML);

/***/ },

/***/ "./src_out/routing/privacy.js"
/*!************************************!*\
  !*** ./src_out/routing/privacy.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _legalTexts_src_privacyHTML__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./legalTexts_src/privacyHTML */ "./src_out/routing/legalTexts_src/privacyHTML.js");

class PrivacyPage {
  constructor() {
    this.boundSwitchLang = this.switchLang.bind(this);
  }
  retrieveElems() {
    this.englishArticle = document.getElementById('englishPriPol');
    this.germanArticle = document.getElementById('germanPriPol');
    this.englishSwitch = document.getElementById('priPolEnglishSwitchWrap');
    this.germanSwitch = document.getElementById('priPolGermanSwitchWrap');
    this.englishTitle = document.getElementById('englishPriPolHeader');
    this.germanTitle = document.getElementById('germanPriPolHeader');
  }
  switchLang(event) {
    let val1;
    let val2;
    if (event.target.id === 'priPolGermanLangSwitch' || event.target.id === 'priPolGermanLangSwitchLabel') {
      val1 = 'none';
      val2 = 'block';
    } else if (event.target.id === 'priPolEnglishLangSwitch' || event.target.id === 'priPolEnglishLangSwitchLabel') {
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
    document.getElementById('privacyContainer').innerHTML = _legalTexts_src_privacyHTML__WEBPACK_IMPORTED_MODULE_0__["default"];
    this.retrieveElems();
    document.getElementById('priPolGermanSwitchWrap').addEventListener('click', this.boundSwitchLang);
    document.getElementById('priPolEnglishSwitchWrap').addEventListener('click', this.boundSwitchLang);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PrivacyPage);

/***/ }

}]);