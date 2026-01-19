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


   filterOutBadDestinations(bagObjects, currentBagPath) {
      for (const objPath in bagObjects) {
         if (objPath.includes(currentBagPath)) {
            delete bagObjects[objPath];
         }
      }
      const pathArray = currentBagPath.split('/');
      pathArray.pop();
      delete bagObjects[pathArray.join('/')];
   }


   renderSelect(isBagMove) {
      const currentBagPath = this.modIns.dummyData.getBagPath();
      this.utils.bagPath = currentBagPath;
      const direction = currentBagPath.split('/')[0];
      const bagObjects = this.utils.getAll1DirBagObjects(this.modIns.dummyData.data[direction], direction);
      if (isBagMove) {
         this.filterOutBadDestinations(bagObjects, currentBagPath);
      } else {
         delete bagObjects[currentBagPath];
      }
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

   setup(isBagMove) {
      this.modIns.elements['submit-button'].disabled = true;
      if (!this.modIns.elements['submit-button'].classList.contains('modal__button--disabled')) {
         this.modIns.elements['submit-button'].classList.add('modal__button--disabled');
      }
      this.modIns.elements['submit-button'].classList.remove('modal__button--positive');
      this.renderSelect(isBagMove);
      this.modIns.elements['select'].addEventListener('change', this.boundRecognizeSelection);
   }
}

export default SelectModal;