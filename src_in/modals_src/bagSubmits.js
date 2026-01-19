import { showInfo } from '../infos.js';
import SubmitUtils from './submitUtils.js';



class BagSubmits {


   currelems;
   bagPath;


   constructor(dummyData) {
      this.dummyData = dummyData;
      this.utils = new SubmitUtils(this.dummyData);
   }  


   bagCreate() {
      const newBagName = this.currelems['input'].value;
      const duplicateDetected = this.utils.check4Duplicate(newBagName, this.bagPath);
      if (!duplicateDetected) {
         this.dummyData.getData()['nestedBags'][newBagName] = {
            'amount': 0,
            'nestedBags': {},
            'transactions': {}
         };
      } else {
         showInfo('duplicate', 'warning');
      }
   }


   bagRename() {
      this.utils.bagPath = this.bagPath;
      const newBagName = this.currelems['input'].value;
      const bagArray = this.bagPath.split('/');
      const currentBagName = bagArray.pop();
      const duplicateDetected = this.utils.check4Duplicate(newBagName, bagArray.join('/'));
      if (!duplicateDetected) {
         const parentObj = this.utils.getParentObj(currentBagName);
         parentObj[newBagName] = {...parentObj[currentBagName]};
         delete parentObj[currentBagName];
         this.dummyData.changeCurrentBagProp(newBagName);
         this.utils.checkAndAdjustChart(null, false, {'old': this.bagPath, 'new': bagArray.join('/')+'/'+newBagName});
      } else {
         showInfo('duplicate', 'warning');
      }
   } 


   bagErase() {
      this.utils.bagPath = this.bagPath;
      const currentBagName = this.bagPath.split('/').pop();
      const parentObj = this.utils.getParentObj(currentBagName);
      delete parentObj[currentBagName];
      this.dummyData.changeCurrentBagProp();
      this.utils.checkAndAdjustChart();
      document.querySelector('.menu--account-remove').dataset.removalHappened = true;
   }

   transferBag(currentBagName, destinationBag=null) {
      this.utils.bagPath = this.bagPath;
      const currentBagObj = this.dummyData.getData();
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
      this.dummyData.changeCurrentBagProp();
   }


   bagDisband() {
      const pathArray = this.bagPath.split('/');
      const currentBagName = pathArray[pathArray.length-1];
      this.transferBag(currentBagName);
      document.querySelector('.menu--account-remove').dataset.removalHappened = true;
      this.utils.checkAndAdjustChart(null, true);
   }


   bagMove() {
      const selection = document.getElementById('modal-select').value;
      const choosenObj = this.utils.getBagObjByPath(selection);
      const pathArray = this.bagPath.split('/');
      const currentBagName = pathArray.pop();
      const duplicateDetected = this.utils.check4Duplicate(currentBagName, selection);
      if (!duplicateDetected) {
         this.transferBag(currentBagName, choosenObj);
         this.utils.checkAndAdjustChart();
      } else {
         showInfo('duplicate', 'warning');
      }
   }
}

export default BagSubmits;