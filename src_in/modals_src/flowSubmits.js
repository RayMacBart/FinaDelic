import SubmitUtils from './submitUtils.js';
import { showInfo } from "../infos.js";
import FDP from '../backendDataCommunication/flowDataPoster.js';
import crypting from '../crypting.js';


class FlowSubmits {

   appData;
   currelems;
   bagPath;
   flowID;
   cachedAmount;
   cachedDesc;
   flowchange;
   reloadEvent;


   constructor(appData) {
      this.appData = appData;
      this.utils = new SubmitUtils(appData);
   }


   async #updateLocalStorage() {
      localStorage.removeItem(this.appData.storeID);
      localStorage.removeItem(`path:${this.appData.storeID}`);
      crypting.setEncryptedLocals();
   }


   flowAmount() {
      const predec = document.getElementById('amount-predecimal').value ? document.getElementById('amount-predecimal').value : 0;
      let dec = document.getElementById('amount-decimal').value ? document.getElementById('amount-decimal').value : 0;
      const amount = this.bagPath.split('/')[0] === 'IN' ? Number(predec+'.'+dec) : Number(predec+'.'+dec) * (-1);
      if (this.flowchange) {
         const execAmountChange = () => {
            const currentBagObj = this.utils.getBagObjByPath(this.bagPath);
            currentBagObj['transactions'][this.flowID]['amount'] = amount;
            this.utils.recalcBagAmounts(this.bagPath.split('/'));
            this.utils.checkAndAdjustChart();
            document.dispatchEvent(this.reloadEvent);
            this.#updateLocalStorage();
         }
         FDP.changeAmount(this.bagPath, this.flowID, amount, execAmountChange);
      } else {
         this.cachedAmount = amount;
      }
   }


   flowDesc() {
      const newText = this.currelems['input'].value;
      if (this.flowchange) {
         const execDescChange = () => {
            const currentBagObj = this.utils.getBagObjByPath(this.bagPath);
            currentBagObj['transactions'][this.flowID]['desc'] = newText;
            document.dispatchEvent(this.reloadEvent);
            this.#updateLocalStorage();
         }
         FDP.changeDesc(this.bagPath, this.flowID, newText, execDescChange);
      } else {
         this.cachedDesc = newText;
      }
   }


   flowDate() {
      const flowDateISOString = this.currelems['input'].value;
      const flowDateArray = (flowDateISOString).split('-');
      const flowDate = flowDateArray[2]+'.'+flowDateArray[1]+'.'+flowDateArray[0];
      const currentBagObj = this.utils.getBagObjByPath(this.bagPath);
      const afterFunc = () => {
         const [startDateObj, endDateObj] = this.utils.retrieveDateSpanFromDOM();
         const flowDateObj = new Date(flowDateISOString);
         if (!((flowDateObj >= startDateObj) && (flowDateObj <= endDateObj))) {
            showInfo('flowNotInPeriod', 'warning');
         }
         this.utils.recalcBagAmounts(this.bagPath.split('/'));
         document.dispatchEvent(this.reloadEvent);
         this.#updateLocalStorage();
      }
      if (this.flowchange) {
         const execDateChange = () => {
            currentBagObj['transactions'][this.flowID]['date'] = flowDate;
            this.utils.checkAndAdjustChart(this.bagPath);
            afterFunc();
         }
         FDP.changeDate(this.bagPath, this.flowID, this.currelems['input'].value, execDateChange);
      } else {
         const newFlowId = this.utils.createNewFlowID();
         const flowBody = {"date": flowDateISOString,
            "desc": this.cachedDesc,
            "amount": this.cachedAmount.toFixed(2),
            "currency": "EUR"};
         
         const execFlowCreation = () => {
            flowBody.date = flowDate;
            currentBagObj['transactions'][newFlowId] = flowBody;
            this.utils.checkAndAdjustChart();
            afterFunc();
         }
         FDP.createFlow(this.bagPath, newFlowId, flowBody, execFlowCreation);
      }
   }


   flowDelete() {
      const execFlowDeletion = () => {
         const bagObj = this.utils.getBagObjByPath(this.bagPath);
         bagObj['transactions'][this.flowID]['amount'] = 0;
         this.utils.recalcBagAmounts(this.bagPath.split('/'));
         delete bagObj['transactions'][this.flowID];
         this.utils.checkAndAdjustChart();
         document.dispatchEvent(this.reloadEvent);
         this.#updateLocalStorage();
      }
      FDP.deleteFlow(this.bagPath, this.flowID, execFlowDeletion);
   }


   flowMove() {
      const selection = document.getElementById('modal-select').value;
      const execFlowMove = () => {
         const bagObj = this.utils.getBagObjByPath(this.bagPath);
         const choosenObj = this.utils.getBagObjByPath(selection);
         choosenObj['transactions'][this.flowID] = bagObj['transactions'][this.flowID];
         delete bagObj['transactions'][this.flowID];
         this.utils.checkAndAdjustChart();
         this.utils.recalcBagAmounts(this.bagPath.split('/'));
         this.utils.recalcBagAmounts(selection.split('/'));
         document.dispatchEvent(this.reloadEvent);
         this.#updateLocalStorage();
      }
      FDP.moveFlow(this.bagPath, this.flowID, selection, execFlowMove);
   }
}

export default FlowSubmits;