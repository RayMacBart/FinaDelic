class Modal {

   direction;
   currentBoundSubmitFunction;
   returnValue;

   constructor(dummyData, modalContents) {
      this.dummyData = dummyData;
      this.modalContents = modalContents;
      this.dialog = document.getElementById('main-modal-element');
      this.form = this.dialog.querySelector('.modal-form');
      this.text1 = this.dialog.querySelector('.modal__text-1');
      this.text2 = this.dialog.querySelector('.modal__text-2');
      this.text3 = this.dialog.querySelector('.modal__text-3');
      this.text4 = this.dialog.querySelector('.modal__text-4');
      this.questionmark = this.dialog.querySelector('.modal__questionmark');
      this.inputLabel = this.dialog.querySelector('.modal__input-label');
      this.input = this.dialog.querySelector('.modal__input');
      this.selectLabel = this.dialog.querySelector('.modal__select-label');
      this.select = this.dialog.querySelector('.modal__select');
      this.submitButton = this.dialog.querySelector('.modal__button--disabled');
      this.cancelButton = this.dialog.querySelector('.modal__button--negative');
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

   createBag() {
      this.returnValue = this.input.value;
      console.log(`BAG CREATED: ${this.returnValue}`);
   }


   runInputModal(type) {
      if (type === 'bag-create') {
         const bagtype = this.direction === 'IN' ? 'POCKET' : 'DRAIN';
         this.text1.style.display = 'block';
         this.text1.innerText = `CREATE NEW ${bagtype}`;
         this.inputLabel.style.display = 'block';
         this.inputLabel.innerText = 'Enter Name:';
         this.inputLabel.style.fontSize = '1.1rem';
         this.input.style.display = 'block';
         function watchInput() {
            this.submitButton.removeEventListener('click', this.currentBoundSubmitFunction);
            if (this.input.value) {
               this.submitButton.disabled = false;
               if (this.submitButton.classList.contains('modal__button--disabled')) {
                  this.submitButton.classList.remove('modal__button--disabled');
               }
               this.submitButton.classList.add('modal__button--positive');
               this.currentBoundSubmitFunction = this.createBag.bind(this);
               this.submitButton.addEventListener('click', this.currentBoundSubmitFunction, {once: true});
            } else {
               this.submitButton.disabled = true;
               if (this.submitButton.classList.contains('modal__button--positive')) {
                  this.submitButton.classList.remove('modal__button--positive');
               }
               this.submitButton.classList.add('modal__button--disabled');
            }
         }
         const boundInputWatcher = watchInput.bind(this);
         this.input.addEventListener('input', boundInputWatcher);
         this.submitButton.style.display = 'inline-block';
         this.submitButton.value = 'CREATE';
         this.cancelButton.style.display = 'inline-block';
         this.cancelButton.innerText = 'CANCEL';
      }
   }


   runMoveModal(type) {

   }


   runNonInputModal() {

   }

}

export default Modal;