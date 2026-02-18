// import { showInfo } from '../infos.js';


class InputModal {

   boundInputWatcher;
   whiteListRegex = /[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890äöüÄÖÜß ?!,.-/()]/;

   constructor(modalsInstance) {
      this.modIns = modalsInstance;
      this.boundInputWatcher = this.watchInput.bind(this);
   }

   #restrictDecimalChars(event) {
      if (event.target.value.length > 2) {
         event.target.value = event.target.value.slice(0,2);
      }
   }


   #setSignDir() {
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


   #setupAmountInput() {
      this.modIns.elements['amount-input-wrapper'].style.display = 'flex';
      const decimalEl = document.getElementById('amount-decimal');
      decimalEl.removeEventListener('input', this.#restrictDecimalChars);
      decimalEl.addEventListener('input', this.#restrictDecimalChars);
      for (const prefix of ['pre', '']) {
         const inputElem = document.getElementById(`amount-${prefix}decimal`);
         inputElem.removeEventListener('input', this.boundInputWatcher);
         inputElem.addEventListener('input', this.boundInputWatcher);
      };
      this.#setSignDir();
   }


   #formatDateStr(dateStr) {
      const dateArray = dateStr.split('.');
      for (let i=0; i<dateArray.length; i++) {
         if (dateArray[i].length === 1) {
            dateArray[i] = '0'+dateArray[i];
         }
      }
      return dateArray[2]+'-'+dateArray[1]+'-'+dateArray[0];
   }


   #prepInputs() {
      if (!this.modIns.isModalSeries) {
         if (this.modIns.currentModalType === 'flow-amount' || this.modIns.currentModalType === 'flow-desc') {
            if (this.modIns.currentModalType === 'flow-desc') {
               this.modIns.elements['input'].value = document.querySelector('.flowItem--choosen > .flow-description').innerText;
               this.modIns.elements['input'].select();
            } else if (this.modIns.currentModalType === 'flow-amount') {
               const commaAdjustedAmountStr = (document.querySelector('.flowItem--choosen .flow-amount').innerText).replace(',', '.');
               let absAmountStr = String(Math.abs(Number(commaAdjustedAmountStr)));
               if (absAmountStr.includes('.')) {
                  document.getElementById('amount-predecimal').value = absAmountStr.split('.')[0];
                  document.getElementById('amount-predecimal').select();
                  document.getElementById('amount-decimal').value = absAmountStr.split('.')[1];
               } else {
                  document.getElementById('amount-predecimal').value = absAmountStr;
                  document.getElementById('amount-predecimal').select();
               }
            }
         }
      } else if (this.modIns.currentModalType === 'flow-desc') {
         this.modIns.elements['input'].focus();
      }
      if (this.modIns.currentModalType === 'flow-date') {
         this.modIns.elements['input'].type = 'date';
         if (this.modIns.isModalSeries) {
            let today = new Date();
            today = today.toISOString().split('T')[0];
            this.modIns.elements['input'].value = today;
         } else {
            this.modIns.elements['input'].value = this.#formatDateStr(document.querySelector('.flowItem--choosen > .flow-date').innerText);
         }
      } else if (this.modIns.currentModalType === 'time') {
         if (window.location.href.split('/').pop() === 'flowPage') {
            this.modIns.elements['start-date'].value = this.#formatDateStr(document.getElementById('time-start').innerText);
            this.modIns.elements['end-date'].value = this.#formatDateStr(document.getElementById('time-end').innerText);
         } else if (window.location.href.split('/').pop() === 'chartPage') {
            this.modIns.elements['start-date'].value = this.#formatDateStr(document.getElementById('time-start-chart').innerText);
            this.modIns.elements['end-date'].value = this.#formatDateStr(document.getElementById('time-end-chart').innerText);
         }
      }
   }


   watchInput(event) {
      if (this.modIns.currentModalType === 'flow-date' || this.modIns.currentModalType === 'time') {
         this.modIns.elements['submit-button'].disabled = false;
      }
      this.modIns.elements['submit-button'].removeEventListener('click', this.modIns.boundSubmitFunction);
      if ((this.modIns.currentModalType === 'flow-amount' && event.target.value) || event.target.value.toString().length >= 3) {
         this.modIns.elements['submit-button'].disabled = false;
         this.modIns.elements['submit-button'].classList.remove('modal__button--disabled');
         if (!this.modIns.elements['submit-button'].classList.contains('modal__button--positive')) {
            this.modIns.elements['submit-button'].classList.add('modal__button--positive');
         }
         this.modIns.elements['submit-button'].addEventListener('click', this.modIns.boundSubmitFunction, {once: true});
      } else {
         if ((this.modIns.currentModalType !== 'flow-amount' && event.target.value.toString().length < 3) || 
            (!document.getElementById('amount-predecimal').value && !document.getElementById('amount-decimal').value)) {
            this.modIns.elements['submit-button'].disabled = true;
            if (this.modIns.elements['submit-button'].classList.contains('modal__button--positive')) {
               this.modIns.elements['submit-button'].classList.remove('modal__button--positive');
            }
            this.modIns.elements['submit-button'].classList.add('modal__button--disabled');
         }
      }
      if (event.target.value.toString().length > 25) {
         if (!this.modIns.currentModalType === 'flow-desc') {
            event.target.value = event.target.value.slice(0, 25);
         } else {
            if (event.target.value.toString().length > 50) {
               event.target.value = event.target.value.slice(0, 50);
            }
         }
      }
      if (this.modIns.currentModalType === 'flow-amount') {
         if (String(event.target.value).includes('e')) {
            event.target.value = event.target.value.toString().replace('e', '');
         }
         if (event.target.value.includes('-')) {
            event.target.value = event.target.value.replace('-', '');
         }
         if (event.target.value.toString().length > 11) {
            event.target.value = event.target.value.slice(0, 11);
      }
      } else if (['flow-desc', 'bag-rename', 'bag-create'].includes(this.modIns.currentModalType)) {
         for (const char of event.target.value.toString()) {
            if (!(char.match(this.whiteListRegex))) {
               // showInfo('noSpecialChars');
               event.target.value = event.target.value.toString().replace(char, '');
         }
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
         this.#setupAmountInput();
      } 
      else if (this.modIns.currentModalType === 'flow-date' || this.modIns.currentModalType === 'time') {
         this.modIns.elements['date-submit-button'].addEventListener('click', this.modIns.boundSubmitFunction, {once: true})
      } else {
         this.modIns.elements['input'].removeEventListener('input', this.boundInputWatcher);
         this.modIns.elements['input'].addEventListener('input', this.boundInputWatcher);
      }
      if (['flow-date', 'flow-desc', 'flow-amount', 'time'].includes(this.modIns.currentModalType)) {
         this.#prepInputs();
      }
      
   }
}

export default InputModal;