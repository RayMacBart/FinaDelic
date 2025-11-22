class ToolbarEventHandler {
   
   boundAdd2chartHandler;
   boundRemoveFromChartHandler;
   boundAddNestedBagHandler;
   boundAddFlowHandler;
   boundRenameBagHandler;
   boundMoveBagHandler;
   boundEraseBagHandler;
   boundDisbandBagHandler;
   boundDeleteFlowHandler;
   boundMoveFlowHandler;
   boundChangeFlowHandler;
   boundChangeDateHandler;
   boundChangeTextHandler;
   boundChangeAmountHandler;

   constructor(dummyData, reloadEvent, modal, chart) {
      this.dummyData = dummyData;
      this.reloadEvent = reloadEvent;
      this.modal = modal;
      this.modal.reloadEvent = reloadEvent;
      this.modal.setAllocation(chart);
   }


   add2chartHandler(event) {
      event.stopPropagation();
      this.modal.startModal('add2chart');
   }


   removeFromChartHandler(event) {
      event.stopPropagation();
      this.modal.startModal('removeFromChart');
   }


   addNestedBagHandler() {
      // NO STOPPROPAGATION() HERE - THIS CAN ONLY BE TRIGGERED IF NO FLOW IS SELECTED ANYWAY
      this.modal.startModal('bag-create');
   }


   addFlowHandler() {
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
}


export default ToolbarEventHandler;