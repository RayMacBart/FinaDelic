import BagSubmits from "./bagSubmits.js";
import FlowSubmits from "./flowSubmits.js";


class ModalSubmitAllocator {

   constructor() {
      this.bagSubmits = new BagSubmits();
      this.flowSubmits = new FlowSubmits();
   }

   prepare(currelems, modType, bagPath, startNextMod) {
      if (modType.split('-')[0] === 'bag') {
         this.bagSubmits.currelems = currelems;
         this.bagSubmits.bagPath = bagPath;
      } else if (modType.split('-')[0] === 'flow') {
         this.flowSubmits.currelems = currelems;
         this.flowSubmits.bagPath = bagPath;
         this.flowSubmits.startNextMod = startNextMod;
         this.flowSubmits.flowID = document.querySelector('.flowItem--choosen').dataset.flowId;
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