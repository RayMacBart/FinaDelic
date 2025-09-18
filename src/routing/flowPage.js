import { navigate } from "./route.js";
import { makeIconHoverEffect } from "../lazyLoader.js";
import { DummyData } from "../dummyData.js";
// for now, DummyData is used instead of fetching bag related folder and transaction content from backend API!

const renderFlowBag = (bagName, stepUp=false) => {
   DummyData.setCurrentBag(bagName, stepUp);
   const bag = DummyData.getData();
   console.log(bag);

   console.log(bagName);
   for (const key in bag) {
      console.log(key);
   }

   const flowbag = document.getElementById('flow-bag');
   const flowtop = document.getElementById('flow-top');
   const uparrow_icon = document.querySelector('.icon--uparrow');
   const uparrow_taparea = document.getElementById('uparrow-icon-tap-area');

   if ((Object.keys(bag).length === 2) && ('IN' in bag) && ('OUT'in bag)) {
      flowbag.style.display = 'none';
      flowtop.style.display = 'block';
      uparrow_icon.src = './assets/icons/uparrow_disabled.svg';
      uparrow_taparea.dataset.status = 'disabled';
      uparrow_taparea.classList.add('icon-tap-area--disabled');
   } else {
      if (bagName === 'IN' || bagName === 'OUT' || bagName === DummyData.uniqueRefindFlag) { // btw. 50% chance user came from topmost
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

const setupFlowPageLinks = () => {
   document.querySelector('.logo--nav').addEventListener('click', () => navigate('loggedinHP', ['page--landing']));
   document.getElementById('uparrow-icon-tap-area').addEventListener('click', (e) => {
                                                                         if (!(e.target.dataset.status === 'disabled')) {
                                                                           renderFlowBag('', true);
                                                                         }
                                                                     });
   // document.getElementById('clock-icon-tap-area').addEventListener('click', () => ??????????); // OPEN MODAL
   document.getElementById('chart-icon-tap-area').addEventListener('click', () => navigate('chartPage'));
   document.getElementById('logout-icon-tap-area').addEventListener('click', () => navigate('loggedoutHP', ['page--landing']));
   document.querySelector('.buzzer--in').addEventListener('click', () => renderFlowBag('IN'));
   document.querySelector('.buzzer--out').addEventListener('click', () => renderFlowBag('OUT'));
};

function setup() {
   renderFlowBag(DummyData.uniqueRefindFlag);
   setupFlowPageLinks();
   makeIconHoverEffect('uparrow');
   makeIconHoverEffect('clock');
   makeIconHoverEffect('chart');
   makeIconHoverEffect('logout');
}

export { setup };