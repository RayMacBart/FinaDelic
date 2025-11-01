import SubmitUtils from './submitUtils.js';


class BagSubmits {

   currelems;
   bagPath;
   
   constructor(reloadEvent, dummyData, chart) {
      this.reloadEvent = reloadEvent;
      this.dummyData = dummyData;
      this.chart = chart;
      this.utils = new SubmitUtils(this.dummyData);
   }  

   // here comes reaction/functionality of submits
   // to receive and forward the 'return'-values to work with,
   // for inputType modals, take '.value' property from currelems['input'],
   // for move (select) modals, take '.value' property from currelems['select'].

   add2chart() {
      this.utils.bagPath = this.bagPath;
      console.log('ToolbarEventHandler.dummyData:', this.dummyData);               // dummyCode
      this.dummyData.data['IN']['nestedBags']['official']['amount'] = 123456789;   // dummyCode
      this.chart.bags[this.bagPath] = this.dummyData.data['nestedBags'];  // dummyCode --> recursive bag collector wanted!
      // app.chart.bags must contain all nested bags (recursive)
      // when creating line charts, the choosen timespan must be splitted into smaller timespans (around 7-15 would be good).
      // The program has to decide, how to split, depending on the choosen timespan's length
      // (eg. year => months, 3 months => weeks. For a half year, you may take half months...).
      // then, the bags within app.chart.bags are allocated to each small timespan.
      console.log('chart:', this.chart); // dummyCode
      // here at last, add temporary message that bag NAME has been added to chart!
   }


   bagCreate() {
      const newBagName = this.currelems['input'].value;
      this.dummyData.getData()['nestedBags'][newBagName] = {
         'amount': 0,
         'nestedBags': {},
         'transactions': {}
      };
   }


   bagRename() {
      this.utils.bagPath = this.bagPath;
      const newBagName = this.currelems['input'].value;
      const currentBagName = this.bagPath.split('/').pop();
      const parentObj = this.utils.getParentObj(currentBagName);
      parentObj[newBagName] = {...parentObj[currentBagName]};
      delete parentObj[currentBagName];
      this.dummyData.changeCurrentBagProp(newBagName);
   }


   bagErase() {
      this.utils.bagPath = this.bagPath;
      const currentBagName = this.bagPath.split('/').pop();
      const parentObj = this.utils.getParentObj(currentBagName);
      delete parentObj[currentBagName];
      this.dummyData.changeCurrentBagProp();
   }

   transferBag(destinationBag=null) {
      this.utils.bagPath = this.bagPath;
      const currentBagObj = this.dummyData.getData();
      const pathArray = this.bagPath.split('/');
      const currentBagName = pathArray[pathArray.length-1];
      const parentObj = this.utils.getParentObj(currentBagName, true);
      const destObj = destinationBag ? destinationBag : parentObj;
      console.log('destObj:', destObj);
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
      this.transferBag();
   }


   bagMove() {  // implement that you cannot move into child objects and it's direct parent (not in itself is done)!!!!!!
      const selection = document.getElementById('modal-select').value;
      const choosenObj = this.utils.getBagObjByPath(selection);
      this.transferBag(choosenObj);
   }
}

export default BagSubmits;