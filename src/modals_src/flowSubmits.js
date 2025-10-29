class FlowSubmits {

   currelems;
   bagPath;
   startNextMod;
   flowID;

   constructor(reloadEvent, dummyData) {
      this.reloadEvent = reloadEvent;
      this.dummyData = dummyData;
   }

   // here comes reaction/functionality of submits
   // to receive and forward the 'return'-values to work with,
   // for inputType modals, take '.value' property from currelems['input'],
   // for move (select) modals, take '.value' property from currelems['select'].

   flowAmount() {

   }


   flowDesc() {

   }


   flowDate() {

      document.dispatchEvent(this.reloadEvent);
   }


   flowDelete() {

   }


   flowMove() {

   }
}

export default FlowSubmits;