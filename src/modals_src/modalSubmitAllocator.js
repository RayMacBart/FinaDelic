import BagSubmits from "./bagSubmits.js";
import FlowSubmits from "./flowSubmits.js";
import TimeSet from "./timeSet.js"
import ChartOps from "./chartOps.js";


class ModalSubmitAllocator {

   constructor(dummyData, chart) {
      this.bagSubmits = new BagSubmits(dummyData);
      this.flowSubmits = new FlowSubmits(dummyData);
      this.timeSet = new TimeSet(dummyData);
      this.chartOps = new ChartOps(dummyData, chart);
   }

   prepare(currelems, modType, bagPath, flowchange, reloadEvent) {
      this.flowSubmits.flowchange = flowchange;
      if (modType === 'add2chart' || modType === 'removeFromChart') {
         this.chartOps.bagPath = bagPath;
      } else if (modType.split('-')[0] === 'bag') {
         this.bagSubmits.currelems = currelems;
         this.bagSubmits.bagPath = bagPath;
      } else if (modType.split('-')[0] === 'flow') {
         this.flowSubmits.currelems = currelems;
         this.flowSubmits.bagPath = bagPath;
         if (['flow-delete', 'flow-move'].includes(modType)) {
            this.flowSubmits.flowID = document.querySelector('.flowItem--choosen').dataset.flowId;
         }
         if (flowchange) {
            this.flowSubmits.flowID = document.querySelector('.flowItem--choosen').dataset.flowId;
         }
      }
      if (modType === 'time') {
         this.timeSet.currelems = currelems;
         this.timeSet.reloadEvent = reloadEvent;
      }
   }


   allocateAndSubmit(modType) {
      if (modType === 'bag-create') {
         this.bagSubmits.bagCreate();
      } else if (modType === 'bag-rename') {
         this.bagSubmits.bagRename();
      } else if (modType === 'bag-erase') {
         this.bagSubmits.bagErase();
      } else if (modType === 'bag-disband') {
         this.bagSubmits.bagDisband();
      } else if (modType === 'bag-move') {
         this.bagSubmits.bagMove();
      } else if (modType === 'flow-amount') {
         this.flowSubmits.flowAmount();
      } else if (modType === 'flow-desc') {
         this.flowSubmits.flowDesc();
      } else if (modType === 'flow-date') {
         this.flowSubmits.flowDate();
      } else if (modType === 'flow-delete') {
         this.flowSubmits.flowDelete();
      } else if (modType === 'flow-move') {
         this.flowSubmits.flowMove();
      } else if (modType === 'time') {
         this.timeSet.setTime();
      } else if (modType === 'add2chart') {
         this.chartOps.add2chart();
      } else if (modType === 'removeFromChart') {
         this.chartOps.removeFromChart();
      } 
   }
}


export default ModalSubmitAllocator;