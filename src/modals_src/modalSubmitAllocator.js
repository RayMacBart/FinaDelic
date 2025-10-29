import BagSubmits from "./bagSubmits.js";
import FlowSubmits from "./flowSubmits.js";


class ModalSubmitAllocator {

   constructor(reloadEvent, dummyData, chart) {
      this.bagSubmits = new BagSubmits(reloadEvent, dummyData, chart);
      this.flowSubmits = new FlowSubmits(reloadEvent, dummyData);
   }

   prepare(currelems, modType, bagPath, startNextMod) {
      if (modType.split('-')[0] === 'bag' || modType === 'add2chart') {
         this.bagSubmits.currelems = currelems;
         this.bagSubmits.bagPath = bagPath;
      } else if (modType.split('-')[0] === 'flow') {
         this.flowSubmits.currelems = currelems;
         this.flowSubmits.bagPath = bagPath;
         this.flowSubmits.startNextMod = startNextMod;
         if (['flow-delete', 'flow-move'].includes(modType)) {
            console.log(document.querySelector('.flowItem--choosen'));
            this.flowSubmits.flowID = document.querySelector('.flowItem--choosen').dataset.flowId;
         }
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
      }
   }
}


export default ModalSubmitAllocator;