class FlowbagSurface {

   clear(boundBagClickHandlers, boundBGClickHandler, boundFlowClickHandler, choosenFlowID) {
      const baglist = document.querySelector('.baglist');
      const flowlist = document.querySelector('.flowlist');
      const bags = Array.from(baglist.children);
      for (let i=0; i<bags.length; i++) {
         bags[i].removeEventListener('click', boundBagClickHandlers[bags[i].id]);
      }
      boundBagClickHandlers = {};
      baglist.innerHTML = "";
      flowlist.removeEventListener('click', boundFlowClickHandler);
      flowlist.innerHTML = "";
      if (choosenFlowID) {
         document.querySelector('.view-wrapper').removeEventListener('click', boundBGClickHandler);
         choosenFlowID = null;
         boundBGClickHandler = null;
      }
   }

   setupProperSurface(bagData, bagPath, revisit) {
      const flowbag = document.getElementById('flowpage-bag');
      const flowtop = document.getElementById('flowpage-top');
      const uparrow_icon = document.querySelector('.icon--uparrow');
      const uparrow_taparea = document.getElementById('uparrow-icon-tap-area');
      if ((Object.keys(bagData).length === 2) && ('IN' in bagData) && ('OUT' in bagData)) {
         flowbag.style.display = 'none';
         flowtop.style.display = 'block';
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
         if (bagData.amount >= 0) {
            titleBG.classList.remove('flowBagTitleBG--fire');
            if (!(titleBG.classList.contains('flowBagTitleBG--bag'))) {
               titleBG.classList.add('flowBagTitleBG--bag');
            }
         } else {
            titleBG.classList.remove('flowBagTitleBG--bag');
            if (!(titleBG.classList.contains('flowBagTitleBG--fire'))) {
               titleBG.classList.add('flowBagTitleBG--fire');
            }
         }
      }
   }
}

export default FlowbagSurface;