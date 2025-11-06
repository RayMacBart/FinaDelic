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
      const predec = document.getElementById('amount-predecimal').value ? document.getElementById('amount-predecimal').value : 0;
      let dec = document.getElementById('amount-decimal').value ? document.getElementById('amount-decimal').value : 0;
      this.cachedAmount = Number(predec+'.'+dec);
   }


   flowDesc() {
      this.cachedDesc = this.currelems['input'].value;
   }


   flowDate() {
      const flowDateArray = (this.currelems['input'].value).split('-');
      const flowDate = flowDateArray[2]+'.'+flowDateArray[1]+'.'+flowDateArray[0];
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