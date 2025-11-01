import SubmitUtils from './submitUtils.js';

class SelectModal {

   constructor(modalsInstance) {
      this.modIns = modalsInstance;
      this.utils = new SubmitUtils(modalsInstance.dummyData);
      this.boundRecognizeSelection = this.recognizeSelection.bind(this);
   }

   recognizeSelection() {
      this.modIns.elements['submit-button'].disabled = false;
      this.modIns.elements['submit-button'].classList.remove('modal__button--disabled');
      if (!this.modIns.elements['submit-button'].classList.contains('modal__button--positive')) {
         this.modIns.elements['submit-button'].classList.add('modal__button--positive');
      }
      this.modIns.elements['submit-button'].addEventListener('click', this.modIns.boundSubmitFunction, {once: true});
   }

   renderSelect() {
      const currentBagPath = this.modIns.dummyData.getBagPath();
      this.utils.bagPath = currentBagPath;
      const direction = currentBagPath.split('/')[0];
      const bagObjects = this.utils.getAllChildBagObjects(this.modIns.dummyData.data[direction], direction);
       // implement that you cannot move into child objects and it's direct parent (not in itself is done)!!!!!!
       // implement that you cannot move into child objects and it's direct parent (not in itself is done)!!!!!!
       // implement that you cannot move into child objects and it's direct parent (not in itself is done)!!!!!!
       // implement that you cannot move into child objects and it's direct parent (not in itself is done)!!!!!!
       // implement that you cannot move into child objects and it's direct parent (not in itself is done)!!!!!!
      delete bagObjects[currentBagPath];
      const optionContainer = document.querySelector('.option-container');
      for (const bag in bagObjects) {
         const optElem = document.createElement('option');
         optElem.classList.add('modal-select-option');
         optElem.value = bag;
         optElem.innerText = bag;
         optElem.dir = 'rtl';
         // selectElem.appendChild(optElem);
         optionContainer.appendChild(optElem);
      }
   }

   setup() {
      this.modIns.elements['submit-button'].disabled = true;
      if (!this.modIns.elements['submit-button'].classList.contains('modal__button--disabled')) {
         this.modIns.elements['submit-button'].classList.add('modal__button--disabled');
      }
      this.modIns.elements['submit-button'].classList.remove('modal__button--positive');
      this.renderSelect();
      this.modIns.elements['select'].addEventListener('change', this.boundRecognizeSelection);
   }
}

export default SelectModal;