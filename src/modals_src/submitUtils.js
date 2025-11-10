import renderAmount from '../routing/flowPage_src/renderAmount.js';


class SubmitUtils {

   bagPath;
   
   constructor(dummyData) {
      this.dummyData = dummyData;
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


   #getDateObject(dateString) {
      const dateArray = dateString.split('.');
      const formattedDateString = dateArray[2]+'-'+dateArray[1]+'-'+dateArray[0];
      const transDateObj = new Date(formattedDateString);
      return transDateObj;
   }


   #retrieveDateSpanFromDOM() {
      const startArr = document.getElementById('time-start').innerText.split('.');
      const endArr = document.getElementById('time-end').innerText.split('.');
      const formatStartStr = startArr[2]+'-'+startArr[1]+'-'+startArr[0];
      const formatEndStr = endArr[2]+'-'+endArr[1]+'-'+endArr[0];
      const startObj = new Date(formatStartStr);
      const endObj = new Date(formatEndStr);
      return [startObj, endObj];
   }


   recalcBagAmounts(bagPathArray, bagObj=null) {   // recursive
      if (!bagObj) {
         let focussedObj = this.dummyData.data[bagPathArray[0]];
         for (const bag of bagPathArray) {
            if (bag !== 'IN' && bag !== 'OUT' && focussedObj['nestedBags']) {
               focussedObj = focussedObj['nestedBags'][bag];
            }
         }
         bagObj = focussedObj;
      }
      let bagSum = 0;
      if (bagObj['nestedBags']) {
         for (const nestedBag in bagObj['nestedBags']) {
            bagSum += bagObj['nestedBags'][nestedBag]['amount'];
         }
      }
      const flowIDs = [];
      if (bagObj['transactions']) {
         for (const flowID in bagObj['transactions']) {
            const transDateObj = this.#getDateObject(bagObj['transactions'][flowID]['date']);
            const [startDateObj, endDateObj] = this.#retrieveDateSpanFromDOM()
            if ((startDateObj.getTime() <= transDateObj.getTime()) && (endDateObj.getTime()+86400000 > transDateObj.getTime() )) {
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
         this.recalcBagAmounts(bagPathArray, bagObj['nestedBags'][bagPathArray[bagPathArray.length-1]]);
      }
   }
}


export default SubmitUtils;