class FlowbagSurface {

   setupProperSurface(bag, bagName, revisit) {
      const flowbag = document.getElementById('flow-bag');
      const flowtop = document.getElementById('flow-top');
      const uparrow_icon = document.querySelector('.icon--uparrow');
      const uparrow_taparea = document.getElementById('uparrow-icon-tap-area');
      if ((Object.keys(bag).length === 2) && ('IN' in bag) && ('OUT' in bag)) {
         flowbag.style.display = 'none';
         flowtop.style.display = 'block';
         uparrow_icon.src = './assets/icons/uparrow_disabled.svg';
         uparrow_taparea.dataset.status = 'disabled';
         uparrow_taparea.classList.add('icon-tap-area--disabled');
      } else {
         if (bagName === 'IN' || bagName === 'OUT' || revisit) { // if IN || OUT: 50% chance user came from topmost
            flowtop.style.display = 'none';
            flowbag.style.display = 'block';
            if (uparrow_taparea.dataset.status === 'disabled') {
               uparrow_icon.src = './assets/icons/uparrow.svg';
               uparrow_taparea.dataset.status = 'enabled';
               uparrow_taparea.classList.remove('icon-tap-area--disabled');
            }
         }
         const titleBG = document.querySelector('.flowBagTitleBG');
         if (bag.amount >= 0) {
            titleBG.classList.remove('flowBagTitleBG--fire');
            titleBG.classList.add('flowBagTitleBG--bag');
         } else {
            titleBG.classList.remove('flowBagTitleBG--bag');
            titleBG.classList.add('flowBagTitleBG--fire');
         }
      
      }
   }
}

export default FlowbagSurface;