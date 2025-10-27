class InputModal {

   boundInputWatcher;

   constructor(modalsInstance) {
      this.modIns = modalsInstance;
      this.boundInputWatcher = this.watchInput.bind(this);
   }

   restrictDecimalChars(event) {
      if (event.target.value.length > 2) {
         event.target.value = event.target.value.slice(0,2);
      }
   }


   setSignDir() {
      const signElem = this.modIns.elements['amount-input-wrapper'].querySelector('.modal__amount-sign');
      if (this.modIns.direction === 'IN') {
         signElem.style.borderColor = '#399149ff';
         signElem.style.color = '#008017';
         signElem.innerText = '+';
      } else if (this.modIns.direction === 'OUT') {
         signElem.style.borderColor = '#9d5e5eff';
         signElem.style.color = '#B20000';
         signElem.innerText = '-';
      }
   }


   setupAmountInput() {
      this.modIns.elements['amount-input-wrapper'].style.display = 'flex';
      const decimalEl = document.getElementById('amount-decimal');
      decimalEl.removeEventListener('input', this.restrictDecimalChars);
      decimalEl.addEventListener('input', this.restrictDecimalChars);
      for (const prefix of ['pre', '']) {
         const inputElem = document.getElementById(`amount-${prefix}decimal`);
         inputElem.removeEventListener('input', this.boundInputWatcher);
         inputElem.addEventListener('input', this.boundInputWatcher);
      };
      this.setSignDir();
   }


   watchInput(event) {
      this.modIns.elements['submit-button'].removeEventListener('click', this.modIns.boundSubmitFunction);
      if (event.target.value) {
         this.modIns.elements['submit-button'].disabled = false;
         this.modIns.elements['submit-button'].classList.remove('modal__button--disabled');
         if (!this.modIns.elements['submit-button'].classList.contains('modal__button--positive')) {
            this.modIns.elements['submit-button'].classList.add('modal__button--positive');
         }
         this.modIns.elements['submit-button'].addEventListener('click', this.modIns.boundSubmitFunction, {once: true});
      } else {
         if (this.modIns.currentModalType !== 'flow-amount' || 
            (!document.getElementById('amount-predecimal').value && !document.getElementById('amount-decimal').value)) {
            this.modIns.elements['submit-button'].disabled = true;
            if (this.modIns.elements['submit-button'].classList.contains('modal__button--positive')) {
               this.modIns.elements['submit-button'].classList.remove('modal__button--positive');
            }
            this.modIns.elements['submit-button'].classList.add('modal__button--disabled');
         }
      }
      if (this.modIns.currentModalType === 'flow-amount') {
         if (event.target.value.toString().includes('e')) {
            event.target.value = event.target.value.toString().replace('e', '');
         }
         if (event.target.value.includes('-')) {
            event.target.value = event.target.value.replace('-', '');
         }
      }
   }


   setup() {
      this.modIns.elements['submit-button'].disabled = true;
      if (!this.modIns.elements['submit-button'].classList.contains('modal__button--disabled')) {
         this.modIns.elements['submit-button'].classList.add('modal__button--disabled');
      }
      this.modIns.elements['submit-button'].classList.remove('modal__button--positive');
      if (this.modIns.currentModalType === 'flow-amount') {
         this.setupAmountInput();
      } else {
         this.modIns.elements['input'].removeEventListener('input', this.boundInputWatcher);
         this.modIns.elements['input'].addEventListener('input', this.boundInputWatcher);
      }
   }
}

export default InputModal;