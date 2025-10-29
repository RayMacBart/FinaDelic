class BagSubmits {

   currelems;
   bagPath;
   
   
   constructor(reloadEvent, dummyData, chart) {
      this.reloadEvent = reloadEvent;
      this.dummyData = dummyData;
      this.chart = chart;
   }


   getParentObj(currentBagName) {
      const pathArray =  this.bagPath.split('/');
      let focussedObj = this.dummyData.data[pathArray[0]]['nestedBags'];
      for (const bag of pathArray) {
         if (bag === 'IN' || bag === 'OUT') {
            continue;
         }
         if (!(bag === currentBagName)) {
            focussedObj = focussedObj[bag]['nestedBags']
         }
      }
      return focussedObj;
   } 
      

   // here comes reaction/functionality of submits
   // to receive and forward the 'return'-values to work with,
   // for inputType modals, take '.value' property from currelems['input'],
   // for move (select) modals, take '.value' property from currelems['select'].

   add2chart() {
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
      console.log('data:', this.dummyData.getData());
      this.dummyData.getData()['nestedBags'][newBagName] = {
         'amount': 0,
         'nestedBags': {},
         'transactions': {}
      };
   }


   bagRename() {
      console.log('in rename!!!');
      const newBagName = this.currelems['input'].value;
      const currentBagName = this.bagPath.split('/').pop();
      const parentObj = this.getParentObj(currentBagName);
      parentObj[newBagName] = {...parentObj[currentBagName]};
      delete parentObj[currentBagName];
      this.dummyData.changeCurrentBagProp(newBagName);
   }


   bagErase() {
      const currentBagName = this.bagPath.split('/').pop();
      const parentObj = this.getParentObj(currentBagName);
      delete parentObj[currentBagName];
      this.dummyData.changeCurrentBagProp();
   }


   bagDisband() {

   }


   bagMove() {

   }
}

export default BagSubmits;