import renderAmount from './renderAmount.js';

class FlowPageSurface {

   clear(eventHandler) {
      const baglist = document.querySelector('.baglist');
      const flowlist = document.querySelector('.flowlist');
      const bags = Array.from(baglist.children);
      for (let i=0; i<bags.length; i++) {
         bags[i].removeEventListener('click', eventHandler.boundBagClickHandlers[bags[i].id]);
      }
      eventHandler.boundBagClickHandlers = {};
      baglist.innerHTML = "";
      flowlist.removeEventListener('click', eventHandler.boundFlowClickHandler);
      flowlist.innerHTML = "";
      if (eventHandler.choosenFlowID) {
         document.querySelector('.view-wrapper').removeEventListener('click', eventHandler.boundBGClickHandler);
         eventHandler.choosenFlowID = null;
         eventHandler.boundBGClickHandler = null;
      }
   }
   

   renderTopMostBagAmounts(bagData) {
      renderAmount(bagData.IN.amount, document.getElementById('in-total'));
      renderAmount(bagData.OUT.amount, document.getElementById('out-total'));
      const totalBalanceEl = document.querySelector('#total-balance > span');
      renderAmount(bagData.IN.amount+bagData.OUT.amount, totalBalanceEl);
      if (Number(totalBalanceEl.innerText) < 0) {
         totalBalanceEl.classList.remove('positive');
         if (!(totalBalanceEl.classList.contains('negative'))) {
            totalBalanceEl.classList.add('negative');
         }
      } else {
         totalBalanceEl.classList.remove('negative');
         if (!(totalBalanceEl.classList.contains('positive'))) {
            totalBalanceEl.classList.add('positive');
         }
      }
   }


   setupProperSurface(bagData, bagPath, revisit, timespan) {
      const flowbag = document.getElementById('flowpage-bag');
      const flowtop = document.getElementById('flowpage-top');
      const uparrow_icon = document.querySelector('.icon--uparrow');
      const uparrow_taparea = document.getElementById('uparrow-icon-tap-area');

      document.getElementById('time-start').innerText = timespan.start.getDate()+'.'+(timespan.start.getMonth()+1)+'.'+timespan.start.getFullYear();
      document.getElementById('time-end').innerText = timespan.end.getDate()+'.'+(timespan.end.getMonth()+1)+'.'+timespan.end.getFullYear();
      
      if ((Object.keys(bagData).length === 2) && ('IN' in bagData) && ('OUT' in bagData)) {  // if topmost
         flowbag.style.display = 'none';
         flowtop.style.display = 'block';
         this.renderTopMostBagAmounts(bagData);
         uparrow_icon.src = './assets/icons/uparrow_disabled.svg';
         uparrow_taparea.dataset.status = 'disabled';
         uparrow_taparea.classList.add('icon-tap-area--disabled');
      } else {
         if (bagPath === 'IN' || bagPath === 'OUT' || revisit) { // if IN || OUT: 50% chance user came from topmost
            flowtop.style.display = 'none';
            flowbag.style.display = 'block';
            if (uparrow_taparea.dataset.status === 'disabled') {
               uparrow_icon.src = './assets/icons/uparrow.svg';
               uparrow_taparea.dataset.status = 'enabled';
               uparrow_taparea.classList.remove('icon-tap-area--disabled');
            }
         }

         const titleBG = document.querySelector('.flowBagTitleBG');
         document.querySelector('.flowBagTitle').innerText = bagPath.split('/').pop();
         const totalBagAmountEl = document.querySelector('#bag-total > p > span');
         renderAmount(bagData.amount, totalBagAmountEl);
         if (bagData.amount === 0) {
            titleBG.classList.remove('flowBagTitleBG--fire');
            titleBG.classList.remove('flowBagTitleBG--bag');
            if (!(titleBG.classList.contains('flowBagTitleBG--null'))) {
               titleBG.classList.add('flowBagTitleBG--null');
            }
         }
         else if (bagPath.split('/')[0] === 'IN') {
            titleBG.classList.remove('flowBagTitleBG--fire');
            titleBG.classList.remove('flowBagTitleBG--null');
            if (!(titleBG.classList.contains('flowBagTitleBG--bag'))) {
               titleBG.classList.add('flowBagTitleBG--bag');
            }
            if (totalBagAmountEl.classList.contains('negative')) {
               totalBagAmountEl.classList.replace('negative', 'positive');
            }
         } else {
            titleBG.classList.remove('flowBagTitleBG--bag');
            titleBG.classList.remove('flowBagTitleBG--null');
            if (!(titleBG.classList.contains('flowBagTitleBG--fire'))) {
               titleBG.classList.add('flowBagTitleBG--fire');
            }
            if (totalBagAmountEl.classList.contains('positive')) {
               totalBagAmountEl.classList.replace('positive', 'negative');
            }
         }
      }
   }
}

export default FlowPageSurface;