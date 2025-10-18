class Modal {

   direction;

   constructor(dummyData, modalContents) {
      this.dummyData = dummyData;
      this.modalContents = modalContents;
      this.dialog = document.getElementById('main-modal-element');
      this.form = this.dialog.querySelector('.modal-form');
      this.pretext = this.dialog.querySelector('.modal-pretext');
      this.title = this.dialog.querySelector('.modal-title');
      this.text = this.dialog.querySelector('.modal-text');
      this.label = this.dialog.querySelector('.modal-label');
      this.input = this.dialog.querySelector('.modal-input');
      this.posiButton = this.dialog.querySelector('.modalbutton--positive');
      this.negaButton = this.dialog.querySelector('.modalbutton--negative');
   }

   manageModal(type) {
      this.direction = this.dummyData.getBagPath().split('/')[0];
      if (type === 'flow-create') {
         this.runFlowCreateModals();    // will also run 'runInputModal()' inside for 2 more times
      }
      else if (['bag-rename', 'bag-create'].includes(type)) {
         this.runInputModal(type);
      }
      else if (['flow-move', 'bag-move'].includes(type)) {
         this.runMoveModal(type);
      }
      else {
         this.runNonInputModal();
      }

      this.dialog.showModal();
   }


   runFlowCreateModals() {

   }


   runInputModal(type) {
      console.log(this.modalContents[type]);
   }


   runMoveModal(type) {

   }


   runNonInputModal() {

   }

}

export default Modal;