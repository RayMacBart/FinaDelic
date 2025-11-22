import SubmitUtils from "./submitUtils.js";
import { showInfo } from "../infos.js"

class ChartOps {

   bagPath;

   constructor(dummyData, chart) {
      this.dummyData = dummyData;
      this.utils = new SubmitUtils(dummyData);
      this.chart = chart;
   }


   #getDeepestPaths(initFocussedObj) {
      const deepestPaths = [];
      const getMostNestedPath = (focussedObj, path) => {
         // console.log('focussedObj with "path":', focussedObj);
         if (Object.keys(focussedObj['nestedBags']).length) {
            
            for (const bag in focussedObj['nestedBags']) {
               getMostNestedPath(focussedObj['nestedBags'][bag], path+'/'+bag);
            }
         } else {
            deepestPaths.push(path);
         }
      }
      getMostNestedPath(initFocussedObj, this.bagPath);
      return deepestPaths;
   }


   #getNestedFlows(bagPathArray, bagObj) {   // recursive

      let choosenFlows = [];
      
      if (Object.keys(bagObj['transactions']).length) {
         for (const flowID in bagObj['transactions']) {
               choosenFlows.push(bagObj['transactions'][flowID]);
         }
      }

      for (const nestedObjKey in bagObj['nestedBags']) {
         const nextBagPathArray = bagPathArray.concat(nestedObjKey);
         choosenFlows = choosenFlows.concat(this.#getNestedFlows(nextBagPathArray, bagObj['nestedBags'][nestedObjKey]));
      }
      console.log('choosenFlows before return:', choosenFlows);
      return choosenFlows;
      

      // if (bagPathArray.length >= this.bagPath.split('/').length) {
      //    console.log('bagObj:', bagObj);
      //    bagPathArray.pop();
      //    if (Object.keys(bagObj['nestedBags']).length) {
      //       console.log('choosenFlows before concat:', choosenFlows);
      //       console.log('this.#getNestedFlows(bagPathArray, bagObj["nestedBags"][bagPathArray[bagPathArray.length-1]]):', this.#getNestedFlows(bagPathArray, bagObj['nestedBags'][bagPathArray[bagPathArray.length-1]]));
      //       return (choosenFlows.concat(...this.#getNestedFlows(bagPathArray, bagObj['nestedBags'][bagPathArray[bagPathArray.length-1]])));
      //    } else {
      //       return choosenFlows;
      //    }
      // }
   }


   add2chart() {
      this.utils.bagPath = this.bagPath;
      const bagObj = this.utils.getBagObjByPath(this.bagPath);
      const nestedFlows = this.#getNestedFlows(this.bagPath.split('/'), bagObj);
      // const deepestPaths = this.#getDeepestPaths(bagObj);
      // const nestedFlows = [];
      // for (const path of deepestPaths) {
      //    console.log(this.#getNestedFlows((path.split('/')), this.utils.getBagObjByPath(path)));
      //    nestedFlows.concat(this.#getNestedFlows((path.split('/')), this.utils.getBagObjByPath(path)));
      //    console.log('nestedFlows:', nestedFlows);
      // }
      console.log('nestedFlows-array:', nestedFlows);
      const nestedFlowSet = new Set(nestedFlows);
      console.log('nestedFlows-set:', nestedFlowSet);
      showInfo('added2chart');




      // this.chart.bags[this.bagPath] = this.dummyData.data['nestedBags'];  // dummyCode --> recursive bag collector wanted!
      // app.chart.bags must contain all nested bags (recursive)
      // when creating line charts, the choosen timespan must be splitted into smaller timespans (around 7-15 would be good).
      // The program has to decide, how to split, depending on the choosen timespan's length
      // (eg. year => months, 3 months => weeks. For a half year, you may take half months...).
      // then, the bags within app.chart.bags are allocated to each small timespan.
      // here at last, add temporary message that bag NAME has been added to chart!
   }


   removeFromChart() {
      
   }
}

export default ChartOps;