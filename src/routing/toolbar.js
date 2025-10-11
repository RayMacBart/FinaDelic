import ToolbarEventHandler from "./flowPage_src/toolbarEventHandler.js";

class Toolbar {

   currentType;
   toolbarElement;
   direction = 'IN';
   boundRefreshHandler;

   constructor(dummyData, reloadEvent) {
      console.log('new toolbar construct!');
      this.TEH = new ToolbarEventHandler(dummyData, reloadEvent);
      this.boundModifyHandler = this.modifyHandler.bind(this);
      this.TEH.boundAdd2chartHandler = this.TEH.add2chartHandler.bind(this.TEH);
      this.setupBar();
   }


   setupBar() {
      const flowBag = document.getElementById('flowpage-bag');
      const toolbarFragment = document.getElementById('toolbar').content.cloneNode(true);
      this.toolbarElement = toolbarFragment.getElementById('toolbar-wrapper');
      flowBag.appendChild(this.toolbarElement);
      console.log('new toolbarElement set up!');
   }


   activateBar(bartype) {
      console.log('X');
      // console.log('toolbarElement:', this.toolbarElement);
      // console.log('bartype:', bartype);
      // console.log('this.currentType:', this.currentType);
      if (!this.toolbarElement) {
         console.log('no this.toolbarElement! --> setup');
         this.setupBar();
         this.activateBar(bartype);
      } else {
         if (this.toolbarElement.style.display === 'none') {
            this.toolbarElement.style.display = 'block';
         }
         if (this.currentType) {
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
         buttons[0].addEventListener('click', this.boundModifyHandler, {once: true});  // (!)[../../docs/secureOnceNote.txt]
         buttons[1].addEventListener('click', this.TEH.boundAdd2chartHandler, {once: true});  // (warning)[../../docs/onceListenerWarning.txt]

      }
   }


   modifyHandler(event) {
      event.stopPropagation();
      this.activateBar('account-modification');
   }
   
   
   handleDirection(bagPath) {
      const firstBag = bagPath.split('/')[0];
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