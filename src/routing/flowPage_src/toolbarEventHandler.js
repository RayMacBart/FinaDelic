class ToolbarEventHandler {
   
   boundAdd2chartHandler;
   boundAddNestedBagHandler;
   boundAddFlowHandler;

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


   addNestedBagHandler(event) {   // open modal (just for name), add bag to dummyData, render it to page.
                             // also if canceled, refresh the page (renews eventlistener for used button) OR BETTER:
                             // add EventListener here using event.target.closest('.button')!
      console.log('add bag!');
   }


   addFlowHandler(event) {   // open modal for flow-infos. Check if Date of flow is within timespan.
                        // if not, don't render it to the page, and inform the user that the added flow
                        // is saved but not seen here since it doesn't fall into the specified timespan.
                        // if yes, render the new flow.
                        // in all cases (also if not or canceled), refresh the page (renews eventlistener for used button) OR BETTER:
                        // add EventListener here using event.target.closest('.button')!
                        // For the modal, implement an already pre-entered date value which is the current day.
                        // This enhances user experience. But let the user be able to change it.
      console.log('add flow!');

   }

}

export default ToolbarEventHandler;