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
      const pathArray = bagPath.split('/');
      if (bagPath.includes('/') && obj['nestedBags'][pathArray[1]]) {
         pathArray.shift();
         const nextPathPart = pathArray.join('/');
         return this.getBagObjByPath(nextPathPart, obj['nestedBags'][pathArray[0]]);
      } else {
         return obj;
      }
   }


   add2chart(broughtBagPath=null, broughtData=null, broughtChart=null) {
      const bagPath2Use = broughtBagPath ? broughtBagPath : this.bagPath;
      const addChartPath = () => {
         const appData2Use = broughtData ? broughtData : this.appData.data[bagPath2Use.split('/')[0]];
         const bagObj = this.getBagObjByPath(bagPath2Use, appData2Use);
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
   }


   removeFromChart(broughtBagPath=null, auto=false) {
      const usedBagPath = broughtBagPath ? broughtBagPath : this.bagPath;
      const execRemoveChartPath = () => {
         delete chart.bags[usedBagPath];
         if (!auto) {
            showInfo('removedFromChart');
            document.dispatchEvent(this.reloadEvent);
         }
      }
      if (auto) {
         execRemoveChartPath();
      } else {
         CDP.processChartPath(usedBagPath, 'DELETE', execRemoveChartPath);
      }
   }
}

export default ChartOps;