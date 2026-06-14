import ToolbarEventHandler from "./toolbarEventHandler.js";

class Toolbar {

   currentType = 'account';
   toolbarElement;
   direction = 'IN';
   boundRefreshHandler;
   currentBagName;
   TEH;

   constructor(appData, reloadEvent, modal, chart) {
      this.TEH = new ToolbarEventHandler(appData, reloadEvent, modal);
      this.boundModifyHandler = this.modifyHandler.bind(this);
      this.TEH.boundAdd2chartHandler = this.TEH.add2chartHandler.bind(this.TEH);
      this.TEH.boundRemoveFromChartHandler = this.TEH.removeFromChartHandler.bind(this.TEH);
      this.TEH.boundAddNestedBagHandler = this.TEH.addNestedBagHandler.bind(this.TEH);
      this.TEH.boundAddFlowHandler = this.TEH.addFlowHandler.bind(this.TEH);
      this.TEH.boundRenameBagHandler = this.TEH.renameBagHandler.bind(this.TEH);
      this.TEH.boundMoveBagHandler = this.TEH.moveBagHandler.bind(this.TEH);
      this.boundBackToMainHandler = this.backToMainHandler.bind(this);
      this.boundRemoveBagHandler = this.removeBagHandler.bind(this);
      this.TEH.boundEraseBagHandler = this.TEH.eraseBagHandler.bind(this.TEH);
      this.TEH.boundDisbandBagHandler = this.TEH.disbandBagHandler.bind(this.TEH);
      this.TEH.boundDeleteFlowHandler = this.TEH.deleteFlowHandler.bind(this.TEH);
      this.TEH.boundMoveFlowHandler = this.TEH.moveFlowHandler.bind(this.TEH);
      this.boundChangeFlowHandler = this.changeFlowHandler.bind(this);
      this.boundBackToFlowHandler = this.backToFlowHandler.bind(this);
      this.TEH.boundChangeDateHandler = this.TEH.changeDateHandler.bind(this.TEH);
      this.TEH.boundChangeTextHandler = this.TEH.changeTextHandler.bind(this.TEH);
      this.TEH.boundChangeAmountHandler = this.TEH.changeAmountHandler.bind(this.TEH);
      this.chartBags = chart.bags;
      this.setupBar();
   }


   setupBar() {
      if (!document.querySelector('.toolbar-caption')) {
         const flowBag = document.getElementById('flowpage-bag');
         const toolbarFragment = document.getElementById('toolbar').content.cloneNode(true);
         this.toolbarElement = toolbarFragment.getElementById('toolbar-wrapper');
         flowBag.appendChild(this.toolbarElement);
         document.querySelector('.toolbar-caption').lastElementChild.style.fontStyle = 'italic';
      }
      // else {
      //    console.log('Toolbar setup aborted: Toolbar already existed!');
      // }
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
            const bagDir = this.direction === 'IN' ? 'INBOX:' : 'OUTBOX:';
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
            captionEl.firstElementChild.style.display = 'inline';
            captionEl.firstElementChild.innerText = 'Selected Flow:'
            captionEl.lastElementChild.innerText = '';
         } else if (bartype === 'flow-change') {
            captionEl.firstElementChild.innerText = 'Change Flow:'
         }
      } else {
         console.warn('toolbar-caption element doesn\'t exist!');
      }
   }


   #setupButtons(bartype) {
      const buttons = this.toolbarElement.querySelectorAll('button');
      if (bartype === 'account') {
         if (this.currentBagName !== 'IN' && this.currentBagName !== 'OUT') {
            buttons[0].style.display = 'inline-block';
            buttons[0].addEventListener('click', this.boundModifyHandler, {once: true});
         } else {
            buttons[0].style.display = 'none';
         }
         if (this.TEH.appData.getBagPath() in this.chartBags) {
            buttons[1].removeEventListener('click', this.TEH.boundAdd2chartHandler);
            buttons[1].addEventListener('click', this.TEH.boundRemoveFromChartHandler, {once: true});
         } else {
            buttons[1].removeEventListener('click', this.TEH.boundRemoveFromChartHandler);
            buttons[1].addEventListener('click', this.TEH.boundAdd2chartHandler, {once: true});
         }
         buttons[2].addEventListener('click', this.TEH.boundAddNestedBagHandler, {once: true});
         buttons[3].addEventListener('click', this.TEH.boundAddFlowHandler, {once: true});
      }
      else if (bartype === 'account-modification') {
         buttons[4].addEventListener('click', this.boundBackToMainHandler, {once: true});
         buttons[5].addEventListener('click', this.boundRemoveBagHandler, {once: true});
         buttons[6].addEventListener('click', this.TEH.boundRenameBagHandler, {once: true});
         buttons[7].addEventListener('click', this.TEH.boundMoveBagHandler, {once: true});
      }
      else if (bartype === 'account-remove') {
         buttons[8].addEventListener('click', this.boundModifyHandler, {once: true});
         buttons[9].addEventListener('click', this.TEH.boundEraseBagHandler, {once: true});
         buttons[10].addEventListener('click', this.TEH.boundDisbandBagHandler, {once: true});
      }
      else if (bartype === 'flow') {
         buttons[11].addEventListener('click', this.TEH.boundDeleteFlowHandler, {once: true});
         buttons[12].addEventListener('click', this.TEH.boundMoveFlowHandler, {once: true});
         buttons[13].addEventListener('click', this.boundChangeFlowHandler, {once: true});
      }
      else if (bartype === 'flow-change') {
         buttons[14].addEventListener('click', this.boundBackToFlowHandler, {once: true});
         buttons[15].addEventListener('click', this.TEH.boundChangeDateHandler, {once: true});
         buttons[16].addEventListener('click', this.TEH.boundChangeTextHandler, {once: true});
         buttons[17].addEventListener('click', this.TEH.boundChangeAmountHandler, {once: true});
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

   removeBagHandler(event) {
      event.stopPropagation();
      this.activateBar('account-remove');
   }

   backToFlowHandler(event) {
      event.stopPropagation();
      this.activateBar('flow');
   }

   changeFlowHandler(event) {
      event.stopPropagation();
      this.activateBar('flow-change');
   }


   
   handleDirection(bagPath) {
      this.direction = bagPath.split('/')[0] === 'IN' ? 'IN' : 'OUT';
      const dynamicWordList = this.toolbarElement.querySelectorAll('span');
      dynamicWordList.forEach((wordElem) => {
         if (wordElem.classList.contains('bagname--uppercase')) {
            wordElem.innerText = this.direction === 'IN' ? 'INBOX' : 'OUTBOX';
         } else if (wordElem.classList.contains('bagname--lowercase')) {
            wordElem.innerText = this.direction === 'IN' ? 'inbox' : 'outbox';
         } else if (wordElem.classList.contains('flowname')) {
            wordElem.innerText = this.direction === 'IN' ? 'GAIN' : 'LOSS';
         }
      })
   }
}
   
   
   export default Toolbar;