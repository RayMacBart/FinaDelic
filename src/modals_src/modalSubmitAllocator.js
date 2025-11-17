import BagSubmits from "./bagSubmits.js";
import FlowSubmits from "./flowSubmits.js";
import TimeSet from "./timeSet.js"


class ModalSubmitAllocator {

   constructor(dummyData, chart) {
      this.bagSubmits = new BagSubmits(dummyData, chart);
      this.flowSubmits = new FlowSubmits(dummyData);
      this.timeSet = new TimeSet(dummyData);
   }

   prepare(currelems, modType, bagPath, flowchange) {
      this.flowSubmits.flowchange = flowchange;
      if (modType.split('-')[0] === 'bag' || modType === 'add2chart') {
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
      }
   }
}


export default ModalSubmitAllocator;