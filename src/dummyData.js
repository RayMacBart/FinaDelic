import SubmitUtils from './modals_src/submitUtils.js';


class DummyData {

   constructor(timespan) {
      this.revisitFlag = Symbol('revisitFlag');
      this.utils = new SubmitUtils(this);
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


export default DummyData;