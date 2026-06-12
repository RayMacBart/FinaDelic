import ChartAdjuster from "./chartAdjuster.js";


class SubmitUtils {

   bagPath;
   
   constructor(appData) {
      this.appData = appData;
      this.CA = new ChartAdjuster(appData);
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
         focussedObj = this.appData.data[pathArray[0]];
      } else {
         focussedObj = this.appData.data[pathArray[0]]['nestedBags'];
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

   
   getBagObjByPath(bagPath, obj=this.appData.data[bagPath.split('/')[0]]) {  // recursive
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


   addISO2UI(ISOdate, datePos, chart=false) {
      const idAppendix = chart ? '-chart' : '';
      const dateElem = document.getElementById(`time-${datePos}${idAppendix}`);
      const dateArray = (ISOdate).split('-');
      const UIdate = dateArray[2]+'.'+dateArray[1]+'.'+dateArray[0];
      dateElem.innerText = UIdate;
   }


   retrieveDateSpanFromDOM() {
      let formatStartStr;
      let formatEndStr;
      if (window.location.href.split('/').pop() === 'workspace') {
         formatStartStr = this.formatDateStr(document.getElementById('time-start').innerText);
         formatEndStr = this.formatDateStr(document.getElementById('time-end').innerText);
      } else if (window.location.href.split('/').pop() === 'chart') {
         formatStartStr = this.formatDateStr(document.getElementById('time-start-chart').innerText);
         formatEndStr = this.formatDateStr(document.getElementById('time-end-chart').innerText);
      }
      const startObj = new Date(formatStartStr);
      const endObj = new Date(formatEndStr);
      return [startObj, endObj];
   }


   recalcBagAmounts(bagPathArray, bagObj=null, timespan=null) {   // recursive
      if (!bagObj) {
         let focussedObj = this.appData.data[bagPathArray[0]];
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
            bagSum += Number(bagObj['nestedBags'][nestedBag]['amount']);
         }
      }
      const flowIDs = [];
      if (Object.keys(bagObj['transactions']).length) {
         for (const flowID in bagObj['transactions']) {
            const transDateObj = this.getDateObject(bagObj['transactions'][flowID]['date']);
            let startDateObj;
            let endDateObj;
            [startDateObj, endDateObj] = timespan ? [timespan.start, timespan.end] : this.retrieveDateSpanFromDOM();

            if ((startDateObj.getTime() <= transDateObj.getTime()) && (endDateObj.getTime() >= transDateObj.getTime() )) {
               flowIDs.push(flowID);
            }
         }
         for (const flowID of flowIDs) {
            bagSum += Number(bagObj['transactions'][flowID]['amount']);
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
      for (const dirName in this.appData.data) {
         this.extractFlowIDs(usedIDs, this.appData.data[dirName]);
      }
      if (usedIDs.length) {
         for (let i = 0; i <= Math.max(...usedIDs); i++) {
            if (!usedIDs.includes(`${i}`)) {
               return i;
            }
         }
         return Math.max(...usedIDs)+1;
      }
      return 0;
   }


   checkAndAdjustChart(defaultAffectedBag=null, bagRemoval=false, renameInfo=null) {
      const affectedChartBags = this.CA.getAffectedChartBags(defaultAffectedBag, bagRemoval, renameInfo);
      this.CA.refreshAffectedCharts(affectedChartBags);
   }
}




export default SubmitUtils;