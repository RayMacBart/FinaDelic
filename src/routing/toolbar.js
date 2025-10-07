import ToolbarEventHandler from "./flowPage_src/toolbarEventHandler.js";

class Toolbar {

   currentType;
   toolbarElement;
   direction = 'IN';

   constructor(dummyData) {
      this.TEH = new ToolbarEventHandler(dummyData);
      this.setupBar();
   }

   
   setupBar() {
      const flowBag = document.getElementById('flowpage-bag');
      const toolbarFragment = document.getElementById('toolbar').content.cloneNode(true);
      this.toolbarElement = toolbarFragment.getElementById('toolbar-wrapper');
      flowBag.appendChild(this.toolbarElement);
   }


   activateBar(bartype) {
      if (!this.toolbarElement) {
         this.setupBar();
         this.activateBar(bartype);
      } else {
         if (this.toolbarElement.style.display === 'none') {
            this.toolbarElement.style.display = 'block';
         }
         if (this.currentType && this.currentType !== bartype) {
            this.toolbarElement.querySelector(`.menu--${this.currentType}`).style.display = 'none';
         }
         this.toolbarElement.querySelector(`.menu--${bartype}`).style.display = 'flex';
         this.currentType = bartype;
         this.setupButtons(bartype);
      }
   }


   setupButtons(bartype) {
      const buttons = this.toolbarElement.querySelectorAll('button');
      if (bartype === 'account') {
         this.TEH.boundHandlers.push(this.TEH.modifyAccount.bind(this.TEH));
         buttons[0].addEventListener('click', this.TEH.boundHandlers[0]);
         // addEventListener
      }
   }
   
   
   handleDirection(bagPath) {
      const firstBag = bagPath.split('/')[0];
      console.log('firstBag:', firstBag);
      if (bagPath.split('/')[0] !== this.direction) {
         this.direction = this.direction === 'IN' ? 'OUT' : 'IN';
         const dynamicWordList = this.toolbarElement.querySelectorAll('span');
         dynamicWordList.forEach((wordElem) => {
            if (wordElem.classList.contains('bagname--uppercase')) {
               wordElem.innerText = this.direction === 'IN' ? 'POCKET' : 'DRAIN';
            } else if (wordElem.classList.contains('bagname--lowercase')) {
               wordElem.innerText = this.direction === 'IN' ? 'pocket' : 'drain';
            } else if (wordElem.classList.contains('flowname')) {
               wordElem.innerText = this.direction === 'IN' ? 'GAIN' : 'LOSS';
            }
         })
      }
   }
}
   
   
   export default Toolbar;