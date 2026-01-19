import InputModal from './modals_src/inputModal.js';
import SelectModal from './modals_src/selectModal.js';
import ModalSubmitAllocator from './modals_src/modalSubmitAllocator.js';


class Modal {

   direction;
   reloadEvent;
   inputModalTypes = ['bag-create', 'bag-rename', 'flow-amount', 'flow-desc', 'flow-date', 'time'];
   smallInputLabelModalTypes = ['bag-create', 'bag-rename'];  // extendable array!
   currentModalType;
   isModalSeries;

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
         'start-date-label': this.dialog.querySelector('.modal__start-date-label'),
         'start-date': this.dialog.querySelector('.modal__start-date'),
         'end-date-label': this.dialog.querySelector('.modal__end-date-label'),
         'end-date': this.dialog.querySelector('.modal__end-date'),
         'select-label': this.dialog.querySelector('.modal__select-label'),
         'select': this.dialog.querySelector('.modal__select'),
         'amount-input-wrapper': this.dialog.querySelector('.modal__amount-input-wrapper'),
         'submit-button': this.dialog.querySelector('.modal-button-wrapper > input'),
         'date-submit-button': this.dialog.querySelector('.modal-button-wrapper > .datesubmit'),
         'cancel-button': this.dialog.querySelector('.modal-button-wrapper > .cancelButton'),
      }
      this.boundSubmitFunction = this.submitModal.bind(this);
      this.boundCancelFunction = this.finishModal.bind(this);
      this.inputModal = new InputModal(this);
      this.selectModal = new SelectModal(this);
      this.modSub = new ModalSubmitAllocator(this.dummyData);
      this.dialog.addEventListener('keydown', (e) => {if (e.key === 'Escape') {document.dispatchEvent(this.reloadEvent);}});
   }


   startModal(modalType, isModalSeries=false) {
      this.direction = this.dummyData.getBagPath().split('/')[0];
      this.currentModalType = modalType;
      this.isModalSeries = isModalSeries;
      this.runModal();
      this.dialog.showModal();
   }
'time'

   finishModal() {
      if (this.smallInputLabelModalTypes.includes(this.currentModalType)) {   
         this.elements['input-label'].style.fontSize = '1.375rem';
      }
      if (this.currentModalType === 'time') {
         this.elements['start-date-label'].style.fontSize = '1.375rem';
         this.elements['end-date-label'].style.fontSize = '1.375rem';
         document.querySelector('.modal__start-date-wrapper').style.display = 'none';
         document.querySelector('.modal__end-date-wrapper').style.display = 'none';
      }
      for (const elemName in this.modalContents[this.currentModalType]) {
         this.elements[elemName].style.display = 'none';
         if (elemName === 'input' || elemName === 'date-submit-button') {
            this.elements[elemName].value = '';
         }
      }
      if (this.currentModalType === 'flow-amount') {
         document.getElementById('amount-predecimal').value = '';
         document.getElementById('amount-decimal').value = '';
      }
      if (this.inputModalTypes.includes(this.currentModalType)) {
         if (this.elements['submit-button'].classList.contains('modal__button--disabled')) {
            this.elements['submit-button'].classList.remove('modal__button--disabled');
         }
         this.elements['submit-button'].classList.add('modal__button--positive');
      }
      if (this.currentModalType === 'time') {
         document.querySelector('.modal__button--positive').disabled = false;
      }
      if (['bag-move', 'flow-move'].includes(this.currentModalType)) {
         this.elements['select'].querySelector('.option-container').innerHTML = '';
         this.elements['select'].value = '';
         this.elements['select'].querySelector('.modal-select-defaulttext').innerText = ' -- choose -- ';
      }
      if (this.currentModalType === 'flow-date') {
         this.elements['input'].type = 'text';
      }
      if ((this.currentModalType !== 'time') || (window.location.href.split('/').pop() === 'flowPage')) {
         document.dispatchEvent(this.reloadEvent);
      }
   }


   submitModal() {
      this.elements['submit-button'].removeEventListener('click', this.boundSubmitFunction);
      const currentElems = {};
      for (const elemName in this.modalContents[this.currentModalType]) {
         currentElems[elemName] = this.elements[elemName];
      }
      let flowchange = false;
      if (['flow-date', 'flow-desc', 'flow-amount'].includes(this.currentModalType) && !this.isModalSeries) {
         flowchange = true;
      }
      this.modSub.prepare(currentElems, this.currentModalType, this.dummyData.getBagPath(), flowchange, this.reloadEvent);
      this.modSub.allocateAndSubmit(this.currentModalType);
      this.finishModal();
      if (this.currentModalType === 'flow-amount' && this.isModalSeries) {
         this.startModal('flow-desc', true);
      } else if (this.currentModalType === 'flow-desc' && this.isModalSeries) {
         this.startModal('flow-date', true);
      }
   }


   getAdjustedInnerText(elemName) {
      const bagtype = this.direction === 'IN' ? 'INBOX' : 'OUTBOX';
      const flowtype = this.direction === 'IN' ? 'GAIN' : 'LOSS';
      let innerText = this.modalContents[this.currentModalType][elemName];
      if (typeof innerText === 'string') {
         if (innerText.includes('BAGNAME')) {
            innerText = innerText.replace('BAGNAME', '"'+this.dummyData.getBagPath().split('/').pop().toUpperCase()+'"');
         }
         if (innerText.includes('BAG')) {
            innerText = innerText.replace('BAG', bagtype);
         }
         if (innerText.includes('bag')) {
            innerText = innerText.replace('bag', bagtype.toLowerCase());
         }
         if (innerText.includes('FLOW')) {
            innerText = innerText.replace('FLOW', flowtype);
         }
         if (innerText.includes('flow')) {
            innerText = innerText.replace('flow', flowtype.toLowerCase());
         }
      }
      return innerText
   }


   runModal() {
      for (const elemName in this.modalContents[this.currentModalType]) {
         if (['submit-button', 'cancel-button', 'date-submit-button'].includes(elemName)) {
            this.elements[elemName].style.display = 'inline-block';
         } else if (['start-date', 'end-date'].includes(elemName)) {
            this.elements[elemName].closest(`.modal__${elemName}-wrapper`).style.display = 'inline-block';
            this.elements[elemName].style.display = 'block';
         } else {
            this.elements[elemName].style.display = 'block';
         }
         if (['submit-button', 'date-submit-button'].includes(elemName)) {
            this.elements[elemName].value = this.getAdjustedInnerText(elemName);
         } else if (!(['input', 'select', 'amount-input-wrapper'].includes(elemName))) {
            this.elements[elemName].innerText = this.getAdjustedInnerText(elemName);
         }
      }
      if (this.smallInputLabelModalTypes.includes(this.currentModalType)) {
         this.elements['input-label'].style.fontSize = '1.1rem';
      }
      if (this.currentModalType === 'time') {
         this.elements['start-date-label'].style.fontSize = '1.1rem';
         this.elements['end-date-label'].style.fontSize = '1.1rem';
      }
      if (this.inputModalTypes.includes(this.currentModalType)) {
         this.inputModal.setup();
      } else if (this.currentModalType === 'bag-move') {
         this.selectModal.setup(true);
      } else if (this.currentModalType === 'flow-move') {
         this.selectModal.setup(false);
      } else {
         if (this.currentModalType === 'bag-disband') {
            const pathArray = this.dummyData.getBagPath().split('/');
            const parentBagName = pathArray[pathArray.length-2];
            document.querySelector('.modal__text-4').innerText = parentBagName.toUpperCase();
         }
         if (!this.elements['submit-button'].classList.contains('modal__button--positive')) {
            this.elements['submit-button'].classList.add('modal__button--positive');
         }
         this.elements['submit-button'].classList.remove('modal__button--disabled');
         
         if (['add2chart', 'removeFromChart'].includes(this.currentModalType)) {
            this.elements['submit-button'].disabled = false;
         }

         this.elements['submit-button'].addEventListener('click', this.boundSubmitFunction, {once: true});
      }
      this.elements['cancel-button'].addEventListener('click', this.boundCancelFunction, {once: true});
   }

}


export default Modal;