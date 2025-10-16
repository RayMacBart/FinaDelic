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
      this.TEH.boundAddNestedBagHandler = this.TEH.addNestedBagHandler.bind(this.TEH);
      this.TEH.boundAddFlowHandler = this.TEH.addFlowHandler.bind(this.TEH);
      this.boundBackToMainHandler = this.backToMainHandler.bind(this);
      this.setupBar();
   }


   setupBar() {
      if (!document.querySelector('.toolbar-caption')) {
         const flowBag = document.getElementById('flowpage-bag');
         const toolbarFragment = document.getElementById('toolbar').content.cloneNode(true);
         this.toolbarElement = toolbarFragment.getElementById('toolbar-wrapper');
         flowBag.appendChild(this.toolbarElement);
         document.querySelector('.toolbar-caption').lastElementChild.style.fontStyle = 'italic';
      } else {
         console.log('Toolbar setup aborted: Toolbar already existed!');
      }
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
      if (captionEl) {
         if (bartype === 'account') {
            const bagDir = this.direction === 'IN' ? 'Pocket:' : 'Drain:';
            if (this.currentBagName === 'IN' || this.currentBagName === 'OUT') {
               captionEl.firstElementChild.style.display = 'none';
               captionEl.lastElementChild.innerText = `${this.currentBagName}`;
            } else {
               captionEl.firstElementChild.style.display = 'inline';
               captionEl.firstElementChild.innerText = bagDir;
               captionEl.lastElementChild.innerText = ` ${this.currentBagName}`;
            }
         } else if (bartype === 'account-modification') {
            captionEl.firstElementChild.innerText = 'Modify:';
            captionEl.lastElementChild.innerText = ` ${this.currentBagName}`;
         } else if (bartype === 'flow') {
            captionEl.firstElementChild.innerText = 'Selection:'
            captionEl.lastElementChild.innerText = '';
         }
      } else {
         console.log('toolbar-caption element doesn\'t exist!');
      }
   }


   #setupButtons(bartype) {
      const buttons = this.toolbarElement.querySelectorAll('button');
      if (bartype === 'account') {
         if (this.currentBagName !== 'IN' && this.currentBagName !== 'OUT') {
            buttons[0].style.display = 'inline-block';
            buttons[0].addEventListener('click', this.boundModifyHandler, {once: true});  // (!)[../../docs/secureOnceNote.txt]
         } else {
            buttons[0].style.display = 'none';
         }
         buttons[1].addEventListener('click', this.TEH.boundAdd2chartHandler, {once: true});  // (warning)[../../docs/onceListenerWarning.txt]
         buttons[2].addEventListener('click', this.TEH.boundAddNestedBagHandler, {once: true});
         buttons[3].addEventListener('click', this.TEH.boundAddFlowHandler, {once: true});
      }
      else if (bartype === 'account-modification') {
         buttons[4].addEventListener('click', this.boundBackToMainHandler, {once: true});
      }
   }


   modifyHandler(event) {
      event.stopPropagation();
      this.activateBar('account-modification');
   }

   backToMainHandler(event) {
      event.stopPropagation();
      this.activateBar('account');
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