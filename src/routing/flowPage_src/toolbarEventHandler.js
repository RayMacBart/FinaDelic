class ToolbarEventHandler {
   
   boundAdd2chartHandler;

   constructor(dummyData, reloadEvent) {
      this.dummyData = dummyData;
      this.reloadEvent = reloadEvent;
   }

   triggerBagReload() {
      document.getElementById('toolbar-wrapper').dispatchEvent(this.reloadEvent);
   }

   add2chartHandler(event) {
      event.stopPropagation();
      console.log('ToolbarEventHandler.dummyData:', this.dummyData);
      this.dummyData.data['IN']['nestedBags']['official']['amount'] = 123456789;
      this.triggerBagReload();
   }

}

export default ToolbarEventHandler;