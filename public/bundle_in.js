/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src_in/chart.js":
/*!*************************!*\
  !*** ./src_in/chart.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Chart {

   type = 'line';
   bags = {};  // keys: paths, values: objects of (ALL! also nested) flows with dates as keys and amounts as values!

   constructor(dummyData) {
      this.dummyData = dummyData;
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Chart);

/***/ }),

/***/ "./src_in/dummyData.js":
/*!*****************************!*\
  !*** ./src_in/dummyData.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modals_src_submitUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modals_src/submitUtils.js */ "./src_in/modals_src/submitUtils.js");



class DummyData {

   constructor(timespan) {
      this.revisitFlag = Symbol('revisitFlag');
      this.utils = new _modals_src_submitUtils_js__WEBPACK_IMPORTED_MODULE_0__["default"](this);
      this.setBagAmounts(timespan);
   }


   #currentBag = ''
   

   data = {
      "IN": {
         "nestedBags": {
            "official": {
               "nestedBags": {
                  "teaching": {
                     "nestedBags": {},
                     "transactions": {
                        "31": {
                           "date": "29.10.2025",
                           "desc": "forte",
                           "amount": 4068.74,
                           "currency": "EUR"
                        },
                        "67": {
                           "date": "06.11.2025",
                           "desc": "VHS",
                           "amount": 2760.33,
                           "currency": "EUR"
                        },
                        "2": {
                           "date": "07.12.2025",
                           "desc": "VHS",
                           "amount": 2408.2,
                           "currency": "EUR"
                        }
                     }
                  },
                  "gigs": {
                     "nestedBags": {},
                     "transactions": {
                        "97": {
                           "date": "06.11.2024",
                           "desc": "wimberger",
                           "amount": 177.5,
                           "currency": "EUR"
                        },
                        "88": {
                           "date": "26.05.2025",
                           "desc": "Grüne Grätzlfest",
                           "amount": 225,
                           "currency": "EUR"
                        },
                        "40": {
                           "date": "30.08.2025",
                           "desc": "Schwechater Stadtfest",
                           "amount": 150,
                           "currency": "EUR"
                        },
                     }
                  },
               },
               "transactions": {
                  "32": {
                     "date": "24.04.2025",
                     "desc": "tax return",
                     "amount": 5854.89,
                     "currency": "EUR"
                  },
                  "635": {
                     "date": "30.06.2025",
                     "desc": "small company job",
                     "amount": 9856.3,
                     "currency": "EUR"
                  },
                  "4": {
                     "date": "11.12.2025",
                     "desc": "AKM",
                     "amount": 3500,
                     "currency": "EUR"
                  }
               }
            },
            "inofficial": {
               "nestedBags": {
                  "teaching": {
                     "nestedBags": {},
                     "transactions": {
                        "111": {
                           "date": "13.12.2024",
                           "desc": "Mayers",
                           "amount": 80,
                           "currency": "EUR"
                        },
                        "345": {
                           "date": "25.02.2025",
                           "desc": "Zöhling",
                           "amount": 70,
                           "currency": "EUR"
                        },
                        "19": {
                           "date": "04.03.2025",
                           "desc": "Stella",
                           "amount": 50,
                           "currency": "EUR"
                        },
                        "1": {
                           "date": "14.05.2025",
                           "desc": "Henry",
                           "amount": 50,
                           "currency": "EUR"
                        },
                        "61": {
                           "date": "21.05.2025",
                           "desc": "Berger",
                           "amount": 50,
                           "currency": "EUR"
                        },
                        "182": {
                           "date": "22.11.2025",
                           "desc": "Jan",
                           "amount": 40,
                           "currency": "EUR"
                        },
                        "77": {
                           "date": "03.12.2025",
                           "desc": "Teckentrups",
                           "amount": 50,
                           "currency": "EUR"
                        },
                     }
                  },
                  "gigs": {
                     "nestedBags": {},
                     "transactions": {
                        "297": {
                           "date": "19.10.2024",
                           "desc": "Susi Louisi",
                           "amount": 72,
                           "currency": "EUR"
                        },
                        "13": {
                           "date": "20.04.2025",
                           "desc": "DBT Amadeus",
                           "amount": 60,
                           "currency": "EUR"
                        },
                        "40": {
                           "date": "29.09.2025",
                           "desc": "KUG Leos",
                           "amount": 220,
                           "currency": "EUR"
                        },
                     }
                  },
               },
               "transactions": {
                  "28": {
                     "date": "17.09.2025",
                     "desc": "birthday present",
                     "amount": 1000,
                     "currency": "EUR"
                  },
                  "7": {
                     "date": "24.12.2025",
                     "desc": "christmas present",
                     "amount": 300,
                     "currency": "EUR"
                  },
               }
            },
         },
         "transactions": {}
      },




      "OUT": {
         "nestedBags": {
            "official": {
               "nestedBags": {
                  "music equipment": {
                     "nestedBags": {},
                     "transactions": {
                        "22": {
                           "date": "11.02.2025",
                           "desc": "Stimmgerät @ Thomann",
                           "amount": -16.9,
                           "currency": "EUR"
                        },
                        "100": {
                           "date": "08.06.2025",
                           "desc": "Hughes & Kettner Verstärker Reparatur @ Sinnl & Hanten",
                           "amount": -420.9,
                           "currency": "EUR"
                        },
                        "2": {
                           "date": "07.12.2025",
                           "desc": "Plektren, Gitarrensaiten und Distortion Pedal @ Klangfarbe",
                           "amount": -5.19,
                           "currency": "EUR"
                        }
                     }
                  }
               },
               "transactions": {
                  "46": {
                     "date": "01.04.2025",
                     "desc": "SVS",
                     "amount": -412.81,
                     "currency": "EUR"
                  },
                  "541": {
                     "date": "30.06.2025",
                     "desc": "Kirchenbeitrag",
                     "amount": -31.42,
                     "currency": "EUR"
                  },
               }
            },
            "inofficial": {
               "nestedBags": {
                  "Supermarkt": {
                     "nestedBags": {},
                     "transactions": {
                        "203": {
                           "date": "18.05.2025",
                           "desc": "Hofer",
                           "amount": -78.98,
                           "currency": "EUR"
                        },
                        "345": {
                           "date": "31.03.2025",
                           "desc": "Billa",
                           "amount": -70,
                           "currency": "EUR"
                        },
                        "19": {
                           "date": "10.11.2024",
                           "desc": "Spar",
                           "amount": -111.42,
                           "currency": "EUR"
                        },
                     }
                  },
                  "Miete": {
                     "nestedBags": {},
                     "transactions": {
                        "414": {
                           "date": "02.10.2025",
                           "desc": "Miete",
                           "amount": -650,
                           "currency": "EUR"
                        },
                        "13": {
                           "date": "01.11.2025",
                           "desc": "Miete",
                           "amount": -650,
                           "currency": "EUR"
                        },
                        "40": {
                           "date": "03.12.2025",
                           "desc": "Miete",
                           "amount": -650,
                           "currency": "EUR"
                        },
                     }
                  },
                  "Essen gehen": {
                     "nestedBags": {},
                     "transactions": {
                        "414": {
                           "date": "17.09.2024",
                           "desc": "Watertuin",
                           "amount": -52.4,
                           "currency": "EUR"
                        },
                        "13": {
                           "date": "09.07.2025",
                           "desc": "Wokhaus",
                           "amount": -43.78,
                           "currency": "EUR"
                        },
                        "131": {
                           "date": "30.09.2025",
                           "desc": "Kebap @ Simmering",
                           "amount": -4.5,
                           "currency": "EUR"
                        },
                     }
                  },
                  "Einrichtungen": {
                     "nestedBags": {},
                     "transactions": {
                        "999": {
                           "date": "27.08.2025",
                           "desc": "Willhaben Sitzbank und Schuhkasten @ Graz",
                           "amount": -260,
                           "currency": "EUR"
                        },
                        "123": {
                           "date": "19.09.2025",
                           "desc": "Kastengriffe @ Ikea",
                           "amount": -45.95,
                           "currency": "EUR"
                        }
                     }
                  },
                  "Internet": {
                     "nestedBags": {},
                     "transactions": {
                        "70": {
                           "date": "13.10.2025",
                           "desc": "A1 Internet Monatsgebühren",
                           "amount": -32,
                           "currency": "EUR"
                        },
                        "400": {
                           "date": "13.11.2025",
                           "desc": "A1 Internet Monatsgebühren",
                           "amount": -32,
                           "currency": "EUR"
                        }
                     }
                  },
                  "Handytarif": {
                     "nestedBags": {},
                     "transactions": {
                        "951": {
                           "date": "12.11.2025",
                           "desc": "Spusu",
                           "amount": -7.8,
                           "currency": "EUR"
                        },
                        "763": {
                           "date": "12.12.2025",
                           "desc": "Spusu",
                           "amount": -7.8,
                           "currency": "EUR"
                        }
                     }
                  },
                  "Auto": {
                     "nestedBags": {},
                     "transactions": {
                        "479": {
                           "date": "15.11.2024",
                           "desc": "Tanken",
                           "amount": -76.5,
                           "currency": "EUR"
                        },
                        "763": {
                           "date": "13.01.2025",
                           "desc": "Öamtc Mitgliedschaft",
                           "amount": -121.9,
                           "currency": "EUR"
                        },
                        "170": {
                           "date": "17.09.2025",
                           "desc": "Reparatur, Pickerl und Service: Bremsklötze vorne, Bremsleitungen hinten und Ölschaden",
                           "amount": -1800,
                           "currency": "EUR"
                        },
                        "178": {
                           "date": "23.09.2025",
                           "desc": "Versicherung",
                           "amount": -812.72,
                           "currency": "EUR"
                        }
                     }
                  }
               },
               "transactions": {
                  "28": {
                     "date": "21.02.2025",
                     "desc": "Robi Geschenk: Schallplatten von Red Hot Chili Peppers",
                     "amount": -59.9,
                     "currency": "EUR"
                  },
                  "7": {
                     "date": "11.06.2025",
                     "desc": "Bankgebühr",
                     "amount": -21.7,
                     "currency": "EUR"
                  },
               }
            },
         },
         "transactions": {
            "666": {
               "date": "13.10.2025",
               "desc": "Geldbörserl verloren",
               "amount": -34,
               "currency": "EUR"
            },
         }
      }
   }


   getDeepestPaths() {
      const deepestPaths = [];
      const getMostNestedPath = (focussedObj=this.data, path='') => {
         if (path) {
            if (Object.keys(focussedObj['nestedBags']).length) {
               
               for (const bag in focussedObj['nestedBags']) {
                  getMostNestedPath(focussedObj['nestedBags'][bag], path+'/'+bag);
               }
            } else {
               deepestPaths.push(path);
            }
         } else {
            for (const bag in focussedObj) {
               if (Object.keys(focussedObj[bag]['nestedBags']).length) {
                  for (const nestedBag in focussedObj[bag]['nestedBags']) {
                     getMostNestedPath(focussedObj[bag]['nestedBags'][nestedBag], bag+'/'+nestedBag);
                  }
               } else {
                  deepestPaths.push(bag);
               }
            }
         }
      }
      getMostNestedPath();
      return deepestPaths;
   }


   setBagAmounts(timespan) {
      const deepestPaths = this.getDeepestPaths();
      for (const path of deepestPaths) {
         this.utils.recalcBagAmounts(path.split('/'), null, timespan);
      }
   }


   getBagPath() {
      return this.#currentBag;
   }

   
   changeCurrentBagProp(newName=null) {
      const curBagArray = this.#currentBag.split('/');
      curBagArray.pop();
      if (newName) {
         curBagArray.push(newName);
      }
      this.#currentBag = curBagArray.join('/');
   }


   changeFlow(flowId, 
      date=null,
      desc=null,
      amount=null) {
      this.data[this.#currentBag]['transactions'][flowId]['date'] = date ? date : this.data[this.#currentBag]['transactions'][flowId]['date'];
      this.data[this.#currentBag]['transactions'][flowId]['desc'] = desc ? desc : this.data[this.#currentBag]['transactions'][flowId]['desc'];
      this.data[this.#currentBag]['transactions'][flowId]['amount'] = amount ? amount : this.data[this.#currentBag]['transactions'][flowId]['amount'];
   }

   
   setCurrentBag(bagName, stepUp) {
      if (bagName === this.revisitFlag) {
         return;
      }
      if (!this.#currentBag && stepUp) {
         throw new Error("Error: Can't step up from topmost flowPage!");
      }
      else if (!stepUp) {
         if (this.#currentBag) {
            try {
               if (!(bagName in this.data[this.#currentBag.split('/').pop()]['nestedBags'])) {
                  throw new Error(`Error: Can't find key "${bagName}" in ${this.#currentBag}!`);
               }
            } catch (e) {
               console.log('End of nestedBags-chain reached.');
            }
         } else {
            if (!(bagName in this.data)) {
               throw new Error(`Error: Can't find key "${bagName}" at topmost flow page!`);
            }
         }
      }
      else if (stepUp && (this.#currentBag === "IN" || this.#currentBag === "OUT")) {
         this.#currentBag = '';
         return;
      }
      else if (stepUp) {
         const bagArray = this.#currentBag.split('/');
         bagArray.pop();
         this.#currentBag = bagArray.join('/');
      }
      if (!stepUp) {
         if (this.#currentBag) {
            this.#currentBag = this.#currentBag+'/'+bagName;
         } else {
            this.#currentBag = bagName;
         }
      }
   }


   getData() {
      if (this.#currentBag) {
         let focussedObj = this.data;
         const currentBagList = this.#currentBag.split('/');
         for (const i of currentBagList) {
            if ((i === 'IN') || (i === 'OUT')) {
               focussedObj = focussedObj[i];
            } else if ('nestedBags' in focussedObj) {
               focussedObj = focussedObj['nestedBags'][i];
            } else {
               return {};
            }
         }
         return focussedObj;
      }
      else {
         return this.data;
      }
   }

}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DummyData);

/***/ }),

/***/ "./src_in/footer.js":
/*!**************************!*\
  !*** ./src_in/footer.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

class Footer {

   constructor(navigate, importSVG) {
      this.#getLogo(importSVG);
      this.#setupLinks(navigate);
   }

   async #getLogo(importSVG) {
      this.logo = await importSVG('FinaDelic Logo Footer', 'footerLogoBox', ['logo', 'logo--footer']);
   }

   #setupLinks(navigate) {
      document.querySelector('menu :nth-child(1) > a').addEventListener('click', (e) => {e.preventDefault(); navigate('terms');});
      document.querySelector('menu :nth-child(2) > a').addEventListener('click', (e) => {e.preventDefault(); navigate('privacy');});
      document.querySelector('menu :nth-child(3) > a').addEventListener('click', (e) => {e.preventDefault(); navigate('legal');});
   }
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Footer);

/***/ }),

/***/ "./src_in/index.js":
/*!*************************!*\
  !*** ./src_in/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   chart: () => (/* binding */ chart),
/* harmony export */   router: () => (/* binding */ router),
/* harmony export */   timespan: () => (/* binding */ timespan)
/* harmony export */ });
/* harmony import */ var _footer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./footer.js */ "./src_in/footer.js");
/* harmony import */ var _route_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./route.js */ "./src_in/route.js");
/* harmony import */ var _lazyLoader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lazyLoader.js */ "./src_in/lazyLoader.js");
/* harmony import */ var _timespan_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./timespan.js */ "./src_in/timespan.js");
/* harmony import */ var _dummyData_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dummyData.js */ "./src_in/dummyData.js");
/* harmony import */ var _chart_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./chart.js */ "./src_in/chart.js");
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modal.js */ "./src_in/modal.js");
/* harmony import */ var _modalContents_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modalContents.js */ "./src_in/modalContents.js");










class App {
   constructor() {
      console.log('FULL RELOAD!');
      this.timespan = new _timespan_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
      this.dummyData = new _dummyData_js__WEBPACK_IMPORTED_MODULE_4__["default"](this.timespan);
      this.modal = new _modal_js__WEBPACK_IMPORTED_MODULE_6__["default"](this.dummyData, _modalContents_js__WEBPACK_IMPORTED_MODULE_7__.modalContents);
      this.chart = new _chart_js__WEBPACK_IMPORTED_MODULE_5__["default"](this.dummyData);
      this.router = new _route_js__WEBPACK_IMPORTED_MODULE_1__["default"](this);
      this.lazyLoader = new _lazyLoader_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
      new _footer_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.router.navigate, this.lazyLoader.importSVG);
   }

   makeIconHoverEffect(iconName) {
      const iconTapArea = document.getElementById(`${iconName}-icon-tap-area`);
      iconTapArea.addEventListener('mouseenter', this.lazyLoader.hoverPicLoader);
      iconTapArea.addEventListener('mouseover', this.lazyLoader.hoverPicLoader);
      iconTapArea.addEventListener('mouseleave', e => this.lazyLoader.hoverPicLoader(e, false));
   }

}


const app = new App();

const timespan = app.timespan;
const router = app.router;
const chart = app.chart;

                           

                                            

/***/ }),

/***/ "./src_in/infos.js":
/*!*************************!*\
  !*** ./src_in/infos.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   showInfo: () => (/* binding */ showInfo)
/* harmony export */ });
class Infos {

   constructor() {
      this.infoTexts = {
      'invalidTimespan': 'The specified start date is later than the end date. Hence the end date was automatically set to be equal to the start date.',
      'added2chart': 'The current bag was added to the chart.',
      'removedFromChart': 'The current bag was removed from the chart!',
      'flowNotInPeriod': "The date of the affected Flow is not within the selected time period - hence it doesn't appear.",
      'duplicate': "Duplicate name: the Box already contains that entry.",
      'invalidLogin': 'Incorrect email or password.',
      'allEmpty': 'Please enter your email and password.',
      'emptyEmail': 'Please enter your email address.',
      'emptyPW': 'Please enter your password.',
      'invalidEmail': 'Invalid email.',
      'missRepeat': "Please repeat your password.",
      'repeatMismatch': "Your password entries don’t match. Please try again.",
      'password': "Your password does not meet the following requirements:\n",
      'badChars': 'Your password contains special characters which are not allowed. \nPlease only use one of the following characters: \n § @ . # $ ! % * ? & ',
      'checkBoxes': 'You must agree to the Terms & Conditions and confirm the Privacy Policy to continue.',
      'taken': 'This email address is already registered!',
      'emailSent': 'We sent you an verification email.\nPlease check your mailbox.',
      'ValErr1': 'Invalid input in the field: ',
      'ValErr2': "The server couldn't accept what you entered there.\nPlease try again and enter something different in this field.",
      // 'noSpecialChars': 'Beside normal letters, digits and spaces, only  ? ! . , / ) (  are allowed!'
      }
   }
   

   showInfo(infoTitle, infoType='neutral', listing=null, field='') {
      const box = document.createElement('div');
      const text = document.createElement('p');
      box.appendChild(text);
      if (infoTitle === 'ValidationError' && field) {
         text.innerText = this.infoTexts['ValErr1']+field+this.infoTexts['ValErr2'];
      } else {
         text.innerText = this.infoTexts[infoTitle];
      }
      if (listing) {
         let newText = text.innerText;
         for (const item of listing) {
            newText = ` ${newText}\n --> ${item}`;
         }
         text.innerText = newText;
      }
      const viewWrapper = document.querySelector('.view-wrapper');
      viewWrapper.appendChild(box);
      box.classList.add('infobox');
      text.classList.add('infotext');
      if (infoType === 'warning') {
         box.classList.add('infobox--warning');
         text.classList.add('infotext--warning');
      } else if (infoType === 'neutral') {
         box.classList.add('infobox--neutral');
         text.classList.add('infotext--neutral');
      }
      setTimeout(() => {
         viewWrapper.removeChild(box);
      }, text.innerText.length*40);
   }
}

const infos = new Infos();
const showInfo = infos.showInfo.bind(infos);



/***/ }),

/***/ "./src_in/lazyLoader.js":
/*!******************************!*\
  !*** ./src_in/lazyLoader.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class LazyLoader {


   constructor() {
      this.parser = new DOMParser();
   }
   

   importSVG = async(svgFilename, wrapperCSSclass, ownCSSclasses) => {  // (?)[../docs/methodAsProperty.txt]
      const res = await fetch(`/assets/${svgFilename}.svg`);
      const svgText = await res.text();
      const svg = this.parser.parseFromString(svgText, 'image/svg+xml').documentElement;
      const clonedSVG = svg.cloneNode(true);
      const logoBox = document.querySelector('.'+wrapperCSSclass);
      for (const cls of ownCSSclasses) {
         clonedSVG.classList.add(cls);
      }
      logoBox.appendChild(clonedSVG);
      return clonedSVG;
   }


   hoverPicLoader(e, hover=true) {
      const imgEl = e.target.previousElementSibling;
      if (e.target.dataset.status === 'disabled') {
         imgEl.src = `/assets/icons/${imgEl.dataset.iconDesc}_disabled.svg`;
      } else {
         if (hover) {
            setTimeout(() => {
               imgEl.src = `/assets/icons/${imgEl.dataset.iconDesc}_hovered.svg`;
            }, 100);
         } else {
            setTimeout(() => {
               imgEl.src = `/assets/icons/${imgEl.dataset.iconDesc}.svg`;
            }, 180);
         }  
      }
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LazyLoader);

/***/ }),

/***/ "./src_in/modal.js":
/*!*************************!*\
  !*** ./src_in/modal.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modals_src_inputModal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modals_src/inputModal.js */ "./src_in/modals_src/inputModal.js");
/* harmony import */ var _modals_src_selectModal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modals_src/selectModal.js */ "./src_in/modals_src/selectModal.js");
/* harmony import */ var _modals_src_modalSubmitAllocator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modals_src/modalSubmitAllocator.js */ "./src_in/modals_src/modalSubmitAllocator.js");





class Modal {

   direction;
   reloadEvent;
   inputModalTypes = ['bag-create', 'bag-rename', 'flow-amount', 'flow-desc', 'flow-date', 'time'];
   smallInputLabelModalTypes = ['bag-create', 'bag-rename'];  // extendable array!
   currentModalType;
   isModalSeries;

   constructor(dummyData, modalContents) {
      this.dummyData = dummyData;
      this.modalContents = modalContents;
      this.dialog = document.getElementById('main-modal-element');
      this.elements = {
         'form': this.dialog.querySelector('.modal-form'),
         'text-1': this.dialog.querySelector('.modal__text-1'),
         'text-2': this.dialog.querySelector('.modal__text-2'),
         'text-3': this.dialog.querySelector('.modal__text-3'),
         'text-4': this.dialog.querySelector('.modal__text-4'),
         'questionmark': this.dialog.querySelector('.modal__questionmark'),
         'input-label': this.dialog.querySelector('.modal__input-label'),
         'input': this.dialog.querySelector('.modal__input'),
         'start-date-label': this.dialog.querySelector('.modal__start-date-label'),
         'start-date': this.dialog.querySelector('.modal__start-date'),
         'end-date-label': this.dialog.querySelector('.modal__end-date-label'),
         'end-date': this.dialog.querySelector('.modal__end-date'),
         'select-label': this.dialog.querySelector('.modal__select-label'),
         'select': this.dialog.querySelector('.modal__select'),
         'amount-input-wrapper': this.dialog.querySelector('.modal__amount-input-wrapper'),
         'submit-button': this.dialog.querySelector('.modal-button-wrapper > input'),
         'date-submit-button': this.dialog.querySelector('.modal-button-wrapper > .datesubmit'),
         'cancel-button': this.dialog.querySelector('.modal-button-wrapper > .cancelButton'),
      }
      this.boundSubmitFunction = this.submitModal.bind(this);
      this.boundCancelFunction = this.finishModal.bind(this);
      this.inputModal = new _modals_src_inputModal_js__WEBPACK_IMPORTED_MODULE_0__["default"](this);
      this.selectModal = new _modals_src_selectModal_js__WEBPACK_IMPORTED_MODULE_1__["default"](this);
      this.modSub = new _modals_src_modalSubmitAllocator_js__WEBPACK_IMPORTED_MODULE_2__["default"](this.dummyData);
      this.dialog.addEventListener('keydown', (e) => {if (e.key === 'Escape') {document.dispatchEvent(this.reloadEvent);}});
   }


   startModal(modalType, isModalSeries=false) {
      this.direction = this.dummyData.getBagPath().split('/')[0];
      this.currentModalType = modalType;
      this.isModalSeries = isModalSeries;
      this.runModal();
      this.dialog.showModal();
   }
'time'

   finishModal() {
      if (this.smallInputLabelModalTypes.includes(this.currentModalType)) {   
         this.elements['input-label'].style.fontSize = '1.375rem';
      }
      if (this.currentModalType === 'time') {
         this.elements['start-date-label'].style.fontSize = '1.375rem';
         this.elements['end-date-label'].style.fontSize = '1.375rem';
         document.querySelector('.modal__start-date-wrapper').style.display = 'none';
         document.querySelector('.modal__end-date-wrapper').style.display = 'none';
      }
      for (const elemName in this.modalContents[this.currentModalType]) {
         this.elements[elemName].style.display = 'none';
         if (elemName === 'input' || elemName === 'date-submit-button') {
            this.elements[elemName].value = '';
         }
      }
      if (this.currentModalType === 'flow-amount') {
         document.getElementById('amount-predecimal').value = '';
         document.getElementById('amount-decimal').value = '';
      }
      if (this.inputModalTypes.includes(this.currentModalType)) {
         if (this.elements['submit-button'].classList.contains('modal__button--disabled')) {
            this.elements['submit-button'].classList.remove('modal__button--disabled');
         }
         this.elements['submit-button'].classList.add('modal__button--positive');
      }
      if (this.currentModalType === 'time') {
         document.querySelector('.modal__button--positive').disabled = false;
      }
      if (['bag-move', 'flow-move'].includes(this.currentModalType)) {
         this.elements['select'].querySelector('.option-container').innerHTML = '';
         this.elements['select'].value = '';
         this.elements['select'].querySelector('.modal-select-defaulttext').innerText = ' -- choose -- ';
      }
      if (this.currentModalType === 'flow-date') {
         this.elements['input'].type = 'text';
      }
      if ((this.currentModalType !== 'time') || (window.location.href.split('/').pop() === 'flowPage')) {
         document.dispatchEvent(this.reloadEvent);
      }
   }


   submitModal() {
      this.elements['submit-button'].removeEventListener('click', this.boundSubmitFunction);
      const currentElems = {};
      for (const elemName in this.modalContents[this.currentModalType]) {
         currentElems[elemName] = this.elements[elemName];
      }
      let flowchange = false;
      if (['flow-date', 'flow-desc', 'flow-amount'].includes(this.currentModalType) && !this.isModalSeries) {
         flowchange = true;
      }
      this.modSub.prepare(currentElems, this.currentModalType, this.dummyData.getBagPath(), flowchange, this.reloadEvent);
      this.modSub.allocateAndSubmit(this.currentModalType);
      this.finishModal();
      if (this.currentModalType === 'flow-amount' && this.isModalSeries) {
         this.startModal('flow-desc', true);
      } else if (this.currentModalType === 'flow-desc' && this.isModalSeries) {
         this.startModal('flow-date', true);
      }
   }


   getAdjustedInnerText(elemName) {
      const bagtype = this.direction === 'IN' ? 'INBOX' : 'OUTBOX';
      const flowtype = this.direction === 'IN' ? 'GAIN' : 'LOSS';
      let innerText = this.modalContents[this.currentModalType][elemName];
      if (typeof innerText === 'string') {
         if (innerText.includes('BAGNAME')) {
            innerText = innerText.replace('BAGNAME', '"'+this.dummyData.getBagPath().split('/').pop().toUpperCase()+'"');
         }
         if (innerText.includes('BAG')) {
            innerText = innerText.replace('BAG', bagtype);
         }
         if (innerText.includes('bag')) {
            innerText = innerText.replace('bag', bagtype.toLowerCase());
         }
         if (innerText.includes('FLOW')) {
            innerText = innerText.replace('FLOW', flowtype);
         }
         if (innerText.includes('flow')) {
            innerText = innerText.replace('flow', flowtype.toLowerCase());
         }
      }
      return innerText
   }


   runModal() {
      for (const elemName in this.modalContents[this.currentModalType]) {
         if (['submit-button', 'cancel-button', 'date-submit-button'].includes(elemName)) {
            this.elements[elemName].style.display = 'inline-block';
         } else if (['start-date', 'end-date'].includes(elemName)) {
            this.elements[elemName].closest(`.modal__${elemName}-wrapper`).style.display = 'inline-block';
            this.elements[elemName].style.display = 'block';
         } else {
            this.elements[elemName].style.display = 'block';
         }
         if (['submit-button', 'date-submit-button'].includes(elemName)) {
            this.elements[elemName].value = this.getAdjustedInnerText(elemName);
         } else if (!(['input', 'select', 'amount-input-wrapper'].includes(elemName))) {
            this.elements[elemName].innerText = this.getAdjustedInnerText(elemName);
         }
      }
      if (this.smallInputLabelModalTypes.includes(this.currentModalType)) {
         this.elements['input-label'].style.fontSize = '1.1rem';
      }
      if (this.currentModalType === 'time') {
         this.elements['start-date-label'].style.fontSize = '1.1rem';
         this.elements['end-date-label'].style.fontSize = '1.1rem';
      }
      if (this.inputModalTypes.includes(this.currentModalType)) {
         this.inputModal.setup();
      } else if (this.currentModalType === 'bag-move') {
         this.selectModal.setup(true);
      } else if (this.currentModalType === 'flow-move') {
         this.selectModal.setup(false);
      } else {
         if (this.currentModalType === 'bag-disband') {
            const pathArray = this.dummyData.getBagPath().split('/');
            const parentBagName = pathArray[pathArray.length-2];
            document.querySelector('.modal__text-4').innerText = parentBagName.toUpperCase();
         }
         if (!this.elements['submit-button'].classList.contains('modal__button--positive')) {
            this.elements['submit-button'].classList.add('modal__button--positive');
         }
         this.elements['submit-button'].classList.remove('modal__button--disabled');
         
         if (['add2chart', 'removeFromChart'].includes(this.currentModalType)) {
            this.elements['submit-button'].disabled = false;
         }

         this.elements['submit-button'].addEventListener('click', this.boundSubmitFunction, {once: true});
      }
      this.elements['cancel-button'].addEventListener('click', this.boundCancelFunction, {once: true});
   }

}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Modal);

/***/ }),

/***/ "./src_in/modalContents.js":
/*!*********************************!*\
  !*** ./src_in/modalContents.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   modalContents: () => (/* binding */ modalContents)
/* harmony export */ });
const modalContents = {
      'add2chart': {
         'text-1': 'Are you sure you want to add',
         'text-2': 'BAGNAME',
         'text-3': 'to the current chart?',
         'submit-button': 'YES',
         'cancel-button': 'NO'
      },
      'removeFromChart': {
         'text-1': 'Are you sure you want to remove',
         'text-2': 'BAGNAME',
         'text-3': 'from the current chart?',
         'submit-button': 'YES',
         'cancel-button': 'NO'
      },
      'bag-create': {
         'text-1': 'CREATE NEW BAG',
         'input-label': 'Enter Name',
         'input': true,
         'submit-button': 'CREATE',
         'cancel-button': 'CANCEL'
      },
      'bag-rename': {
         'text-1': 'old name:',
         'text-2': 'BAGNAME',
         'input-label': 'Enter new name:',
         'input': true,
         'submit-button': 'RENAME',
         'cancel-button': 'CANCEL'
      },
      'bag-erase': {
         'text-1': 'Are you sure you want to delete',
         'text-2': 'BAGNAME',
         'text-3': 'and also all the content inside',
         'questionmark': '?',
         'submit-button': 'YES',
         'cancel-button': 'NO'
      },
      'bag-disband': {
         'text-1': 'Are you sure you want to delete',
         'text-2': 'BAGNAME',
         'text-3': 'and move all it\'s content up to',
         'text-4': 'PARENTBAG',
         'questionmark': '?',
         'submit-button': 'YES',
         'cancel-button': 'NO'
      },
      'bag-move': {
         'text-1': 'MOVE',
         'text-2': 'BAGNAME',
         'select-label': 'Choose destination bag:',
         'select': true,
         'submit-button': 'MOVE',
         'cancel-button': 'CANCEL'
      },
      'flow-delete': {
         'text-1': 'Are you sure you want to delete the selected flow',
         'questionmark': '?',
         'submit-button': 'YES',
         'cancel-button': 'NO'
      },
      'flow-amount': {
         'text-1': 'Enter Amount:',
         'amount-input-wrapper': true,
         'submit-button': 'OK',
         'cancel-button': 'CANCEL'
      },
      'flow-desc': {
         'input-label': 'Enter Description:',
         'input': true,
         'submit-button': 'OK',
         'cancel-button': 'CANCEL'
      },
      'flow-date': {
         'input-label': 'Enter Date:',
         'input': true,
         'date-submit-button': 'OK',
         'cancel-button': 'CANCEL'
      },
      'flow-move': {
         'text-1': 'MOVE FLOW',
         'select-label': 'Choose destination bag:',
         'select': true,
         'submit-button': 'MOVE',
         'cancel-button': 'CANCEL'
      },
      'time': {
         'text-1': 'Select the time period to be considered',
         'start-date-label': 'Start Date:',
         'start-date': true,
         'end-date-label': 'End Date:',
         'end-date': true,
         'date-submit-button': 'SET',
         'cancel-button': 'CANCEL'
      }
   }

   

/***/ }),

/***/ "./src_in/modals_src/bagSubmits.js":
/*!*****************************************!*\
  !*** ./src_in/modals_src/bagSubmits.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _infos_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../infos.js */ "./src_in/infos.js");
/* harmony import */ var _submitUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./submitUtils.js */ "./src_in/modals_src/submitUtils.js");





class BagSubmits {


   currelems;
   bagPath;


   constructor(dummyData) {
      this.dummyData = dummyData;
      this.utils = new _submitUtils_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.dummyData);
   }  


   bagCreate() {
      const newBagName = this.currelems['input'].value;
      const duplicateDetected = this.utils.check4Duplicate(newBagName, this.bagPath);
      if (!duplicateDetected) {
         this.dummyData.getData()['nestedBags'][newBagName] = {
            'amount': 0,
            'nestedBags': {},
            'transactions': {}
         };
      } else {
         (0,_infos_js__WEBPACK_IMPORTED_MODULE_0__.showInfo)('duplicate', 'warning');
      }
   }


   bagRename() {
      this.utils.bagPath = this.bagPath;
      const newBagName = this.currelems['input'].value;
      const bagArray = this.bagPath.split('/');
      const currentBagName = bagArray.pop();
      const duplicateDetected = this.utils.check4Duplicate(newBagName, bagArray.join('/'));
      if (!duplicateDetected) {
         const parentObj = this.utils.getParentObj(currentBagName);
         parentObj[newBagName] = {...parentObj[currentBagName]};
         delete parentObj[currentBagName];
         this.dummyData.changeCurrentBagProp(newBagName);
         this.utils.checkAndAdjustChart(null, false, {'old': this.bagPath, 'new': bagArray.join('/')+'/'+newBagName});
      } else {
         (0,_infos_js__WEBPACK_IMPORTED_MODULE_0__.showInfo)('duplicate', 'warning');
      }
   } 


   bagErase() {
      this.utils.bagPath = this.bagPath;
      const currentBagName = this.bagPath.split('/').pop();
      const parentObj = this.utils.getParentObj(currentBagName);
      delete parentObj[currentBagName];
      this.dummyData.changeCurrentBagProp();
      this.utils.checkAndAdjustChart();
      document.querySelector('.menu--account-remove').dataset.removalHappened = true;
   }

   transferBag(currentBagName, destinationBag=null) {
      this.utils.bagPath = this.bagPath;
      const currentBagObj = this.dummyData.getData();
      const parentObj = this.utils.getParentObj(currentBagName, true);
      const destObj = destinationBag ? destinationBag : parentObj;
      if (destinationBag) {  // move
         destObj['nestedBags'][currentBagName] = currentBagObj;
      } else {  // disband
         for (const bagname in currentBagObj['nestedBags']) {
            destObj['nestedBags'][bagname] = currentBagObj['nestedBags'][bagname];
         }
         for (const flowId in currentBagObj['transactions']) {
            destObj['transactions'][flowId] = currentBagObj['transactions'][flowId];
         }
      }
      destObj['amount'] += currentBagObj['amount'];
      delete parentObj['nestedBags'][currentBagName];
      this.dummyData.changeCurrentBagProp();
   }


   bagDisband() {
      const pathArray = this.bagPath.split('/');
      const currentBagName = pathArray[pathArray.length-1];
      this.transferBag(currentBagName);
      document.querySelector('.menu--account-remove').dataset.removalHappened = true;
      this.utils.checkAndAdjustChart(null, true);
   }


   bagMove() {
      const selection = document.getElementById('modal-select').value;
      const choosenObj = this.utils.getBagObjByPath(selection);
      const pathArray = this.bagPath.split('/');
      const currentBagName = pathArray.pop();
      const duplicateDetected = this.utils.check4Duplicate(currentBagName, selection);
      if (!duplicateDetected) {
         this.transferBag(currentBagName, choosenObj);
         this.utils.checkAndAdjustChart();
      } else {
         (0,_infos_js__WEBPACK_IMPORTED_MODULE_0__.showInfo)('duplicate', 'warning');
      }
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BagSubmits);

/***/ }),

/***/ "./src_in/modals_src/chartAdjuster.js":
/*!********************************************!*\
  !*** ./src_in/modals_src/chartAdjuster.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index.js */ "./src_in/index.js");
/* harmony import */ var _chartOps_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chartOps.js */ "./src_in/modals_src/chartOps.js");



class ChartAdjuster {

   constructor(dummyData) {
      this.dummyData = dummyData;
      this.chartops = new _chartOps_js__WEBPACK_IMPORTED_MODULE_1__["default"];
   }


   getBagObjByPath(bagPath, obj=this.dummyData.data[bagPath.split('/')[0]]) {  // recursive
      if (bagPath.includes('/')) {
         const pathArray = bagPath.split('/');
         pathArray.shift();
         const nextPathPart = pathArray.join('/');
         return this.getBagObjByPath(nextPathPart, obj['nestedBags'][pathArray[0]]);
      } else {
         return obj;
      }
   }


   getAffectedChartBags(defaultAffectedBag, bagRemoval, renameInfo) {
      if (renameInfo) {
         _index_js__WEBPACK_IMPORTED_MODULE_0__.chart.bags[renameInfo['new']] = {..._index_js__WEBPACK_IMPORTED_MODULE_0__.chart.bags[renameInfo['old']]};
         delete _index_js__WEBPACK_IMPORTED_MODULE_0__.chart.bags[renameInfo['old']];
      }
      const affectedChartBags = defaultAffectedBag ? [defaultAffectedBag] : [];
      for (const bag in _index_js__WEBPACK_IMPORTED_MODULE_0__.chart.bags) {
         let curBagAmountAtChart = 0;
         for (const keydate in _index_js__WEBPACK_IMPORTED_MODULE_0__.chart.bags[bag]) {
            curBagAmountAtChart += _index_js__WEBPACK_IMPORTED_MODULE_0__.chart.bags[bag][keydate];
         }
         let bagObj;
         if ((bag.split('/').length === this.dummyData.getBagPath().split('/').length + 1) && bagRemoval) {
            delete _index_js__WEBPACK_IMPORTED_MODULE_0__.chart.bags[bag];
            continue;
         } else {
            bagObj = this.getBagObjByPath(bag);
         }
         const curBagDummyDataFlows = this.chartops.getNestedFlows(bag.split('/'), bagObj);
         let curBagAmountAtDummyData = 0;
         for (const flowObj of curBagDummyDataFlows) {
            curBagAmountAtDummyData += flowObj.amount;
         }
         if ((curBagAmountAtChart !== curBagAmountAtDummyData) && (!(affectedChartBags.includes(bag)))) {
            affectedChartBags.push(bag);
         }
      }
      return affectedChartBags;
   }


   refreshAffectedCharts(affChartBags) {
      for (const bag in _index_js__WEBPACK_IMPORTED_MODULE_0__.chart.bags) {
         if (affChartBags.includes(bag)) {
            delete _index_js__WEBPACK_IMPORTED_MODULE_0__.chart.bags[bag];
            this.chartops.add2chart(bag, this.dummyData.data[bag.split('/')[0]]);
         }
      }
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChartAdjuster);

/***/ }),

/***/ "./src_in/modals_src/chartOps.js":
/*!***************************************!*\
  !*** ./src_in/modals_src/chartOps.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _infos_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../infos.js */ "./src_in/infos.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../index.js */ "./src_in/index.js");



class ChartOps {

   bagPath;

   constructor(dummyData) {
      this.dummyData = dummyData;
   }


   getNestedFlows(bagPathArray, bagObj) {   // recursive
      let choosenFlows = [];
      if (Object.keys(bagObj['transactions']).length) {
         for (const flowID in bagObj['transactions']) {
               choosenFlows.push(bagObj['transactions'][flowID]);
         }
      }
      for (const nestedObjKey in bagObj['nestedBags']) {
         const nextBagPathArray = bagPathArray.concat(nestedObjKey);
         choosenFlows = choosenFlows.concat(this.getNestedFlows(nextBagPathArray, bagObj['nestedBags'][nestedObjKey]));
      }
      return choosenFlows;
   }


   getBagObjByPath(bagPath, obj=this.dummyData.data[bagPath.split('/')[0]]) {  // recursive
      if (bagPath.includes('/')) {
         const pathArray = bagPath.split('/');
         pathArray.shift();
         const nextPathPart = pathArray.join('/');
         return this.getBagObjByPath(nextPathPart, obj['nestedBags'][pathArray.shift()]);
      } else {
         return obj;
      }
   }


   add2chart(broughtBagPath=null, broughtData=null) {
      const bagPath2Use = broughtBagPath ? broughtBagPath : this.bagPath;
      const dummyData2Use = broughtData ? broughtData : this.dummyData.data[bagPath2Use.split('/')[0]];
      const bagObj = this.getBagObjByPath(bagPath2Use, dummyData2Use);
      const nestedFlows = this.getNestedFlows(bagPath2Use.split('/'), bagObj);
      const data = {};
      for (const obj of nestedFlows) {
         if (obj['date'] in data) {
            data[obj['date']] += Math.abs(obj['amount']);
         } else {
            data[obj['date']] = Math.abs(obj['amount']);
         }
      }
      _index_js__WEBPACK_IMPORTED_MODULE_1__.chart.bags[bagPath2Use] = data;
      if (!(broughtBagPath || broughtData)) {
         (0,_infos_js__WEBPACK_IMPORTED_MODULE_0__.showInfo)('added2chart');
      }




      // chart.bags[this.bagPath] = this.dummyData.data['nestedBags'];  // dummyCode --> recursive bag collector wanted!
      // app.chart.bags must contain all nested bags (recursive)
      // when creating line charts, the choosen timespan must be splitted into smaller timespans (around 7-15 would be good).
      // The program has to decide, how to split, depending on the choosen timespan's length
      // (eg. year => months, 3 months => weeks. For a half year, you may take half months...).
      // then, the bags within app.chart.bags are allocated to each small timespan.
      // here at last, add temporary message that bag NAME has been added to chart!
   }


   removeFromChart() {
      delete _index_js__WEBPACK_IMPORTED_MODULE_1__.chart.bags[this.bagPath];
      (0,_infos_js__WEBPACK_IMPORTED_MODULE_0__.showInfo)('removedFromChart', 'warning');
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChartOps);

/***/ }),

/***/ "./src_in/modals_src/flowSubmits.js":
/*!******************************************!*\
  !*** ./src_in/modals_src/flowSubmits.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _submitUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./submitUtils.js */ "./src_in/modals_src/submitUtils.js");
/* harmony import */ var _infos_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../infos.js */ "./src_in/infos.js");




class FlowSubmits {

   currelems;
   bagPath;
   flowID;
   cachedAmount;
   cachedDesc;
   flowchange;


   constructor(dummyData) {
      this.utils = new _submitUtils_js__WEBPACK_IMPORTED_MODULE_0__["default"](dummyData);
   }


   flowAmount() {
      const predec = document.getElementById('amount-predecimal').value ? document.getElementById('amount-predecimal').value : 0;
      let dec = document.getElementById('amount-decimal').value ? document.getElementById('amount-decimal').value : 0;
      const amount = this.bagPath.split('/')[0] === 'IN' ? Number(predec+'.'+dec) : Number(predec+'.'+dec) * (-1);
      if (this.flowchange) {
         const currentBagObj = this.utils.getBagObjByPath(this.bagPath);
         currentBagObj['transactions'][this.flowID]['amount'] = amount;
         this.utils.recalcBagAmounts(this.bagPath.split('/'));
         this.utils.checkAndAdjustChart();
      } else {
         this.cachedAmount = amount;
      }
   }


   flowDesc() {
      if (this.flowchange) {
         const currentBagObj = this.utils.getBagObjByPath(this.bagPath);
         currentBagObj['transactions'][this.flowID]['desc'] = this.currelems['input'].value;
      } else {
         this.cachedDesc = this.currelems['input'].value;
      }
   }


   flowDate() {
      const flowDateArray = (this.currelems['input'].value).split('-');
      const flowDate = flowDateArray[2]+'.'+flowDateArray[1]+'.'+flowDateArray[0];
      const currentBagObj = this.utils.getBagObjByPath(this.bagPath);
      if (this.flowchange) {
         currentBagObj['transactions'][this.flowID]['date'] = flowDate;
         this.utils.checkAndAdjustChart(this.bagPath);
      } else {
         currentBagObj['transactions'][this.utils.createNewFlowID()] = {
                              "date": flowDate,
                              "desc": this.cachedDesc,
                              "amount": this.cachedAmount,
                              "currency": "EUR"};
         this.utils.checkAndAdjustChart();
                           }
      const [startDateObj, endDateObj] = this.utils.retrieveDateSpanFromDOM();
      const flowDateObj = new Date(this.currelems['input'].value);
      if (!((flowDateObj >= startDateObj) && (flowDateObj <= endDateObj))) {
         (0,_infos_js__WEBPACK_IMPORTED_MODULE_1__.showInfo)('flowNotInPeriod', 'warning');
      }
      this.utils.recalcBagAmounts(this.bagPath.split('/'));
   }


   flowDelete() {
      const bagObj = this.utils.getBagObjByPath(this.bagPath);
      delete bagObj['transactions'][this.flowID];
      this.utils.checkAndAdjustChart();
      this.utils.recalcBagAmounts(this.bagPath.split('/'));
   }


   flowMove() {
      const bagObj = this.utils.getBagObjByPath(this.bagPath);
      const selection = document.getElementById('modal-select').value;
      const choosenObj = this.utils.getBagObjByPath(selection);
      choosenObj['transactions'][this.flowID] = bagObj['transactions'][this.flowID];
      delete bagObj['transactions'][this.flowID];
      this.utils.checkAndAdjustChart();
      this.utils.recalcBagAmounts(this.bagPath.split('/'));
      this.utils.recalcBagAmounts(selection.split('/'));
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FlowSubmits);

/***/ }),

/***/ "./src_in/modals_src/inputModal.js":
/*!*****************************************!*\
  !*** ./src_in/modals_src/inputModal.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// import { showInfo } from '../infos.js';


class InputModal {

   boundInputWatcher;
   whiteListRegex = /[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890äöüÄÖÜß ?!,.-/()]/;

   constructor(modalsInstance) {
      this.modIns = modalsInstance;
      this.boundInputWatcher = this.watchInput.bind(this);
   }

   #restrictDecimalChars(event) {
      if (event.target.value.length > 2) {
         event.target.value = event.target.value.slice(0,2);
      }
   }


   #setSignDir() {
      const signElem = this.modIns.elements['amount-input-wrapper'].querySelector('.modal__amount-sign');
      if (this.modIns.direction === 'IN') {
         signElem.style.borderColor = '#399149ff';
         signElem.style.color = '#008017';
         signElem.innerText = '+';
      } else if (this.modIns.direction === 'OUT') {
         signElem.style.borderColor = '#9d5e5eff';
         signElem.style.color = '#B20000';
         signElem.innerText = '-';
      }
   }


   #setupAmountInput() {
      this.modIns.elements['amount-input-wrapper'].style.display = 'flex';
      const decimalEl = document.getElementById('amount-decimal');
      decimalEl.removeEventListener('input', this.#restrictDecimalChars);
      decimalEl.addEventListener('input', this.#restrictDecimalChars);
      for (const prefix of ['pre', '']) {
         const inputElem = document.getElementById(`amount-${prefix}decimal`);
         inputElem.removeEventListener('input', this.boundInputWatcher);
         inputElem.addEventListener('input', this.boundInputWatcher);
      };
      this.#setSignDir();
   }


   #formatDateStr(dateStr) {
      const dateArray = dateStr.split('.');
      for (let i=0; i<dateArray.length; i++) {
         if (dateArray[i].length === 1) {
            dateArray[i] = '0'+dateArray[i];
         }
      }
      return dateArray[2]+'-'+dateArray[1]+'-'+dateArray[0];
   }


   #prepInputs() {
      if (!this.modIns.isModalSeries) {
         if (this.modIns.currentModalType === 'flow-amount' || this.modIns.currentModalType === 'flow-desc') {
            if (this.modIns.currentModalType === 'flow-desc') {
               this.modIns.elements['input'].value = document.querySelector('.flowItem--choosen > .flow-description').innerText;
               this.modIns.elements['input'].select();
            } else if (this.modIns.currentModalType === 'flow-amount') {
               const commaAdjustedAmountStr = (document.querySelector('.flowItem--choosen .flow-amount').innerText).replace(',', '.');
               let absAmountStr = String(Math.abs(Number(commaAdjustedAmountStr)));
               if (absAmountStr.includes('.')) {
                  document.getElementById('amount-predecimal').value = absAmountStr.split('.')[0];
                  document.getElementById('amount-predecimal').select();
                  document.getElementById('amount-decimal').value = absAmountStr.split('.')[1];
               } else {
                  document.getElementById('amount-predecimal').value = absAmountStr;
                  document.getElementById('amount-predecimal').select();
               }
            }
         }
      } else if (this.modIns.currentModalType === 'flow-desc') {
         this.modIns.elements['input'].focus();
      }
      if (this.modIns.currentModalType === 'flow-date') {
         this.modIns.elements['input'].type = 'date';
         if (this.modIns.isModalSeries) {
            let today = new Date();
            today = today.toISOString().split('T')[0];
            this.modIns.elements['input'].value = today;
         } else {
            this.modIns.elements['input'].value = this.#formatDateStr(document.querySelector('.flowItem--choosen > .flow-date').innerText);
         }
      } else if (this.modIns.currentModalType === 'time') {
         if (window.location.href.split('/').pop() === 'flowPage') {
            this.modIns.elements['start-date'].value = this.#formatDateStr(document.getElementById('time-start').innerText);
            this.modIns.elements['end-date'].value = this.#formatDateStr(document.getElementById('time-end').innerText);
         } else if (window.location.href.split('/').pop() === 'chartPage') {
            this.modIns.elements['start-date'].value = this.#formatDateStr(document.getElementById('time-start-chart').innerText);
            this.modIns.elements['end-date'].value = this.#formatDateStr(document.getElementById('time-end-chart').innerText);
         }
      }
   }


   watchInput(event) {
      if (this.modIns.currentModalType === 'flow-date' || this.modIns.currentModalType === 'time') {
         this.modIns.elements['submit-button'].disabled = false;
      }
      this.modIns.elements['submit-button'].removeEventListener('click', this.modIns.boundSubmitFunction);
      if ((this.modIns.currentModalType === 'flow-amount' && event.target.value) || event.target.value.toString().length >= 3) {
         this.modIns.elements['submit-button'].disabled = false;
         this.modIns.elements['submit-button'].classList.remove('modal__button--disabled');
         if (!this.modIns.elements['submit-button'].classList.contains('modal__button--positive')) {
            this.modIns.elements['submit-button'].classList.add('modal__button--positive');
         }
         this.modIns.elements['submit-button'].addEventListener('click', this.modIns.boundSubmitFunction, {once: true});
      } else {
         if ((this.modIns.currentModalType !== 'flow-amount' && event.target.value.toString().length < 3) || 
            (!document.getElementById('amount-predecimal').value && !document.getElementById('amount-decimal').value)) {
            this.modIns.elements['submit-button'].disabled = true;
            if (this.modIns.elements['submit-button'].classList.contains('modal__button--positive')) {
               this.modIns.elements['submit-button'].classList.remove('modal__button--positive');
            }
            this.modIns.elements['submit-button'].classList.add('modal__button--disabled');
         }
      }
      if (this.modIns.currentModalType === 'flow-amount') {
         if (String(event.target.value).includes('e')) {
            event.target.value = event.target.value.toString().replace('e', '');
         }
         if (event.target.value.includes('-')) {
            event.target.value = event.target.value.replace('-', '');
         }
      } else if (['flow-desc', 'bag-rename', 'bag-create'].includes(this.modIns.currentModalType)) {
         for (const char of event.target.value.toString()) {
            if (!(char.match(this.whiteListRegex))) {
               // showInfo('noSpecialChars');
               event.target.value = event.target.value.toString().replace(char, '');
         }
         }
      }
   }


   setup() {
      this.modIns.elements['submit-button'].disabled = true;
      if (!this.modIns.elements['submit-button'].classList.contains('modal__button--disabled')) {
         this.modIns.elements['submit-button'].classList.add('modal__button--disabled');
      }
      this.modIns.elements['submit-button'].classList.remove('modal__button--positive');
      if (this.modIns.currentModalType === 'flow-amount') {
         this.#setupAmountInput();
      } 
      else if (this.modIns.currentModalType === 'flow-date' || this.modIns.currentModalType === 'time') {
         this.modIns.elements['date-submit-button'].addEventListener('click', this.modIns.boundSubmitFunction, {once: true})
      } else {
         this.modIns.elements['input'].removeEventListener('input', this.boundInputWatcher);
         this.modIns.elements['input'].addEventListener('input', this.boundInputWatcher);
      }
      if (['flow-date', 'flow-desc', 'flow-amount', 'time'].includes(this.modIns.currentModalType)) {
         this.#prepInputs();
      }
      
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InputModal);

/***/ }),

/***/ "./src_in/modals_src/modalSubmitAllocator.js":
/*!***************************************************!*\
  !*** ./src_in/modals_src/modalSubmitAllocator.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _bagSubmits_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bagSubmits.js */ "./src_in/modals_src/bagSubmits.js");
/* harmony import */ var _flowSubmits_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./flowSubmits.js */ "./src_in/modals_src/flowSubmits.js");
/* harmony import */ var _timeSet_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./timeSet.js */ "./src_in/modals_src/timeSet.js");
/* harmony import */ var _chartOps_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chartOps.js */ "./src_in/modals_src/chartOps.js");






class ModalSubmitAllocator {

   constructor(dummyData) {
      this.bagSubmits = new _bagSubmits_js__WEBPACK_IMPORTED_MODULE_0__["default"](dummyData);
      this.flowSubmits = new _flowSubmits_js__WEBPACK_IMPORTED_MODULE_1__["default"](dummyData);
      this.timeSet = new _timeSet_js__WEBPACK_IMPORTED_MODULE_2__["default"](dummyData);
      this.chartOps = new _chartOps_js__WEBPACK_IMPORTED_MODULE_3__["default"](dummyData);
   }

   prepare(currelems, modType, bagPath, flowchange, reloadEvent) {
      this.flowSubmits.flowchange = flowchange;
      if (modType === 'add2chart' || modType === 'removeFromChart') {
         this.chartOps.bagPath = bagPath;
      } else if (modType.split('-')[0] === 'bag') {
         this.bagSubmits.currelems = currelems;
         this.bagSubmits.bagPath = bagPath;
      } else if (modType.split('-')[0] === 'flow') {
         this.flowSubmits.currelems = currelems;
         this.flowSubmits.bagPath = bagPath;
         if (['flow-delete', 'flow-move'].includes(modType)) {
            this.flowSubmits.flowID = document.querySelector('.flowItem--choosen').dataset.flowId;
         }
         if (flowchange) {
            this.flowSubmits.flowID = document.querySelector('.flowItem--choosen').dataset.flowId;
         }
      }
      if (modType === 'time') {
         this.timeSet.currelems = currelems;
         this.timeSet.reloadEvent = reloadEvent;
      }
   }


   allocateAndSubmit(modType) {
      if (modType === 'bag-create') {
         this.bagSubmits.bagCreate();
      } else if (modType === 'bag-rename') {
         this.bagSubmits.bagRename();
      } else if (modType === 'bag-erase') {
         this.bagSubmits.bagErase();
      } else if (modType === 'bag-disband') {
         this.bagSubmits.bagDisband();
      } else if (modType === 'bag-move') {
         this.bagSubmits.bagMove();
      } else if (modType === 'flow-amount') {
         this.flowSubmits.flowAmount();
      } else if (modType === 'flow-desc') {
         this.flowSubmits.flowDesc();
      } else if (modType === 'flow-date') {
         this.flowSubmits.flowDate();
      } else if (modType === 'flow-delete') {
         this.flowSubmits.flowDelete();
      } else if (modType === 'flow-move') {
         this.flowSubmits.flowMove();
      } else if (modType === 'time') {
         this.timeSet.setTime();
      } else if (modType === 'add2chart') {
         this.chartOps.add2chart();
      } else if (modType === 'removeFromChart') {
         this.chartOps.removeFromChart();
      } 
   }
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModalSubmitAllocator);

/***/ }),

/***/ "./src_in/modals_src/selectModal.js":
/*!******************************************!*\
  !*** ./src_in/modals_src/selectModal.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _submitUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./submitUtils.js */ "./src_in/modals_src/submitUtils.js");


class SelectModal {

   constructor(modalsInstance) {
      this.modIns = modalsInstance;
      this.utils = new _submitUtils_js__WEBPACK_IMPORTED_MODULE_0__["default"](modalsInstance.dummyData);
      this.boundRecognizeSelection = this.recognizeSelection.bind(this);
   }

   recognizeSelection() {
      this.modIns.elements['submit-button'].disabled = false;
      this.modIns.elements['submit-button'].classList.remove('modal__button--disabled');
      if (!this.modIns.elements['submit-button'].classList.contains('modal__button--positive')) {
         this.modIns.elements['submit-button'].classList.add('modal__button--positive');
      }
      this.modIns.elements['submit-button'].addEventListener('click', this.modIns.boundSubmitFunction, {once: true});
   }


   filterOutBadDestinations(bagObjects, currentBagPath) {
      for (const objPath in bagObjects) {
         if (objPath.includes(currentBagPath)) {
            delete bagObjects[objPath];
         }
      }
      const pathArray = currentBagPath.split('/');
      pathArray.pop();
      delete bagObjects[pathArray.join('/')];
   }


   renderSelect(isBagMove) {
      const currentBagPath = this.modIns.dummyData.getBagPath();
      this.utils.bagPath = currentBagPath;
      const direction = currentBagPath.split('/')[0];
      const bagObjects = this.utils.getAll1DirBagObjects(this.modIns.dummyData.data[direction], direction);
      if (isBagMove) {
         this.filterOutBadDestinations(bagObjects, currentBagPath);
      } else {
         delete bagObjects[currentBagPath];
      }
      const optionContainer = document.querySelector('.option-container');
      for (const bag in bagObjects) {
         const optElem = document.createElement('option');
         optElem.classList.add('modal-select-option');
         optElem.value = bag;
         optElem.innerText = bag;
         optElem.dir = 'rtl';
         // selectElem.appendChild(optElem);
         optionContainer.appendChild(optElem);
      }
   }

   setup(isBagMove) {
      this.modIns.elements['submit-button'].disabled = true;
      if (!this.modIns.elements['submit-button'].classList.contains('modal__button--disabled')) {
         this.modIns.elements['submit-button'].classList.add('modal__button--disabled');
      }
      this.modIns.elements['submit-button'].classList.remove('modal__button--positive');
      this.renderSelect(isBagMove);
      this.modIns.elements['select'].addEventListener('change', this.boundRecognizeSelection);
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SelectModal);

/***/ }),

/***/ "./src_in/modals_src/submitUtils.js":
/*!******************************************!*\
  !*** ./src_in/modals_src/submitUtils.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _infos_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../infos.js */ "./src_in/infos.js");
/* harmony import */ var _chartAdjuster_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chartAdjuster.js */ "./src_in/modals_src/chartAdjuster.js");




class SubmitUtils {

   bagPath;
   
   constructor(dummyData) {
      this.dummyData = dummyData;
      this.CA = new _chartAdjuster_js__WEBPACK_IMPORTED_MODULE_1__["default"](dummyData);
   }

   
   check4Duplicate(newBagName, path=this.bagPath) {
      const bagObj = this.getBagObjByPath(path);
      let duplicateDetected = false;
      for (const nestedBag in bagObj['nestedBags']) {
         if (nestedBag.trim().toUpperCase() === newBagName.trim().toUpperCase()) {
            duplicateDetected = true;
         }
      }
      return duplicateDetected;
   }


   getParentObj(currentBagName, fullObject=false) {
      const pathArray = this.bagPath.split('/');
      let focussedObj;
      if ((pathArray.length === 2) && (fullObject)) {
         focussedObj = this.dummyData.data[pathArray[0]];
      } else {
         focussedObj = this.dummyData.data[pathArray[0]]['nestedBags'];
         for (const bag of pathArray) {
            if ((bag === 'IN' || bag === 'OUT')) {
               continue;
            }
            if (fullObject) {
               if (bag !== pathArray[pathArray.length-2]) {
                  focussedObj = focussedObj[bag]['nestedBags'];
               } else {
                  focussedObj = focussedObj[bag];
                  break;
               }
            } else {
               if (bag !== currentBagName) {
                  focussedObj = focussedObj[bag]['nestedBags'];
               }
            }
         }
      }
      return focussedObj;
   }
   
   
   getAll1DirBagObjects(parentObj, parentName) {  // recursive
      let collection = {};
      collection[parentName] = parentObj;
      if (parentObj['nestedBags']) {
         for (const bagName in parentObj['nestedBags']) {
            collection = {...collection, ...this.getAll1DirBagObjects(parentObj['nestedBags'][bagName], parentName+'/'+bagName)};
         }
      }
      return collection;
   }

   
   getBagObjByPath(bagPath, obj=this.dummyData.data[bagPath.split('/')[0]]) {  // recursive
      if (bagPath.includes('/')) {
         const pathArray = bagPath.split('/');
         pathArray.shift();
         const nextPathPart = pathArray.join('/');
         return this.getBagObjByPath(nextPathPart, obj['nestedBags'][pathArray.shift()]);
      } else {
         return obj;
      }
   }


   getDateObject(dateString) {
      const dateArray = dateString.split('.');
      const formattedDateString = dateArray[2]+'-'+dateArray[1]+'-'+dateArray[0];
      const transDateObj = new Date(formattedDateString);
      return transDateObj;
   }


   formatDateStr(dateStr) {
      const dateArray = dateStr.split('.');
      for (let i=0; i<dateArray.length; i++) {
         if (dateArray[i].length === 1) {
            dateArray[i] = '0'+dateArray[i];
         }
      }
      return dateArray[2]+'-'+dateArray[1]+'-'+dateArray[0];
   }


   retrieveDateSpanFromDOM() {
      let formatStartStr;
      let formatEndStr;
      if (window.location.href.split('/').pop() === 'flowPage') {
         formatStartStr = this.formatDateStr(document.getElementById('time-start').innerText);
         formatEndStr = this.formatDateStr(document.getElementById('time-end').innerText);
      } else if (window.location.href.split('/').pop() === 'chartPage') {
         formatStartStr = this.formatDateStr(document.getElementById('time-start-chart').innerText);
         formatEndStr = this.formatDateStr(document.getElementById('time-end-chart').innerText);
      }
      const startObj = new Date(formatStartStr);
      const endObj = new Date(formatEndStr);
      return [startObj, endObj];
   }


   recalcBagAmounts(bagPathArray, bagObj=null, timespan=null) {   // recursive
      if (!bagObj) {
         let focussedObj = this.dummyData.data[bagPathArray[0]];
         for (const bag of bagPathArray) {
            if (bag !== 'IN' && bag !== 'OUT' && Object.keys(focussedObj['nestedBags']).length) {
               focussedObj = focussedObj['nestedBags'][bag];
            }
         }
         bagObj = focussedObj;
      }
      let bagSum = 0;
      if (Object.keys(bagObj['nestedBags']).length) {
         for (const nestedBag in bagObj['nestedBags']) {
            bagSum += bagObj['nestedBags'][nestedBag]['amount'];
         }
      }
      const flowIDs = [];
      if (Object.keys(bagObj['transactions']).length) {
         for (const flowID in bagObj['transactions']) {
            const transDateObj = this.getDateObject(bagObj['transactions'][flowID]['date']);
            let startDateObj;
            let endDateObj;
            [startDateObj, endDateObj] = timespan ? [timespan.start, timespan.end] : this.retrieveDateSpanFromDOM();
            
            if ((startDateObj.getTime() <= transDateObj.getTime()) && (endDateObj.getTime()+86399999 > transDateObj.getTime() )) {
               flowIDs.push(flowID);
            }
         }
         for (const flowID of flowIDs) {
            bagSum += bagObj['transactions'][flowID]['amount'];
         }
      }
      bagObj.amount = bagSum;
      if (bagPathArray.length > 1) {
         bagPathArray.pop();
         this.recalcBagAmounts(bagPathArray, bagObj['nestedBags'][bagPathArray[bagPathArray.length-1]], timespan);
      }
   }

   
   extractFlowIDs(usedIDs, focussedObj) {   // recursive
      for (const flowID in focussedObj['transactions']) {
         usedIDs.push(flowID);
      }
      if (focussedObj['nestedBags']) {
         for (const nestedBagName in focussedObj['nestedBags']) {
            this.extractFlowIDs(usedIDs, focussedObj['nestedBags'][nestedBagName]);
         }
      }
   }


   createNewFlowID() {
      const usedIDs = [];
      for (const dirName in this.dummyData.data) {
         this.extractFlowIDs(usedIDs, this.dummyData.data[dirName]);
      }
      for (let i = 0; i <= Math.max(...usedIDs); i++) {
         if (!usedIDs.includes(`${i}`)) {
            return i;
         }
      }
      return Math.max(...usedIDs)+1;
   }


   checkAndAdjustChart(defaultAffectedBag=null, bagRemoval=false, renameInfo=null) {
      const affectedChartBags = this.CA.getAffectedChartBags(defaultAffectedBag, bagRemoval, renameInfo);
      this.CA.refreshAffectedCharts(affectedChartBags);
   }
}




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SubmitUtils);

/***/ }),

/***/ "./src_in/modals_src/timeSet.js":
/*!**************************************!*\
  !*** ./src_in/modals_src/timeSet.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index.js */ "./src_in/index.js");
/* harmony import */ var _infos_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../infos.js */ "./src_in/infos.js");




class TimeSet {

   currelems;
   reloadEvent;

   constructor(dummyData) {
      this.dummyData = dummyData;
   }


   setTime() {
      const startDateStr = (this.currelems['start-date'].value);
      const endDateStr = (this.currelems['end-date'].value);
      _index_js__WEBPACK_IMPORTED_MODULE_0__.timespan.start = new Date(startDateStr);
      _index_js__WEBPACK_IMPORTED_MODULE_0__.timespan.end = new Date(endDateStr);
      if (_index_js__WEBPACK_IMPORTED_MODULE_0__.timespan.start > _index_js__WEBPACK_IMPORTED_MODULE_0__.timespan.end) {
         _index_js__WEBPACK_IMPORTED_MODULE_0__.timespan.end = new Date(startDateStr);
         (0,_infos_js__WEBPACK_IMPORTED_MODULE_1__.showInfo)('invalidTimespan', 'warning');
      }
      this.dummyData.setBagAmounts(_index_js__WEBPACK_IMPORTED_MODULE_0__.timespan);
      const currentPage = window.location.href.split('/').pop();
      if (currentPage === 'chartPage') {
         _index_js__WEBPACK_IMPORTED_MODULE_0__.router.navigate('chartPage');
      } 
      else if (currentPage === 'flowPage') {
         _index_js__WEBPACK_IMPORTED_MODULE_0__.router.navigate('flowPage');
      }
   }
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TimeSet);

/***/ }),

/***/ "./src_in/route.js":
/*!*************************!*\
  !*** ./src_in/route.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

class Router {

   pages = {}

   constructor(app) {
      let frontpath = window.location.pathname;
      this.app = app;
      window.addEventListener('popstate', (e) => {
                                             const extraClassesWanted = [];
                                             // let appPath = window.location.pathname;
                                             // console.log('window.location.pathname:', window.location.pathname);
                                             // console.log('document.pathname:', document.pathname);
                                             // if (appPath === '/') {
                                             //    appPath = '/loggedinHP';
                                             // } else if (appPath === '/workspace') {
                                             //    console.log('heeeeeere');
                                             //    appPath = '/flowPage';
                                             // } else if (appPath === '/chart') {
                                             //    appPath = '/chartPage';
                                             // }
                                             // console.log('appPath:', appPath);
                                             // console.log('e.state.page:', e.state.page);
                                             if (e.state.page === 'loggedinHP') {
                                                extraClassesWanted.push('page--landing');
                                             }
                                             //  this.navigate(window.location.pathname.slice(1), extraClassesWanted, true);
                                              this.navigate(e.state.page, extraClassesWanted, true);
                                             // this.navigate(appPath.slice(1), extraClassesWanted, true);
                                             });
      if (frontpath === '/in/' || frontpath === '/') {
         this.navigate('loggedinHP', ['page--landing']); 
      } else {
         let wantedpage;
         const routeinfoEl = document.getElementById('routeinfo');
         if (routeinfoEl) {
            wantedpage = routeinfoEl.textContent;
            routeinfoEl.remove();
         } else {
            wantedpage = frontpath;
         }
         this.navigate(wantedpage.slice(1));
      }
   }

// 'loggedinHP', ['page--landing'] | 'flowPage' | 'chartPage' | 'terms' | 'privacy' | 'legal'


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
         const Module = await __webpack_require__("./src_in/routing lazy recursive ^\\.\\/.*\\.js$")(`./${pageid}.js`);
         const newInst = new Module.default(this.app.dummyData, this.app.modal, this.app.chart);
         this.pages[pageid] = newInst;
      }
      let urlname = pageid;
      if (['flowPage', 'chartPage'].includes(urlname)) {
         urlname = urlname === 'flowPage' ? 'workspace' : 'chart';
      }
      // if (!popstate) {
      if (pageid === 'loggedinHP') {
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

/***/ }),

/***/ "./src_in/routing lazy recursive ^\\.\\/.*\\.js$":
/*!************************************************************!*\
  !*** ./src_in/routing/ lazy ^\.\/.*\.js$ namespace object ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./chartPage.js": [
		"./src_in/routing/chartPage.js",
		"vendors-node_modules_chart_js_dist_chart_js",
		"src_in_routing_chartPage_src_PeriodAggregator_js",
		"src_in_routing_chartPage_js"
	],
	"./chartPage_src/AggregationUtils.js": [
		"./src_in/routing/chartPage_src/AggregationUtils.js",
		"src_in_routing_chartPage_src_AggregationUtils_js"
	],
	"./chartPage_src/PeriodAggregator.js": [
		"./src_in/routing/chartPage_src/PeriodAggregator.js",
		"src_in_routing_chartPage_src_PeriodAggregator_js"
	],
	"./chartPage_src/dataPreparator.js": [
		"./src_in/routing/chartPage_src/dataPreparator.js",
		"src_in_routing_chartPage_src_PeriodAggregator_js",
		"src_in_routing_chartPage_src_dataPreparator_js"
	],
	"./flowPage.js": [
		"./src_in/routing/flowPage.js",
		"src_in_routing_toolbar_js",
		"src_in_routing_flowPage_js"
	],
	"./flowPage_src/baglist.js": [
		"./src_in/routing/flowPage_src/baglist.js",
		"src_in_routing_flowPage_src_baglist_js"
	],
	"./flowPage_src/chronoOrder.js": [
		"./src_in/routing/flowPage_src/chronoOrder.js",
		"src_in_routing_flowPage_src_chronoOrder_js"
	],
	"./flowPage_src/flowPageEventHandler.js": [
		"./src_in/routing/flowPage_src/flowPageEventHandler.js",
		"src_in_routing_flowPage_src_flowPageEventHandler_js"
	],
	"./flowPage_src/flowPageSurface.js": [
		"./src_in/routing/flowPage_src/flowPageSurface.js",
		"src_in_routing_flowPage_src_flowPageSurface_js"
	],
	"./flowPage_src/flowlist.js": [
		"./src_in/routing/flowPage_src/flowlist.js",
		"src_in_routing_flowPage_src_flowlist_js"
	],
	"./flowPage_src/renderAmount.js": [
		"./src_in/routing/flowPage_src/renderAmount.js",
		"src_in_routing_flowPage_src_renderAmount_js"
	],
	"./flowPage_src/toolbarEventHandler.js": [
		"./src_in/routing/flowPage_src/toolbarEventHandler.js",
		"src_in_routing_flowPage_src_toolbarEventHandler_js"
	],
	"./legal.js": [
		"./src_in/routing/legal.js",
		"src_in_routing_legal_js"
	],
	"./loggedinHP.js": [
		"./src_in/routing/loggedinHP.js",
		"src_in_routing_loggedinHP_js"
	],
	"./privacy.js": [
		"./src_in/routing/privacy.js",
		"src_in_routing_privacy_js"
	],
	"./terms.js": [
		"./src_in/routing/terms.js",
		"src_in_routing_terms_js"
	],
	"./toolbar.js": [
		"./src_in/routing/toolbar.js",
		"src_in_routing_toolbar_js"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(() => {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = "./src_in/routing lazy recursive ^\\.\\/.*\\.js$";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src_in/timespan.js":
/*!****************************!*\
  !*** ./src_in/timespan.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class TimeSpan {
   constructor () {
      this.end = new Date();
      this.start = new Date(this.end.getFullYear(), 0, 1);
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TimeSpan);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames not based on template
/******/ 			if (chunkId === "main") return "bundle_in.js";
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".bundle_in.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("main." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("494dcd02b8b02ca9d5d2")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "finadelic:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId, fetchPriority) {
/******/ 				return trackBlockingPromise(require.e(chunkId, fetchPriority));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				// inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results).then(function () {});
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							}, [])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								}
/******/ 								return setStatus("ready").then(function () {
/******/ 									return updatedModules;
/******/ 								});
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 		
/******/ 			var onAccepted = function () {
/******/ 				return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 					// handle errors in accept handlers and self accepted module load
/******/ 					if (error) {
/******/ 						return setStatus("fail").then(function () {
/******/ 							throw error;
/******/ 						});
/******/ 					}
/******/ 		
/******/ 					if (queuedInvalidatedModules) {
/******/ 						return internalApply(options).then(function (list) {
/******/ 							outdatedModules.forEach(function (moduleId) {
/******/ 								if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 							});
/******/ 							return list;
/******/ 						});
/******/ 					}
/******/ 		
/******/ 					return setStatus("idle").then(function () {
/******/ 						return outdatedModules;
/******/ 					});
/******/ 				});
/******/ 			};
/******/ 		
/******/ 			return Promise.all(
/******/ 				results
/******/ 					.filter(function (result) {
/******/ 						return result.apply;
/******/ 					})
/******/ 					.map(function (result) {
/******/ 						return result.apply(reportError);
/******/ 					})
/******/ 			)
/******/ 				.then(function (applyResults) {
/******/ 					applyResults.forEach(function (modules) {
/******/ 						if (modules) {
/******/ 							for (var i = 0; i < modules.length; i++) {
/******/ 								outdatedModules.push(modules[i]);
/******/ 							}
/******/ 						}
/******/ 					});
/******/ 				})
/******/ 				.then(onAccepted);
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			currentUpdatedModulesList = updatedModulesList;
/******/ 			return new Promise((resolve, reject) => {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = (event) => {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		globalThis["webpackHotUpdatefinadelic"] = (chunkId, moreModules, runtime) => {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					var result = newModuleFactory
/******/ 						? getAffectedModuleEffects(moduleId)
/******/ 						: {
/******/ 								type: "disposed",
/******/ 								moduleId: moduleId
/******/ 							};
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					var acceptPromises = [];
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									var result;
/******/ 									try {
/******/ 										result = callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 									if (result && typeof result.then === "function") {
/******/ 										acceptPromises.push(result);
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					var onAccepted = function () {
/******/ 						// Load self accepted modules
/******/ 						for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 							var item = outdatedSelfAcceptedModules[o];
/******/ 							var moduleId = item.module;
/******/ 							try {
/******/ 								item.require(moduleId);
/******/ 							} catch (err) {
/******/ 								if (typeof item.errorHandler === "function") {
/******/ 									try {
/******/ 										item.errorHandler(err, {
/******/ 											moduleId: moduleId,
/******/ 											module: __webpack_require__.c[moduleId]
/******/ 										});
/******/ 									} catch (err1) {
/******/ 										if (options.onErrored) {
/******/ 											options.onErrored({
/******/ 												type: "self-accept-error-handler-errored",
/******/ 												moduleId: moduleId,
/******/ 												error: err1,
/******/ 												originalError: err
/******/ 											});
/******/ 										}
/******/ 										if (!options.ignoreErrored) {
/******/ 											reportError(err1);
/******/ 											reportError(err);
/******/ 										}
/******/ 									}
/******/ 								} else {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					};
/******/ 		
/******/ 					return Promise.all(acceptPromises)
/******/ 						.then(onAccepted)
/******/ 						.then(function () {
/******/ 							return outdatedModules;
/******/ 						});
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = () => {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkfinadelic"] = globalThis["webpackChunkfinadelic"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__("./src_in/index.js");
/******/ 	
/******/ })()
;