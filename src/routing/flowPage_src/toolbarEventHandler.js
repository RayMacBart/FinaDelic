class ToolbarEventHandler {
   
   boundAdd2chartHandler;
   boundAddNestedBagHandler;
   boundAddFlowHandler;
   boundRenameBagHandler;
   boundMoveBagHandler;
   boundEraseBagHandler;
   boundDisbandBagHandler;
   boundDeleteFlowHandler;
   boundMoveFlowHandler;
   boundChangeFlowHandler;

   constructor(dummyData, reloadEvent, modal, chart) {
      this.dummyData = dummyData;
      this.reloadEvent = reloadEvent;
      this.modal = modal;
      this.modal.reloadEvent = reloadEvent;
      this.modal.setAllocation(chart);
   }


   add2chartHandler(event) {
      // event.stopPropagation();
      this.modal.startModal('add2chart');
      
   }


   addNestedBagHandler() {
      // NO STOPPROPAGATION() HERE - THIS CAN ONLY BE TRIGGERED IF NO FLOW IS SELECTED ANYWAY
      this.modal.startModal('bag-create');
   }


   addFlowHandler() {   // open modal for flow-infos. Check if Date of flow is within timespan.
                        // if not, don't render it to the page, and inform the user that the added flow
                        // is saved but not seen here since it doesn't fall into the specified timespan.
                        // if yes, render the new flow.
                        // in all cases (also if not or canceled), refresh the page (renews eventlistener for used button) OR BETTER:
                        // For the modal, implement an already pre-entered date value which is the current day.
                        // This enhances user experience. But let the user be able to change it.
      this.modal.startModal('flow-amount', true);
   }


   renameBagHandler() {
      this.modal.startModal('bag-rename');
   }


   moveBagHandler() {
      this.modal.startModal('bag-move');
   }


   eraseBagHandler() {
      this.modal.startModal('bag-erase');
   }


   disbandBagHandler() {
      this.modal.startModal('bag-disband');
   }


   deleteFlowHandler(event) {
      event.stopPropagation();
      this.modal.startModal('flow-delete');
      
   }


   moveFlowHandler(event) {
      event.stopPropagation();
      this.modal.startModal('flow-move');
   }


   changeDateHandler(event) {
      event.stopPropagation();
      this.modal.startModal('flow-date');
   }


   changeTextHandler(event) {
      event.stopPropagation();
      this.modal.startModal('flow-desc');
   }


   changeAmountHandler(event) {
      event.stopPropagation();
      this.modal.startModal('flow-amount');
   }



   // IDEA FOR BUTTON "MOVE" IN "MODIFY" (FOR BAGS) AND FOR "MOVE" OF SELECTED FLOWS:
   // IN THE MODAL, MAKE A DROPDOWN (SELECT-) ELEMENT WITH ALL THE BAGS TO CHOOSE FROM.
   // PROVIDE ONLY DRAINS FOR DRAINS, AND ONLY POCKETS FOR POCKETS IN THIS LIST, AND DON'T FORGET TO OMIT
   // THE CURRENT BAG ITSELF IN THE MENU. IF EASILY IMPLEMENTABLE, VISUALIZE BAG NESTING LEVELS IN THE SELECT-MENU.
}

export default ToolbarEventHandler;