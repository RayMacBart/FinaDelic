import SubmitUtils from './modals_src/submitUtils.js';


class AppData {

   constructor() {
      this.revisitFlag = Symbol('revisitFlag');
      this.utils = new SubmitUtils(this);
      if (document.getElementById('username-info')) {
         this.username = document.getElementById('username-info').textContent;
      }
   }


   #currentBag = ''
   
   async loadFromBackendFirst(app) {
      await this.fetchUserData(app.timespan);
      app.continueConstruction1();
   }

   async fetchUserData(timespan) {
      const response = await fetch('/userdata');
      const fetchedData = await response.json();
      localStorage.setItem('userdata', JSON.stringify(fetchedData));
      this.data = fetchedData;
      const csrfMeta = document.querySelector('meta[name="csrf-token"]');
      const CSRFToken = csrfMeta ? csrfMeta.content : null;
      fetch('/client-errorLog', {
         method: 'POST',
         headers: {'Content-Type': 'application/json',
                  'CSRF-Token': CSRFToken
         },
         body: JSON.stringify({location: "after fetching data & setting localStorage", data: JSON.stringify(this.data)})
      });
      this.setBagAmounts(timespan);
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
         localStorage.setItem('path', '');
         return;
      }
      else if (stepUp) {
         const bagArray = this.#currentBag.split('/');
         bagArray.pop();
         this.#currentBag = bagArray.join('/');
         localStorage.setItem('path', bagArray.join('/'));
      }
      if (!stepUp) {
         if (this.#currentBag) {
            this.#currentBag = this.#currentBag+'/'+bagName;
            localStorage.setItem('path', this.#currentBag);
         } else {
            this.#currentBag = bagName;
            localStorage.setItem('path', bagName);
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


export default AppData;