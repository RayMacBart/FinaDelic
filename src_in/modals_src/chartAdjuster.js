import { chart } from '../index.js';
import ChartOps from './chartOps.js';

class ChartAdjuster {

   constructor(appData) {
      this.appData = appData;
      this.chartops = new ChartOps;
   }


   getBagObjByPath(bagPath, obj=this.appData.data[bagPath.split('/')[0]]) {  // recursive
      if (bagPath.includes('/')) {
         const pathArray = bagPath.split('/');
         pathArray.shift();
         const nextPathPart = pathArray.join('/');
         return this.getBagObjByPath(nextPathPart, obj['nestedBags'][pathArray[0]]);
      } else {
         return obj;
      }
   }


   getAffectedChartBags(defaultAffectedBag, bagRemoval, renameInfo) {
      if (renameInfo) {
         chart.bags[renameInfo['new']] = {...chart.bags[renameInfo['old']]};
         delete chart.bags[renameInfo['old']];
      }
      const affectedChartBags = defaultAffectedBag ? [defaultAffectedBag] : [];
      for (const bag in chart.bags) {
         let curBagAmountAtChart = 0;
         for (const keydate in chart.bags[bag]) {
            curBagAmountAtChart += chart.bags[bag][keydate];
         }
         let bagObj;
         if ((bag.split('/').length === this.appData.getBagPath().split('/').length + 1) && bagRemoval) {
            delete chart.bags[bag];
            continue;
         } else {
            bagObj = this.getBagObjByPath(bag);
         }
         const curBagAppDataFlows = this.chartops.getNestedFlows(bag.split('/'), bagObj);
         let curBagAmountAtAppData = 0;
         for (const flowObj of curBagAppDataFlows) {
            curBagAmountAtAppData += flowObj.amount;
         }
         if ((curBagAmountAtChart !== curBagAmountAtAppData) && (!(affectedChartBags.includes(bag)))) {
            affectedChartBags.push(bag);
         }
      }
      return affectedChartBags;
   }


   refreshAffectedCharts(affChartBags) {
      for (const bag in chart.bags) {
         if (affChartBags.includes(bag)) {
            delete chart.bags[bag];
            this.chartops.add2chart(bag, this.appData.data[bag.split('/')[0]], chart);
         }
      }
   }
}

export default ChartAdjuster;