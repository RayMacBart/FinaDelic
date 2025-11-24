import SubmitUtils from "./submitUtils.js";
import { showInfo } from "../infos.js"
import { chart } from "../index.js";

class ChartOps {

   bagPath;

   constructor(dummyData) {
      this.dummyData = dummyData;
      this.utils = new SubmitUtils(dummyData);
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
      return choosenFlows;
   }


   


   add2chart() {
      this.utils.bagPath = this.bagPath;
      const bagObj = this.utils.getBagObjByPath(this.bagPath);
      const nestedFlows = this.#getNestedFlows(this.bagPath.split('/'), bagObj);
      const data = {};
      for (const obj of nestedFlows) {
         if (obj['date'] in data) {
            data[obj['date']] += Math.abs(obj['amount']);
         } else {
            data[obj['date']] = Math.abs(obj['amount']);
         }
      }
      chart.bags[this.bagPath] = data;
      showInfo('added2chart');




      // chart.bags[this.bagPath] = this.dummyData.data['nestedBags'];  // dummyCode --> recursive bag collector wanted!
      // app.chart.bags must contain all nested bags (recursive)
      // when creating line charts, the choosen timespan must be splitted into smaller timespans (around 7-15 would be good).
      // The program has to decide, how to split, depending on the choosen timespan's length
      // (eg. year => months, 3 months => weeks. For a half year, you may take half months...).
      // then, the bags within app.chart.bags are allocated to each small timespan.
      // here at last, add temporary message that bag NAME has been added to chart!
   }


   removeFromChart() {
      delete chart.bags[this.bagPath];
      showInfo('removedFromChart', 'warning');
   }
}

export default ChartOps;