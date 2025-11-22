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
      const formatStartStr = this.formatDateStr(document.getElementById('time-start').innerText);
      const formatEndStr = this.formatDateStr(document.getElementById('time-end').innerText);
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
            [startDateObj, endDateObj] = timespan ? [timespan.start, timespan.end] : this.utils.retrieveDateSpanFromDOM();
            
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
         this.recalcBagAmounts(bagPathArray, bagObj['nestedBags'][bagPathArray[bagPathArray.length-1]], timespan);
      }
   }

   
   extractFlowIDs(usedIDs, focussedObj) {  // recursive
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
}




export default SubmitUtils;