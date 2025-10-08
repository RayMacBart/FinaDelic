class ToolbarEventHandler {
   
   boundHandlers = [];

   constructor(dummyData, reloadEvent) {
      this.dummyData = dummyData;
      this.reloadEvent = reloadEvent;
   }

   triggerBagReload() {
      document.getElementById('toolbar-wrapper').dispatchEvent(this.reloadEvent);
   }

   add2chart() {
      this.dummyData.data['IN']['nestedBags']['official']['amount'] = 123456789;
      this.triggerBagReload();
   }

   // next issue to fix: Clicking on flow when Modify-Toolbar is activated leads to unwanted behaviour!

}

export default ToolbarEventHandler;