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

   constructor(appData, reloadEvent, modal) {
      this.appData = appData;
      this.reloadEvent = reloadEvent;
      this.modal = modal;
      this.modal.reloadEvent = reloadEvent;
   }


   add2chartHandler(event) {
      event.stopPropagation();
      // const toolbarWrapElem = document.getElementById('flowpage-bag').querySelector('#toolbar-wrapper');
      const buttons = document.querySelectorAll('.tool-button');
      for (const button of buttons) {
         if (button.firstElementChild && button.firstElementChild.innerText && (button.firstElementChild.innerText).includes('CHART')) {
            button.removeEventListener('click', this.boundAdd2chartHandler);
            button.removeEventListener('click', this.boundRemoveFromChartHandler);
         }
      }
      this.modal.startModal('add2chart');
   }
   
   
   removeFromChartHandler(event) {
      event.stopPropagation();
      const buttons = document.querySelectorAll('.tool-button');
      for (const button of buttons) {
         if (button.firstElementChild && button.firstElementChild.innerText && (button.firstElementChild.innerText).includes('CHART')) {
            button.removeEventListener('click', this.boundRemoveFromChartHandler);
            button.removeEventListener('click', this.boundAdd2chartHandler);
         }
      }
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