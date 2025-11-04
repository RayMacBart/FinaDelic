import SubmitUtils from './submitUtils.js';


class FlowSubmits {

   currelems;
   bagPath;
   startNextMod;
   flowID;
   cachedAmount;
   cachedDesc;


   constructor(reloadEvent, dummyData) {
      this.reloadEvent = reloadEvent;
      this.dummyData = dummyData;
      this.utils = new SubmitUtils(this.dummyData);
   }


   flowAmount() {
      this.cachedAmount = String(document.getElementById('amount-predecimal').value)+'.'+String(document.getElementById('amount-predecimal').value);
      // this.startNextMod();
   }


   flowDesc() {
      this.cachedDesc = this.currelems['input'].value;
      // this.startNextMod();
   }


   flowDate() {
      const flowDate = this.currelems['input'].value;
      // flowDate = flowDate.getDate()+'.'+(flowDate.getMonth()+1)+'.'+flowDate.getFullYear();
      // check out if date object and convert properly. Style the date input.
      const currentBagObj = this.utils.getBagObjByPath(this.bagPath);
      currentBagObj['transactions'][this.flowID] = {
                           "date": flowDate,
                           "desc": this.cachedDesc,
                           "amount": this.cachedAmount,
                           "currency": "EUR"}
      document.dispatchEvent(this.reloadEvent);
   }

date
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