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

   spin() {
      const spinner = document.createElement('div');
      spinner.classList.add('spinner');
      spinner.style.position = 'absolute';
      spinner.style.zIndex = '1000';
      spinner.style.left = 'calc(50dvw - 2rem)';
      const viewWrapper = document.querySelector('.view-wrapper');
      const page = document.querySelector('.page');
      page.style.filter = 'blur(0.1rem)';
      viewWrapper.insertBefore(spinner, page);
      return [viewWrapper, page, spinner];
   }

   async #updateLocalStorage() {
      localStorage.removeItem(this.appData.storeID);
      localStorage.removeItem(`path:${this.appData.storeID}`);
      crypting.setEncryptedLocals();
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
            this.#updateLocalStorage();
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


   async finishRename(currentBagName, newBagName, bagArray, affectedBagPaths) {
      const [viewWrapper, page, spinner] = this.spin();
      for (const affPath of affectedBagPaths) {
         if (affPath in this.chart.bags) {
            const changedPath = affPath.replace(currentBagName, newBagName);
            this.chartOps.removeFromChart(affPath, true);
            this.chartOps.add2chart(changedPath, this.appData.data[bagArray[0]]);
            await CDP.processChartPath(affPath, 'DELETE', () => {});
            await CDP.processChartPath(changedPath, 'POST', () => {});
         }
      }
      this.appData.changeCurrentBagProp(newBagName);
      this.utils.checkAndAdjustChart(null, false, {'old': this.bagPath, 'new': bagArray.join('/')+'/'+newBagName});
      document.dispatchEvent(this.reloadEvent);
      this.#updateLocalStorage();
      viewWrapper.removeChild(spinner);
      page.style.filter = 'none';
   }

   bagRename() {
      this.utils.bagPath = this.bagPath;
      const newBagName = this.currelems['input'].value;
      const bagArray = this.bagPath.split('/');
      if (bagArray[bagArray.length-1] !== newBagName) {
         const duplicateDetected = this.utils.check4Duplicate(newBagName, bagArray.join('/'));
         if (!duplicateDetected) {
            const execBagRename = () => {
               const currentBagName = bagArray.pop();
               const parentObj = this.utils.getParentObj(currentBagName);
               const affectedBagPaths = this.utils.getAllNestedBagPaths(this.bagPath);
               affectedBagPaths.push(this.bagPath);
   
               parentObj[newBagName] = {...parentObj[currentBagName]};
               delete parentObj[currentBagName];
               
               this.finishRename(currentBagName, newBagName, bagArray, affectedBagPaths);
               
            };
            BDP.renameBag(this.bagPath, newBagName, execBagRename);
         } else {
            showInfo('duplicate', 'warning');
         }
      } else {
         showInfo('sameName');
      }
   } 


   async finishErase(affectedBagPaths) {
      const [viewWrapper, page, spinner] = this.spin();
      this.chartOps.removeFromChart(this.bagPath, true);
      await CDP.processChartPath(this.bagPath, 'DELETE', () => {});
      for (const affPath of affectedBagPaths) {
         if (affPath in this.chart.bags) {
            this.chartOps.removeFromChart(affPath, true);
            await CDP.processChartPath(affPath, 'DELETE', () => {});
         }
      }
      this.appData.changeCurrentBagProp();
      this.utils.checkAndAdjustChart();
      document.querySelector('.menu--account-remove').dataset.removalHappened = true;
      document.dispatchEvent(this.reloadEvent);
      this.#updateLocalStorage();
      viewWrapper.removeChild(spinner);
      page.style.filter = 'none';
   }

   bagErase() {
      const execBagErase = () => {
         this.utils.bagPath = this.bagPath;
         const currentBagName = this.bagPath.split('/').pop();
         const parentObj = this.utils.getParentObj(currentBagName);
         const affectedBagPaths = this.utils.getAllNestedBagPaths(this.bagPath);
         delete parentObj[currentBagName];
         this.finishErase(affectedBagPaths);
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


   async finishDisband(pathArray, currentBagName, affectedBagPaths) {
      const [viewWrapper, page, spinner] = this.spin();
      for (const affPath of affectedBagPaths) {
         if (affPath in this.chart.bags) {
            const strippedPath = affPath.replace('/'+currentBagName, '');
            this.chartOps.add2chart(strippedPath, this.appData.data[pathArray[0]], this.chart);
            this.chartOps.removeFromChart(affPath, true);
            await CDP.processChartPath(strippedPath, 'POST', () => {});
            await CDP.processChartPath(affPath, 'DELETE', () => {});
         }
      }
      document.querySelector('.menu--account-remove').dataset.removalHappened = true;
      this.utils.checkAndAdjustChart(null, true);
      document.dispatchEvent(this.reloadEvent);
      this.#updateLocalStorage();
      viewWrapper.removeChild(spinner);
      page.style.filter = 'none';
   }

   bagDisband() {
      const execBagDisband = () => {
         const pathArray = this.bagPath.split('/');
         const currentBagName = pathArray[pathArray.length-1];
         const affectedBagPaths = this.utils.getAllNestedBagPaths(this.bagPath);
         this.transferBag(currentBagName);
         
         this.finishDisband(pathArray, currentBagName, affectedBagPaths);
      }
      BDP.bagDisband(this.bagPath, execBagDisband);
   }


   async finishMove(selection, currentBagName, affectedBagPaths) {
      const [viewWrapper, page, spinner] = this.spin();
      for (const affPath of affectedBagPaths) {
         if (affPath in this.chart.bags) {
            const strippedPath = affPath.replace(this.bagPath, '');
            const addedPath = selection+'/'+currentBagName+strippedPath;
            this.chartOps.add2chart(addedPath, this.appData.data[selection.split('/')[0]], this.chart);
            this.chartOps.removeFromChart(affPath, true);
            await CDP.processChartPath(addedPath, 'POST', () => {});
            await CDP.processChartPath(affPath, 'DELETE', () => {});
         }
      }
      this.utils.checkAndAdjustChart();
      document.dispatchEvent(this.reloadEvent);
      this.#updateLocalStorage();
      viewWrapper.removeChild(spinner);
      page.style.filter = 'none';
   }

   bagMove() {
      const selection = document.getElementById('modal-select').value;
      const pathArray = this.bagPath.split('/');
      const currentBagName = pathArray.pop();
      const duplicateDetected = this.utils.check4Duplicate(currentBagName, selection);
      if (!duplicateDetected) {
         const execBagMove = () => {
            const affectedBagPaths = this.utils.getAllNestedBagPaths(this.bagPath);
            affectedBagPaths.push(this.bagPath);

            const choosenObj = this.utils.getBagObjByPath(selection);
            this.transferBag(currentBagName, choosenObj);
            
            this.finishMove(selection, currentBagName, affectedBagPaths);
            
         }
         BDP.bagMove(this.bagPath, selection, execBagMove);
      } else {
         showInfo('duplicate', 'warning');
      }
   }
}

export default BagSubmits;