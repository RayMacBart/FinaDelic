class EventHandler {

   boundBagClickHandlers = {};
   boundBGClickHandler = null;
   choosenFlowID = null;
   boundFlowClickHandler = null;

   #BGClick(flowEl) {
      flowEl.classList.remove('flowItem--choosen');
      if (!(flowEl.classList.contains('flowItem--unchoosen'))) {
         flowEl.classList.add('flowItem--unchoosen');
      }
      this.choosenFlowID = null;
      document.querySelector('.view-wrapper').removeEventListener('click', this.boundBGClickHandler);
      this.boundBGClickHandler = null;
   }

   #flowClick(event) {
      event.stopPropagation();
      const flowEl = event.target.closest('.flowItem');
      if (flowEl) {
         const id = flowEl.dataset.flowId;
         if (!(this.choosenFlowID === id)) {
            if (this.choosenFlowID) {
               document.querySelector('.view-wrapper').removeEventListener('click', this.boundBGClickHandler);
               const flowItems = document.querySelectorAll('.flowItem');
               flowItems.forEach((flowItem) => {
                  if (flowItem.dataset.flowId === this.choosenFlowID) {
                     flowItem.classList.remove('flowItem--choosen');
                     if (!(flowItem.classList.contains('flowItem--unchoosen'))) {
                        flowItem.classList.add('flowItem--unchoosen');
                     }
                  }
               })
            }
            this.boundBGClickHandler = this.#BGClick.bind(this, flowEl);
            document.querySelector('.view-wrapper').addEventListener('click', this.boundBGClickHandler);
            this.choosenFlowID = id;
            flowEl.classList.remove('flowItem--unchoosen');
            if (!(flowEl.classList.contains('flowItem--choosen'))) {
               flowEl.classList.add('flowItem--choosen')
            }
         } 
      } else {
         console.log('WARNING: TRIED TO ADD FLOW EVENTLISTENER TO NON EXISTING ELEMENT!');
      }
   }

   linkFlows(bagData) {
      if (bagData['transactions']) {
         this.boundFlowClickHandler = this.#flowClick.bind(this);
         document.querySelector('.flowlist').addEventListener('click', this.boundFlowClickHandler);
      }
   }
}

export default EventHandler;