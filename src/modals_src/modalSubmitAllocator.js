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
      switch (modType) {
         case 'bag-create':
            this.bagSubmits.bagCreate();
         case 'bag-rename':
            this.bagSubmits.bagRename();
         case 'bag-erase':
            this.bagSubmits.bagErase();
         case 'bag-disband':
            this.bagSubmits.bagDisband();
         case 'bag-move':
            this.bagSubmits.bagMove();
         case 'flow-amount':
            this.flowSubmits.flowAmount();
         case 'flow-desc':
            this.flowSubmits.flowDesc();
         case 'flow-date':
            this.flowSubmits.flowDate();
         case 'flow-delete':
            this.flowSubmits.flowDelete();
         case 'flow-move':
            this.flowSubmits.flowMove();
         }
   }
}


export default ModalSubmitAllocator;