import SubmitUtils from './submitUtils.js';


class FlowSubmits {

   currelems;
   bagPath;
   startNextMod;
   flowID;

   constructor(reloadEvent, dummyData) {
      this.reloadEvent = reloadEvent;
      this.dummyData = dummyData;
      this.utils = new SubmitUtils(this.dummyData);
   }


   flowAmount() {

   }


   flowDesc() {

   }


   flowDate() {

      document.dispatchEvent(this.reloadEvent);
   }


   flowDelete() {
      const bagObj = this.utils.getBagObjByPath(this.bagPath);
      delete bagObj['transactions'][this.flowID];
   }


   flowMove() {
      const bagObj = this.utils.getBagObjByPath(this.bagPath);
      const selection = document.getElementById('modal-select').value;
      const choosenObj = this.utils.getBagObjByPath(selection);
      choosenObj['transactions'][this.flowID] = bagObj['transactions'][this.flowID];
      delete bagObj['transactions'][this.flowID];
   }
}

export default FlowSubmits;