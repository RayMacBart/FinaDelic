import SubmitUtils from "./modals_src/submitUtils.js";
import crypting from "./crypting.js";


class AppData {

   keyU8A;
   ivU8A;
   saltB64;
   data;
   storeID;

   constructor() {
      this.revisitFlag = Symbol('revisitFlag');
      this.utils = new SubmitUtils(this);
      if (document.getElementById('username-info')) {
         this.username = document.getElementById('username-info').textContent;
      } else {
         this.username = 'incognito';
      }
   }


   #currentBag = ''
   

   async setCryptoInfos(keyOBJ, ivU8A, saltB64) {
      this.keyOBJ = keyOBJ;
      this.ivU8A = ivU8A;
      this.saltB64 = saltB64;
      if (!localStorage.getItem(`path:${this.storeID}`)) {
         await this.dumpPath('');
      }
   }


//   EXAMPLE DATA STRUCTURE:

//    "official": {
//       "nestedBags": {
//          "music equipment": {
//             "nestedBags": {},
//             "transactions": {
//                "22": {
//                   "date": "11.02.2025",
//                   "desc": "Stimmgerät @ Thomann",
//                   "amount": -16.9,
//                   "currency": "EUR"
//                },
//             }
//          }
//       },
//       "transactions": {
//          "46": {
//             "date": "01.04.2025",
//             "desc": "SVS",
//             "amount": -412.81,
//             "currency": "EUR"
//          },
//       },
//    }


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

   setBagPath(bagPath) {
      this.#currentBag = bagPath;
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


   async dumpPath(path) {
      const taggedPath = '1X2Y3Z4A5B6C7D8E9F'+path;
      const cipherpathBase64 = await crypting.encryptDataToBase64(this.keyOBJ, this.ivU8A, taggedPath);
      localStorage.setItem(`path:${this.storeID}`, cipherpathBase64);
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
               // console.log('End of nestedBags-chain reached.');
            }
         } else {
            if (!(bagName in this.data)) {
               throw new Error(`Error: Can't find key "${bagName}" at topmost flow page!`);
            }
         }
      }
      else if (stepUp && (this.#currentBag === "IN" || this.#currentBag === "OUT")) {
         this.#currentBag = '';
         this.dumpPath(this.#currentBag);
         return;
      }
      else if (stepUp) {
         const bagArray = this.#currentBag.split('/');
         bagArray.pop();
         this.#currentBag = bagArray.join('/');
         this.dumpPath(this.#currentBag);
      }
      if (!stepUp) {
         if (this.#currentBag) {
            this.#currentBag = this.#currentBag+'/'+bagName;
         } else {
            this.#currentBag = bagName;
         }
         this.dumpPath(this.#currentBag);
      }
   }


   getData(path=null) {
      if (this.#currentBag || path) {
         let focussedObj = this.data;
         let currentBagList;
         if (path) {
            currentBagList = path.split('/');
         } else {
            currentBagList = this.#currentBag.split('/');
         }
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


export default AppData;