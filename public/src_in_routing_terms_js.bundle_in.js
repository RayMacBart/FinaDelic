"use strict";
(globalThis["webpackChunkfinadelic"] = globalThis["webpackChunkfinadelic"] || []).push([["src_in_routing_terms_js"],{

/***/ "./src_in/routing/terms.js"
/*!*********************************!*\
  !*** ./src_in/routing/terms.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
    document.querySelector('.loginBackButton').addEventListener('click', () => app.router.navigate('loggedinHP'), ['page--landing']);
    this.retrieveElems();
    document.getElementById('termsGermanSwitchWrap').addEventListener('click', this.boundSwitchLang);
    document.getElementById('termsEnglishSwitchWrap').addEventListener('click', this.boundSwitchLang);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TermsPage);

/***/ }

}]);