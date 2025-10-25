class Modal {

   direction;
   currentBoundSubmitFunction;
   currentBoundCancelFunction;
   reloadEvent;
   inputModalTypes = ['bag-create', 'bag-rename', 'flow-amount', 'flow-desc', 'flow-date'];
   smallInputLabelModalTypes = ['bag-create', 'bag-rename'];  // extendable array!
   currentModalType;

   constructor(dummyData, modalContents) {
      this.dummyData = dummyData;
      this.modalContents = modalContents;
      this.dialog = document.getElementById('main-modal-element');
      this.elements = {
         'form': this.dialog.querySelector('.modal-form'),
         'text-1': this.dialog.querySelector('.modal__text-1'),
         'text-2': this.dialog.querySelector('.modal__text-2'),
         'text-3': this.dialog.querySelector('.modal__text-3'),
         'text-4': this.dialog.querySelector('.modal__text-4'),
         'questionmark': this.dialog.querySelector('.modal__questionmark'),
         'input-label': this.dialog.querySelector('.modal__input-label'),
         'input': this.dialog.querySelector('.modal__input'),
         'select-label': this.dialog.querySelector('.modal__select-label'),
         'select': this.dialog.querySelector('.modal__select'),
         'amount-input-wrapper': this.dialog.querySelector('.modal__amount-input-wrapper'),
         'submit-button': this.dialog.querySelector('.modal-button-wrapper > input'),
         'cancel-button': this.dialog.querySelector('.modal-button-wrapper > button'),
      }
   }

   manageModal(modalType) {
      this.direction = this.dummyData.getBagPath().split('/')[0];
      this.currentModalType = modalType;
      this.runModal();
      this.dialog.showModal();
   }


   finishModal() {
      if (this.smallInputLabelModalTypes.includes(this.currentModalType)) {   
         this.elements['input-label'].style.fontSize = '1.375rem';
      }
      for (const elemName in this.modalContents[this.currentModalType]) {
         this.elements[elemName].style.display = 'none';
         if (elemName === 'input') {
            this.elements[elemName].value = '';
         }
      }
      if (this.inputModalTypes.includes(this.currentModalType)) {
         if (this.elements['submit-button'].classList.contains('modal__button--positive')) {
            this.elements['submit-button'].classList.remove('modal__button--positive');
         }
         this.elements['submit-button'].classList.add('modal__button--disabled');
      }
      document.getElementById('toolbar-wrapper').dispatchEvent(this.reloadEvent);
   }


   submitModal() {
      // here comes reaction/functionality of submits, separated by modalType by if checks.
      // delegate it to another class!
      // to receive and forward the 'return'-values to work with,
      // for inputType modals, take '.value' property from this.elements['input'],
      // for move (select) modals, take '.value' property from this.elements['select'].
      this.finishModal();
   }

   restrictDecimalChars(event) {
      if (event.target.value.length > 2) {
         event.target.value = event.target.value.slice(0,2);
      }
   }


   getAdjustedInnerText(elemName) {
      const bagtype = this.direction === 'IN' ? 'POCKET' : 'DRAIN';
      const flowtype = this.direction === 'IN' ? 'GAIN' : 'LOSS';
      let innerText = this.modalContents[this.currentModalType][elemName];
      if (typeof innerText === 'string') {
         if (innerText.includes('BAG')) {
            innerText = innerText.replace('BAG', bagtype);
         }
         if (innerText.includes('FLOW')) {
            innerText = innerText.replace('FLOW', flowtype);
         }
      }
      return innerText
   }


   watchInput(event) {
      this.elements['submit-button'].removeEventListener('click', this.currentBoundSubmitFunction);
      if (event.target.value) {
         this.elements['submit-button'].disabled = false;
         this.elements['submit-button'].classList.remove('modal__button--disabled');
         if (!this.elements['submit-button'].classList.contains('modal__button--positive')) {
            this.elements['submit-button'].classList.add('modal__button--positive');
         }
         this.currentBoundSubmitFunction = this.submitModal.bind(this);
         this.elements['submit-button'].addEventListener('click', this.currentBoundSubmitFunction, {once: true});
      } else {
         if (this.currentModalType !== 'flow-amount' || 
            (!document.getElementById('amount-predecimal').value && !document.getElementById('amount-decimal').value)) {
            this.elements['submit-button'].disabled = true;
            if (this.elements['submit-button'].classList.contains('modal__button--positive')) {
               this.elements['submit-button'].classList.remove('modal__button--positive');
            }
            this.elements['submit-button'].classList.add('modal__button--disabled');
         }
      }
      if (this.currentModalType === 'flow-amount') {
         if (event.target.value.toString().includes('e')) {
            event.target.value = event.target.value.toString().replace('e', '');
         }
         if (event.target.value.includes('-')) {
            event.target.value = event.target.value.replace('-', '');
         }
      }
   }

// TODO: CLEAN UP, CONNECT FLOW-AMOUNT TO FLOW-DESC AND FLOW-DATE
   runModal() {
      for (const elemName in this.modalContents[this.currentModalType]) {
         if (['submit-button', 'cancel-button'].includes(elemName)) {
            this.elements[elemName].style.display = 'inline-block';
         } else if (elemName === 'amount-input-wrapper') {
            this.elements[elemName].style.display = 'flex';
            const decimalEl = document.getElementById('amount-decimal');
            decimalEl.removeEventListener('input', this.restrictDecimalChars);
            decimalEl.addEventListener('input', this.restrictDecimalChars);

         } else {
            this.elements[elemName].style.display = 'block';
         }
         if (elemName === 'submit-button') {
            this.elements[elemName].value = this.getAdjustedInnerText(elemName);
         } else if (!(['input', 'select', 'amount-input-wrapper'].includes(elemName))) {
            this.elements[elemName].innerText = this.getAdjustedInnerText(elemName);
         }
      }
      if (this.smallInputLabelModalTypes.includes(this.currentModalType)) {
         this.elements['input-label'].style.fontSize = '1.1rem';
      }
      if (this.inputModalTypes.includes(this.currentModalType)) {
         this.elements['submit-button'].disabled = true;
         if (!this.elements['submit-button'].classList.contains('modal__button--disabled')) {
            this.elements['submit-button'].classList.add('modal__button--disabled');
         }
         this.elements['submit-button'].classList.remove('modal__button--positive');
         const boundInputWatcher = this.watchInput.bind(this);
         if (this.currentModalType === 'flow-amount') {
            for (const prefix of ['pre', '']) {
               const inputElem = document.getElementById(`amount-${prefix}decimal`);
               inputElem.removeEventListener('input', boundInputWatcher);
               inputElem.addEventListener('input', boundInputWatcher);
            };
            const signElem = this.elements['amount-input-wrapper'].querySelector('.modal__amount-sign');
            if (this.direction === 'IN') {
               signElem.style.borderColor = '#399149ff';
               signElem.style.color = '#008017';
               signElem.innerText = '+';
            } else if (this.direction === 'OUT') {
               signElem.style.borderColor = '#9d5e5eff';
               signElem.style.color = '#B20000';
               signElem.innerText = '-';
            }
         } else {
            this.elements['input'].removeEventListener('input', boundInputWatcher);
            this.elements['input'].addEventListener('input', boundInputWatcher);
         }
      } else {
         if (!this.elements['submit-button'].classList.contains('modal__button--positive')) {
            this.elements['submit-button'].classList.add('modal__button--positive');
         }
         this.elements['submit-button'].classList.remove('modal__button--disabled');
         this.currentBoundSubmitFunction = this.submitModal.bind(this);
         this.elements['submit-button'].addEventListener('click', this.currentBoundSubmitFunction, {once: true});
      }
      this.currentBoundCancelFunction = this.finishModal.bind(this);
      this.elements['cancel-button'].addEventListener('click', this.currentBoundCancelFunction, {once: true});
   }

}


export default Modal;