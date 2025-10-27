class BagSubmits {

   currelems;
   bagPath;

   constructor(reloadEvent, dummyData, chart) {
      this.reloadEvent = reloadEvent;
      this.dummyData = dummyData;
      this.chart = chart;
   }

   // here comes reaction/functionality of submits
   // to receive and forward the 'return'-values to work with,
   // for inputType modals, take '.value' property from currelems['input'],
   // for move (select) modals, take '.value' property from currelems['select'].

   add2chart() {
      console.log('ToolbarEventHandler.dummyData:', this.dummyData);               // dummyCode
      this.dummyData.data['IN']['nestedBags']['official']['amount'] = 123456789;   // dummyCode
      this.chart.bags[this.bagPath] = this.dummyData.data['nestedBags'];  // dummyCode --> recursive bag collector wanted!
      console.log(this.chart);
      // here, add temporary message that bag NAME has been added to chart!
   }


   bagCreate() {
      document.getElementById('toolbar-wrapper').dispatchEvent(this.reloadEvent);
   }


   bagRename() {

   }


   bagErase() {

   }


   bagDisband() {

   }


   bagMove() {

   }
}

export default BagSubmits;