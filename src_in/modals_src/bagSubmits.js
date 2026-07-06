import { showInfo } from '../infos.js';
import SubmitUtils from './submitUtils.js';
import BDP from '../backendDataCommunication/bagDataPoster.js';
import CDP from '../backendDataCommunication/chartDataPoster.js';
import crypting from '../crypting.js';



class BagSubmits {


   currelems;
   bagPath;
   reloadEvent;


   constructor(appData, chart, chartOps) {
      this.appData = appData;
      this.chart = chart;
      this.chartOps = chartOps;
      this.utils = new SubmitUtils(this.appData);
   }  


   bagCreate() {
      const newBagName = this.currelems['input'].value;
      const duplicateDetected = this.utils.check4Duplicate(newBagName, this.bagPath);
      if (!duplicateDetected) {
         const execBagCreation = () => {
            this.appData.getData()['nestedBags'][newBagName] = {
               'amount': 0,
               'nestedBags': {},
               'transactions': {}
            };
            document.dispatchEvent(this.reloadEvent);
         }
         BDP.createBag(this.bagPath, newBagName, execBagCreation);
         // Because arrow-functions always remember the surrounding 'this' where they were defined,
         // no matter where they are called later, it works equivalent to the following:

         // function execBagCreation(bagName) {
         //    this.appData.getData()['nestedBags'][bagName] = {
         //       'amount': 0,
         //       'nestedBags': {},
         //       'transactions': {}
         //    };
         // }
         // const boundExecBagCreation = execBagCreation.bind(this, newBagName);
         // BDP.createBag(this.bagPath, newBagName, boundExecBagCreation);
         
      } else {
         showInfo('duplicate', 'warning');
      }
   }


   bagRename() {
      this.utils.bagPath = this.bagPath;
      const newBagName = this.currelems['input'].value;
      const bagArray = this.bagPath.split('/');
      const duplicateDetected = this.utils.check4Duplicate(newBagName, bagArray.join('/'));
      if (!duplicateDetected) {
         const execBagRename = () => {
            const currentBagName = bagArray.pop();
            const parentObj = this.utils.getParentObj(currentBagName);
            parentObj[newBagName] = {...parentObj[currentBagName]};
            delete parentObj[currentBagName];
            this.appData.changeCurrentBagProp(newBagName);
            this.utils.checkAndAdjustChart(null, false, {'old': this.bagPath, 'new': bagArray.join('/')+'/'+newBagName});
            document.dispatchEvent(this.reloadEvent);
         };
         BDP.renameBag(this.bagPath, newBagName, execBagRename);
      } else {
         showInfo('duplicate', 'warning');
      }
   } 


   bagErase() {
      const execBagErase = () => {
         this.utils.bagPath = this.bagPath;
         const currentBagName = this.bagPath.split('/').pop();
         const parentObj = this.utils.getParentObj(currentBagName);
         delete parentObj[currentBagName];
         this.appData.changeCurrentBagProp();
         this.utils.checkAndAdjustChart();
         document.querySelector('.menu--account-remove').dataset.removalHappened = true;
         document.dispatchEvent(this.reloadEvent);
      }
      BDP.bagErase(this.bagPath, execBagErase);
   }

   transferBag(currentBagName, destinationBag=null) {
      this.utils.bagPath = this.bagPath;
      const currentBagObj = this.appData.getData();
      const parentObj = this.utils.getParentObj(currentBagName, true);
      const destObj = destinationBag ? destinationBag : parentObj;
      if (destinationBag) {  // move
         destObj['nestedBags'][currentBagName] = currentBagObj;
      } else {  // disband
         for (const bagname in currentBagObj['nestedBags']) {
            destObj['nestedBags'][bagname] = currentBagObj['nestedBags'][bagname];
         }
         for (const flowId in currentBagObj['transactions']) {
            destObj['transactions'][flowId] = currentBagObj['transactions'][flowId];
         }
      }
      destObj['amount'] += currentBagObj['amount'];
      delete parentObj['nestedBags'][currentBagName];
      this.appData.changeCurrentBagProp();
   }


   bagDisband() {
      const execBagDisband = () => {
         const pathArray = this.bagPath.split('/');
         const currentBagName = pathArray[pathArray.length-1];
         this.transferBag(currentBagName);
         document.querySelector('.menu--account-remove').dataset.removalHappened = true;
         this.utils.checkAndAdjustChart(null, true);
         document.dispatchEvent(this.reloadEvent);
      }
      BDP.bagDisband(this.bagPath, execBagDisband);
   }


   bagMove() {
      const selection = document.getElementById('modal-select').value;
      const pathArray = this.bagPath.split('/');
      const currentBagName = pathArray.pop();
      const duplicateDetected = this.utils.check4Duplicate(currentBagName, selection);
      if (!duplicateDetected) {
         const execBagMove = () => {
            
            if (this.bagPath in this.chart.bags) {
               this.chartOps.removeFromChart(true);
            }

            const choosenObj = this.utils.getBagObjByPath(selection);
            this.transferBag(currentBagName, choosenObj);

            if (this.bagPath in this.chart.bags) {
               this.chartOps.add2chart(selection+'/'+currentBagName, this.appData.data[selection.split('/')[0]]);
            }
            this.utils.checkAndAdjustChart();
            document.dispatchEvent(this.reloadEvent);
            localStorage.removeItem(this.appData.storeID);
            localStorage.removeItem(`path:${this.appData.storeID}`);
            crypting.setEncryptedLocals();
         }
         BDP.bagMove(this.bagPath, selection, execBagMove);
      } else {
         showInfo('duplicate', 'warning');
      }
   }
}

export default BagSubmits;