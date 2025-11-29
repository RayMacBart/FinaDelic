import SubmitUtils from './submitUtils.js';


class FlowSubmits {

   currelems;
   bagPath;
   flowID;
   cachedAmount;
   cachedDesc;
   flowchange;


   constructor(dummyData) {
      this.utils = new SubmitUtils(dummyData);
   }


   flowAmount() {
      const predec = document.getElementById('amount-predecimal').value ? document.getElementById('amount-predecimal').value : 0;
      let dec = document.getElementById('amount-decimal').value ? document.getElementById('amount-decimal').value : 0;
      const amount = this.bagPath.split('/')[0] === 'IN' ? Number(predec+'.'+dec) : Number(predec+'.'+dec) * (-1);
      if (this.flowchange) {
         const currentBagObj = this.utils.getBagObjByPath(this.bagPath);
         currentBagObj['transactions'][this.flowID]['amount'] = amount;
         this.utils.recalcBagAmounts(this.bagPath.split('/'));
         this.utils.checkAndAdjustChart();
      } else {
         this.cachedAmount = amount;
      }
   }


   flowDesc() {
      if (this.flowchange) {
         const currentBagObj = this.utils.getBagObjByPath(this.bagPath);
         currentBagObj['transactions'][this.flowID]['desc'] = this.currelems['input'].value;
      } else {
         this.cachedDesc = this.currelems['input'].value;
      }
   }


   flowDate() {
      const flowDateArray = (this.currelems['input'].value).split('-');
      const flowDate = flowDateArray[2]+'.'+flowDateArray[1]+'.'+flowDateArray[0];
      const currentBagObj = this.utils.getBagObjByPath(this.bagPath);
      if (this.flowchange) {
         currentBagObj['transactions'][this.flowID]['date'] = flowDate;
         this.utils.checkAndAdjustChart(this.bagPath);
      } else {
         currentBagObj['transactions'][this.utils.createNewFlowID()] = {
                              "date": flowDate,
                              "desc": this.cachedDesc,
                              "amount": this.cachedAmount,
                              "currency": "EUR"};
                           }
         this.utils.checkAndAdjustChart();
      this.utils.recalcBagAmounts(this.bagPath.split('/'));
   }


   flowDelete() {
      const bagObj = this.utils.getBagObjByPath(this.bagPath);
      delete bagObj['transactions'][this.flowID];
      this.utils.checkAndAdjustChart();
      this.utils.recalcBagAmounts(this.bagPath.split('/'));
   }


   flowMove() {
      const bagObj = this.utils.getBagObjByPath(this.bagPath);
      const selection = document.getElementById('modal-select').value;
      const choosenObj = this.utils.getBagObjByPath(selection);
      choosenObj['transactions'][this.flowID] = bagObj['transactions'][this.flowID];
      delete bagObj['transactions'][this.flowID];
      this.utils.checkAndAdjustChart();
      this.utils.recalcBagAmounts(this.bagPath.split('/'));
   }
}

export default FlowSubmits;