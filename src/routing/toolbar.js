import ToolbarEventHandler from "./flowPage_src/toolbarEventHandler.js";

class Toolbar {

   currentType;
   toolbarElement;
   direction = 'IN';
   boundRefreshHandler;
   currentBagName;

   constructor(dummyData, reloadEvent) {
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
      document.querySelector('.toolbar-caption').lastElementChild.style.fontStyle = 'italic';
   }


   activateBar(bartype) {
      if (!this.toolbarElement) {
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
         this.#setCaption(bartype);
         this.#setupButtons(bartype);
      }
   }


   #setCaption(bartype) {
      const captionEl = document.querySelector('.toolbar-caption');
      if (bartype === 'account') {
         captionEl.firstElementChild.innerText = '';
         captionEl.lastElementChild.innerText = `${this.currentBagName}`;
      } else if (bartype === 'account-modification') {
         captionEl.firstElementChild.innerText = 'Modify ';
         captionEl.lastElementChild.innerText = `"${this.currentBagName}"`;
      } else if (bartype === 'flow') {
         captionEl.firstElementChild.innerText = 'Marked Flow:'
         captionEl.lastElementChild.innerText = '';
      }
   }


   #setupButtons(bartype) {
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