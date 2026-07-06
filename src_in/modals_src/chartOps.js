import { showInfo } from "../infos.js";
import { chart } from "../index.js";
import CDP from "../backendDataCommunication/chartDataPoster.js";


class ChartOps {

   bagPath;
   reloadEvent;

   constructor(appData) {
      this.appData = appData;
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


   getBagObjByPath(bagPath, obj=this.appData.data[bagPath.split('/')[0]]) {  // recursive
      // console.log('@ begin of getBagObjByPath (ops):');
      // console.log('bagPath:', bagPath, '|| obj:', obj);
      const pathArray = bagPath.split('/');
      if (bagPath.includes('/') && obj['nestedBags'][pathArray[1]]) {
         pathArray.shift();
         const nextPathPart = pathArray.join('/');
         // console.log('nextPathPart:', nextPathPart);
         // console.log("obj['nestedBags'][pathArray[0]]:", obj['nestedBags'][pathArray[0]]);
         return this.getBagObjByPath(nextPathPart, obj['nestedBags'][pathArray[0]]);
      } else {
         return obj;
      }
   }


   add2chart(broughtBagPath=null, broughtData=null, broughtChart=null) {
      const bagPath2Use = broughtBagPath ? broughtBagPath : this.bagPath;
      const addChartPath = () => {
         // console.log('______________________________________')
         // console.log('STARTING CHARTOPS ADD2CHART');
         // console.log('--------------------------------------')
         // console.log('this.appData.data:', this.appData.data);
         const appData2Use = broughtData ? broughtData : this.appData.data[bagPath2Use.split('/')[0]];
         // console.log('bagPath2Use:', bagPath2Use);
         // console.log('appData2Use:', appData2Use);
         const bagObj = this.getBagObjByPath(bagPath2Use, appData2Use);
         // console.log('bagObj:', bagObj);
         const nestedFlows = this.getNestedFlows(bagPath2Use.split('/'), bagObj);
         const data = {};
         for (const obj of nestedFlows) {
            if (obj['date'] in data) {
               data[obj['date']] += Math.abs(obj['amount']);
            } else {
               data[obj['date']] = Math.abs(obj['amount']);
            }
         }
         if (broughtChart) {
            broughtChart.bags[bagPath2Use] = data;
         } else {
            chart.bags[bagPath2Use] = data;
         }
         if (!(broughtBagPath || broughtData)) {
            showInfo('added2chart');
            document.dispatchEvent(this.reloadEvent);
         }
      }
      if (broughtChart) {
         addChartPath();
      } else {
         CDP.processChartPath(bagPath2Use, 'POST', addChartPath);
      }




      // chart.bags[this.bagPath] = this.appData.data['nestedBags'];  // appCode --> recursive bag collector wanted!
      // app.chart.bags must contain all nested bags (recursive)
      // when creating line charts, the choosen timespan must be splitted into smaller timespans (around 7-15 would be good).
      // The program has to decide, how to split, depending on the choosen timespan's length
      // (eg. year => months, 3 months => weeks. For a half year, you may take half months...).
      // then, the bags within app.chart.bags are allocated to each small timespan.
      // here at last, add temporary message that bag NAME has been added to chart!
   }


   removeFromChart(auto=false) {
      const execRemoveChartPath = () => {
         delete chart.bags[this.bagPath];
         if (!auto) {
            showInfo('removedFromChart');
            document.dispatchEvent(this.reloadEvent);
         }
      }
      CDP.processChartPath(this.bagPath, 'DELETE', execRemoveChartPath);
   }
}

export default ChartOps;