class ToolbarEventHandler {
   
   boundAdd2chartHandler;
   boundAddNestedBagHandler;
   boundAddFlowHandler;
   boundRenameBagHandler;
   boundMoveBagHandler;

   constructor(dummyData, reloadEvent, modal) {
      this.dummyData = dummyData;
      this.reloadEvent = reloadEvent;
      this.modal = modal;
      this.modal.reloadEvent = reloadEvent;
   }


   add2chartHandler(event) {
      event.stopPropagation();
      console.log('ToolbarEventHandler.dummyData:', this.dummyData);
      this.dummyData.data['IN']['nestedBags']['official']['amount'] = 123456789;
      this.triggerBagReload();
   }

   // not yet listened to from toolbar: (!)
   delete() {   // may be necessary to separate it into 'deleteFlow' and 'deleteBag' - let's see.
      // DON'T USE STOPPROPAGATION() HERE - SO AUTOMATIC DISELECTION IS ENSURED.
      this.modal.manageModal('delete');
   }


   addNestedBagHandler() {
      // NO STOPPROPAGATION() HERE - THIS CAN ONLY BE TRIGGERED IF NO FLOW IS SELECTED ANYWAY
      this.modal.manageModal('bag-create');
   }


   addFlowHandler() {   // open modal for flow-infos. Check if Date of flow is within timespan.
                        // if not, don't render it to the page, and inform the user that the added flow
                        // is saved but not seen here since it doesn't fall into the specified timespan.
                        // if yes, render the new flow.
                        // in all cases (also if not or canceled), refresh the page (renews eventlistener for used button) OR BETTER:
                        // For the modal, implement an already pre-entered date value which is the current day.
                        // This enhances user experience. But let the user be able to change it.
      console.log('add flow!');
   }


   renameBagHandler() {

   }


   moveBagHandler() {
      
   }



   // IDEA FOR BUTTON "MOVE" IN "MODIFY" (FOR BAGS) AND FOR "MOVE" OF SELECTED FLOWS:
   // IN THE MODAL, MAKE A DROPDOWN (SELECT-) ELEMENT WITH ALL THE BAGS TO CHOOSE FROM.
   // PROVIDE ONLY DRAINS FOR DRAINS, AND ONLY POCKETS FOR POCKETS IN THIS LIST, AND DON'T FORGET TO OMIT
   // THE CURRENT BAG ITSELF IN THE MENU. IF EASILY IMPLEMENTABLE, VISUALIZE BAG NESTING LEVELS IN THE SELECT-MENU.

   // FOR THE "REMOVE"-TOOLBAR, ALSO IMPLEMENT A "BACK"-BUTTON (NOT IN DESIGN YET!)
}

export default ToolbarEventHandler;