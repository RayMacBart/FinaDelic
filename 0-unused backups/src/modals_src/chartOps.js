import { showInfo } from "../infos.js";
import { chart } from "../index.js";

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
      chart.bags[bagPath2Use] = data;
      if (!(broughtBagPath || broughtData)) {
         showInfo('added2chart');
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
      delete chart.bags[this.bagPath];
      showInfo('removedFromChart', 'warning');
   }
}

export default ChartOps;