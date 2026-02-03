import SubmitUtils from './submitUtils.js';
import { showInfo } from "../infos.js";
import FDP from '../backendDataCommunication/flowDataPoster.js';


class FlowSubmits {

   currelems;
   bagPath;
   flowID;
   cachedAmount;
   cachedDesc;
   flowchange;


   constructor(appData) {
      this.utils = new SubmitUtils(appData);
   }


   flowAmount() {
      const predec = document.getElementById('amount-predecimal').value ? document.getElementById('amount-predecimal').value : 0;
      let dec = document.getElementById('amount-decimal').value ? document.getElementById('amount-decimal').value : 0;
      const amount = this.bagPath.split('/')[0] === 'IN' ? Number(predec+'.'+dec) : Number(predec+'.'+dec) * (-1);
      if (this.flowchange) {
         const currentBagObj = this.utils.getBagObjByPath(this.bagPath);
         currentBagObj['transactions'][this.flowID]['amount'] = amount;
         FDP.changeAmount(this.flowID, amount);
         this.utils.recalcBagAmounts(this.bagPath.split('/'));
         this.utils.checkAndAdjustChart();
      } else {
         this.cachedAmount = amount;
      }
   }


   flowDesc() {
      if (this.flowchange) {
         const currentBagObj = this.utils.getBagObjByPath(this.bagPath);
         const newText = this.currelems['input'].value;
         currentBagObj['transactions'][this.flowID]['desc'] = newText;
         FDP.changeDesc(this.flowID, newText);
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
         FDP.changeDate(this.flowID, this.currelems['input'].value);
         this.utils.checkAndAdjustChart(this.bagPath);
      } else {
         const newFlowId = this.utils.createNewFlowID();
         currentBagObj['transactions'][newFlowId] = {
                              "date": flowDate,
                              "desc": this.cachedDesc,
                              "amount": this.cachedAmount,
                              "currency": "EUR"};
         FDP.createFlow(this.bagPath, newFlowId, currentBagObj['transactions'][newFlowId]);
         this.utils.checkAndAdjustChart();
                           }
      const [startDateObj, endDateObj] = this.utils.retrieveDateSpanFromDOM();
      const flowDateObj = new Date(this.currelems['input'].value);
      if (!((flowDateObj >= startDateObj) && (flowDateObj <= endDateObj))) {
         showInfo('flowNotInPeriod', 'warning');
      }
      this.utils.recalcBagAmounts(this.bagPath.split('/'));
   }


   flowDelete() {
      const bagObj = this.utils.getBagObjByPath(this.bagPath);
      delete bagObj['transactions'][this.flowID];
      FDP.deleteFlow(this.flowID);
      this.utils.checkAndAdjustChart();
      this.utils.recalcBagAmounts(this.bagPath.split('/'));
   }


   flowMove() {
      const bagObj = this.utils.getBagObjByPath(this.bagPath);
      const selection = document.getElementById('modal-select').value;
      const choosenObj = this.utils.getBagObjByPath(selection);
      choosenObj['transactions'][this.flowID] = bagObj['transactions'][this.flowID];
      delete bagObj['transactions'][this.flowID];
      FDP.moveFlow(this.flowID, selection);
      this.utils.checkAndAdjustChart();
      this.utils.recalcBagAmounts(this.bagPath.split('/'));
      this.utils.recalcBagAmounts(selection.split('/'));
   }
}

export default FlowSubmits;